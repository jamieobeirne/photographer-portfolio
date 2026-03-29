import Link from 'next/link';

export default function ContactoPage() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center px-6 py-16 sm:py-24">

      {/* Top-right nav */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center gap-4 sm:gap-6">
        <Link
          href="/home"
          className="text-white/75 text-[0.65rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors duration-300"
        >
          HOME
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-2xl w-full space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-white/55 text-[clamp(0.66rem,1.8vw,0.84rem)] font-light tracking-[0.4em]">
            CONTACTO
          </p>
          <h1 className="text-white text-[clamp(1.3rem,3.9vw,2.28rem)] font-light tracking-[0.2em]">
            NAHUEL BEADE
          </h1>
          <div className="w-8 h-px bg-white/20 mx-auto" />
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 text-center">
          <div className="space-y-2">
            <p className="text-white/45 text-[0.72rem] font-light tracking-[0.3em]">EMAIL</p>
            <p className="text-white/85 text-[clamp(0.84rem,1.8vw,1.02rem)] font-light tracking-wide">
              hola@nahuelbeade.com
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-white/45 text-[0.72rem] font-light tracking-[0.3em]">TELÉFONO</p>
            <p className="text-white/85 text-[clamp(0.84rem,1.8vw,1.02rem)] font-light tracking-wide">
              +54 11 0000 0000
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-white/45 text-[0.72rem] font-light tracking-[0.3em]">UBICACIÓN</p>
            <p className="text-white/85 text-[clamp(0.84rem,1.8vw,1.02rem)] font-light tracking-wide">
              Buenos Aires, Argentina
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-white/10" />

        {/* Email form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-white/45 text-[0.6rem] font-light tracking-[0.3em]">
                NOMBRE
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                className="w-full bg-transparent border-b border-white/20 py-2 text-white/85 text-[clamp(0.84rem,1.8vw,1.02rem)] font-light placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors duration-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-white/45 text-[0.6rem] font-light tracking-[0.3em]">
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="w-full bg-transparent border-b border-white/20 py-2 text-white/85 text-[clamp(0.84rem,1.8vw,1.02rem)] font-light placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors duration-300"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="mensaje" className="text-white/45 text-[0.6rem] font-light tracking-[0.3em]">
              MENSAJE
            </label>
            <textarea
              id="mensaje"
              rows={4}
              placeholder="Tu mensaje..."
              className="w-full bg-transparent border-b border-white/20 py-2 text-white/85 text-[clamp(0.84rem,1.8vw,1.02rem)] font-light placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors duration-300 resize-none"
            />
          </div>
          <div className="text-center pt-2">
            <button
              type="submit"
              className="text-white/55 text-[0.6rem] font-light tracking-[0.3em] border border-white/20 px-8 py-3 hover:text-white hover:border-white/60 transition-all duration-300"
            >
              ENVIAR
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}
