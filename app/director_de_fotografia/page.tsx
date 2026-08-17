import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { getDirectorPhotographyReels, getGlobalSettings } from '@/lib/wordpress';
import { directorFotografiaBio } from '@/lib/bios';

export const revalidate = 3600;

export default async function DirectorDeFotografiaPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let fotoUrl: string | null = null;
  let reels: Awaited<ReturnType<typeof getDirectorPhotographyReels>> = [];
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_dir_fotographia?.url ?? null;
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
    fotoUrl = settings.cinematographer_nahuel?.url ?? null;
    reels = await getDirectorPhotographyReels();
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} portraitTop />

      {reels.length > 0 && (
        <section className="page-container py-12 sm:py-16">
          <p className="text-white/45 section-title mb-8">REELS</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {reels.map((reel) => (
              <figure key={reel.url} className="bg-white/[0.03] border border-white/10">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={reel.poster}
                  className="w-full h-auto block"
                  aria-label={reel.label}
                >
                  <source src={reel.url} type="video/mp4" />
                </video>
                <figcaption className="px-4 py-3 text-white/40 text-[0.5rem] tracking-[0.28em]">
                  {reel.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Bio teaser — 21 July #9. Photo sits RIGHT on desktop, matching the
          Director page: Nahuel looks left in the shot, so on the right he looks
          into the text. It was previously on the left and flipped with
          scaleX(-1) to compensate, which mirrored him. */}
      <section className="border-t border-white/10 flex flex-col lg:flex-row mb-8 sm:mb-16 page-container">
        {fotoUrl && (
          <div className="order-1 lg:order-2 relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden shrink-0">
            <Image
              src={fotoUrl}
              alt="Nahuel Beade"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="order-2 lg:order-1 w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">
          <p className="text-white/45 section-title mb-6">ACERCA DE</p>
          {directorFotografiaBio.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-white/65 bio-teaser-text font-light leading-relaxed normal-case mb-6">{paragraph}</p>
          ))}
          <p className="text-white/65 bio-teaser-text font-light leading-relaxed normal-case mb-8">
            Actualmente reside en Barcelona, donde continúa desarrollando su trabajo como
            director de fotografía y operador de cámara en proyectos publicitarios,
            documentales y de ficción.
          </p>
        </div>
      </section>

      <Footer imageUrl={heroUrl} portraitTop />

    </main>
  );
}
