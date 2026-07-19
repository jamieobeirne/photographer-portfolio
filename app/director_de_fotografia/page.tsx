import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

const reels = [
  {
    id: 1,
    title: 'REEL CINE / TV / VIDEOCLIPS',
    year: '2023 / 24',
    duration: '01:50',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor',
  },
  {
    id: 2,
    title: 'REEL PUBLICIDAD',
    year: '2023 / 24',
    duration: '01:43',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor',
  },
];

export default async function DirectorDeFotografiaPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let fotoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_dir_fotographia?.url ?? null;
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
    fotoUrl = settings.cinematographer_nahuel?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} portraitTop />

      {/* Reels */}
      <section className="py-16 sm:py-20">
        <div className="w-[90vw] mx-auto">
        <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-10">REELS</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {reels.map((reel) => (
            <article key={reel.id} className="group cursor-pointer">
              <div className="relative aspect-video bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 overflow-hidden group-hover:border-white/20 transition-colors duration-500">
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 3px, white 3px, white 4px)',
                  }}
                />
                <span className="absolute top-3 right-3 text-white/30 text-[0.5rem] font-light">
                  {reel.duration}
                </span>
                <div className="relative flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/45 group-hover:scale-105 transition-all duration-500">
                    <svg
                      className="w-5 h-5 text-white/35 group-hover:text-white/65 transition-colors duration-500 ml-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/20 text-[0.48rem] font-light tracking-[0.4em] group-hover:text-white/35 transition-colors duration-500">
                    {reel.year}
                  </p>
                </div>
              </div>
              <p className="text-white text-[0.66rem] font-light mb-2 px-1">
                {reel.title}
              </p>
              <p className="text-white/40 text-[0.58rem] font-light leading-relaxed normal-case px-1">
                {reel.description}
              </p>
            </article>
          ))}
        </div>
        </div>
      </section>

      {/* Bio teaser */}
      <section className="border-t border-white/10 flex flex-col sm:flex-row mb-8 sm:mb-16 w-[90vw] mx-auto">
        {fotoUrl && (
          <div className="order-2 sm:order-1 w-full sm:w-[45%] aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotoUrl}
              alt="Nahuel Beade"
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        )}
        <div className="order-1 sm:order-2 flex-1 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">
          <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-6">ACERCA DE</p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case mb-8">
            Nahuel Beade es director de fotografía y operador de cámara con base en
            Barcelona, con formación en cine y una amplia experiencia en proyectos
            de ficción, documental y publicidad.
          </p>
          <Link
            href="/director_de_fotografia/biografia"
            className="text-white/40 text-[0.56rem] font-light border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300 self-start"
          >
            BIOGRAFÍA
          </Link>
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" portraitTop />

    </main>
  );
}
