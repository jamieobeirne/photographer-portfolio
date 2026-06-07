import Link from 'next/link';
import { NavLinks } from './NavLinks';
import type { ReactNode } from 'react';

interface PageHeroProps {
  imageUrl?: string | null;
  logoUrl?: string | null;
  nav?: ReactNode;
}

export function PageHero({ imageUrl, logoUrl, nav }: PageHeroProps) {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{
        height: 'clamp(110px, 15vh, 160px)',
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
                className="h-[4.5rem] w-[4.5rem] sm:h-[7rem] sm:w-[7rem] md:h-[8.5rem] md:w-[8.5rem] lg:h-[9.35rem] lg:w-[9.35rem] xl:h-[10.56rem] xl:w-[10.56rem] object-cover rounded-full brightness-110"
              />
            ) : (
              <span className="text-white text-xs font-light tracking-[0.3em] hover:text-white/60 transition-colors duration-300">
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
