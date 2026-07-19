import { readFileSync } from 'node:fs';

const WP_API_URL = process.env.WP_API_URL ?? 'https://lightcyan-deer-205982.hostingersite.com/wp-json/wp/v2';

function readEnvFile() {
  const values = {};
  for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) values[match[1]] = match[2];
  }
  return values;
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

const input = process.argv[2] ?? '';
const items = input.endsWith('.json')
  ? JSON.parse(readFileSync(input, 'utf8'))
  : JSON.parse(Buffer.from(input, 'base64url').toString('utf8'));
if (!Array.isArray(items) || items.length === 0) throw new Error('Pass a non-empty import batch.');

const env = readEnvFile();
if (!env.WP_USERNAME || !env.WP_APPLICATION_PASSWORD) {
  throw new Error('WP_USERNAME and WP_APPLICATION_PASSWORD must be set in .env.local.');
}

const auth = `Basic ${Buffer.from(`${env.WP_USERNAME}:${env.WP_APPLICATION_PASSWORD}`).toString('base64')}`;
const headers = { Authorization: auth };

async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { ...headers, ...options.headers } });
  if (!response.ok) {
    throw new Error(`${options.method ?? 'GET'} ${url} failed: ${response.status} ${await response.text()}`);
  }
  return response;
}

async function getTagId(tag) {
  const existing = await request(`${WP_API_URL}/media_tag?slug=${encodeURIComponent(tag)}`);
  const tags = await existing.json();
  if (tags.length) return tags[0].id;

  const created = await request(`${WP_API_URL}/media_tag`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: tag, slug: tag }),
  });
  return (await created.json()).id;
}

const tags = new Map();
const uploadedMarkers = new Map();
let uploaded = 0;
let skipped = 0;
let completed = 0;
const failures = [];

async function importItem(item) {
  const tagId = tags.get(item.tag) ?? (await getTagId(item.tag));
  tags.set(item.tag, tagId);
  const marker = slugify(`drive-${item.id}`);
  if (!uploadedMarkers.has(item.tag)) {
    const slugs = [];
    let page = 1;
    let totalPages = 1;
    while (page <= totalPages) {
      const mediaPage = await request(`${WP_API_URL}/media?media_tag=${tagId}&per_page=100&page=${page}&_fields=slug`);
      totalPages = Number(mediaPage.headers.get('X-WP-TotalPages') ?? '1');
      slugs.push(...(await mediaPage.json()).map((media) => media.slug));
      page += 1;
    }
    uploadedMarkers.set(item.tag, new Set(slugs));
  }
  if (uploadedMarkers.get(item.tag).has(marker) || [...uploadedMarkers.get(item.tag)].some((slug) => slug.includes(marker))) {
    skipped += 1;
    completed += 1;
    if (completed % 10 === 0) console.log(`Progress: ${completed}/${items.length}`);
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  const imageResponse = await fetch(
    item.downloadUrl ??
      `https://drive.usercontent.google.com/download?id=${item.id}&export=download&confirm=t`,
    { signal: controller.signal }
  );
  clearTimeout(timeout);
  if (!imageResponse.ok) throw new Error(`Download failed for ${item.name}: ${imageResponse.status}`);
  const bytes = await imageResponse.arrayBuffer();
  const extension = item.name.includes('.') ? item.name.split('.').pop() : 'jpg';
  const uploadName = `${item.tag}-${marker}-${slugify(item.name.replace(/\.[^.]+$/, ''))}.${extension}`;

  const upload = await request(`${WP_API_URL}/media`, {
    method: 'POST',
    headers: {
      'Content-Type': item.mimeType || 'image/jpeg',
      'Content-Disposition': `attachment; filename="${uploadName}"`,
    },
    body: bytes,
  });
  const media = await upload.json();

  await request(`${WP_API_URL}/media/${media.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ alt_text: item.alt || item.name, media_tag: [tagId] }),
  });
  uploaded += 1;
  uploadedMarkers.get(item.tag).add(slugify(uploadName.replace(/\.[^.]+$/, '')));
  completed += 1;
  if (completed % 10 === 0) console.log(`Progress: ${completed}/${items.length}`);
}

const concurrency = 6;
let nextIndex = 0;
await Promise.all(
  Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const item = items[nextIndex];
      nextIndex += 1;
      try {
        await importItem(item);
      } catch (error) {
        failures.push({ id: item.id, name: item.name, error: error.message });
        completed += 1;
        console.error(`Failed: ${item.name} (${completed}/${items.length})`);
      }
    }
  })
);

console.log(JSON.stringify({ uploaded, skipped, failed: failures.length, total: items.length, failures }));
