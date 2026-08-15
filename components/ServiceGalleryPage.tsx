import { Footer } from '@/components/Footer';
import { FotografoNavLinks } from '@/components/FotografoNavLinks';
import { PageHero } from '@/components/PageHero';
import { getGlobalSettings, getServicePhotos } from '@/lib/wordpress';

interface ServiceGalleryPageProps {
  label: string;
  serviceTag: string;
}

export async function ServiceGalleryPage({ label, serviceTag }: ServiceGalleryPageProps) {
  let heroUrl: string | null = null;
  let logoUrl: string | null = null;
  let photos: Awaited<ReturnType<typeof getServicePhotos>> = [];

  try {
    const settings = await getGlobalSettings();
    heroUrl = settings.fondo_fotographia?.url ?? null;
    logoUrl = settings.logo_fotographia_esp?.url ?? null;
    photos = await getServicePhotos(serviceTag);
  } catch {}

  const projectGroups = Object.entries(
    photos.reduce<Record<string, typeof photos>>((groups, photo) => {
      (groups[photo.project] ??= []).push(photo);
      return groups;
    }, {})
  ).sort(([, a], [, b]) => a[0].projectOrder - b[0].projectOrder || a[0].project.localeCompare(b[0].project));

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHero imageUrl={heroUrl} logoUrl={logoUrl} nav={<FotografoNavLinks />} />

      <section className="page-container py-16 sm:py-20">
        <p className="text-white/45 section-title mb-10">{label}</p>
        {photos.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="aspect-[4/3] bg-white/[0.03] border border-white/10" />
            ))}
          </div>
        ) : (
          <div className="space-y-14">
            {projectGroups.map(([project, projectPhotos]) => (
              <section key={project}>
                {project !== serviceTag && (
                  <p className="text-white/60 project-subtitle mb-5">{project}</p>
                )}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
                  {projectPhotos.map((photo) => (
                    <figure key={photo.id} className="mb-3 break-inside-avoid overflow-hidden bg-white/[0.03] border border-white/10 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        loading="lazy"
                        className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      <Footer imageUrl={heroUrl} logoUrl="/blackLogo.png" />
    </main>
  );
}
