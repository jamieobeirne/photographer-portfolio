import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function BiografiaFotografoPage() {
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

      {/* Bio content */}
      <section className="px-6 sm:px-12 py-16 sm:py-20 max-w-3xl mx-auto">
        <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-10">BIO / ACERCA DE MÍ</p>

        <h1 className="text-white text-[clamp(1.3rem,3.2vw,2.2rem)] font-light tracking-[0.22em] mb-2">
          NAHUEL BEADE
        </h1>
        <p className="text-orange-400/80 text-[0.62rem] tracking-[0.45em] mb-10">FOTÓGRAFO</p>
        <div className="w-10 h-px bg-white/20 mb-10" />

        <div className="space-y-6">
          <p className="text-white/70 text-[clamp(0.88rem,1.3vw,1rem)] font-light leading-[1.85]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-white/45 text-[clamp(0.82rem,1.2vw,0.93rem)] font-light leading-[1.85]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
          <p className="text-white/45 text-[clamp(0.82rem,1.2vw,0.93rem)] font-light leading-[1.85]">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>

        <div className="flex items-center gap-6 mt-10">
          <Link
            href="/fotografo"
            className="text-white/40 text-[0.54rem] font-light tracking-[0.35em] hover:text-white transition-colors duration-300"
          >
            ← VOLVER
          </Link>
          <Link
            href="/contacto"
            className="text-white/40 text-[0.54rem] font-light tracking-[0.35em] border border-white/15 px-8 py-3.5 hover:text-white hover:border-white/45 transition-all duration-300"
          >
            CONTACTO
          </Link>
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
