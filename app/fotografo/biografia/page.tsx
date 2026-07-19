import Link from 'next/link';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings } from '@/lib/wordpress';

const P = 'normal-case text-white/65 text-[clamp(0.9rem,1.6vw,1.05rem)] font-light leading-relaxed text-left';

export default async function BiografiaFotografoPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let bioImageUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_fotographia?.url ?? null;
    logoUrl = settings.logo_fotographia_esp?.url ?? null;
    bioImageUrl = settings.fotopage_bio?.url ?? null;
  } catch {}

  return (
    <main className="relative min-h-screen bg-black pb-12 text-white sm:pb-24">
      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      <div className="hidden fixed right-4 top-4 z-20 items-center gap-4 sm:right-8 sm:top-6 sm:gap-6">
        <Link href="/contacto" className="text-[0.65rem] font-light text-white/75 transition-colors duration-300 hover:text-white sm:text-xs">
          CONTACTO
        </Link>
        <Link href="/home" className="text-[0.65rem] font-light text-white/75 transition-colors duration-300 hover:text-white sm:text-xs">
          HOME
        </Link>
      </div>

      <Link href="/fotografo" className="hidden fixed left-4 top-4 z-20 text-[0.65rem] font-light text-white/75 transition-colors duration-300 hover:text-white sm:left-8 sm:top-6 sm:text-xs">
        <span className="sm:hidden">←</span>
        <span className="hidden sm:inline">← FOTÓGRAFO</span>
      </Link>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pt-16 sm:px-12 sm:pt-20 lg:flex-row lg:items-center lg:gap-16">
        {bioImageUrl && (
          <div className="order-2 w-full overflow-hidden lg:w-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bioImageUrl} alt="Nahuel Beade" className="aspect-[4/5] h-full w-full object-cover" />
          </div>
        )}

        <div className="order-1 flex-1 space-y-8 text-center">
          <p className="text-[0.58rem] tracking-[0.4em] text-white/30">CERCA DE</p>
          <p className={P}>Nahuel Beade es fotógrafo con base en Barcelona, especializado en fotografía publicitaria y de producto para marcas, combinando una mirada cinematográfica con una sólida formación en cine.</p>
          <p className={P}>Nació el 21 de octubre de 1986 en Santa Fe (Argentina) y creció en Paraná, donde desde muy joven desarrolló un fuerte vínculo con la imagen, el cine y los procesos creativos. Se formó en la Escuela de Artes Visuales “Prof. Roberto López Carnelli”, destacándose académicamente, y posteriormente en la Tecnicatura Superior de Cine y Artes Audiovisuales del I.S.C.A.A. Santa Fe, graduándose en 2012 donde aprendió la técnica fotográfica.</p>
          <p className={P}>A lo largo de más de 18 años de experiencia, ha trabajado en el ámbito audiovisual y fotográfico desarrollando proyectos tanto de manera independiente como en colaboración con marcas, agencias y equipos de comunicación para redes sociales y otras plataformas y medios.</p>
          <p className={P}>Su trabajo fotográfico se centra en la creación de imágenes con identidad visual clara, especialmente en el ámbito de la fotografía publicitaria y de producto, donde combina el control de la luz, la composición y la dirección visual para generar piezas orientadas a comunicación de marca.</p>
          <p className={P}>Paralelamente, ha desarrollado una amplia experiencia en fotoreportaje y cobertura de eventos corporativos y culturales. Esta combinación entre producción controlada y registro documental le permite adaptarse a distintos contextos de trabajo, manteniendo siempre una mirada coherente.</p>
          <p className={P}>Su enfoque busca integrar lenguaje cinematográfico y fotografía, trasladando recursos narrativos propios del cine a la imagen fija.</p>
          <p className={P}>Actualmente reside en Barcelona, donde continúa desarrollando proyectos en fotografía publicitaria, contenido de marca y cobertura de eventos.</p>
          <div className="hidden">
            <Link href="/contacto" className="border border-white/15 px-7 py-3 text-[0.56rem] font-light text-white/40 transition-all duration-300 hover:border-white/45 hover:text-white">CONTACTO</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
