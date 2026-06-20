import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { VideoBackground } from '@/components/VideoBackground';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function ContactoPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_contacto?.url ?? null;
    logoUrl = settings.main_logo_new?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} />

      {/* Body — video plays only here */}
      <div className="relative overflow-hidden">
        <VideoBackground startTime={20} overlayOpacity={0.3} />

        {/* Logo — sits over video */}
        <section className="relative z-10 flex justify-center py-20 sm:py-28">
          {logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt="Nahuel Beade"
              className="h-[5rem] sm:h-[6rem] md:h-[7rem] w-auto object-contain"
            />
          )}
        </section>

        {/* Form section — extra dark layer for readability */}
        <div className="relative z-10">
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <section className="relative px-6 sm:px-12 pb-24 max-w-3xl mx-auto">

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row justify-center gap-12 sm:gap-20 text-center mb-16">
              <div className="space-y-2">
                <p className="text-white/30 text-[0.52rem] font-light tracking-[0.4em]">EMAIL</p>
                <p className="text-white/70 text-[clamp(0.84rem,1.6vw,1rem)] font-light">
                  hola@nahuelbeade.com
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-white/30 text-[0.52rem] font-light tracking-[0.4em]">TELÉFONO</p>
                <p className="text-white/70 text-[clamp(0.84rem,1.6vw,1rem)] font-light">
                  +54 11 0000 0000
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-white/30 text-[0.52rem] font-light tracking-[0.4em]">UBICACIÓN</p>
                <p className="text-white/70 text-[clamp(0.84rem,1.6vw,1rem)] font-light">
                  Buenos Aires, Argentina
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/10 mb-16" />

            {/* Form */}
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-white/30 text-[0.52rem] font-light tracking-[0.4em]">
                    NOMBRE
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="tu nombre"
                    className="w-full bg-transparent border-b border-white/15 py-2.5 text-white/75 text-[clamp(0.84rem,1.6vw,1rem)] font-light placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white/30 text-[0.52rem] font-light tracking-[0.4em]">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-transparent border-b border-white/15 py-2.5 text-white/75 text-[clamp(0.84rem,1.6vw,1rem)] font-light placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-white/30 text-[0.52rem] font-light tracking-[0.4em]">
                  MENSAJE
                </label>
                <textarea
                  id="mensaje"
                  rows={5}
                  placeholder="tu mensaje..."
                  className="w-full bg-transparent border-b border-white/15 py-2.5 text-white/75 text-[clamp(0.84rem,1.6vw,1rem)] font-light placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="text-white/40 text-[0.56rem] font-light border border-white/15 px-8 py-3 hover:text-white hover:border-white/45 transition-all duration-300"
                >
                  ENVIAR
                </button>
              </div>
            </form>

          </section>
        </div>
      </div>

      <Footer imageUrl={heroUrl} />

    </main>
  );
}
