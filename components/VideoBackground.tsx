'use client';

import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  startTime?: number;
  overlayOpacity?: number;
}

export function VideoBackground({ startTime = 0, overlayOpacity = 0.55 }: VideoBackgroundProps) {
  const landRef = useRef<HTMLVideoElement>(null);
  const portRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (landRef.current) landRef.current.currentTime = startTime;
    if (portRef.current) portRef.current.currentTime = startTime;
  }, [startTime]);

  return (
    <>
      <video
        ref={landRef}
        autoPlay muted loop playsInline
        className="hidden sm:block fixed inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(1)', zIndex: 0 }}
      >
        <source src="/intro-landscape.mp4" type="video/mp4" />
      </video>
      <video
        ref={portRef}
        autoPlay muted loop playsInline
        className="block sm:hidden fixed inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(1)', zIndex: 0 }}
      >
        <source src="/intro-portrait.mp4" type="video/mp4" />
      </video>
      <div
        className="fixed inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})`, zIndex: 1 }}
      />
    </>
  );
}
