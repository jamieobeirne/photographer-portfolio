import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function DirectorPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let videoUrl: string | null = null;
  let bioFotoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    // Spec 4.4: new FOTO FONDO MENÚ image, falling back to previous fondo_direccion
    heroUrl = settings.fondo_menu_director?.url ?? settings.fondo_direccion?.url ?? null;
    logoUrl = settings.logo_direccion?.url ?? null;
    videoUrl = settings.director_video?.url ?? null;
    bioFotoUrl = settings.director_bio_foto?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<DirectorNavLinks />} />

      {videoUrl && (
        <section className="mt-8 sm:mt-16 mb-8 sm:mb-16">
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-[90vw] mx-auto aspect-video block"
          />
        </section>
      )}

      {/* Bio — text left, photo right (spec 4.3: Nahuel looks left in the photo) */}
      <section className="border-t border-white/10 flex flex-col sm:flex-row mb-8 sm:mb-16 w-[90vw] mx-auto">
        {bioFotoUrl && (
          <div className="order-2 w-full sm:w-[45%] aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bioFotoUrl}
              alt="Nahuel Beade"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="order-1 flex-1 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">
          <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-6">ACERCA DE</p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed">
            Nahuel Beade es director audiovisual con base en Barcelona, con
            formación en cine y una sólida trayectoria en proyectos de ficción,
            documental y contenido comercial.
          </p>
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
