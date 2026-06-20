import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col sm:flex-row bg-black">

      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20">
        <Link
          href="/contacto"
          className="text-white/75 text-[0.65rem] sm:text-xs font-light hover:text-white transition-colors duration-300"
        >
          CONTACTO
        </Link>
      </div>

      <Link
        href="/director_de_fotografia"
        className="flex flex-1 min-h-[33.333vh] sm:min-h-0 items-center justify-center border-b sm:border-b-0 sm:border-r border-white/20 hover:bg-white/[0.06] transition-colors duration-500 group"
      >
        <p className="text-white text-[clamp(0.72rem,1.8vw,1.05rem)] font-light text-center px-6 group-hover:tracking-[0.28em] transition-all duration-500">
          DIRECTOR DE FOTOGRAFÍA
        </p>
      </Link>

      <Link
        href="/fotografo"
        className="flex flex-1 min-h-[33.333vh] sm:min-h-0 items-center justify-center border-b sm:border-b-0 sm:border-r border-white/20 hover:bg-white/[0.06] transition-colors duration-500 group"
      >
        <p className="text-white text-[clamp(0.72rem,1.8vw,1.05rem)] font-light text-center px-6 group-hover:tracking-[0.28em] transition-all duration-500">
          FOTÓGRAFO
        </p>
      </Link>

      <Link
        href="/director"
        className="flex flex-1 min-h-[33.333vh] sm:min-h-0 items-center justify-center hover:bg-white/[0.06] transition-colors duration-500 group"
      >
        <p className="text-white text-[clamp(0.72rem,1.8vw,1.05rem)] font-light text-center px-6 group-hover:tracking-[0.28em] transition-all duration-500">
          DIRECTOR
        </p>
      </Link>

    </main>
  );
}
