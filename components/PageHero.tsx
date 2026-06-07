import Link from 'next/link';
import { NavLinks } from './NavLinks';

interface PageHeroProps {
  eyebrow?: string;
  title?: string;
  imageUrl?: string | null;
  logoUrl?: string | null;
}

export function PageHero({ imageUrl, logoUrl }: PageHeroProps) {
  const hasHeader = logoUrl !== undefined;

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

      {hasHeader && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 sm:px-10 h-full">
          <Link href="/home" className="flex items-center">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt="Nahuel Beade"
                className="h-24 sm:h-28 w-24 sm:w-28 object-cover rounded-full brightness-110"
              />
            ) : (
              <span className="text-white text-xs font-light tracking-[0.3em] hover:text-white/60 transition-colors duration-300">
                NAHUEL BEADE
              </span>
            )}
          </Link>
          <NavLinks />
        </div>
      )}
    </section>
  );
}
