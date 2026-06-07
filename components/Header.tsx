import Link from 'next/link';
import { NavLinks } from './NavLinks';

interface HeaderProps {
  logoUrl?: string | null;
  backOnly?: boolean;
}

export function Header({ logoUrl, backOnly }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4">
      <Link href="/home" className="flex items-center shrink-0">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt="Nahuel Beade"
            className="h-[6.6rem] w-[6.6rem] sm:h-14 sm:w-14 object-cover rounded-full brightness-110"
          />
        ) : (
          <span className="text-white text-xs font-light tracking-[0.3em] hover:text-white/60 transition-colors duration-300">
            NAHUEL BEADE
          </span>
        )}
      </Link>
      {backOnly ? (
        <Link
          href="/home"
          className="text-white/70 text-xs font-light tracking-[0.3em] hover:text-white transition-colors duration-300"
        >
          HOME
        </Link>
      ) : (
        <NavLinks />
      )}
    </header>
  );
}
