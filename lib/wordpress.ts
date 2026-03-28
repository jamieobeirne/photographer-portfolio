const WP_API_URL = 'https://nahuelbeade.com/wp-json/wp/v2';

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