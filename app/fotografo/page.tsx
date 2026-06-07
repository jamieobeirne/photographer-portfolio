import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

const series = [
  {
    id: 1,
    title: 'RETRATOS',
    year: '2023 / 24',
    description: 'Retratos de luz natural y estudio',
  },
  {
    id: 2,
    title: 'EDITORIAL',
    year: '2023 / 24',
    description: 'Fotografía editorial para moda y publicaciones',
  },
  {
    id: 3,
    title: 'PAISAJE',
    year: '2022 / 23',
    description: 'Paisajes urbanos y naturales de Argentina',
  },
  {
    id: 4,
    title: 'PROYECTO PERSONAL',
    year: '2021 / 22',
    description: 'Series documentales y fotografía de autor',
  },
];

export default async function FotografoPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.foto_fondo?.url ?? null;
    logoUrl = settings.foto_logo?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      {/* Series grid */}
      <section className="px-6 sm:px-12 py-16 sm:py-20 max-w-6xl mx-auto">
        <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-10">PORTFOLIO</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {series.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              <div className="relative aspect-video bg-white/[0.03] border border-white/10 flex items-center justify-center mb-5 overflow-hidden group-hover:border-white/20 transition-colors duration-500">
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, white 3px, white 4px)' }}
                />
                <span className="absolute top-3 right-3 text-white/30 text-[0.5rem] font-light tracking-[0.2em]">
                  {item.year}
                </span>
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/45 group-hover:scale-105 transition-all duration-500">
                  <svg className="w-5 h-5 text-white/35 group-hover:text-white/65 transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
              </div>
              <p className="text-white text-[0.66rem] font-light tracking-[0.26em] mb-2">{item.title}</p>
              <p className="text-white/38 text-[0.58rem] font-light tracking-[0.14em]">{item.description}</p>
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
              Fotógrafo con más de 10 años de trayectoria en retrato, editorial y
              fotografía documental. Su trabajo explora la luz natural y la narrativa
              visual en proyectos de diversa escala.
            </p>
          </div>
          <Link
            href="/fotografo/biografia"
            className="text-white/40 text-[0.56rem] font-light tracking-[0.3em] border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300 whitespace-nowrap self-start sm:self-auto"
          >
            BIOGRAFÍA
          </Link>
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl={logoUrl} />

    </main>
  );
}
