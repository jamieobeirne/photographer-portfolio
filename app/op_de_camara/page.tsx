import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { VideoGrid } from '@/components/VideoGrid';
import { cameraOperatorVideos } from '@/lib/cinematography-videos';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function OpDeCamaraPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.op_de_camara_fondo?.url ?? settings.fondo_dir_fotographia?.url ?? null;
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} />

      {/* Portfolio videos — per Nahuel's "Videos porfolio para embeber DIR FOTOGRAFÍA" doc */}
      <section className="py-16 sm:py-20">
        <div className="w-[90vw] mx-auto">
          <p className="text-white/45 section-title mb-10">OPERACIÓN DE CÁMARA</p>
          <VideoGrid videos={cameraOperatorVideos} />
        </div>
      </section>

      <Footer imageUrl={heroUrl} />

    </main>
  );
}
