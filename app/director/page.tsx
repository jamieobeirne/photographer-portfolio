import { DirectorNavLinks } from '@/components/DirectorNavLinks';
import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings, resolveLogoVideoField } from '@/lib/wordpress';

export const revalidate = 3600;

export default async function DirectorPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let video: { url: string; type: string } | null = null;
  let bioFotoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    // Spec 4.4: new FOTO FONDO MENÚ image, falling back to previous fondo_direccion
    heroUrl = settings.fondo_menu_director?.url ?? settings.fondo_direccion?.url ?? null;
    logoUrl = settings.logo_direccion?.url ?? null;
    video = resolveLogoVideoField(settings.director_video);
    bioFotoUrl = settings.director_bio_foto?.url ?? null;
  } catch {}

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<DirectorNavLinks />} />

      {video && (
        <section className="mt-8 sm:mt-16 mb-8 sm:mb-16">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-[90vw] mx-auto aspect-video block"
          >
            <source src={video.url} type={video.type} />
          </video>
        </section>
      )}

      {/* Bio — text left, photo right (spec 4.3: Nahuel looks left in the photo) */}
      <section className="border-t border-white/10 flex flex-col lg:flex-row mb-8 sm:mb-16 w-[90vw] mx-auto">
        {bioFotoUrl && (
          <div className="order-2 relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden shrink-0">
            <Image
              src={bioFotoUrl}
              alt="Nahuel Beade"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="order-1 w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20 space-y-6">
          <p className="text-white/30 text-[0.52rem] tracking-[0.4em]">ACERCA DE</p>
          <p className="normal-case text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case">
            Nahuel Beade es director audiovisual con base en Barcelona, con
            formación en cine y una sólida trayectoria en proyectos de ficción,
            documental y contenido comercial.
          </p>
          <p className="normal-case text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case">
            Nació el 21 de octubre de 1986 en Santa Fe (Argentina) y creció en Paraná, donde
            desde muy joven desarrolló un fuerte vínculo con la imagen, el cine, la música y
            los procesos creativos. Se formó en la Escuela de Artes Visuales “Prof. Roberto
            López Carnelli”, donde se destacó académicamente, y posteriormente en la
            Tecnicatura Superior de Cine y Artes Audiovisuales del I.S.C.A.A. Santa Fe,
            graduándose en 2012. Su formación se complementa con diversas especializaciones
            en Dirección de Fotografía, lo que influye directamente en su enfoque visual
            como director.
          </p>
          <p className="normal-case text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case">
            A lo largo de más de 18 años de experiencia, ha trabajado en el ámbito audiovisual
            y fotográfico tanto de manera independiente como en colaboración con equipos de
            comunicación, desarrollando proyectos en publicidad, ficción y documental.
          </p>
          <p className="normal-case text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case">
            Como director, ha desarrollado una amplia variedad de proyectos propios, incluyendo
            cortometrajes, videoclips, livesessions y formatos experimentales, donde combina
            una mirada narrativa con una fuerte impronta visual. Entre sus trabajos se
            destacan <em>Cuadrillas y Galpones</em> (2010), <em>Barquito</em> (2013),{' '}
            <em>Dimensión Acústica</em> (2013), <em>La Caída de los Globos</em> (2014),{' '}
            <em>Proyecciones: La Voz de los Héroes</em> (2015),{' '}
            <em>Urbanos: La Vida en Colectivos</em> (2018), <em>La Pasarela</em> (2020),{' '}
            <em>Lo Que Se Perdió</em> (2021) y <em>Vibra Electrónica</em> (2023).
          </p>
          <p className="normal-case text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case">
            Paralelamente, ha participado en proyectos de otros realizadores como director de
            fotografía, operador de cámara y foquista, experiencia que refuerza su comprensión
            integral del proceso cinematográfico y su capacidad para trabajar dentro de
            equipos técnicos en distintos contextos de producción.
          </p>
          <p className="normal-case text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed normal-case">
            Actualmente reside en Barcelona, donde desarrolla proyectos en el ámbito
            publicitario y musical, y se encuentra en proceso de desarrollo de su primer
            largometraje.
          </p>
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
