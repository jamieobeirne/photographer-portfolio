'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HamburgerMenu } from './HamburgerMenu';

const links = [
  { href: '/director_de_fotografia', label: 'HOME' },
  { href: '/director_de_fotografia/proyectos', label: 'DIRECCIÓN DE FOTOGRAFÍA' },
  { href: '/op_de_camara', label: 'OP. DE CÁMARA' },
  { href: '/foquista', label: 'FOQUISTA' },
  { href: '/contacto', label: 'CONTACTO' },
];

export function NavLinks() {
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
