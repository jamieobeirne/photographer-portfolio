import Link from 'next/link';

export default function IntroPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* Full-screen video background */}
      <div className="absolute inset-0">
        <iframe
          src="https://www.youtube.com/embed/h8t1cSSudVQ?autoplay=1&mute=1&loop=1&playlist=h8t1cSSudVQ&controls=0&showinfo=0&rel=0&modestbranding=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full"
          allow="autoplay; fullscreen"
          style={{ border: 'none', pointerEvents: 'none' }}
        />
      </div>

      {/* Central black circle with border */}
      <Link href="/home" className="relative z-10">
        <div className="w-[45vmin] h-[45vmin] rounded-full border border-white/70 bg-black flex items-center justify-center group">
          <div className="text-center group-hover:opacity-60 transition-opacity duration-500 cursor-pointer px-4">
            <h1 className="text-white text-2xl font-light tracking-widest">NAHUEL BEADE</h1>
            <p className="text-white/60 text-sm font-light tracking-widest mt-2">LOGO AQUI</p>
          </div>
        </div>
      </Link>

    </main>
  );
}