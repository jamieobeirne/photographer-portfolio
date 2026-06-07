import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

const reels = [
  {
    id: 1,
    title: 'REEL FICCIÓN',
    year: '2023 / 24',
    duration: '2:00',
    description: 'Foco en largometrajes y series',
  },
  {
    id: 2,
    title: 'REEL PUBLICIDAD',
    year: '2023 / 24',
    duration: '1:45',
    description: 'Primeros AC en campañas comerciales',
  },
  {
    id: 3,
    title: 'REEL VIDEOCLIPS',
    year: '2022 / 23',
    duration: '1:30',
    description: 'Trabajos como 1AC en videoclips',
  },
  {
    id: 4,
    title: 'PROYECTOS INDEPENDIENTES',
    year: '2021 / 22',
    duration: '2:20',
    description: 'Cortometrajes y proyectos independientes',
  },
];

export default async function FoquistaPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.foquista_fondo?.url ?? settings.cinematographer_fondo?.url ?? null;
    logoUrl = settings.cinematographer_logo?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

        <PageHero
          eyebrow="PORTFOLIO"
          title="FOQUISTA & 1AC"
          imageUrl={heroUrl}
          logoUrl={logoUrl}
        />

        {/* Reels grid */}
        <section className="px-6 sm:px-12 py-20 pb-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {reels.map((reel) => (
              <article key={reel.id} className="group cursor-pointer">
                <div className="relative aspect-video bg-white/[0.03] border border-white/10 flex items-center justify-center mb-5 overflow-hidden group-hover:border-white/20 transition-colors duration-500">
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
                    <p className="text-white/18 text-[0.48rem] font-light tracking-[0.45em] group-hover:text-white/30 transition-colors duration-500">
                      {reel.year}
                    </p>
                  </div>
                </div>
                <p className="text-white text-[0.66rem] font-light tracking-[0.26em] mb-2">
                  {reel.title}
                </p>
                <p className="text-white/38 text-[0.58rem] font-light tracking-[0.14em]">
                  {reel.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Bio teaser */}
        <section className="border-t border-white/10 px-6 sm:px-12 py-16">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-white/30 text-[0.52rem] tracking-[0.45em] mb-4">ACERCA DE</p>
              <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed">
                Foquista y primer asistente de cámara con experiencia en producciones
                de cine, televisión y publicidad. Precisión técnica y adaptación a
                equipos y formatos de toda escala.
              </p>
            </div>
            <Link
              href="/contacto"
              className="text-white/40 text-[0.56rem] font-light tracking-[0.3em] border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300 whitespace-nowrap self-start sm:self-auto"
            >
              CONTACTO
            </Link>
          </div>
        </section>

        <Footer imageUrl={heroUrl} logoUrl={logoUrl} />

    </main>
  );
}
