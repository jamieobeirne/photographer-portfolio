import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function FotoReportajesPage() {
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

      <section className="px-6 sm:px-12 py-16 sm:py-20 max-w-6xl mx-auto">
        <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-10">FOTO REPORTAJES</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} className="aspect-video bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-500" />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 sm:px-12 py-12">
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          <Link href="/fotografo/servicios" className="text-white/40 text-[0.54rem] font-light tracking-[0.35em] hover:text-white transition-colors duration-300">
            ← SERVICIOS
          </Link>
          <Link href="/contacto" className="text-white/40 text-[0.54rem] font-light tracking-[0.35em] border border-white/15 px-8 py-3.5 hover:text-white hover:border-white/45 transition-all duration-300">
            CONTACTO
          </Link>
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
