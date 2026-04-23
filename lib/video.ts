/**
 * MIME type for a single <source type="..."> from the file extension in the URL.
 * The browser uses it as a hint; it does not load multiple formats—only one URL is used.
 */
export function videoSourceTypeFromUrl(url: string): string {
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase();
  if (ext === 'webm') return 'video/webm';
  if (ext === 'ogv' || ext === 'ogg') return 'video/ogg';
  return 'video/mp4';
}
