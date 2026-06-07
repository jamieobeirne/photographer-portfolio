import Link from 'next/link';
import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import { Footer } from '@/components/Footer';

export default function PublicidadRrssPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <header className="flex items-center justify-between px-6 sm:px-10 py-4">
        <Link href="/" className="shrink-0">
          <div className="h-10 w-10 bg-white/10 border border-white/20" />
        </Link>
        <div className="flex items-center gap-5 xl:gap-8">
          <Link href="/director" className="text-white/70 text-[clamp(0.72rem,1.8vw,1.05rem)] font-light tracking-[0.2em] xl:tracking-[0.3em] hover:text-white transition-colors duration-300 shrink-0 whitespace-nowrap">
            HOME
          </Link>
          <DirectorNavLinks />
        </div>
      </header>

      <section className="px-6 sm:px-12 py-16 sm:py-20 max-w-6xl mx-auto">
        <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-10">PUBLICIDAD & RRSS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} className="aspect-video bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-500" />
          ))}
        </div>
      </section>

<Footer />

    </main>
  );
}
