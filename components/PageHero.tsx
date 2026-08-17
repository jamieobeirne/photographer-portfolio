import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from './NavLinks';
import type { ReactNode } from 'react';

interface PageHeroProps {
  imageUrl?: string | null;
  logoUrl?: string | null;
  nav?: ReactNode;
  /** Portrait mode: pin background to top of image (spec 2.1 — clouds crop) */
  portraitTop?: boolean;
  /**
   * Render no nav in the hero. Used by /contacto.
   *
   * 21 July #6 originally centred the logo here as well, but the centred logo
   * read as a different header from every other page, so 17 Aug left-aligned it
   * to match. Only the nav suppression remains, hence the rename.
   */
  hideNav?: boolean;
}

export function PageHero({ imageUrl, logoUrl, nav, portraitTop = false, hideNav = false }: PageHeroProps) {
  return (
    <section
      className={`relative flex items-center overflow-hidden ${portraitTop ? 'hero-portrait-top' : ''}`}
      style={{
        height: 'clamp(150px, 20vw, 160px)',
        backgroundColor: '#080808',
      }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover ${portraitTop ? 'object-top' : 'object-center'}`}
        />
      )}
      <div className="absolute inset-0 bg-black/25" />

      {logoUrl !== undefined && (
        <div className="absolute inset-0 z-10 flex items-center justify-between px-6 sm:px-10">
          <Link href="/home" className="flex min-w-0 items-center">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt="Nahuel Beade"
                className="h-[3.25rem] sm:h-[4.5rem] md:h-[5rem] lg:h-[5.5rem] xl:h-[6rem] max-w-full w-auto object-contain"
              />
            ) : (
              <span className="text-white text-xs font-light hover:text-white/60 transition-colors duration-300">
                NAHUEL BEADE
              </span>
            )}
          </Link>
          {!hideNav && (nav ?? <NavLinks />)}
        </div>
      )}
    </section>
  );
}
