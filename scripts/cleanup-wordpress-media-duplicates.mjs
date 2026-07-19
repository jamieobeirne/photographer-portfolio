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

const env = readEnvFile();
if (!env.WP_USERNAME || !env.WP_APPLICATION_PASSWORD) {
  throw new Error('WP_USERNAME and WP_APPLICATION_PASSWORD must be set in .env.local.');
}

const manifest = JSON.parse(readFileSync('scripts/service-drive-manifest.json', 'utf8'));
const sourceMarkers = new Map();
for (const item of manifest) {
  sourceMarkers.set(`${item.tag}:${slugify(`drive-${item.id}`)}`, item);
}

const auth = `Basic ${Buffer.from(`${env.WP_USERNAME}:${env.WP_APPLICATION_PASSWORD}`).toString('base64')}`;
async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { Authorization: auth, ...options.headers } });
  if (!response.ok) throw new Error(`${options.method ?? 'GET'} ${url} failed: ${response.status} ${await response.text()}`);
  return response;
}

async function getAllTagMedia(tag) {
  const tagResponse = await request(`${WP_API_URL}/media_tag?slug=${encodeURIComponent(tag)}`);
  const tagData = await tagResponse.json();
  if (!tagData[0]) throw new Error(`Missing WordPress media tag: ${tag}`);
  const tagId = tagData[0].id;
  const results = [];
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages) {
    const response = await request(`${WP_API_URL}/media?media_tag=${tagId}&per_page=100&page=${page}&_fields=id,slug,date,source_url`);
    totalPages = Number(response.headers.get('X-WP-TotalPages') ?? '1');
    results.push(...await response.json());
    page += 1;
  }
  return results;
}

const tags = [...new Set(manifest.map((item) => item.tag))];
const duplicateGroups = [];
for (const tag of tags) {
  const media = await getAllTagMedia(tag);
  const groups = new Map();
  for (const item of manifest.filter((entry) => entry.tag === tag)) {
    groups.set(slugify(`drive-${item.id}`), []);
  }
  for (const item of media) {
    for (const [marker, matches] of groups) {
      if (item.slug.includes(marker)) {
        matches.push(item);
        break;
      }
    }
  }
  for (const [marker, matches] of groups) {
    if (matches.length > 1) {
      matches.sort((a, b) => a.id - b.id);
      duplicateGroups.push({ tag, marker, keep: matches[0], remove: matches.slice(1) });
    }
  }
}

const removals = duplicateGroups.flatMap((group) => group.remove);
if (process.argv.includes('--delete')) {
  let nextIndex = 0;
  let deleted = 0;
  await Promise.all(Array.from({ length: Math.min(6, removals.length) }, async () => {
    while (nextIndex < removals.length) {
      const media = removals[nextIndex];
      nextIndex += 1;
      await request(`${WP_API_URL}/media/${media.id}?force=true`, { method: 'DELETE' });
      deleted += 1;
      if (deleted % 25 === 0) console.log(`Deleted ${deleted}/${removals.length}`);
    }
  }));
}

console.log(JSON.stringify({
  mode: process.argv.includes('--delete') ? 'deleted' : 'audit',
  duplicateGroups: duplicateGroups.length,
  duplicatesToRemove: removals.length,
  byTag: Object.fromEntries(tags.map((tag) => [tag, {
    groups: duplicateGroups.filter((group) => group.tag === tag).length,
    remove: duplicateGroups.filter((group) => group.tag === tag).reduce((sum, group) => sum + group.remove.length, 0),
  }])),
}, null, 2));
