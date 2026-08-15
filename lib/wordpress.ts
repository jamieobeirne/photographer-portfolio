import type { ACFMediaFile, WPGlobalSettings, WPPage } from '@/types/wordpress';
import { videoSourceTypeFromUrl } from '@/lib/video';
import { servicePhotoProjects } from '@/lib/service-photo-projects';

const WP_API_URL = 'https://lightcyan-deer-205982.hostingersite.com/wp-json/wp/v2';
const CONTENT_REVALIDATE_SECONDS = 60 * 60;
const cachedContent = { next: { revalidate: CONTENT_REVALIDATE_SECONDS } };

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
  const res = await fetch(url, cachedContent);

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
  projectOrder: number;
}

export interface PortfolioReel {
  label: string;
  url: string;
  poster: string;
}

/** Fetch the three WordPress-hosted reels displayed on the Director de Fotografía homepage. */
export async function getDirectorPhotographyReels(): Promise<PortfolioReel[]> {
  // 21 July #8 — display order is CINE > PUBLICIDAD > CAMARÓGRAFO LIVE.
  // This array order is what reaches the page, so it is the order.
  const reels = [
    { label: 'REEL DF · CINE', slug: 'reel-df-cine-final-02-alta', posterSlug: 'poster-reel-df-cine-final-02-alta' },
    { label: 'REEL DF · PUBLICIDAD', slug: 'reel-df-publicidad-final-02-alta', posterSlug: 'poster-reel-df-publicidad-final-02-alta' },
    { label: 'REEL CAMAROGRAFO · LIVE', slug: 'reel-camarografo-live-02-fhd', posterSlug: 'poster-reel-camarografo-live-02-fhd' },
  ];

  const resolved = await Promise.all(reels.map(async (reel) => {
    const [videoResponse, posterResponse] = await Promise.all([
      fetch(
      `${WP_API_URL}/media?slug=${encodeURIComponent(reel.slug)}&_fields=source_url`,
      cachedContent
      ),
      fetch(
        `${WP_API_URL}/media?slug=${encodeURIComponent(reel.posterSlug)}&_fields=source_url`,
        cachedContent
      ),
    ]);
    if (!videoResponse.ok || !posterResponse.ok) return null;
    const media = (await videoResponse.json()) as { source_url?: string }[];
    const posters = (await posterResponse.json()) as { source_url?: string }[];
    return media[0]?.source_url && posters[0]?.source_url
      ? { label: reel.label, url: media[0].source_url, poster: posters[0].source_url }
      : null;
  }));
  return resolved.filter((reel): reel is PortfolioReel => reel !== null);
}

/**
 * Fetch all Media Library items tagged with a service tag (e.g. `fotoproducto`)
 * and group them by project, parsed from the filename convention:
 * `<service>__<project-slug>__<nn>` (e.g. `fotoproducto__alitos-productos__01`).
 * Returns a map of project display name → photos, in upload order.
 */
function projectForMedia(serviceTag: string, mediaSlug: string) {
  const prefix = `${serviceTag}:`;
  const match = Object.entries(servicePhotoProjects).find(
    ([key]) => key.startsWith(prefix) && mediaSlug.includes(key.slice(prefix.length))
  );
  return match?.[1] ?? { project: serviceTag, order: Number.MAX_SAFE_INTEGER };
}

export async function getServicePhotosByProject(
  serviceTag: string
): Promise<Record<string, ServicePhoto[]>> {
  const groups: Record<string, ServicePhoto[]> = {};
  for (const photo of await getServicePhotos(serviceTag)) {
    (groups[photo.project] ??= []).push(photo);
  }
  return groups;
}

/** Fetch every Media Library item tagged with one photography service. */
export async function getServicePhotos(serviceTag: string): Promise<ServicePhoto[]> {
  const tagRes = await fetch(
    `${WP_API_URL}/media_tag?slug=${encodeURIComponent(serviceTag)}`,
    cachedContent
  );
  if (!tagRes.ok) return [];

  const tags = (await tagRes.json()) as { id: number }[];
  if (!tags.length) return [];

  const photos: ServicePhoto[] = [];
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages) {
    const mediaRes = await fetch(
      `${WP_API_URL}/media?media_tag=${tags[0].id}&per_page=100&page=${page}&orderby=date&order=asc&_fields=id,slug,source_url,alt_text,title`,
      cachedContent
    );
    if (!mediaRes.ok) break;

    totalPages = Number(mediaRes.headers.get('X-WP-TotalPages') ?? '1');
    const items = (await mediaRes.json()) as {
      id: number;
      slug: string;
      source_url: string;
      alt_text: string;
      title: { rendered: string };
    }[];
    photos.push(...items.map((item) => {
      const project = projectForMedia(serviceTag, item.slug);
      return {
        id: item.id,
        url: item.source_url,
        alt: item.alt_text || item.title.rendered || project.project,
        project: project.project,
        projectOrder: project.order,
      };
    }));
    page += 1;
  }
  return photos;
}

/**
 * Representative photos for the Photography home grid (Instagram-style).
 * Fetches only a small, even sample from each gallery instead of reading the
 * entire media library just to render the home-page preview.
 */
export async function getPortfolioGridPhotos(limit = 12): Promise<ServicePhoto[]> {
  const serviceTags = ['fotoproducto', 'publicidad', 'foto-reportajes', 'institucionales', 'arquitectura', 'paisajismo-y-cultura'];
  const perService = Math.ceil(limit / serviceTags.length);
  const samples = await Promise.all(serviceTags.map(async (serviceTag) => {
    const tagRes = await fetch(
      `${WP_API_URL}/media_tag?slug=${encodeURIComponent(serviceTag)}`,
      cachedContent
    );
    if (!tagRes.ok) return [];

    const tags = (await tagRes.json()) as { id: number }[];
    if (!tags.length) return [];

    const mediaRes = await fetch(
      `${WP_API_URL}/media?media_tag=${tags[0].id}&per_page=${perService}&orderby=date&order=asc&_fields=id,slug,source_url,alt_text,title`,
      cachedContent
    );
    if (!mediaRes.ok) return [];

    const items = (await mediaRes.json()) as {
      id: number;
      slug: string;
      source_url: string;
      alt_text: string;
      title: { rendered: string };
    }[];
    return items.map((item) => {
      const project = projectForMedia(serviceTag, item.slug);
      return {
        id: item.id,
        url: item.source_url,
        alt: item.alt_text || item.title.rendered || project.project,
        project: project.project,
        projectOrder: project.order,
      };
    });
  }));

  return samples.flat().slice(0, limit);
}
