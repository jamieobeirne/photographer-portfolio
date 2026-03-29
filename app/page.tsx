import Link from 'next/link';

export default function IntroPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">

      {/* Full-screen video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full object-cover"
        style={{ pointerEvents: 'none', filter: 'grayscale(1)' }}
      >
        <source src="https://assets.mixkit.co/videos/17215/17215-720.mp4" type="video/mp4" />
      </video>

      {/* Top-right nav */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center gap-4 sm:gap-6">
        <Link
          href="/contacto"
          className="text-white/60 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
        >
          CONTACTO
        </Link>
      </div>

      {/* Central black circle with border */}
      <Link href="/home" className="relative z-10">
        <div className="w-[45vmin] h-[45vmin] rounded-full border border-white/70 bg-black flex items-center justify-center group">
          <div className="text-center group-hover:opacity-60 transition-opacity duration-500 cursor-pointer px-[8%]">
            <h1 className="text-white text-[clamp(0.75rem,3.5vmin,1.5rem)] font-light tracking-widest">
              NAHUEL BEADE
            </h1>
            <p className="text-white/60 text-[clamp(0.65rem,3vmin,1.25rem)] font-light tracking-widest mt-2">
              LOGO AQUI
            </p>
          </div>
        </div>
      </Link>

    </main>
  );
}
