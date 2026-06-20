import { IntroHome } from '@/components/IntroHome';
import { getGlobalSettings } from '@/lib/wordpress';

export default async function IntroPage() {
  let logoUrl: string | null = null;
  try {
    const settings = await getGlobalSettings();
    logoUrl = settings.main_logo_new?.url ?? null;
  } catch {}

  return <IntroHome logoUrl={logoUrl} />;
}
