import Link from 'next/link';
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

export default async function DirectorDeFotografiaPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let fotoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_dir_fotographia?.url ?? null;
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
    fotoUrl = settings.cinematographer_nahuel?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} portraitTop />

      {/* Portfolio videos — per Nahuel's "Videos porfolio para embeber DIR FOTOGRAFÍA" doc */}
      <div className="py-16 sm:py-20 space-y-16">
        {videoSections.map((section) => (
          <section key={section.label}>
            <div className="w-[90vw] mx-auto">
              <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-10">{section.label}</p>
              <VideoGrid videos={section.videos} />
            </div>
          </section>
        ))}
      </div>

      {/* Bio teaser */}
      <section className="border-t border-white/10 flex flex-col sm:flex-row mb-8 sm:mb-16 w-[90vw] mx-auto">
        {fotoUrl && (
          <div className="order-2 sm:order-1 w-full sm:w-[45%] aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotoUrl}
              alt="Nahuel Beade"
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        )}
        <div className="order-1 sm:order-2 flex-1 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">
          <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-6">ACERCA DE</p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case mb-8">
            Nahuel Beade es director de fotografía y operador de cámara con base en
            Barcelona, con formación en cine y una amplia experiencia en proyectos
            de ficción, documental y publicidad.
          </p>
          <Link
            href="/director_de_fotografia/biografia"
            className="text-white/40 text-[0.56rem] font-light border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300 self-start"
          >
            BIOGRAFÍA
          </Link>
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" portraitTop />

    </main>
  );
}
