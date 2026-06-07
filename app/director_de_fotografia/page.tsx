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
    heroUrl = settings.cinematographer_fondo?.url ?? null;
    logoUrl = settings.cinematographer_logo?.url ?? null;
    fotoUrl = settings.cinematographer_nahuel?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} />

      {/* Reels */}
      <section className="py-16 sm:py-20">
        <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-10 px-6 sm:px-12">REELS</p>
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
                <span className="absolute top-3 right-3 text-white/30 text-[0.5rem] font-light tracking-[0.2em]">
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
                  <p className="text-white/20 text-[0.48rem] font-light tracking-[0.45em] group-hover:text-white/35 transition-colors duration-500">
                    {reel.year}
                  </p>
                </div>
              </div>
              <p className="text-white text-[0.66rem] font-light tracking-[0.26em] mb-2 px-1">
                {reel.title}
              </p>
              <p className="text-white/40 text-[0.58rem] font-light tracking-[0.1em] leading-relaxed px-1">
                {reel.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Biography */}
      <section className="border-t border-white/10 py-16">
        <p className="text-white/30 text-[0.52rem] tracking-[0.45em] mb-10 px-6 sm:px-12">BIOGRAFÍA</p>
        <div className="grid grid-cols-1 sm:grid-cols-2">

            {/* Photo */}
            <div className="aspect-[3/4] sm:aspect-auto sm:min-h-[520px] bg-white/[0.04] border border-white/10 overflow-hidden">
              {fotoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={fotoUrl} alt="Nahuel Beade" className="w-full h-full object-cover" style={{ transform: 'scaleX(-1)' }} />
              )}
            </div>

            {/* Bio text */}
            <div className="flex flex-col px-8 sm:px-14 py-12 sm:py-16">
              <div>
                <p className="text-white/30 text-[0.5rem] tracking-[0.5em] mb-8">BIOGRAFÍA</p>
                <h2 className="text-white text-[clamp(2rem,3.5vw,3rem)] font-light tracking-[0.15em] leading-tight mb-2">
                  NAHUEL BEADE
                </h2>
                <p className="text-orange-400/80 text-[0.62rem] tracking-[0.45em] mb-10">CINEMATÓGRAFO</p>
                <div className="w-10 h-px bg-white/20 mb-10" />
                <div className="space-y-6">
                  <p className="text-white/70 text-[clamp(0.88rem,1.3vw,1rem)] font-light leading-[1.85]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <p className="text-white/45 text-[clamp(0.82rem,1.2vw,0.93rem)] font-light leading-[1.85]">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                  </p>
                  <p className="text-white/45 text-[clamp(0.82rem,1.2vw,0.93rem)] font-light leading-[1.85]">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto.
                  </p>
                </div>
              </div>
              <Link
                href="#"
                className="mt-8 text-white/40 text-[0.54rem] font-light tracking-[0.35em] border border-white/15 px-8 py-3.5 hover:text-white hover:border-white/45 transition-all duration-300 whitespace-nowrap self-start"
              >
                DESCARGAR CV
              </Link>
            </div>

        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
