import Link from 'next/link';

const reels = [
  {
    id: 1,
    title: 'REEL FICCIÓN',
    year: '2023 / 24',
    duration: '2:05',
    description: 'Cortometrajes y proyectos de ficción',
  },
  {
    id: 2,
    title: 'REEL VIDEOCLIPS',
    year: '2023 / 24',
    duration: '1:55',
    description: 'Dirección de videoclips musicales',
  },
  {
    id: 3,
    title: 'REEL PUBLICIDAD',
    year: '2022 / 23',
    duration: '1:38',
    description: 'Spots y campañas publicitarias',
  },
  {
    id: 4,
    title: 'PROYECTOS PERSONALES',
    year: '2021 / 22',
    duration: '3:12',
    description: 'Proyectos de autor y experimentación visual',
  },
];

export default function DirectorPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Fixed nav */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center gap-4 sm:gap-6">
        <Link href="/contacto" className="text-white/75 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300">
          CONTACTO
        </Link>
        <Link href="/home" className="text-white/75 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300">
          HOME
        </Link>
      </div>

      {/* Page title */}
      <section className="px-6 sm:px-12 py-20 sm:py-28 text-center">
        <p className="text-white/30 text-[0.58rem] tracking-[0.55em] mb-5">PORTFOLIO</p>
        <h1 className="text-white text-[clamp(1.3rem,3.2vw,2.2rem)] font-light tracking-[0.22em]">
          DIRECTOR
        </h1>
        <div className="w-8 h-px bg-white/15 mx-auto mt-8" />
      </section>

      {/* Reels grid */}
      <section className="px-6 sm:px-12 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {reels.map((reel) => (
            <article key={reel.id} className="group cursor-pointer">
              <div className="relative aspect-video bg-white/[0.03] border border-white/10 flex items-center justify-center mb-5 overflow-hidden group-hover:border-white/20 transition-colors duration-500">
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, white 3px, white 4px)' }}
                />
                <span className="absolute top-3 right-3 text-white/30 text-[0.5rem] font-light tracking-[0.2em]">
                  {reel.duration}
                </span>
                <div className="relative flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/45 group-hover:scale-105 transition-all duration-500">
                    <svg className="w-5 h-5 text-white/35 group-hover:text-white/65 transition-colors duration-500 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/18 text-[0.48rem] font-light tracking-[0.45em] group-hover:text-white/30 transition-colors duration-500">
                    {reel.year}
                  </p>
                </div>
              </div>
              <p className="text-white text-[0.66rem] font-light tracking-[0.26em] mb-2">{reel.title}</p>
              <p className="text-white/38 text-[0.58rem] font-light tracking-[0.14em]">{reel.description}</p>
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
              Director con más de 10 años de experiencia en ficción, videoclips y
              publicidad. Su mirada estética y narrativa atraviesa proyectos de
              distinta escala.
            </p>
          </div>
          <Link
            href="/director/biografia"
            className="text-white/40 text-[0.56rem] font-light tracking-[0.3em] border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300 whitespace-nowrap self-start sm:self-auto"
          >
            BIOGRAFÍA
          </Link>
        </div>
      </section>

    </main>
  );
}
