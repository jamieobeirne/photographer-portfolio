import Link from 'next/link';

export default function BiografiaFotografoPage() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center px-6 py-24">

      {/* Home button */}
      <Link
        href="/home"
        className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20 text-white/60 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
      >
        ← HOME
      </Link>

      {/* Back button */}
      <Link
        href="/fotografo"
        className="fixed top-4 left-4 sm:top-6 sm:left-8 z-20 text-white/60 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
      >
        ← FOTÓGRAFO
      </Link>

      {/* Bio content */}
      <div className="max-w-2xl w-full text-center space-y-8">
        <p className="text-white/40 text-[clamp(0.55rem,1.5vw,0.7rem)] font-light tracking-[0.4em]">
          BIOGRAFÍA
        </p>
        <h1 className="text-white text-[clamp(1rem,3vw,1.75rem)] font-light tracking-[0.2em]">
          NAHUEL BEADE
        </h1>
        <p className="text-white/50 text-[clamp(0.55rem,1.5vw,0.7rem)] font-light tracking-[0.3em]">
          FOTÓGRAFO
        </p>
        <div className="w-8 h-px bg-white/20 mx-auto" />
        <p className="text-white/70 text-[clamp(0.75rem,1.5vw,0.9rem)] font-light leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-white/70 text-[clamp(0.75rem,1.5vw,0.9rem)] font-light leading-relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
      </div>

    </main>
  );
}
