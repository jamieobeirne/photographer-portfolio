import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { VideoBackground } from '@/components/VideoBackground';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function ContactoPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let bioFotoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_contacto?.url ?? null;
    logoUrl = settings.main_logo_new?.url ?? null;
    bioFotoUrl = settings.cinematographer_nahuel?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} />

      {/* Body — video plays only here */}
      <div className="relative overflow-hidden">
        <VideoBackground startTime={20} overlayOpacity={0.3} />

        {/* Logo — link back to home, sits over video */}
        <section className="relative z-10 flex justify-center py-20 sm:py-28">
          {logoUrl && (
            <Link href="/home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt="Nahuel Beade"
                className="h-[5rem] sm:h-[6rem] md:h-[7rem] w-auto object-contain"
              />
            </Link>
          )}
        </section>

        {/* Form section — centered dark rectangle, not full-width */}
        <div className="relative z-10 px-4 sm:px-8 pb-24 flex justify-center">
          <div className="relative w-full max-w-3xl">
            <div className="absolute -inset-x-8 -inset-y-10 bg-black/60 pointer-events-none" />
            <section className="relative px-6 sm:px-10 pt-2">

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row justify-center gap-12 sm:gap-20 text-center mb-16">
              <div className="space-y-2">
                <p className="text-white text-[0.52rem] font-light tracking-[0.4em]">EMAIL</p>
                <p className="text-white text-[clamp(0.84rem,1.6vw,1rem)] font-light">
                  hola@nahuelbeade.com
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-white text-[0.52rem] font-light tracking-[0.4em]">TELÉFONO</p>
                <p className="text-white text-[clamp(0.84rem,1.6vw,1rem)] font-light">
                  +54 11 0000 0000
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-white text-[0.52rem] font-light tracking-[0.4em]">UBICACIÓN</p>
                <p className="text-white text-[clamp(0.84rem,1.6vw,1rem)] font-light">
                  Buenos Aires, Argentina
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/10 mb-16" />

            {/* Form */}
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-white text-[0.52rem] font-light tracking-[0.4em]">
                    NOMBRE
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="tu nombre"
                    className="w-full bg-transparent border-b border-white/15 py-2.5 text-white text-[clamp(0.84rem,1.6vw,1rem)] font-light placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white text-[0.52rem] font-light tracking-[0.4em]">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-transparent border-b border-white/15 py-2.5 text-white text-[clamp(0.84rem,1.6vw,1rem)] font-light placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-white text-[0.52rem] font-light tracking-[0.4em]">
                  MENSAJE
                </label>
                <textarea
                  id="mensaje"
                  rows={5}
                  placeholder="tu mensaje..."
                  className="w-full bg-transparent border-b border-white/15 py-2.5 text-white text-[clamp(0.84rem,1.6vw,1rem)] font-light placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="text-white text-[0.56rem] font-light border border-white/15 px-8 py-3 hover:border-white/45 transition-all duration-300"
                >
                  ENVIAR
                </button>
              </div>
            </form>

            </section>
          </div>
        </div>
      </div>

      {/* Bio teaser */}
      <section className="border-t border-white/10 flex flex-col sm:flex-row mb-8 sm:mb-16">
        {bioFotoUrl && (
          <div className="order-2 sm:order-1 w-full sm:w-[45%] aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bioFotoUrl}
              alt="Nahuel Beade"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="order-1 sm:order-2 flex-1 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">
          <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-6">ACERCA DE</p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed lowercase mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <Link
            href="/director_de_fotografia/biografia"
            className="text-white/40 text-[0.56rem] font-light border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300 self-start"
          >
            BIOGRAFÍA
          </Link>
        </div>
      </section>

      <Footer imageUrl={heroUrl} />

    </main>
  );
}
