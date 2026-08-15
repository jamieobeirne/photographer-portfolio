import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { VideoGrid } from '@/components/VideoGrid';
import { fictionDocumentaryVideos } from '@/lib/director-videos';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function NarrativaFiccionPage() {
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
        <p className="text-white/45 section-title mb-10">CINE FICCIÓN & DOCUMENTAL</p>
        <VideoGrid videos={fictionDocumentaryVideos} />
      </section>
      <Footer imageUrl={heroUrl} />
    </main>
  );
}
