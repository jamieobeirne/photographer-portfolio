import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { VideoBackground } from '@/components/VideoBackground';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function ContactoPage() {
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    logoUrl = settings.main_logo_new?.url ?? null;
  } catch {}

  return (
    <>
      <VideoBackground startTime={20} />
      <main className="relative min-h-screen text-white" style={{ zIndex: 2 }}>

      <PageHero logoUrl={logoUrl} />

      {/* Page title */}
      <section className="px-6 sm:px-12 py-20 sm:py-28 text-center">
        <p className="text-white/30 text-[0.58rem] tracking-[0.4em] mb-5">CONTACTO</p>
        <h1 className="text-white text-[clamp(1.3rem,3.2vw,2.2rem)] font-light">
          NAHUEL BEADE
        </h1>
        <div className="w-8 h-px bg-white/15 mx-auto mt-8" />
      </section>

      <section className="px-6 sm:px-12 pb-24 max-w-3xl mx-auto">

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

      <Footer />

    </main>
    </>
  );
}
