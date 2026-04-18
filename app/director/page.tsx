import Link from 'next/link';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { PortfolioHorizontalStrip } from '@/components/PortfolioHorizontalStrip';
import { getGalleryImages } from '@/lib/wordpress';

export default async function DirectorPage() {
  const images = await getGalleryImages(7);
  return (
    <main
      className="relative min-h-screen bg-black max-[699px]:pb-16 min-[700px]:flex min-[700px]:items-center min-[700px]:justify-center min-[700px]:pb-[clamp(100px,22vh,240px)]"
    >

      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-30 flex items-center gap-4 sm:gap-6">
        <Link
          href="/contacto"
          className="text-white/75 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
        >
          CONTACTO
        </Link>
        <Link
          href="/home"
          className="text-white/75 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
        >
          HOME
        </Link>
      </div>

      <header className="relative z-10 flex flex-col items-center gap-5 px-4 text-center max-[699px]:pt-24 max-[699px]:pb-12 min-[700px]:py-0">
        <p className="text-white text-[clamp(0.85rem,2.6vw,1.15rem)] font-light tracking-[0.2em] sm:tracking-[0.3em]">
          DIRECTOR
        </p>
        <Link
          href="/director/biografia"
          className="text-white/55 text-[0.6rem] font-light tracking-[0.3em] border border-white/20 px-5 py-2 hover:text-white hover:border-white/60 transition-all duration-300"
        >
          BIOGRAFÍA
        </Link>
      </header>

      <section
        aria-label="Galería"
        className="relative z-10 w-full max-w-[min(100vw,1680px)] mx-auto px-3 max-[699px]:block min-[700px]:hidden sm:px-8 md:px-12 lg:px-16"
      >
        <PortfolioGallery images={images} />
      </section>

      <div className="max-[699px]:hidden min-[700px]:block">
        <PortfolioHorizontalStrip images={images} />
      </div>
    </main>
  );
}
