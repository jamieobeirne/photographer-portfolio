export interface WPImage {
    id: number;
    url: string;
    alt: string;
    width: number;
    height: number;
  }
  
  export interface WPVideoEntry {
    id: number;
    title: string;
    description: string;
    youtube_url: string;
    portfolio_type: 'cinematographer' | 'photographer' | 'director';
    thumbnail?: WPImage;
  }
  
  export interface WPPage {
    id: number;
    slug: string;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    acf?: Record<string, unknown>;
  }
  
  export interface WPMediaItem {
    id: number;
    slug: string;
    source_url: string;
    alt_text: string;
    media_details: {
      width: number;
      height: number;
      sizes?: Record<string, {
        source_url: string;
        width: number;
        height: number;
      }>;
    };
  }