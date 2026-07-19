import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function DirectorDeFotografiaPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let fotoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_dir_fotographia?.url ?? null;
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
    fotoUrl = settings.cinematographer_nahuel?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} portraitTop />

      {/* Bio teaser */}
      <section className="border-t border-white/10 flex flex-col sm:flex-row mb-8 sm:mb-16 w-[90vw] mx-auto">
        {fotoUrl && (
          <div className="order-2 sm:order-1 w-full sm:w-[45%] aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotoUrl}
              alt="Nahuel Beade"
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        )}
        <div className="order-1 sm:order-2 flex-1 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">
          <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-6">ACERCA DE</p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case mb-6">
            Nahuel Beade es director de fotografía y operador de cámara con base en
            Barcelona, con formación en cine y una amplia experiencia en proyectos
            de ficción, documental y publicidad.
          </p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case mb-6">
            Nació el 21 de octubre de 1986 en Santa Fe (Argentina) y creció en Paraná, donde
            desde muy joven desarrolló un fuerte vínculo con la imagen, el cine y los procesos
            creativos. Se formó en la Escuela de Artes Visuales “Prof. Roberto López Carnelli”,
            destacándose académicamente, y posteriormente en la Tecnicatura Superior de Cine y
            Artes Audiovisuales del I.S.C.A.A. Santa Fe, graduándose en 2012. Complementó su
            formación con diversas especializaciones en Dirección de Fotografía y cine digital
            consolidando una base técnica y estética sólida.
          </p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case mb-6">
            A lo largo de más de 18 años de experiencia, ha trabajado en el sector audiovisual
            y fotográfico participando en proyectos de publicidad, ficción y documental
            presentados en múltiples formatos. Tanto de manera independiente como en
            colaboración con productoras y equipos técnicos.
          </p>
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case mb-6">
            Como director de fotografía, su trabajo se centra en la construcción de atmósferas
            a través de la luz, la composición y el movimiento de cámara, adaptándose a las
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
          <p className="text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case mb-8">
            Actualmente reside en Barcelona, donde continúa desarrollando su trabajo como
            director de fotografía y operador de cámara en proyectos publicitarios,
            documentales y de ficción.
          </p>
          <Link
            href="/director_de_fotografia/biografia"
            className="text-white/40 text-[0.56rem] font-light border border-white/15 px-7 py-3 hover:text-white hover:border-white/45 transition-all duration-300 self-start"
          >
            BIOGRAFÍA
          </Link>
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" portraitTop />

    </main>
  );
}
