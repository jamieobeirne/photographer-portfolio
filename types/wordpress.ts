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

  /** ACF File field (return as File Array) — has at least `url` */
  export interface ACFMediaFile {
    id?: number;
    ID?: number;
    url: string;
    mime_type?: string;
    title?: string;
    filename?: string;
  }

  /**
   * Global Settings page (ACF), slug `global-settings`.
   * Add `logo_video` in ACF: type File, return **File** or **URL**; Show in REST API: on.
   */
  export interface WPGlobalSettings {
    logo_image?: WPImage | null;
    initial_logo?: WPImage | null;
    bio_image?: WPImage | null;
    logo_video?: ACFMediaFile | string | null | false;
    cinematographer_fondo?: WPImage | null;
    cinematographer_logo?: WPImage | null;
    cinematographer_nahuel?: WPImage | null;
    op_de_camara_fondo?: WPImage | null;
    foquista_fondo?: WPImage | null;
  }

  export interface GalleryImage {
    id: number;
    url: string;
    alt: string;
    caption: string;
  }