import Link from 'next/link';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';
import { fotografoBio } from '@/lib/bios';

const P = 'text-white/65 bio-text font-light leading-relaxed normal-case text-left';

export default async function BiografiaFotografoPage() {
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
    <main className="relative min-h-screen bg-black pb-12 text-white sm:pb-24">
      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      <div className="hidden fixed right-4 top-4 z-20 items-center gap-4 sm:right-8 sm:top-6 sm:gap-6">
        <Link href="/contacto" className="text-[0.65rem] font-light text-white/75 transition-colors duration-300 hover:text-white sm:text-xs">
          CONTACTO
        </Link>
        <Link href="/home" className="text-[0.65rem] font-light text-white/75 transition-colors duration-300 hover:text-white sm:text-xs">
          HOME
        </Link>
      </div>

      <Link href="/fotografo" className="hidden fixed left-4 top-4 z-20 text-[0.65rem] font-light text-white/75 transition-colors duration-300 hover:text-white sm:left-8 sm:top-6 sm:text-xs">
        <span className="sm:hidden">←</span>
        <span className="hidden sm:inline">← FOTÓGRAFO</span>
      </Link>

      {/* 21 July #13 — text column widened and pushed to the left margin, photo
          enlarged to match its height. #19 — photo comes first in portrait. */}
      <div className="page-container flex w-full flex-col gap-10 pt-16 sm:pt-20 lg:flex-row lg:items-stretch lg:gap-14">
        {bioImageUrl && (
          <div className="order-1 w-full overflow-hidden lg:order-2 lg:w-[38%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bioImageUrl}
              alt="Nahuel Beade"
              className="aspect-[4/5] h-full w-full object-cover lg:aspect-auto lg:min-h-full"
            />
          </div>
        )}

        <div className="order-2 w-full space-y-7 text-left lg:order-1 lg:w-[62%]">
          <p className="section-title text-white/45">ACERCA DE</p>
          {fotografoBio.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={P}>{paragraph}</p>
          ))}
          <div className="hidden">
            <Link href="/contacto" className="border border-white/15 px-7 py-3 text-[0.56rem] font-light text-white/40 transition-all duration-300 hover:border-white/45 hover:text-white">CONTACTO</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
