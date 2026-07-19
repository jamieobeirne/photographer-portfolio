import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { getDirectorPhotographyReels, getGlobalSettings } from '@/lib/wordpress';

export const revalidate = 3600;

export default async function DirectorDeFotografiaPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let fotoUrl: string | null = null;
  let reels: Awaited<ReturnType<typeof getDirectorPhotographyReels>> = [];
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_dir_fotographia?.url ?? null;
    logoUrl = settings.logo_dir_fotographia_esp?.url ?? null;
    fotoUrl = settings.cinematographer_nahuel?.url ?? null;
    reels = await getDirectorPhotographyReels();
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} portraitTop />

      {reels.length > 0 && (
        <section className="w-[90vw] mx-auto py-12 sm:py-16">
          <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-8">REELS</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {reels.map((reel) => (
              <figure key={reel.url} className="bg-white/[0.03] border border-white/10">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={reel.poster}
                  className="w-full h-auto block"
                  aria-label={reel.label}
                >
                  <source src={reel.url} type="video/mp4" />
                </video>
                <figcaption className="px-4 py-3 text-white/40 text-[0.5rem] tracking-[0.28em]">
                  {reel.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Bio teaser */}
      <section className="border-t border-white/10 flex flex-col lg:flex-row mb-8 sm:mb-16 w-[90vw] mx-auto">
        {fotoUrl && (
          <div className="order-2 lg:order-1 relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden shrink-0">
            <Image
              src={fotoUrl}
              alt="Nahuel Beade"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        )}
        <div className="order-1 lg:order-2 w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20">
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
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" portraitTop />

    </main>
  );
}
