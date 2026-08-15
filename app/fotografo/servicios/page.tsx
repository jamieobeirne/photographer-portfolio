import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

const servicios = [
  { id: 1, title: 'FOTOPRODUCTO', href: '/fotografo/servicios/fotoproducto', imageUrl: 'https://drive.google.com/thumbnail?id=1inJy9hd0kxbzMFriJrLhkQ19YX-BV1-Y&sz=w1200' },
  { id: 2, title: 'PUBLICIDAD', href: '/fotografo/servicios/publicidad', imageUrl: 'https://drive.google.com/thumbnail?id=1zutDXIqC6ldBBL452OLXNxPTgfg8uwko&sz=w1200' },
  { id: 3, title: 'FOTO REPORTAJES', href: '/fotografo/servicios/foto-reportajes', imageUrl: 'https://drive.google.com/thumbnail?id=13X-PchUYbS6KN6Pgrb9l4BHBic5lfR79&sz=w1200' },
  { id: 4, title: 'INSTITUCIONALES', href: '/fotografo/servicios/institucionales', imageUrl: 'https://drive.google.com/thumbnail?id=170MAx3aq0vh3QIF7emb9489fH1UWpEBO&sz=w1200' },
  { id: 5, title: 'ARQUITECTURA', href: '/fotografo/servicios/arquitectura', imageUrl: 'https://drive.google.com/thumbnail?id=1JtbbKcloB2PwKMSvkA7oRcoWbrFRQpEZ&sz=w1200' },
  { id: 6, title: 'PAISAJISMO Y CULTURA', href: '/fotografo/servicios/paisajismo-y-cultura', imageUrl: 'https://drive.google.com/thumbnail?id=10QwQzheMejvz0vwV5MN-k7308EK8vlj3&sz=w1200' },
];

export default async function ServiciosFotografoPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_fotographia?.url ?? null;
    logoUrl = settings.logo_fotographia_esp?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      <section className="w-[90vw] mx-auto py-16 sm:py-20">
        <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-10">SERVICIOS DE FOTOGRAFÍA</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {servicios.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative aspect-video bg-white/[0.03] border border-white/10 flex items-end overflow-hidden hover:border-white/25 transition-colors duration-500"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, white 3px, white 4px)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="relative z-10 px-5 pb-5 text-white text-[0.66rem] font-light group-hover:tracking-[0.22em] transition-all duration-500">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer imageUrl={heroUrl} />

    </main>
  );
}
