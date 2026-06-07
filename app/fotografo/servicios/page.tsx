import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

const servicios = [
  { id: 1, title: 'FOTOPRODUCTO',          href: '/fotografo/servicios/fotoproducto' },
  { id: 2, title: 'PUBLICIDAD',             href: '/fotografo/servicios/publicidad' },
  { id: 3, title: 'FOTO REPORTAJES',        href: '/fotografo/servicios/foto-reportajes' },
  { id: 4, title: 'INSTITUCIONALES',        href: '/fotografo/servicios/institucionales' },
  { id: 5, title: 'ARQUITECTURA',           href: '/fotografo/servicios/arquitectura' },
  { id: 6, title: 'PAISAJISMO Y CULTURA',   href: '/fotografo/servicios/paisajismo-y-cultura' },
];

export default async function ServiciosFotografoPage() {
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
        <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-10">SERVICIOS DE FOTOGRAFÍA</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {servicios.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative aspect-video bg-white/[0.03] border border-white/10 flex items-end overflow-hidden hover:border-white/25 transition-colors duration-500"
            >
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, white 3px, white 4px)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="relative z-10 px-5 pb-5 text-white text-[0.66rem] font-light tracking-[0.26em] group-hover:tracking-[0.32em] transition-all duration-500">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
