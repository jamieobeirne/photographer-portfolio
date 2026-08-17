/**
 * Lists — and optionally deletes — WordPress media that carries a photography
 * service tag but matches no project mapping in lib/service-photo-projects.ts.
 *
 * These are the photos that render under "OTRAS FOTOS" at the end of a gallery
 * (see UNGROUPED_PROJECT in lib/wordpress.ts). Companion to
 * scripts/list-ungrouped-media.mjs, which only reports.
 *
 *   node scripts/prune-ungrouped-media.mjs publicidad
 *       Dry run. Lists what is ungrouped in that gallery. Changes nothing.
 *
 *   node scripts/prune-ungrouped-media.mjs publicidad --delete
 *       Downloads each file to scripts/ungrouped-backup/<tag>/ , writes a
 *       manifest, then permanently deletes them from WordPress.
 *
 *   node scripts/prune-ungrouped-media.mjs publicidad --delete --no-backup
 *       Same, without the local backup. Not recommended.
 *
 *   node scripts/prune-ungrouped-media.mjs --all
 *       Dry run across all six galleries. --delete needs --all spelled out too.
 *
 * WARNING: WordPress attachments cannot be trashed via the REST API, only
 * force-deleted. Deletion here is permanent — the backup is your only undo.
 *
 * NOTE: the ungrouped bucket is load-bearing by design. Photos uploaded by hand
 * through WP admin cannot match the <tag>-drive-<id>-<name> slug the importer
 * writes, so they land here too. Read the list before deleting it.
 *
 * Must be run from the repo root on branch nahuel-21-july, with WP_USERNAME and
 * WP_APPLICATION_PASSWORD in .env.local.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

/** WordPress keeps underscores in attachment slugs; slugified keys turn them
 * into hyphens. Normalise both sides or every Drive ID with an underscore
 * silently fails to match. */
const norm = (value) => value.replace(/[^a-zA-Z0-9]+/g, '-');

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

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((arg) => arg.startsWith('--')));
const positional = argv.filter((arg) => !arg.startsWith('--'));

const shouldDelete = flags.has('--delete');
const shouldBackup = !flags.has('--no-backup');
const allGalleries = flags.has('--all');

for (const flag of flags) {
  if (!['--delete', '--no-backup', '--all'].includes(flag)) {
    throw new Error(`Unknown flag: ${flag}`);
  }
}

if (positional.length > 1) throw new Error('Pass at most one service tag.');
for (const tag of positional) {
  if (!SERVICE_TAGS.includes(tag)) {
    throw new Error(`Unknown service tag "${tag}". Expected one of: ${SERVICE_TAGS.join(', ')}`);
  }
}
if (!positional.length && !allGalleries) {
  throw new Error('Pass a service tag, or --all to sweep every gallery.');
}

const tags = positional.length ? positional : SERVICE_TAGS;

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
  Authorization: `Basic ${Buffer.from(
    `${env.WP_USERNAME}:${env.WP_APPLICATION_PASSWORD}`
  ).toString('base64')}`,
};

async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { ...headers, ...options.headers } });
  if (!response.ok) {
    throw new Error(`${options.method ?? 'GET'} ${url} failed: ${response.status} ${await response.text()}`);
  }
  return response;
}

const projectKeys = readProjectKeys();

async function collectUngrouped(tag) {
  const tagRes = await request(`${WP_API_URL}/media_tag?slug=${encodeURIComponent(tag)}`);
  const found = await tagRes.json();
  if (!found.length) return { error: 'media_tag does not exist in WordPress' };

  const mapped = projectKeys.get(tag) ?? [];
  if (!mapped.length) {
    // No mappings at all means every photo would read as ungrouped. That is a
    // broken checkout, not a gallery full of strays — refuse rather than delete.
    return { error: 'no project mappings found for this tag in lib/service-photo-projects.ts' };
  }

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
      if (!mapped.some(({ driveKey }) => norm(item.slug).includes(norm(driveKey)))) {
        ungrouped.push({ id: item.id, slug: item.slug, date: item.date, url: item.source_url });
      }
    }
    page += 1;
  }

  return { total, mappedProjects: new Set(mapped.map((m) => m.project)).size, ungrouped };
}

async function backupItems(tag, items) {
  const dir = `scripts/ungrouped-backup/${tag}`;
  mkdirSync(dir, { recursive: true });
  const saved = [];
  const failed = [];

  let nextIndex = 0;
  await Promise.all(
    Array.from({ length: Math.min(6, items.length) }, async () => {
      while (nextIndex < items.length) {
        const item = items[nextIndex];
        nextIndex += 1;
        try {
          const response = await fetch(item.url);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const name = `${item.id}-${(item.url.split('/').pop() || 'file').replace(/[^a-zA-Z0-9._-]/g, '_')}`;
          writeFileSync(`${dir}/${name}`, Buffer.from(await response.arrayBuffer()));
          saved.push({ ...item, file: `${dir}/${name}` });
        } catch (error) {
          failed.push({ ...item, error: error.message });
        }
      }
    })
  );

  writeFileSync(
    `${dir}/manifest.json`,
    JSON.stringify({ tag, takenAt: new Date().toISOString(), saved, failed }, null, 2)
  );
  return { saved, failed, dir };
}

async function deleteItems(items) {
  let deleted = 0;
  const failed = [];
  let nextIndex = 0;
  await Promise.all(
    Array.from({ length: Math.min(6, items.length) }, async () => {
      while (nextIndex < items.length) {
        const item = items[nextIndex];
        nextIndex += 1;
        try {
          await request(`${WP_API_URL}/media/${item.id}?force=true`, { method: 'DELETE' });
          deleted += 1;
          if (deleted % 10 === 0) console.log(`  deleted ${deleted}/${items.length}`);
        } catch (error) {
          failed.push({ id: item.id, slug: item.slug, error: error.message });
        }
      }
    })
  );
  return { deleted, failed };
}

const report = {};

for (const tag of tags) {
  const result = await collectUngrouped(tag);
  report[tag] = result;

  if (result.error) {
    console.log(`${tag}: SKIPPED — ${result.error}`);
    continue;
  }

  console.log(
    `\n${tag}: ${result.total} media, ${result.mappedProjects} mapped projects, ${result.ungrouped.length} ungrouped`
  );
  for (const item of result.ungrouped) {
    console.log(`  ${String(item.id).padStart(6)}  ${item.date.slice(0, 10)}  ${item.slug}`);
  }

  if (!shouldDelete || !result.ungrouped.length) continue;

  if (shouldBackup) {
    const backup = await backupItems(tag, result.ungrouped);
    report[tag].backup = { dir: backup.dir, saved: backup.saved.length, failed: backup.failed.length };
    console.log(`  backed up ${backup.saved.length}/${result.ungrouped.length} to ${backup.dir}`);
    if (backup.failed.length) {
      console.error(`  ${backup.failed.length} file(s) could not be downloaded — aborting delete for ${tag}.`);
      report[tag].deleted = 0;
      report[tag].abortedBecauseBackupIncomplete = true;
      continue;
    }
  }

  const outcome = await deleteItems(result.ungrouped);
  report[tag].deleted = outcome.deleted;
  report[tag].deleteFailures = outcome.failed;
  console.log(`  deleted ${outcome.deleted}/${result.ungrouped.length} from WordPress`);
}

console.log(
  '\n' +
    JSON.stringify(
      {
        mode: shouldDelete ? 'delete' : 'audit',
        backup: shouldDelete ? shouldBackup : null,
        tags,
        summary: Object.fromEntries(
          Object.entries(report).map(([tag, value]) => [
            tag,
            value.error
              ? { error: value.error }
              : {
                  total: value.total,
                  ungrouped: value.ungrouped.length,
                  deleted: value.deleted ?? 0,
                  backupDir: value.backup?.dir ?? null,
                },
          ])
        ),
      },
      null,
      2
    )
);

if (!shouldDelete) {
  console.log('\nDry run — nothing was changed. Re-run with --delete to remove the items listed above.');
}
