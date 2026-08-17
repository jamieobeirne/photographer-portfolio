/**
 * READ-ONLY. Diffs the 87 attachments deleted from publicidad on 16 Aug 13:51
 * against what is currently live in WordPress.
 *
 * Answers one question: which of those photos now have NO surviving copy?
 * Makes no writes of any kind. Run from the repo root with WP_USERNAME and
 * WP_APPLICATION_PASSWORD in .env.local.
 *
 *   node scripts/check-deleted-publicidad.mjs
 */
import { readFileSync } from 'node:fs';

const norm = (v) => v.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();

const WP_API_URL =
  process.env.WP_API_URL ?? 'https://lightcyan-deer-205982.hostingersite.com/wp-json/wp/v2';

const env = {};
for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2];
}
if (!env.WP_USERNAME || !env.WP_APPLICATION_PASSWORD) {
  throw new Error('WP_USERNAME and WP_APPLICATION_PASSWORD must be set in .env.local.');
}
const headers = {
  Authorization: `Basic ${Buffer.from(`${env.WP_USERNAME}:${env.WP_APPLICATION_PASSWORD}`).toString('base64')}`,
};

const get = async (url) => {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`GET ${url} failed: ${r.status} ${await r.text()}`);
  return r;
};

// Drive IDs that belong to publicidad, from the import manifest.
const manifest = JSON.parse(readFileSync('scripts/service-drive-manifest.json', 'utf8'));
const rows = Array.isArray(manifest) ? manifest : Object.values(manifest).flat();
const driveIds = rows.filter((e) => e && e.tag === 'publicidad').map((e) => ({ id: e.id, name: e.name, key: norm(e.id) }));

// What was deleted.
const backup = JSON.parse(readFileSync('scripts/ungrouped-backup/publicidad/manifest.json', 'utf8'));

// What is live now.
const tagRes = await get(`${WP_API_URL}/media_tag?slug=publicidad`);
const tag = (await tagRes.json())[0];
if (!tag) throw new Error('publicidad media_tag not found');

const live = [];
let page = 1, totalPages = 1;
while (page <= totalPages) {
  const res = await get(`${WP_API_URL}/media?media_tag=${tag.id}&per_page=100&page=${page}&_fields=id,slug`);
  totalPages = Number(res.headers.get('x-wp-totalpages') ?? 1);
  live.push(...(await res.json()));
  page += 1;
}

const keyOf = (slug) => driveIds.find((d) => norm(slug).includes(d.key));
const liveKeys = new Set(live.map((m) => keyOf(m.slug)?.key).filter(Boolean));

const missing = [], survived = [], unmatched = [];
const seen = new Set();
for (const item of backup.saved) {
  const hit = keyOf(item.slug);
  if (!hit) { unmatched.push(item); continue; }
  if (seen.has(hit.key)) continue;
  seen.add(hit.key);
  (liveKeys.has(hit.key) ? survived : missing).push({ ...hit, file: item.file });
}

console.log(`live publicidad attachments now: ${live.length}`);
console.log(`publicidad photos in Drive manifest: ${driveIds.length}`);
console.log(`deleted attachments in backup: ${backup.saved.length}`);
console.log(`  -> distinct Drive photos they represent: ${seen.size}`);
console.log(`  -> attachments matching no manifest entry (hand-uploads): ${unmatched.length}`);
console.log('');
console.log(`SURVIVED (another copy is still live, deletion removed only duplicates): ${survived.length}`);
console.log(`MISSING  (no live copy — needs restoring from backup):                  ${missing.length}`);
if (missing.length) {
  console.log('');
  console.log('--- missing, restore these ---');
  for (const m of missing) console.log(`  ${m.id}  ${m.name}\n      ${m.file}`);
}
if (unmatched.length) {
  console.log('');
  console.log('--- unmatched (check by hand before assuming they are safe) ---');
  for (const u of unmatched) console.log(`  ${u.id}  ${u.slug}`);
}
