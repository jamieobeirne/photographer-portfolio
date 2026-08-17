import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings, getPortfolioFeedPhotos } from '@/lib/wordpress';
import type { ServicePhoto } from '@/lib/wordpress';

export const revalidate = 3600;

const photos = [
  { id: 1,  title: 'RETRATOS' },
  { id: 2,  title: 'EDITORIAL' },
  { id: 3,  title: 'PAISAJE' },
  { id: 4,  title: 'PROYECTO PERSONAL' },
  { id: 5,  title: 'NATURALEZA' },
  { id: 6,  title: 'ARQUITECTURA' },
  { id: 7,  title: 'MODA' },
  { id: 8,  title: 'DOCUMENTAL' },
  { id: 9,  title: 'ABSTRACTO' },
  { id: 10, title: 'URBANO' },
  { id: 11, title: 'FAMILIA' },
  { id: 12, title: 'EVENTOS' },
];

/**
 * Tile sizes for the mosaic, applied by position rather than by photo, so the
 * layout is stable no matter which photos WordPress returns.
 *
 * The period is 11, chosen to be coprime with the 2, 3 and 4 column counts. A
 * period of 12 would divide evenly into both the 3- and 4-column layouts, so
 * the oversized tiles would stack into the same columns and read as a pattern.
 * At 11 the rhythm never lines up with the grid at any breakpoint.
 *
 * Four of eleven tiles are oversized. Much beyond that and there is no regular
 * baseline left for the big tiles to be irregular against.
 */
const TILE_PATTERN = [
  'tile-big',
  '',
  'tile-tall',
  '',
  '',
  'tile-wide',
  '',
  'tile-tall',
  '',
  '',
  '',
];

const tileClass = (index: number) => TILE_PATTERN[index % TILE_PATTERN.length];

export default async function FotografoPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let gridPhotos: ServicePhoto[] = [];
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_fotographia?.url ?? null;
    logoUrl = settings.logo_fotographia_esp?.url ?? null;
    gridPhotos = await getPortfolioFeedPhotos(3);
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      {/* 21 July #11/#22 — Instagram-style mosaic, ~3 photos per production,
          interleaved across productions. 17 Aug — tiles now vary in size as
          well as height; see TILE_PATTERN above and .photo-mosaic in globals. */}
      <section className="mt-8 sm:mt-16 mb-8 sm:mb-16">
        <div className="page-container photo-mosaic">
          {gridPhotos.length > 0
            ? gridPhotos.map((photo, index) => (
                <article
                  key={photo.id}
                  className={`group relative overflow-hidden bg-white/[0.03] ${tileClass(index)}`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    priority={index < 4}
                    sizes="(min-width: 1280px) 50vw, (min-width: 640px) 67vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </article>
              ))
            : photos.map((photo, index) => (
                <article
                  key={photo.id}
                  aria-label={photo.title}
                  className={`group relative flex items-center justify-center overflow-hidden bg-white/[0.03] ${tileClass(index)}`}
                >
                  <span className="text-[0.52rem] font-light tracking-[0.35em] text-white/25">
                    IMÁGENES PENDIENTES
                  </span>
                </article>
              ))}
        </div>
      </section>

      <Footer imageUrl={heroUrl} />

    </main>
  );
}
