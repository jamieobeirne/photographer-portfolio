import type { GalleryImage, WPGlobalSettings, WPPage } from '@/types/wordpress';


const WP_API_URL = 'https://lightcyan-deer-205982.hostingersite.com/wp-json/wp/v2';



// Fetch all video entries by portfolio type
export async function getVideosByType(type: 'cinematographer' | 'photographer' | 'director') {
  const res = await fetch(
    `${WP_API_URL}/video_entry?acf_format=standard&per_page=100`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error(`Failed to fetch videos: ${res.status}`);

  const posts = await res.json();

  // Filter by portfolio type using ACF field
  return posts.filter((post: any) => post.acf?.portfolio_type === type);
}

// Fetch a single video entry by ID
export async function getVideoById(id: number) {
  const res = await fetch(
    `${WP_API_URL}/video_entry/${id}?acf_format=standard`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error(`Failed to fetch video: ${res.status}`);

  return res.json();
}

// Extract YouTube video ID from a URL
export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  return match ? match[1] : null;
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
}

// Fetch Global Settings page (logo, bio image)
export async function getGlobalSettings(): Promise<WPGlobalSettings> {

  const url = `${WP_API_URL}/pages?slug=global-settings&acf_format=standard`;
  const res = await fetch(url, { cache: 'no-store' });


  if (!res.ok) throw new Error(`Failed to fetch global settings: ${res.status}`);

  const pages = await res.json();
  if (!pages.length) throw new Error('Global Settings page not found');

  const page = pages[0] as WPPage;
  return page.acf as unknown as WPGlobalSettings;
}

export async function getGalleryImages(tagId: number): Promise<GalleryImage[]> {
  const res = await fetch(
    `https://lightcyan-deer-205982.hostingersite.com/wp-json/wp/v2/media?media_tag=${tagId}&per_page=100`
  );
  const images = await res.json();
  return images.map((img: any) => ({
    id: img.id,
    url: img.source_url,
    alt: img.alt_text || '',
    caption: img.caption?.rendered || '',
  }));
}