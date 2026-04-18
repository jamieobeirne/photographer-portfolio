import type { GalleryImage } from '@/types/wordpress';

export function PortfolioGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="portfolio-masonry">
      {images.map((img) => (
        <figure
          key={img.id}
          className="mb-[clamp(0.5rem,2vw,1rem)] break-inside-avoid"
        >
          <img
            src={img.url}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
          />
        </figure>
      ))}
    </div>
  );
}
