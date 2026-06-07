import Link from 'next/link';
import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import { Footer } from '@/components/Footer';

export default function DocumentalRegistrosPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <header className="flex items-center justify-between px-6 sm:px-10 py-4">
        <Link href="/home" className="text-white/70 text-[0.65rem] font-light tracking-[0.3em] hover:text-white transition-colors duration-300 shrink-0">
          ← HOME
        </Link>
        <DirectorNavLinks />
      </header>

      <section className="px-6 sm:px-12 py-16 sm:py-20 max-w-6xl mx-auto">
        <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-10">DOCUMENTAL & REGISTROS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} className="aspect-video bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-500" />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 sm:px-12 py-12">
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          <Link href="/director" className="text-white/40 text-[0.54rem] font-light tracking-[0.35em] hover:text-white transition-colors duration-300">
            ← DIRECCIÓN AUDIOVISUAL
          </Link>
          <Link href="/contacto" className="text-white/40 text-[0.54rem] font-light tracking-[0.35em] border border-white/15 px-8 py-3.5 hover:text-white hover:border-white/45 transition-all duration-300">
            CONTACTO
          </Link>
        </div>
      </section>

      <Footer />

    </main>
  );
}
