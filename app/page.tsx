import Link from 'next/link';

export default function IntroPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <Link href="/home">
      <div className="text-white text-4xl font-light tracking-widest hover:opacity-60 transition-opacity duration-500 cursor-pointer">
        <h1>
          NAHUEL BEADE
        </h1>
        <h1>
          LOGO AQUI
        </h1>
        </div>
      </Link>
    </main>
  );
}