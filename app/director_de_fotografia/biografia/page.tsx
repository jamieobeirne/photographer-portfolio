import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getGlobalSettings } from '@/lib/wordpress';

const P = 'text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case';

export default async function BiografiaDirectorDeFotografiaPage() {
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
  } catch {}

  return (
    <>
      <Header logoUrl={logoUrl} />

      <main className="min-h-screen bg-black text-white pt-16 sm:pt-20">

        {/* Page title */}
        <section className="px-6 sm:px-12 py-20 sm:py-28 text-center">
          <p className="text-white/30 text-[0.58rem] tracking-[0.4em] mb-5">DIRECTOR DE FOTOGRAFÍA</p>
          <h1 className="text-white text-[clamp(1.3rem,3.2vw,2.2rem)] font-light">
            NAHUEL BEADE
          </h1>
          <div className="w-8 h-px bg-white/15 mx-auto mt-8" />
        </section>

        {/* Bio content */}
        <section className="px-6 sm:px-12 pb-24 max-w-3xl mx-auto space-y-8">
          <p className={P}>
            Nahuel Beade es director de fotografía y operador de cámara con base en Barcelona, con
            formación en cine y una amplia experiencia en proyectos de ficción, documental y
            publicidad.
          </p>
          <p className={P}>
            Nació el 21 de octubre de 1986 en Santa Fe (Argentina) y creció en Paraná, donde desde
            muy joven desarrolló un fuerte vínculo con la imagen, el cine y los procesos creativos.
            Se formó en la Escuela de Artes Visuales “Prof. Roberto López Carnelli”, destacándose
            académicamente, y posteriormente en la Tecnicatura Superior de Cine y Artes
            Audiovisuales del I.S.C.A.A. Santa Fe, graduándose en 2012. Complementó su formación
            con diversas especializaciones en Dirección de Fotografía y cine digital consolidando
            una base técnica y estética sólida.
          </p>
          <p className={P}>
            A lo largo de más de 18 años de experiencia, ha trabajado en el sector audiovisual y
            fotográfico participando en proyectos de publicidad, ficción y documental presentados
            en múltiples formatos. Tanto de manera independiente como en colaboración con
            productoras y equipos técnicos.
          </p>
          <p className={P}>
            Como director de fotografía, su trabajo se centra en la construcción de atmósferas a
            través de la luz, la composición y el movimiento de cámara, adaptándose a las
            necesidades narrativas de cada proyecto. Ha participado como DoP y op. de cámara en
            tres proyectos de largometraje: <em>El Voluntario</em> (2020),{' '}
            <em>Ruinas Artificiales</em> (posproducción), <em>Un Deseo Para Noche Buena</em>{' '}
            (posproducción). Como op. de cámara se destacan <em>Todo Para Mí</em> (2019),{' '}
            <em>Preñadas</em> (2022) y <em>Des.conexión</em> (posproducción). Y como foquista{' '}
            <em>Quién Mató al Bebé Uriarte</em> (2013), <em>El Gurí</em> (2014),{' '}
            <em>One Shot</em> (2017), <em>Vergara</em> (2018), <em>Animalia</em> (2019),{' '}
            <em>Cuando Ya No Esté</em> (2022), <em>Parque Central</em> (2023),{' '}
            <em>Paisaje</em> (2023) y <em>Antes del Cuerpo</em> (2024).
          </p>
          <p className={P}>
            Actualmente reside en Barcelona, donde continúa desarrollando su trabajo como director
            de fotografía y operador de cámara en proyectos publicitarios, documentales y de
            ficción.
          </p>

          <div className="pt-4 flex items-center gap-6">
            <Link
              href="/director_de_fotografia"
              className="text-white/40 text-[0.56rem] font-light hover:text-white transition-colors duration-300"
            >
              ← VOLVER
            </Link>
            <Link
              href="/contacto"
              className="text-white/40 text-[0.56rem] font-light border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300"
            >
              CONTACTO
            </Link>
          </div>
        </section>

        <Footer />

      </main>
    </>
  );
}
