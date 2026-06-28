import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function DirectorPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let videoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_direccion?.url ?? null;
    logoUrl = settings.logo_direccion?.url ?? null;
    videoUrl = settings.director_video?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<DirectorNavLinks />} />

      {videoUrl && (
        <section>
          <video
            src={videoUrl}
            controls
            playsInline
            className="w-full aspect-video"
          />
        </section>
      )}

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
