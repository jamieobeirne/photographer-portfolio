import type { ACFMediaFile, WPGlobalSettings, WPPage } from '@/types/wordpress';
import { videoSourceTypeFromUrl } from '@/lib/video';

const WP_API_URL = 'https://lightcyan-deer-205982.hostingersite.com/wp-json/wp/v2';

/** Resolve ACF File / URL field to a public media URL. */
export function acfFileFieldUrl(value: unknown): string | null {
  if (value == null || value === false) return null;
  if (typeof value === 'string' && value.trim() !== '' && value.startsWith('http')) {
    return value;
  }
  if (typeof value === 'object' && value !== null && 'url' in value) {
    const u = (value as { url?: string }).url;
    if (typeof u === 'string' && u.length > 0) return u;
  }
  return null;
}

/** URL and `<source type>` for intro `logo_video` — prefers ACF `mime_type` when the field is a file object. */
export function resolveLogoVideoField(logoVideo: unknown): { url: string; type: string } | null {
  const url = acfFileFieldUrl(logoVideo);
  if (!url) return null;
  if (typeof logoVideo === 'object' && logoVideo !== null && 'mime_type' in logoVideo) {
    const m = (logoVideo as ACFMediaFile).mime_type;
    if (typeof m === 'string' && m.startsWith('video/')) return { url, type: m };
  }
  return { url, type: videoSourceTypeFromUrl(url) };
}

/**
 * Intro full-screen video: ACF `logo_video` on Global Settings, or `INTRO_VIDEO_URL` (full URL, or path like `/intro.mp4` with `public/intro.mp4`).
 */
export function resolveIntroVideo(logoVideo: unknown): { url: string; type: string } | null {
  const fromAcf = resolveLogoVideoField(logoVideo);
  if (fromAcf) return fromAcf;
  const fromEnv = process.env.INTRO_VIDEO_URL?.trim();
  if (fromEnv) {
    return { url: fromEnv, type: videoSourceTypeFromUrl(fromEnv) };
  }
  return null;
}

// Fetch Global Settings page (logo video, images, etc.)
export async function getGlobalSettings(): Promise<WPGlobalSettings> {
  const url = `${WP_API_URL}/pages?slug=global-settings&acf_format=standard`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) throw new Error(`Failed to fetch global settings: ${res.status}`);

  const pages = await res.json();
  if (!pages.length) throw new Error('Global Settings page not found');

  const page = pages[0] as WPPage;
  return page.acf as unknown as WPGlobalSettings;
}


/** A media item belonging to a service gallery, grouped by project. */
export interface ServicePhoto {
  id: number;
  url: string;
  alt: string;
  project: string;
}

/**
 * Fetch all Media Library items tagged with a service tag (e.g. `fotoproducto`)
 * and group them by project, parsed from the filename convention:
 * `<service>__<project-slug>__<nn>` (e.g. `fotoproducto__alitos-productos__01`).
 * Returns a map of project display name → photos, in upload order.
 */
export async function getServicePhotosByProject(
  serviceTag: string
): Promise<Record<string, ServicePhoto[]>> {
  const tagRes = await fetch(
    `${WP_API_URL}/media_tag?slug=${encodeURIComponent(serviceTag)}`,
    { cache: 'no-store' }
  );
  if (!tagRes.ok) return {};
  const tags = (await tagRes.json()) as { id: number }[];
  if (!tags.length) return {};

  const mediaRes = await fetch(
    `${WP_API_URL}/media?media_tag=${tags[0].id}&per_page=100&orderby=title&order=asc&_fields=id,slug,source_url,alt_text,title`,
    { cache: 'no-store' }
  );
  if (!mediaRes.ok) return {};
  const items = (await mediaRes.json()) as {
    id: number;
    slug: string;
    source_url: string;
    alt_text: string;
    title: { rendered: string };
  }[];

  const groups: Record<string, ServicePhoto[]> = {};
  for (const item of items) {
    const parts = item.slug.split('__');
    const project =
      parts.length >= 2 ? parts[1].replace(/-/g, ' ').toUpperCase() : 'OTROS';
    (groups[project] ??= []).push({
      id: item.id,
      url: item.source_url,
      alt: item.alt_text || project,
      project,
    });
  }
  return groups;
}

/** Fetch every Media Library item tagged with one photography service. */
export async function getServicePhotos(serviceTag: string): Promise<ServicePhoto[]> {
  const tagRes = await fetch(
    `${WP_API_URL}/media_tag?slug=${encodeURIComponent(serviceTag)}`,
    { cache: 'no-store' }
  );
  if (!tagRes.ok) return [];

  const tags = (await tagRes.json()) as { id: number }[];
  if (!tags.length) return [];

  const photos: ServicePhoto[] = [];
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages) {
    const mediaRes = await fetch(
      `${WP_API_URL}/media?media_tag=${tags[0].id}&per_page=100&page=${page}&orderby=date&order=asc&_fields=id,source_url,alt_text,title`,
      { cache: 'no-store' }
    );
    if (!mediaRes.ok) break;

    totalPages = Number(mediaRes.headers.get('X-WP-TotalPages') ?? '1');
    const items = (await mediaRes.json()) as {
      id: number;
      source_url: string;
      alt_text: string;
      title: { rendered: string };
    }[];
    photos.push(...items.map((item) => ({
      id: item.id,
      url: item.source_url,
      alt: item.alt_text || item.title.rendered || serviceTag,
      project: serviceTag,
    })));
    page += 1;
  }
  return photos;
}

/**
 * Representative photos for the Photography home grid (Instagram-style).
 * Pulls from all tagged gallery media: first one photo per project, then
 * fills remaining slots with further photos, capped at `limit`.
 */
export async function getPortfolioGridPhotos(limit = 12): Promise<ServicePhoto[]> {
  const tagRes = await fetch(`${WP_API_URL}/media_tag?per_page=100&_fields=id`, {
    cache: 'no-store',
  });
  if (!tagRes.ok) return [];
  const tagIds = ((await tagRes.json()) as { id: number }[]).map((t) => t.id);
  if (!tagIds.length) return [];

  const mediaRes = await fetch(
    `${WP_API_URL}/media?media_tag=${tagIds.join(',')}&per_page=100&orderby=title&order=asc&_fields=id,slug,source_url,alt_text`,
    { cache: 'no-store' }
  );
  if (!mediaRes.ok) return [];
  const items = (await mediaRes.json()) as {
    id: number;
    slug: string;
    source_url: string;
    alt_text: string;
  }[];

  const byProject: Record<string, ServicePhoto[]> = {};
  for (const item of items) {
    const parts = item.slug.split('__');
    const project = parts.length >= 2 ? parts[1] : 'otros';
    (byProject[project] ??= []).push({
      id: item.id,
      url: item.source_url,
      alt: item.alt_text || project,
      project,
    });
  }

  // One per project first, then round-robin the rest.
  const groups = Object.values(byProject);
  const picked: ServicePhoto[] = [];
  for (let round = 0; picked.length < limit; round++) {
    let added = false;
    for (const group of groups) {
      if (group[round]) {
        picked.push(group[round]);
        added = true;
        if (picked.length >= limit) break;
      }
    }
    if (!added) break;
  }
  return picked;
}
