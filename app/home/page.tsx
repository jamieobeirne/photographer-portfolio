import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col sm:flex-row bg-black">

      {/* Top-right nav */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20">
        <Link
          href="/contacto"
          className="text-white/75 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
        >
          CONTACTO
        </Link>
      </div>

      <Link
        href="/director_de_fotografia"
        className="flex flex-1 min-h-[33.333vh] sm:min-h-0 items-center justify-center border-b sm:border-b-0 sm:border-r border-white/20 hover:opacity-60 transition-opacity duration-500"
      >
        <p className="text-white text-[clamp(0.6rem,1.5vw,0.875rem)] font-light tracking-[0.2em] sm:tracking-[0.3em] text-center px-4">
          DIRECTOR DE FOTOGRAFÍA
        </p>
      </Link>

      <Link
        href="/fotografo"
        className="flex flex-1 min-h-[33.333vh] sm:min-h-0 items-center justify-center border-b sm:border-b-0 sm:border-r border-white/20 hover:opacity-60 transition-opacity duration-500"
      >
        <p className="text-white text-[clamp(0.6rem,1.5vw,0.875rem)] font-light tracking-[0.2em] sm:tracking-[0.3em] text-center px-4">
          FOTÓGRAFO
        </p>
      </Link>

      <Link
        href="/director"
        className="flex flex-1 min-h-[33.333vh] sm:min-h-0 items-center justify-center hover:opacity-60 transition-opacity duration-500"
      >
        <p className="text-white text-[clamp(0.6rem,1.5vw,0.875rem)] font-light tracking-[0.2em] sm:tracking-[0.3em] text-center px-4">
          DIRECTOR
        </p>
      </Link>

    </main>
  );
}
