import Link from 'next/link';

export default function BiografiaDirectorPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 pt-20 pb-12 sm:py-24">

      {/* Fixed nav */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center gap-4 sm:gap-6">
        <Link href="/contacto" className="text-white/75 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300">
          CONTACTO
        </Link>
        <Link href="/home" className="text-white/75 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300">
          HOME
        </Link>
      </div>

      <Link
        href="/director"
        className="fixed top-4 left-4 sm:top-6 sm:left-8 z-20 text-white/75 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
      >
        <span className="sm:hidden">←</span>
        <span className="hidden sm:inline">← DIRECTOR</span>
      </Link>

      <div className="max-w-2xl w-full text-center space-y-8">
        <p className="text-white/30 text-[0.58rem] tracking-[0.55em]">BIOGRAFÍA</p>
        <h1 className="text-white text-[clamp(1.3rem,3.2vw,2.2rem)] font-light tracking-[0.22em]">NAHUEL BEADE</h1>
        <p className="text-white/40 text-[0.58rem] tracking-[0.3em]">DIRECTOR</p>
        <div className="w-8 h-px bg-white/15 mx-auto" />
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
        <div className="pt-4 flex justify-center">
          <Link href="/contacto" className="text-white/40 text-[0.56rem] font-light tracking-[0.3em] border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300">
            CONTACTO
          </Link>
        </div>
      </div>

    </main>
  );
}
