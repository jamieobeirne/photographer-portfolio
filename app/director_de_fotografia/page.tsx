import Link from 'next/link';

export default function DirectorDeFotografíaPage() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center pb-[clamp(100px,22vh,240px)]">

      {/* Top-right nav */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center gap-4 sm:gap-6">
        <Link
          href="/contacto"
          className="text-white/60 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
        >
          CONTACTO
        </Link>
        <Link
          href="/home"
          className="text-white/60 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
        >
          HOME
        </Link>
      </div>

      {/* Page title + bio button */}
      <div className="flex flex-col items-center gap-5">
        <p className="text-white text-[clamp(0.6rem,2vw,0.875rem)] font-light tracking-[0.2em] sm:tracking-[0.3em] text-center px-8">
          DIRECTOR DE FOTOGRAFÍA
        </p>
        <Link
          href="/director_de_fotografia/biografia"
          className="text-white/40 text-[0.6rem] font-light tracking-[0.3em] border border-white/20 px-5 py-2 hover:text-white hover:border-white/60 transition-all duration-300"
        >
          BIOGRAFÍA
        </Link>
      </div>

      {/* Horizontal photo strip */}
      <div className="fixed bottom-16 sm:bottom-20 left-0 right-0 z-10">
        <div
          className="flex gap-2 sm:gap-3 px-3 sm:px-6 overflow-x-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#ffffff33 transparent', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {Array.from({ length: 30 }, (_, i) => (
            <img
              key={i}
              src={`https://picsum.photos/seed/${i + 1}/600/400?grayscale`}
              alt=""
              className="flex-shrink-0 object-cover"
              style={{ height: 'clamp(80px, 18vh, 220px)', aspectRatio: '3/2' }}
            />
          ))}
        </div>
      </div>

    </main>
  );
}
