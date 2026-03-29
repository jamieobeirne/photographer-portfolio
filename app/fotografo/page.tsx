import Link from 'next/link';

export default function FotografoPage() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center">

      {/* Home button */}
      <Link
        href="/home"
        className="fixed top-6 right-8 z-20 text-white/60 text-xs font-light tracking-[0.3em] hover:text-white transition-colors duration-300"
      >
        ← HOME
      </Link>

      {/* Page title */}
      <p className="text-white text-sm font-light tracking-[0.3em]">
        FOTÓGRAFO
      </p>

      {/* Horizontal photo strip */}
      <div className="fixed bottom-20 left-0 right-0 z-10">
        <div
          className="flex gap-3 px-6 overflow-x-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#ffffff33 transparent' }}
        >
          {Array.from({ length: 30 }, (_, i) => (
            <img
              key={i}
              src={`https://placehold.co/300x200/2a2a2a/2a2a2a`}
              alt=""
              className="flex-shrink-0 object-cover"
              style={{ height: '20vh', aspectRatio: '3/2' }}
            />
          ))}
        </div>
      </div>

    </main>
  );
}
