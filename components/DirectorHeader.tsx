'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DirectorNavLinks } from './DirectorNavLinks';
import { HamburgerMenu } from './HamburgerMenu';

const sectionLinks = [
  { href: '/director/publicidad-rrss',     label: 'PUBLICIDAD & RRSS' },
  { href: '/director/narrativa-ficcion',    label: 'NARRATIVA & FICCIÓN' },
  { href: '/director/documental-registros', label: 'DOCUMENTAL & REGISTROS' },
  { href: '/contacto',                      label: 'CONTACTO' },
];

const linkClass = (active: boolean) =>
  `text-[clamp(0.72rem,1.8vw,1.05rem)] font-light tracking-[0.2em] xl:tracking-[0.3em] whitespace-nowrap transition-colors duration-300 ${
    active ? 'text-orange-500' : 'text-white/70 hover:text-white'
  }`;

export function DirectorHeader() {
  const pathname = usePathname();
  const isSubPage = pathname.startsWith('/director/');
  const homeHref = isSubPage ? '/director' : '/home';
  const homeActive = pathname === '/director';

  const mobileLinks = [
    { href: homeHref, label: 'HOME' },
    ...sectionLinks,
  ];

  return (
    <header className="flex items-center justify-between px-6 sm:px-10 py-4 bg-zinc-900">
      <Link href="/home" className="shrink-0">
        <div className="h-[9rem] w-[9rem] sm:h-[6rem] sm:w-[6rem] md:h-[7rem] md:w-[7rem] rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <span className="text-white/40 text-[0.7rem] font-light tracking-[0.05em] text-center leading-tight">AUDIO<br/>DIR<br/>LOGO</span>
        </div>
      </Link>
      <div className="flex items-center gap-5 xl:gap-8">
        {/* Desktop HOME link */}
        <Link href={homeHref} className={`hidden lg:inline ${linkClass(homeActive)}`}>
          HOME
        </Link>
        <DirectorNavLinks />
        {/* Mobile hamburger with HOME included */}
        <HamburgerMenu links={mobileLinks} />
      </div>
    </header>
  );
}
