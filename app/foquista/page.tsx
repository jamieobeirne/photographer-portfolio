import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

const carousels = [
  { id: 1, label: 'FICCIÓN / TV' },
  { id: 2, label: 'PUBLICIDAD' },
  { id: 3, label: 'VIDEOCLIPS' },
  { id: 4, label: 'PROYECTOS INDEPENDIENTES' },
];

export default async function FoquistaPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.foquista_fondo?.url ?? settings.cinematographer_fondo?.url ?? null;
    logoUrl = settings.main_logo?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} />

      <div className="py-16 sm:py-20 space-y-16">
        {carousels.map((carousel) => (
          <section key={carousel.id}>
            <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-6 px-6 sm:px-12">
              {carousel.label}
            </p>
            <div
              className="overflow-x-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-3 px-6 sm:px-12 pb-2">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="shrink-0 w-[70vw] sm:w-[45vw] lg:w-[30vw] aspect-video bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-500"
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
