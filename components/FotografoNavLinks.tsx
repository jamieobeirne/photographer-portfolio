'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HamburgerMenu } from './HamburgerMenu';

const links = [
  { href: '/fotografo', label: 'HOME' },
  { href: '/fotografo/servicios', label: 'SERVICIOS DE FOTOGRAFÍA' },
  { href: '/fotografo/biografia', label: 'BIO / ACERCA DE MÍ' },
  { href: '/director', label: 'DIRECCIÓN AUDIOVISUAL' },
  { href: '/contacto', label: 'CONTACTO' },
];

export function FotografoNavLinks() {
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
