import { DirectorHeader } from '@/components/DirectorHeader';
import { Footer } from '@/components/Footer';

export default function PublicidadRrssPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <DirectorHeader />

      <section className="px-6 sm:px-12 py-16 sm:py-20 max-w-6xl mx-auto">
        <p className="text-white/30 text-[0.52rem] tracking-[0.5em] mb-10">PUBLICIDAD & RRSS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} className="aspect-video bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-500" />
          ))}
        </div>
      </section>

<Footer className="bg-zinc-900" />

    </main>
  );
}
