import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllCities, getCityName } from '@/lib/data/cities';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PromoBanner } from '@/components/PromoBanner';
import { SlateRemoteBanner } from '@/components/SlateRemoteBanner';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: dict.meta.costOfLivingTitle,
    description: dict.meta.costOfLivingDesc,
    pathForLocale: (l) => `/${l}/cost-of-living`,
  });
}

export default async function CostOfLivingIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const cities = [...getAllCities()].sort((a, b) => a.costIndex - b.costIndex);
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/cost-of-living`, label: dict.nav.costOfLiving },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          Cost of living for digital nomads
        </h1>
        <p className="mt-3 text-muted">
          Monthly cost breakdowns for {cities.length} cities. Sorted from cheapest to most expensive.
        </p>
      </header>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${params.lang}/cost-of-living/${c.slug}`}
              className="block rounded-lg border border-line bg-white/40 px-5 py-4 hover:border-ink transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-base font-semibold tracking-tightish">
                  {getCityName(c, params.lang)}
                </h2>
                <span className="text-xs text-muted">Index {c.costIndex}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{c.highlight}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <PromoBanner locale={params.lang} variant="banking" />
        <PromoBanner locale={params.lang} variant="esim" />
      </div>
      <SlateRemoteBanner locale={params.lang} className="mt-10" />
    </div>
  );
}
