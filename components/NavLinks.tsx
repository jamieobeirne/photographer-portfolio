'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/home', label: 'HOME' },
  { href: '/director_de_fotografia', label: 'DIRECCIÓN DE FOTOGRAFÍA' },
  { href: '/op_de_camara', label: 'OP. DE CÁMARA' },
  { href: '/foquista', label: 'FOQUISTA' },
  { href: '/contacto', label: 'CONTACTO' },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-10">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-[1.125rem] tracking-widest transition-colors duration-300 ${
              pathname === href || pathname.startsWith(href + '/') ? 'text-orange-500' : 'text-white hover:text-orange-400'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile */}
      <nav className="flex md:hidden items-center gap-5">
        <Link
          href="/contacto"
          className="text-white/45 text-[0.56rem] font-light tracking-[0.2em] hover:text-white transition-colors duration-300"
        >
          CONTACTO
        </Link>
      </nav>
    </>
  );
}
