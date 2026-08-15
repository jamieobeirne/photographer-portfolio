import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { VideoGrid } from '@/components/VideoGrid';
import { focusPullerVideos } from '@/lib/cinematography-videos';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function FoquistaPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.foquista_fondo?.url ?? settings.fondo_dir_fotographia?.url ?? null;
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} />

      {/* Portfolio videos — per Nahuel's "Videos porfolio para embeber DIR FOTOGRAFÍA" doc.
          "El Caso Vitruvio" pending (en postproducción, sin link). */}
      <section className="py-16 sm:py-20">
        <div className="page-container">
          <p className="text-white/45 section-title mb-10">FOQUISTA</p>
          <VideoGrid videos={focusPullerVideos} />
        </div>
      </section>

      <Footer imageUrl={heroUrl} />

    </main>
  );
}
