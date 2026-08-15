import Image from 'next/image';
import { getGlobalSettings } from '@/lib/wordpress';

/** Nahuel's live social profiles (21 July notes — the icons were previously href="#"). */
const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nahuelbeade.fotografia/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nahuelbeade',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@CORTECRIOLLOaudiovisual',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

interface FooterProps {
  imageUrl?: string | null;
  /** Overrides the WordPress logo. Omit to use `main_logo_new` from Global Settings. */
  logoUrl?: string | null;
  className?: string;
  /** Portrait mode: pin background to top of image (spec 2.1 — clouds crop) */
  portraitTop?: boolean;
}

export async function Footer({ imageUrl, logoUrl, className = '', portraitTop = false }: FooterProps) {
  // 21 July #2 — the footer was hardcoded to /blackLogo.png (the old mark).
  // Default to the same WordPress logo the header and intro use.
  let resolvedLogo = logoUrl ?? null;
  if (!resolvedLogo) {
    try {
      const settings = await getGlobalSettings();
      resolvedLogo = settings.main_logo_new?.url ?? null;
    } catch {}
  }

  return (
    <footer
      className={`relative border-t border-white/10 py-7 sm:py-8 px-6 sm:px-12 ${portraitTop ? 'hero-portrait-top' : ''} ${className}`}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="100vw"
          className={`object-cover ${portraitTop ? 'object-top' : 'object-center'}`}
        />
      )}
      {imageUrl && <div className="absolute inset-0 bg-black/25" />}

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        {resolvedLogo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolvedLogo}
            alt="Nahuel Beade"
            className="h-[64px] sm:h-[76px] w-auto object-contain shrink-0"
          />
        )}

        <div className="flex flex-col items-center sm:items-end gap-2">
          <p className="text-white text-lg sm:text-xl font-light">
            +34 678 768 119
          </p>
          {/* 21 July #2 — must render lowercase despite the global uppercase rule */}
          <p className="text-white text-sm font-light normal-case">
            nah.beade@gmail.com
          </p>
          <div className="flex items-center gap-4 mt-1">
            {SOCIAL_LINKS.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto border-t border-white/10 mt-6 pt-4">
        <p className="text-white text-[0.5rem] font-light tracking-[0.4em]">
          © 2026 NAHUEL BEADE — TODOS LOS DERECHOS RESERVADOS
        </p>
      </div>
    </footer>
  );
}
