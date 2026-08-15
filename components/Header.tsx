import Link from 'next/link';
import { NavLinks } from './NavLinks';

interface HeaderProps {
  logoUrl?: string | null;
  backOnly?: boolean;
}

export function Header({ logoUrl, backOnly }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4">
      {!backOnly && (
        <Link href="/home" className="flex min-w-0 items-center">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt="Nahuel Beade"
              /* 21 July #18 — mobile was h-14, taller than the sm step, and
                 shrink-0 let it push the nav off the right edge. */
              className="h-9 sm:h-12 max-w-full w-auto object-contain"
            />
          ) : (
            <span className="text-white text-xs font-light hover:text-white/60 transition-colors duration-300">
              NAHUEL BEADE
            </span>
          )}
        </Link>
      )}
      {backOnly ? (
        <Link
          href="/home"
          className="text-white/70 text-[clamp(0.72rem,1.8vw,1.05rem)] font-light hover:text-white transition-colors duration-300"
        >
          HOME
        </Link>
      ) : (
        <NavLinks />
      )}
    </header>
  );
}
