import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { VideoBackground } from '@/components/VideoBackground';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const result = await searchParams;
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_contacto?.url ?? null;
    logoUrl = settings.main_logo_new?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} hideNav />

      {/* Body — video plays only here */}
      <div className="relative overflow-hidden">
        <VideoBackground startTime={20} overlayOpacity={0.3} />

        <div className="pt-14 sm:pt-20" />

        {/* Form section — centered dark rectangle, not full-width */}
        <div className="relative z-10 px-6 sm:px-8 pb-24 flex justify-center">
          <div className="w-full max-w-3xl bg-black/60">
            <section className="relative px-8 sm:px-12 py-10">

            {result.sent === '1' && (
              <p className="mb-8 text-center text-[0.62rem] font-light text-white/75">
                MENSAJE ENVIADO CORRECTAMENTE.
              </p>
            )}
            {result.error === '1' && (
              <p className="mb-8 text-center text-[0.62rem] font-light text-red-300/80">
                NO SE PUDO ENVIAR EL MENSAJE. REVISA LA CONFIGURACIÓN E INTÉNTALO DE NUEVO.
              </p>
            )}

            {/* Form */}
            <form action="/api/contact" method="post" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-white text-[0.52rem] font-light tracking-[0.4em]">
                    NOMBRE
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
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
                    name="email"
                    type="email"
                    required
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
                  name="mensaje"
                  rows={5}
                  required
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


      <Footer imageUrl={heroUrl} />

    </main>
  );
}
