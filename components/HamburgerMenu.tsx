'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HamburgerMenuProps {
  links: { href: string; label: string }[];
  desktopBreakpoint?: 'lg' | 'xl';
}

export function HamburgerMenu({ links, desktopBreakpoint = 'lg' }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className={`flex ${desktopBreakpoint === 'xl' ? 'xl:hidden' : 'lg:hidden'} flex-col justify-center gap-[7.3px] p-2`}
      >
        <span className="block w-[29px] h-px bg-white/70" />
        <span className="block w-[29px] h-px bg-white/70" />
        <span className="block w-[29px] h-px bg-white/70" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col px-8 pt-10 pb-16">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="self-end text-white/50 hover:text-white transition-colors duration-300 mb-12"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col gap-8">
            {links.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`text-[clamp(1rem,5vw,1.4rem)] font-light transition-colors duration-300 ${
                  pathname === href ? 'text-orange-500' : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
