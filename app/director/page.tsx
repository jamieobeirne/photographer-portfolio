import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings, resolveLogoVideoField } from '@/lib/wordpress';
import { directorBio } from '@/lib/bios';

export const revalidate = 3600;

export default async function DirectorPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let video: { url: string; type: string } | null = null;
  let bioFotoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    // Spec 4.4: new FOTO FONDO MENÚ image, falling back to previous fondo_direccion
    heroUrl = settings.fondo_menu_director?.url ?? settings.fondo_direccion?.url ?? null;
    logoUrl = settings.logo_direccion?.url ?? null;
    video = resolveLogoVideoField(settings.director_video);
    bioFotoUrl = settings.director_bio_foto?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<DirectorNavLinks />} />

      {video && (
        <section className="mt-8 sm:mt-16 mb-8 sm:mb-16">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full aspect-video block"
          >
            <source src={video.url} type={video.type} />
          </video>
        </section>
      )}

      {/* Bio — photo left, text right (17 Aug, Jamie). NOTE: spec 4.3 recorded
          that Nahuel looks LEFT in this shot, which is why it previously sat on
          the right. If he ends up looking away from the copy, the choice is to
          move it back rather than add scaleX(-1) — mirroring is what made the
          Dir. de Fotografía photo look wrong. */}
      <section className="border-t border-white/10 flex flex-col lg:flex-row mb-8 sm:mb-16 page-container">
        {bioFotoUrl && (
          <div className="order-1 relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden shrink-0">
            <Image
              src={bioFotoUrl}
              alt="Nahuel Beade"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="order-2 w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20 space-y-6">
          <p className="text-white/45 section-title">ACERCA DE</p>
          {directorBio.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-white/65 bio-teaser-text font-light leading-relaxed normal-case">{paragraph}</p>
          ))}
        </div>
      </section>

      <Footer imageUrl={heroUrl} />

    </main>
  );
}
