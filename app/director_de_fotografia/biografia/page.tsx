import Link from 'next/link';

export default function BiografiaDirectorDeFotografiaPage() {
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
        href="/director_de_fotografia"
        className="fixed top-4 left-4 sm:top-6 sm:left-8 z-20 text-white/60 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
      >
        ← DIRECTOR DE FOTOGRAFÍA
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
          DIRECTOR DE FOTOGRAFÍA
        </p>
        <div className="w-8 h-px bg-white/20 mx-auto" />
        <p className="text-white/70 text-[clamp(0.75rem,1.5vw,0.9rem)] font-light leading-relaxed">
          Texto de biografía aquí. Nahuel Beade es un director de fotografía con amplia experiencia
          en cine, publicidad y televisión. Su trabajo se caracteriza por una visión estética
          cuidada y una profunda comprensión de la luz y el espacio.
        </p>
        <p className="text-white/70 text-[clamp(0.75rem,1.5vw,0.9rem)] font-light leading-relaxed">
          A lo largo de su carrera ha colaborado con directores y productoras de renombre,
          desarrollando un lenguaje visual propio que combina rigor técnico con sensibilidad artística.
        </p>
      </div>

    </main>
  );
}
