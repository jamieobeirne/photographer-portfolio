import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings, getPortfolioGridPhotos } from '@/lib/wordpress';
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
  const bioImageUrl: string | null = null;
  let gridPhotos: ServicePhoto[] = [];
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_fotographia?.url ?? null;
    logoUrl = settings.logo_fotographia_esp?.url ?? null;
    gridPhotos = await getPortfolioGridPhotos(12);
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      {/* Instagram-style photo grid */}
      <section className="mt-8 sm:mt-16 mb-8 sm:mb-16">
        <div className="w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Representative photos pulled from the tagged WP galleries (one per project first) */}
          {gridPhotos.length > 0
            ? gridPhotos.map((photo, index) => (
                <article
                  key={photo.id}
                  className="group relative aspect-[4/3] overflow-hidden border border-white/5 bg-white/[0.03]"
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    priority={index < 2}
                    sizes="(min-width: 1024px) 44vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </article>
              ))
            : photos.map((photo) => (
                <article
                  key={photo.id}
                  aria-label={photo.title}
                  className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-white/5 bg-white/[0.03]"
                >
                  <span className="text-[0.52rem] font-light tracking-[0.35em] text-white/25">
                    IMÁGENES PENDIENTES
                  </span>
                </article>
              ))}
        </div>
      </section>

      {/* Bio teaser */}
      <section className="hidden" aria-hidden="true">
        {bioImageUrl && (
          <div className="order-2 w-full sm:w-[45%] aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bioImageUrl}
              alt="Nahuel Beade"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="order-1 flex-1 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">
          <p className="text-white/45 section-title mb-6">ACERCA DE</p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <Link
            href="/fotografo/biografia"
            className="text-white/40 text-[0.56rem] font-light border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300 self-start"
          >
            BIOGRAFÍA
          </Link>
        </div>
      </section>

      <Footer imageUrl={heroUrl} />

    </main>
  );
}
