'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HamburgerMenu } from './HamburgerMenu';

const links = [
  { href: '/director',                       label: 'HOME' },
  { href: '/director/publicidad-rrss',       label: 'PUBLICIDAD & RRSS' },
  { href: '/director/narrativa-ficcion',     label: 'CINE FICCIÓN & DOCUMENTAL' },
  { href: '/director/documental-registros',  label: 'VIDEO CLIPS & LIVE SESSION' },
  { href: '/contacto',                       label: 'CONTACTO' },
];

export function DirectorNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop */}
      <nav className="hidden xl:flex items-center gap-4 xl:gap-5">
        {links.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className={`text-[clamp(0.62rem,1vw,0.82rem)] font-light whitespace-nowrap transition-colors duration-300 ${
              pathname === href ? 'text-orange-500' : 'text-white hover:text-orange-400'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile */}
      <HamburgerMenu links={links} desktopBreakpoint="xl" />
    </>
  );
}
