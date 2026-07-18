import Link from 'next/link';

const P = 'normal-case text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed text-left';

export default function BiografiaDirectorPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 pt-20 pb-12 sm:py-24">

      {/* Fixed nav */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center gap-4 sm:gap-6">
        <Link href="/contacto" className="text-white/75 text-[0.65rem] sm:text-xs font-light hover:text-white transition-colors duration-300">
          CONTACTO
        </Link>
        <Link href="/home" className="text-white/75 text-[0.65rem] sm:text-xs font-light hover:text-white transition-colors duration-300">
          HOME
        </Link>
      </div>

      <Link
        href="/director"
        className="fixed top-4 left-4 sm:top-6 sm:left-8 z-20 text-white/75 text-[0.65rem] sm:text-xs font-light hover:text-white transition-colors duration-300"
      >
        <span className="sm:hidden">←</span>
        <span className="hidden sm:inline">← DIRECTOR</span>
      </Link>

      <div className="max-w-2xl w-full text-center space-y-8">
        <p className="text-white/30 text-[0.58rem] tracking-[0.4em]">BIOGRAFÍA</p>
        <h1 className="text-white text-[clamp(1.3rem,3.2vw,2.2rem)] font-light">NAHUEL BEADE</h1>
        <p className="text-white/40 text-[0.58rem]">DIRECTOR</p>
        <div className="w-8 h-px bg-white/15 mx-auto" />
        <p className={P}>
          Nahuel Beade es director audiovisual con base en Barcelona, con formación en cine y una
          sólida trayectoria en proyectos de ficción, documental y contenido comercial.
        </p>
        <p className={P}>
          Nació el 21 de octubre de 1986 en Santa Fe (Argentina) y creció en Paraná, donde desde
          muy joven desarrolló un fuerte vínculo con la imagen, el cine, la música y los procesos
          creativos. Se formó en la Escuela de Artes Visuales “Prof. Roberto López Carnelli”, donde
          se destacó académicamente, y posteriormente en la Tecnicatura Superior de Cine y Artes
          Audiovisuales del I.S.C.A.A. Santa Fe, graduándose en 2012. Su formación se complementa
          con diversas especializaciones en Dirección de Fotografía, lo que influye directamente en
          su enfoque visual como director.
        </p>
        <p className={P}>
          A lo largo de más de 18 años de experiencia, ha trabajado en el ámbito audiovisual y
          fotográfico tanto de manera independiente como en colaboración con equipos de
          comunicación, desarrollando proyectos en publicidad, ficción y documental.
        </p>
        <p className={P}>
          Como director, ha desarrollado una amplia variedad de proyectos propios, incluyendo
          cortometrajes, videoclips, livesessions y formatos experimentales, donde combina una
          mirada narrativa con una fuerte impronta visual. Entre sus trabajos se destacan{' '}
          <em>Cuadrillas y Galpones</em> (2010), <em>Barquito</em> (2013),{' '}
          <em>Dimensión Acústica</em> (2013), <em>La Caída de los Globos</em> (2014),{' '}
          <em>Proyecciones: La Voz de los Héroes</em> (2015),{' '}
          <em>Urbanos: La Vida en Colectivos</em> (2018), <em>La Pasarela</em> (2020),{' '}
          <em>Lo Que Se Perdió</em> (2021) y <em>Vibra Electrónica</em> (2023).
        </p>
        <p className={P}>
          Paralelamente, ha participado en proyectos de otros realizadores como director de
          fotografía, operador de cámara y foquista, experiencia que refuerza su comprensión
          integral del proceso cinematográfico y su capacidad para trabajar dentro de equipos
          técnicos en distintos contextos de producción.
        </p>
        <p className={P}>
          Actualmente reside en Barcelona, donde desarrolla proyectos en el ámbito publicitario y
          musical, y se encuentra en proceso de desarrollo de su primer largometraje.
        </p>
        <div className="pt-4 flex justify-center">
          <Link href="/contacto" className="text-white/40 text-[0.56rem] font-light border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300">
            CONTACTO
          </Link>
        </div>
      </div>

    </main>
  );
}
