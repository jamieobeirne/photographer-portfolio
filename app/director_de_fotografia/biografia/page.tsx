import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getGlobalSettings } from '@/lib/wordpress';
import { directorFotografiaBio } from '@/lib/bios';

const P = 'text-white/65 bio-text font-light leading-relaxed normal-case';

export default async function BiografiaDirectorDeFotografiaPage() {
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
  } catch {}

  return (
    <>
      <Header logoUrl={logoUrl} />

      <main className="min-h-screen bg-black text-white pt-16 sm:pt-20">

        {/* Page title */}
        <section className="px-6 sm:px-12 py-20 sm:py-28 text-center">
          <p className="text-white/30 text-[0.58rem] tracking-[0.4em] mb-5">DIRECTOR DE FOTOGRAFÍA</p>
          <h1 className="text-white text-[clamp(1.3rem,3.2vw,2.2rem)] font-light">
            NAHUEL BEADE
          </h1>
          <div className="w-8 h-px bg-white/15 mx-auto mt-8" />
        </section>

        {/* Bio content */}
        <section className="px-6 sm:px-12 pb-24 max-w-3xl mx-auto space-y-8">
          {directorFotografiaBio.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={P}>{paragraph}</p>
          ))}

          <div className="pt-4 flex items-center gap-6">
            <Link
              href="/director_de_fotografia"
              className="text-white/40 text-[0.56rem] font-light hover:text-white transition-colors duration-300"
            >
              ← VOLVER
            </Link>
            <Link
              href="/contacto"
              className="text-white/40 text-[0.56rem] font-light border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300"
            >
              CONTACTO
            </Link>
          </div>
        </section>

        <Footer />

      </main>
    </>
  );
}
