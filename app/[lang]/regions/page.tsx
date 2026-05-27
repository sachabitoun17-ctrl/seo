import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllRegions } from '@/lib/data/regions';
import { RegionCard } from '@/components/RegionCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PromoBanner } from '@/components/PromoBanner';
import { SlateRemoteBanner } from '@/components/SlateRemoteBanner';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.lang,
    title: 'Digital nomad destinations by region (2026)',
    description: 'Browse 50+ digital nomad countries across Europe, SEA, Latin America, East Asia, Caucasus, Africa & the Caribbean.',
    pathForLocale: (l) => `/${l}/regions`,
  });
}

export default async function RegionsIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const regions = getAllRegions();

  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/regions`, label: dict.nav.regions },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          Regions
        </h1>
        <p className="mt-3 text-muted">{regions.length} regions, 50+ countries to explore.</p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((r) => (
          <li key={r.slug}>
            <RegionCard region={r} locale={params.lang} />
          </li>
        ))}
      </ul>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <PromoBanner locale={params.lang} variant="setup" />
        <PromoBanner locale={params.lang} variant="insurance" />
      </div>
      <SlateRemoteBanner locale={params.lang} className="mt-10" />
    </div>
  );
}
