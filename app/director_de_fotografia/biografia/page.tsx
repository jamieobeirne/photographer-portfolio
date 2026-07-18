import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getGlobalSettings } from '@/lib/wordpress';

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
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>

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
