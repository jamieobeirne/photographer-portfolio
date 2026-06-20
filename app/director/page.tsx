import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function DirectorPage() {
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    logoUrl = settings.main_logo?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero logoUrl={logoUrl} nav={<DirectorNavLinks />} />

      {/* Reels â€” placeholder */}
      <section className="py-16 sm:py-20 px-6 sm:px-12">
        <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-10">REELS</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="relative aspect-video bg-white/[0.03] border border-white/10"
            />
          ))}
        </div>
      </section>

      {/* Bio â€” placeholder */}
      <section className="border-t border-white/10 py-16">
        <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-10 px-6 sm:px-12">BIOGRAFÍA</p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="aspect-[3/4] sm:aspect-auto sm:min-h-[520px] bg-white/[0.04] border border-white/10" />
          <div className="bg-white/[0.02] border border-white/10 sm:min-h-[520px]" />
        </div>
      </section>

      <Footer logoUrl="/blackLogo.png" />

    </main>
  );
}
