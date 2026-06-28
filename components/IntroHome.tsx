'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Phase = 'video' | 'reveal' | 'exit';

interface IntroHomeProps {
  logoUrl: string | null;
}

export function IntroHome({ logoUrl }: IntroHomeProps) {
  const [phase, setPhase] = useState<Phase>('video');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 4000);
    const t2 = setTimeout(() => setPhase('exit'), 7500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">

      {/* Landscape video — desktop */}
      <video
        autoPlay muted loop playsInline
        className="hidden sm:block absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.77vh] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{
          pointerEvents: 'none',
          filter: phase !== 'video' ? 'grayscale(1)' : 'grayscale(0)',
          transition: 'filter 2s ease',
        }}
      >
        <source src="/intro-landscape.mp4" type="video/mp4" />
      </video>

      {/* Portrait video — mobile */}
      <video
        autoPlay muted loop playsInline
        className="block sm:hidden absolute top-1/2 left-1/2 w-[56.25vh] min-w-full h-[177.77vw] min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{
          pointerEvents: 'none',
          filter: phase !== 'video' ? 'grayscale(1)' : 'grayscale(0)',
          transition: 'filter 2s ease',
        }}
      >
        <source src="/intro-portrait.mp4" type="video/mp4" />
      </video>

      {/* Overlay — deepens as video goes B&W */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)',
          opacity: phase !== 'video' ? 1 : 0.4,
          transition: 'opacity 2s ease',
        }}
      />

      {/* Logo — fades in at centre, then moves to top and shrinks */}
      {logoUrl && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{
            opacity: phase === 'video' ? 0 : 1,
            transform: phase === 'exit' ? 'translateY(var(--intro-logo-y)) scale(var(--intro-logo-scale))' : 'translateY(0) scale(1)',
            transition: phase === 'exit'
              ? 'transform 0.85s cubic-bezier(0.4,0,0.6,1)'
              : 'opacity 0.9s ease, transform 0s',
            mixBlendMode: 'screen',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt="Nahuel Beade"
            className="h-[10.5rem] w-[10.5rem] sm:h-[15rem] sm:w-[15rem] md:h-[18rem] md:w-[18rem] object-contain"
          />
        </div>
      )}

      {/* Three links — slide up from below */}
      <div
        className="absolute top-[15px] sm:top-0 right-0 bottom-0 left-0 flex flex-col sm:flex-row z-10"
        style={{
          transform: phase === 'exit' ? 'translateY(0)' : 'translateY(100vh)',
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          transitionDelay: phase === 'exit' ? '0.1s' : '0s',
        }}
      >
        <Link
          href="/director_de_fotografia"
          className="flex flex-1 min-h-[33.333vh] sm:min-h-0 items-center justify-center border-b sm:border-b-0 sm:border-r border-white/20 hover:bg-white/[0.06] transition-colors duration-500 group"
        >
          <p className="text-white text-[clamp(0.845rem,1.8vw,1.175rem)] font-light text-center px-6 group-hover:tracking-[0.28em] transition-all duration-500">
            DIRECTOR DE FOTOGRAFÍA
          </p>
        </Link>
        <Link
          href="/fotografo"
          className="flex flex-1 min-h-[33.333vh] sm:min-h-0 items-center justify-center border-b sm:border-b-0 sm:border-r border-white/20 hover:bg-white/[0.06] transition-colors duration-500 group"
        >
          <p className="text-white text-[clamp(0.845rem,1.8vw,1.175rem)] font-light text-center px-6 group-hover:tracking-[0.28em] transition-all duration-500">
            FOTÓGRAFO
          </p>
        </Link>
        <Link
          href="/director"
          className="flex flex-1 min-h-[33.333vh] sm:min-h-0 items-center justify-center hover:bg-white/[0.06] transition-colors duration-500 group"
        >
          <p className="text-white text-[clamp(0.845rem,1.8vw,1.175rem)] font-light text-center px-6 group-hover:tracking-[0.28em] transition-all duration-500">
            DIRECTOR
          </p>
        </Link>
      </div>

      {/* CONTACTO — fades in with the links */}
      <div
        className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20"
        style={{
          opacity: phase === 'exit' ? 1 : 0,
          transition: 'opacity 0.8s ease',
          transitionDelay: phase === 'exit' ? '0.4s' : '0s',
        }}
      >
        <Link
          href="/contacto"
          className="text-white/75 text-[0.775rem] sm:text-[0.875rem] font-light hover:text-white transition-colors duration-300"
        >
          CONTACTO
        </Link>
      </div>

    </main>
  );
}
