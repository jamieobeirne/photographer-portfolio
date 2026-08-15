import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { VideoGrid } from '@/components/VideoGrid';
import {
  dfAdvertisingVideos,
  dfCineTvSeriesVideos,
  dfMusicVideos,
} from '@/lib/cinematography-videos';
import { getGlobalSettings } from '@/lib/wordpress';

const videoSections = [
  { label: 'CINE / TV / SERIES', videos: dfCineTvSeriesVideos },
  { label: 'PUBLICIDAD', videos: dfAdvertisingVideos },
  { label: 'VIDEOCLIPS & LIVE SESSIONS', videos: dfMusicVideos },
];

export default async function DirectorDeFotografiaProyectosPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_dir_fotographia?.url ?? null;
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} portraitTop />

      {/* Portfolio videos — per Nahuel's "Videos porfolio para embeber DIR FOTOGRAFÍA" doc */}
      <div className="py-16 sm:py-20 space-y-16">
        {videoSections.map((section) => (
          <section key={section.label}>
            <div className="w-[90vw] mx-auto">
              <p className="text-white/45 section-title mb-10">{section.label}</p>
              <VideoGrid videos={section.videos} />
            </div>
          </section>
        ))}
      </div>

      <Footer imageUrl={heroUrl} portraitTop />

    </main>
  );
}
