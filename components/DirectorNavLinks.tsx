'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HamburgerMenu } from './HamburgerMenu';

const links = [
  { href: '/director',                       label: 'HOME' },
  { href: '/director/publicidad-rrss',       label: 'PUBLICIDAD & RRSS' },
  { href: '/director/narrativa-ficcion',     label: 'NARRATIVA & FICCIÓN' },
  { href: '/director/documental-registros',  label: 'DOCUMENTAL & REGISTROS' },
  { href: '/contacto',                       label: 'CONTACTO' },
];

export function DirectorNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop */}
      <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
        {links.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className={`text-[clamp(0.72rem,1.8vw,1.05rem)] font-light whitespace-nowrap transition-colors duration-300 ${
              pathname === href ? 'text-orange-500' : 'text-white hover:text-orange-400'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile */}
      <HamburgerMenu links={links} />
    </>
  );
}
