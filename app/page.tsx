import Link from 'next/link';
import { getGlobalSettings, resolveIntroVideo } from '@/lib/wordpress';

export default async function IntroPage() {
  let video: { url: string; type: string } | null = null;

  try {
    const globalSettings = await getGlobalSettings();
    video = resolveIntroVideo(globalSettings.logo_video);
  } catch (error) {
    console.error('Could not fetch global settings:', error);
    video = resolveIntroVideo(null);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.77vh] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
          style={{ pointerEvents: 'none' }}
        >
          <source src={video.url} type={video.type} />
        </video>
      ) : null}

      <Link
        href="/home"
        className="absolute inset-0 z-10 block cursor-pointer"
        aria-label="Entrar al sitio"
      >
        <span className="sr-only">Entrar al sitio</span>
      </Link>
    </main>
  );
}
