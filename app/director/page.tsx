import Link from 'next/link';
import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import { Footer } from '@/components/Footer';

export default function DirectorPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Minimal header */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-4">
        <Link
          href="/home"
          className="text-white/70 text-[0.65rem] font-light tracking-[0.3em] hover:text-white transition-colors duration-300 shrink-0"
        >
          ← HOME
        </Link>
        <DirectorNavLinks />
      </header>

      {/* Reels — placeholder */}
      <section className="py-16 sm:py-20">
        <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-10 px-6 sm:px-12">REELS</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="relative aspect-video bg-white/[0.03] border border-white/10"
            />
          ))}
        </div>
      </section>

      {/* Bio — placeholder */}
      <section className="border-t border-white/10 py-16">
        <p className="text-white/30 text-[0.52rem] tracking-[0.45em] mb-10 px-6 sm:px-12">BIOGRAFÍA</p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="aspect-[3/4] sm:aspect-auto sm:min-h-[520px] bg-white/[0.04] border border-white/10" />
          <div className="bg-white/[0.02] border border-white/10 sm:min-h-[520px]" />
        </div>
      </section>

      <Footer />

    </main>
  );
}
