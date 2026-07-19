'use client';

import { useEffect, useId, useRef, useState } from 'react';

export interface VideoItem {
  title: string;
  embedUrl: string;
}

interface VideoGridProps {
  videos: VideoItem[];
}

function getThumbnailUrl(embedUrl: string) {
  const videoId = new URL(embedUrl).pathname.split('/').pop();
  return videoId && videoId !== 'videoseries'
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : null;
}

function enableSound(iframe: HTMLIFrameElement) {
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
    'https://www.youtube-nocookie.com',
  );
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
    'https://www.youtube-nocookie.com',
  );
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
    'https://www.youtube-nocookie.com',
  );
}

interface VideoCardProps extends VideoItem {
  isPlaying: boolean;
  onPlay: () => void;
}

function VideoCard({ title, embedUrl, isPlaying, onPlay }: VideoCardProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerId = useId().replace(/:/g, '');
  const thumbnailUrl = getThumbnailUrl(embedUrl);
  const origin = typeof window === 'undefined' ? '' : `&origin=${encodeURIComponent(window.location.origin)}`;
  const playerUrl = `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1&controls=1&rel=0&enablejsapi=1&mute=0${origin}`;

  useEffect(() => {
    if (!isPlaying) return;

    const onPlayerReady = (event: MessageEvent) => {
      if (
        event.origin !== 'https://www.youtube-nocookie.com' ||
        event.source !== iframeRef.current?.contentWindow
      ) return;

      try {
        const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (message?.event === 'onReady' && iframeRef.current) enableSound(iframeRef.current);
      } catch {
        // Ignore non-JSON messages from the embedded player.
      }
    };

    window.addEventListener('message', onPlayerReady);
    return () => window.removeEventListener('message', onPlayerReady);
  }, [isPlaying]);

  return (
    <article>
      <div className="aspect-video overflow-hidden bg-white/[0.03] border border-white/10">
        {isPlaying ? (
          <iframe
            className="h-full w-full"
            src={playerUrl}
            title={title}
            id={playerId}
            ref={iframeRef}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            className="group relative h-full w-full overflow-hidden bg-zinc-900 text-left"
            aria-label={`Reproducir ${title}`}
          >
            {thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnailUrl}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-zinc-800 to-black" />
            )}
            <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10" />
            <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/40 pl-0.5 text-sm text-white transition-transform duration-300 group-hover:scale-110">
              ▶
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 px-1 text-white text-[0.66rem] font-light leading-relaxed normal-case">
        {title}
      </p>
    </article>
  );
}

export function VideoGrid({ videos }: VideoGridProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8">
      {videos.map((video) => (
        <VideoCard
          key={`${video.title}-${video.embedUrl}`}
          {...video}
          isPlaying={activeVideo === video.embedUrl}
          onPlay={() => setActiveVideo(video.embedUrl)}
        />
      ))}
    </div>
  );
}
