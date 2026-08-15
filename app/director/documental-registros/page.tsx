import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { VideoGrid } from '@/components/VideoGrid';
import { musicVideos } from '@/lib/director-videos';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function DocumentalRegistrosPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_direccion?.url ?? null;
    logoUrl = settings.logo_direccion?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<DirectorNavLinks />} />
      <section className="w-[90vw] mx-auto py-16 sm:py-20">
        <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-10">VIDEO CLIPS & LIVE SESSION</p>
        <VideoGrid videos={musicVideos} />
      </section>
      <Footer imageUrl={heroUrl} />
    </main>
  );
}
