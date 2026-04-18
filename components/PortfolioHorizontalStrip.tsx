import type { GalleryImage } from '@/types/wordpress';

const stripScrollStyle = {
  scrollbarWidth: 'thin' as const,
  scrollbarColor: '#ffffff33 transparent',
  WebkitOverflowScrolling: 'touch' as const,
};

/** Fixed bottom horizontal strip — use only from 700px up (hide on small screens via parent). */
export function PortfolioHorizontalStrip({ images }: { images: GalleryImage[] }) {
  return (
    <div className="fixed bottom-16 sm:bottom-20 left-0 right-0 z-10">
      <div
        className="flex gap-2 sm:gap-3 px-3 sm:px-6 overflow-x-auto"
        style={stripScrollStyle}
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.alt}
            className="strip-img flex-shrink-0 object-cover"
          />
        ))}
      </div>
    </div>
  );
}
