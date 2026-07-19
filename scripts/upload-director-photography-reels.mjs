import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

const WP_API_URL = 'https://lightcyan-deer-205982.hostingersite.com/wp-json/wp/v2';
const desktop = 'C:/Users/usuario/Desktop';
const reels = [
  ['REEL CÁMARÓGRAFO live 02 FHD.mp4', 'reel-camarografo-live-02-fhd.mp4'],
  ['REEL DF - CINE final 02 ALTA.mp4', 'reel-df-cine-final-02-alta.mp4'],
  ['REEL DF - PUBLICIDAD final 02 ALTA.mp4', 'reel-df-publicidad-final-02-alta.mp4'],
];

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .map((line) => line.match(/^([A-Z0-9_]+)=(.*)$/))
    .filter(Boolean)
    .map(([, key, value]) => [key, value])
);
if (!env.WP_USERNAME || !env.WP_APPLICATION_PASSWORD) {
  throw new Error('WP_USERNAME and WP_APPLICATION_PASSWORD must be set in .env.local.');
}

const authorization = `Basic ${Buffer.from(`${env.WP_USERNAME}:${env.WP_APPLICATION_PASSWORD}`).toString('base64')}`;

for (const [sourceName, uploadName] of reels) {
  const sourcePath = join(desktop, sourceName);
  if (!existsSync(sourcePath)) throw new Error(`Missing source video: ${sourcePath}`);

  const existing = await fetch(`${WP_API_URL}/media?slug=${encodeURIComponent(uploadName.replace(/\.mp4$/, ''))}`, {
    headers: { Authorization: authorization },
  });
  const existingItems = existing.ok ? await existing.json() : [];
  if (existingItems.length) {
    console.log(JSON.stringify({ name: sourceName, url: existingItems[0].source_url, existing: true }));
    continue;
  }

  const response = await fetch(`${WP_API_URL}/media`, {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'video/mp4',
      'Content-Length': String(statSync(sourcePath).size),
      'Content-Disposition': `attachment; filename="${basename(uploadName)}"`,
    },
    body: createReadStream(sourcePath),
    duplex: 'half',
  });
  if (!response.ok) throw new Error(`Upload failed for ${sourceName}: ${response.status} ${await response.text()}`);
  const media = await response.json();
  console.log(JSON.stringify({ name: sourceName, url: media.source_url, existing: false }));
}
