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

      {/* 21 July #11/#22 — Instagram-style mosaic: many smaller photos at their
          own aspect ratios, ~3 per production, interleaved across productions. */}
      <section className="mt-8 sm:mt-16 mb-8 sm:mb-16">
        <div className="page-container photo-mosaic">
          {gridPhotos.length > 0
            ? gridPhotos.map((photo, index) => (
                <article key={photo.id} className="group relative overflow-hidden bg-white/[0.03]">
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    width={photo.width ?? 800}
                    height={photo.height ?? 600}
                    priority={index < 4}
                    sizes="(min-width: 1280px) 24vw, (min-width: 640px) 32vw, 49vw"
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </article>
              ))
            : photos.map((photo) => (
                <article
                  key={photo.id}
                  aria-label={photo.title}
                  className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-white/[0.03]"
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
