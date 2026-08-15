/**
 * Read-only diagnostic for 21 July #24.
 *
 * Lists every WordPress media item tagged with a photography service whose slug
 * does not match any project mapping in lib/service-photo-projects.ts. Those are
 * exactly the photos that pile up unlabelled at the end of a gallery — the
 * "popurrí de fotos mezcladas" Nahuel found after the Book Anto set.
 *
 * This script never writes to WordPress. Delete or retag whatever it reports
 * from WP admin.
 *
 *   node scripts/list-ungrouped-media.mjs                     # all services
 *   node scripts/list-ungrouped-media.mjs publicidad          # one service
 *
 * Requires WP_USERNAME and WP_APPLICATION_PASSWORD in .env.local.
 */
import { readFileSync } from 'node:fs';

const WP_API_URL =
  process.env.WP_API_URL ?? 'https://lightcyan-deer-205982.hostingersite.com/wp-json/wp/v2';

const SERVICE_TAGS = [
  'fotoproducto',
  'publicidad',
  'foto-reportajes',
  'institucionales',
  'arquitectura',
  'paisajismo-y-cultura',
];

function readEnvFile() {
  const values = {};
  for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) values[match[1]] = match[2];
  }
  return values;
}

/** Pull the mapping keys straight out of the TS source — no build step needed. */
function readProjectKeys() {
  const source = readFileSync('lib/service-photo-projects.ts', 'utf8');
  const keys = new Map();
  const entry = /"([a-z0-9-]+):([^"]+)":\s*\{\s*"project":\s*"([^"]*)"/g;
  let match;
  while ((match = entry.exec(source)) !== null) {
    const [, tag, driveKey, project] = match;
    if (!keys.has(tag)) keys.set(tag, []);
    keys.get(tag).push({ driveKey, project });
  }
  return keys;
}

const env = readEnvFile();
if (!env.WP_USERNAME || !env.WP_APPLICATION_PASSWORD) {
  throw new Error('WP_USERNAME and WP_APPLICATION_PASSWORD must be set in .env.local.');
}
const headers = {
  Authorization: `Basic ${Buffer.from(`${env.WP_USERNAME}:${env.WP_APPLICATION_PASSWORD}`).toString('base64')}`,
};

async function request(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`GET ${url} failed: ${response.status}`);
  return response;
}

const projectKeys = readProjectKeys();
const only = process.argv[2];
const tags = only ? [only] : SERVICE_TAGS;
const report = {};

for (const tag of tags) {
  const tagRes = await request(`${WP_API_URL}/media_tag?slug=${encodeURIComponent(tag)}`);
  const found = await tagRes.json();
  if (!found.length) {
    report[tag] = { error: 'media_tag does not exist in WordPress' };
    continue;
  }

  const mapped = projectKeys.get(tag) ?? [];
  const ungrouped = [];
  let total = 0;
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const mediaRes = await request(
      `${WP_API_URL}/media?media_tag=${found[0].id}&per_page=100&page=${page}&orderby=date&order=asc&_fields=id,slug,source_url,date`
    );
    totalPages = Number(mediaRes.headers.get('X-WP-TotalPages') ?? '1');
    for (const item of await mediaRes.json()) {
      total += 1;
      if (!mapped.some(({ driveKey }) => item.slug.includes(driveKey))) {
        ungrouped.push({ id: item.id, slug: item.slug, date: item.date, url: item.source_url });
      }
    }
    page += 1;
  }

  report[tag] = { total, mappedProjects: new Set(mapped.map((m) => m.project)).size, ungrouped };
  console.log(
    `${tag}: ${total} media, ${ungrouped.length} ungrouped` +
      (ungrouped.length ? ` → ids ${ungrouped.map((u) => u.id).join(', ')}` : '')
  );
}

console.log('\nFull report:\n' + JSON.stringify(report, null, 2));
