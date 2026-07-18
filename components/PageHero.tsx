import Link from 'next/link';
import { NavLinks } from './NavLinks';
import type { ReactNode } from 'react';

interface PageHeroProps {
  imageUrl?: string | null;
  logoUrl?: string | null;
  nav?: ReactNode;
  /** Portrait mode: pin background to top of image (spec 2.1 — clouds crop) */
  portraitTop?: boolean;
}

export function PageHero({ imageUrl, logoUrl, nav, portraitTop = false }: PageHeroProps) {
  return (
    <section
      className={`relative flex items-center overflow-hidden ${portraitTop ? 'hero-portrait-top' : ''}`}
      style={{
        height: 'clamp(150px, 20vw, 160px)',
        backgroundColor: '#080808',
        ...(imageUrl
          ? {
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}),
      }}
    >
      <div className="absolute inset-0 bg-black/25" />

      {logoUrl !== undefined && (
        <div className="absolute inset-0 z-10 flex items-center justify-between px-6 sm:px-10">
          <Link href="/home" className="flex items-center shrink-0">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt="Nahuel Beade"
                className="h-[4.75rem] sm:h-[4.5rem] md:h-[5rem] lg:h-[5.5rem] xl:h-[6rem] w-auto object-contain"
              />
            ) : (
              <span className="text-white text-xs font-light hover:text-white/60 transition-colors duration-300">
                NAHUEL BEADE
              </span>
            )}
          </Link>
          {nav ?? <NavLinks />}
        </div>
      )}
    </section>
  );
}
