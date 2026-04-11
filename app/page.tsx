import Link from 'next/link';
import Image from 'next/image';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function IntroPage() {
  let logo = null;

  try {
    const globalSettings = await getGlobalSettings();
    logo = globalSettings.logo_image;
  } catch (error) {
    console.error('Could not fetch global settings:', error);
  }

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
      <Link href="/home" className="relative z-10 group cursor-pointer">
        <div className="logo-circle relative overflow-hidden rounded-full border border-white/70 bg-black flex items-center justify-center">
          {logo ? (
            <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60">
              <Image
                src={logo.url}
                alt={logo.alt || 'Nahuel Beade'}
                fill
                className="object-contain"
                sizes="(max-width: 699px) 63vmin, 45vmin"
                priority
              />
            </div>
          ) : (
            <h1 className="text-white text-[clamp(0.75rem,3.5vmin,1.5rem)] font-light tracking-widest transition-opacity duration-500 group-hover:opacity-60 px-4 text-center">
              NAHUEL BEADE
            </h1>
          )}
        </div>
      </Link>

    </main>
  );
}
