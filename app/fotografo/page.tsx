import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

const photos = [
  { id: 1,  title: 'RETRATOS' },
  { id: 2,  title: 'EDITORIAL' },
  { id: 3,  title: 'PAISAJE' },
  { id: 4,  title: 'PROYECTO PERSONAL' },
  { id: 5,  title: 'NATURALEZA' },
  { id: 6,  title: 'ARQUITECTURA' },
  { id: 7,  title: 'MODA' },
  { id: 8,  title: 'DOCUMENTAL' },
  { id: 9,  title: 'ABSTRACTO' },
  { id: 10, title: 'URBANO' },
  { id: 11, title: 'FAMILIA' },
  { id: 12, title: 'EVENTOS' },
];

export default async function FotografoPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let bioImageUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_fotographia?.url ?? null;
    logoUrl = settings.logo_fotographia_esp?.url ?? null;
    bioImageUrl = settings.fotopage_bio?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      {/* Instagram-style photo grid */}
      <section>
        <div className="grid grid-cols-3 gap-[3px]">
          {photos.map((photo) => (
            <article key={photo.id} className="group cursor-pointer relative aspect-square overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${photo.id * 37}/800/800`}
                alt={photo.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </article>
          ))}
        </div>
      </section>

      {/* Bio teaser */}
      <section className="border-t border-white/10 px-6 sm:px-12 py-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-10 sm:gap-16">
          <div className="flex-1">
            <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-4">ACERCA DE</p>
            <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed lowercase mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <Link
              href="/fotografo/biografia"
              className="text-white/40 text-[0.56rem] font-light border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300"
            >
              BIOGRAFÍA
            </Link>
          </div>
          {bioImageUrl && (
            <div className="w-[90vw] sm:w-[calc((100vw-6px)/3)] aspect-square shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bioImageUrl}
                alt="Nahuel Beade"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
