import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings, getServiceCoverPhotos } from '@/lib/wordpress';
import type { ServicePhoto } from '@/lib/wordpress';

export const revalidate = 3600;

/**
 * `tag` is the WordPress media_tag the card takes its cover photo from, and is
 * the same slug the gallery page itself queries. The cards previously carried
 * hardcoded drive.google.com thumbnail URLs, which Google blocks — see
 * getServiceCoverPhotos in lib/wordpress.ts.
 */
const servicios = [
  { id: 1, title: 'FOTOPRODUCTO', tag: 'fotoproducto', href: '/fotografo/servicios/fotoproducto' },
  { id: 2, title: 'PUBLICIDAD', tag: 'publicidad', href: '/fotografo/servicios/publicidad' },
  { id: 3, title: 'FOTO REPORTAJES', tag: 'foto-reportajes', href: '/fotografo/servicios/foto-reportajes' },
  { id: 4, title: 'INSTITUCIONALES', tag: 'institucionales', href: '/fotografo/servicios/institucionales' },
  { id: 5, title: 'ARQUITECTURA', tag: 'arquitectura', href: '/fotografo/servicios/arquitectura' },
  { id: 6, title: 'PAISAJISMO Y CULTURA', tag: 'paisajismo-y-cultura', href: '/fotografo/servicios/paisajismo-y-cultura' },
];

export default async function ServiciosFotografoPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let covers: Record<string, ServicePhoto | null> = {};
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_fotographia?.url ?? null;
    logoUrl = settings.logo_fotographia_esp?.url ?? null;
    covers = await getServiceCoverPhotos();
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      <section className="page-container py-16 sm:py-20">
        <p className="text-white/45 section-title mb-10">SERVICIOS DE FOTOGRAFÍA</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {servicios.map((item) => {
            const cover = covers[item.tag] ?? null;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative aspect-video bg-white/[0.03] border border-white/10 flex items-end overflow-hidden hover:border-white/25 transition-colors duration-500"
              >
                {cover ? (
                  <Image
                    src={cover.url}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  /* No cover yet, or WordPress unreachable — show the same
                     pending treatment the home mosaic uses rather than an
                     empty black card. */
                  <span className="absolute inset-0 flex items-center justify-center text-[0.52rem] font-light tracking-[0.35em] text-white/25">
                    IMÁGENES PENDIENTES
                  </span>
                )}
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, white 3px, white 4px)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="relative z-10 px-5 pb-5 text-white service-card-title font-light group-hover:tracking-[0.22em] transition-all duration-500">
                  {item.title}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer imageUrl={heroUrl} />

    </main>
  );
}
