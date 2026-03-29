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

      {/* Central black circle with border */}
      <Link href="/home" className="relative z-10">
        <div className="logo-circle rounded-full border border-white/70 bg-black flex items-center justify-center group">
          <div className="text-center group-hover:opacity-60 transition-opacity duration-500 cursor-pointer px-[8%]">
            <h1 className="text-white text-[clamp(0.75rem,3.5vmin,1.5rem)] font-light tracking-widest">
              NAHUEL BEADE
            </h1>
            <p className="text-white/75 text-[clamp(0.78rem,3.6vmin,1.5rem)] font-light tracking-widest mt-2">
              LOGO AQUI
            </p>
          </div>
        </div>
      </Link>

    </main>
  );
}
