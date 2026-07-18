import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings, getServicePhotosByProject } from '@/lib/wordpress';
import type { ServicePhoto } from '@/lib/wordpress';

export default async function FotoproductoPage() {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let projects: Record<string, ServicePhoto[]> = {};
  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_fotographia?.url ?? null;
    logoUrl = settings.logo_fotographia_esp?.url ?? null;
    projects = await getServicePhotosByProject('fotoproducto');
  } catch {}
  const projectNames = Object.keys(projects);

  return (
    <main className="min-h-screen bg-black text-white">

      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      <section className="px-6 sm:px-12 py-16 sm:py-20 max-w-6xl mx-auto">
        <p className="text-white/30 text-[0.52rem] tracking-[0.4em] mb-10">FOTOPRODUCTO</p>
        {projectNames.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1,2,3,4,5,6].map((n) => (
              <div key={n} className="aspect-video bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-500" />
            ))}
          </div>
        ) : (
          /* Photos grouped by project (Nahuel: cada proyecto agrupado, no mezclado) */
          projectNames.map((project) => (
            <div key={project} className="mb-14 last:mb-0">
              <p className="text-white/45 text-[0.6rem] tracking-[0.35em] mb-4">{project}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {projects[project].map((photo) => (
                  <div key={photo.id} className="aspect-video overflow-hidden bg-white/[0.03] border border-white/10 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      <section className="border-t border-white/10 px-6 sm:px-12 py-12">
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          <Link href="/fotografo/servicios" className="text-white/40 text-[0.54rem] font-light hover:text-white transition-colors duration-300">
            ← SERVICIOS
          </Link>
          <Link href="/contacto" className="text-white/40 text-[0.54rem] font-light border border-white/15 px-8 py-3.5 hover:text-white hover:border-white/45 transition-all duration-300">
            CONTACTO
          </Link>
        </div>
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />

    </main>
  );
}
