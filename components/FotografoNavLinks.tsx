'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
            className={`text-[clamp(0.72rem,1.8vw,1.05rem)] font-light tracking-[0.2em] xl:tracking-[0.3em] whitespace-nowrap transition-colors duration-300 ${
              pathname === href ? 'text-orange-500' : 'text-white hover:text-orange-400'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile */}
      <nav className="flex lg:hidden items-center gap-4">
        <Link
          href="/contacto"
          className="text-white/75 text-[0.65rem] font-light tracking-[0.2em] hover:text-white transition-colors duration-300"
        >
          CONTACTO
        </Link>
      </nav>
    </>
  );
}
