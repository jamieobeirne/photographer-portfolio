import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col sm:flex-row bg-black">
      <Link href="/director_de_fotografia" className="flex flex-1 items-center justify-center border-b sm:border-b-0 sm:border-r border-white/20 hover:opacity-60 transition-opacity duration-500">
        <p className="text-white text-sm font-light tracking-[0.3em]">
        DIRECTOR DE FOTOGRAFÍA
        </p>
      </Link>

      <Link href="/fotografo" className="flex flex-1 items-center justify-center border-b sm:border-b-0 sm:border-r border-white/20 hover:opacity-60 transition-opacity duration-500">
        <p className="text-white text-sm font-light tracking-[0.3em]">
        FOTÓGRAFO
        </p>
      </Link>

      <Link href="/director" className="flex flex-1 items-center justify-center hover:opacity-60 transition-opacity duration-500">
        <p className="text-white text-sm font-light tracking-[0.3em]">
        DIRECTOR
        </p>
      </Link>
    </main>
  );
}