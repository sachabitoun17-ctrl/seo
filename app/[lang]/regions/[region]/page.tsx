import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllRegions, getRegion, getRegionName } from '@/lib/data/regions';
import { getCountry } from '@/lib/data/countries';
import { CountryCard } from '@/components/CountryCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JobsCTA } from '@/components/JobsCTA';
import { PartnerStack } from '@/components/PartnerStack';

export const dynamicParams = false;
export const revalidate = false;

type Props = { params: { lang: Locale; region: string } };

export function generateStaticParams() {
  const regions = getAllRegions();
  return LOCALES.flatMap((lang) =>
    regions.map((r) => ({ lang, region: r.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = getRegion(params.region);
  if (!region) return {};
  const name = getRegionName(region, params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `${name} for digital nomads: ${region.countries.length} countries (2026)`,
    description: region.description,
    pathForLocale: (l) => `/${l}/regions/${region.slug}`,
  });
}

export default async function RegionDetailPage({ params }: Props) {
  const region = getRegion(params.region);
  if (!region) notFound();
  const name = getRegionName(region, params.lang);
  const countries = region.countries
    .map(getCountry)
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <article className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/regions`, label: 'Regions' },
        { href: `/${params.lang}/regions/${region.slug}`, label: name },
      ]} />

      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tightish">{name}</h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">{region.description}</p>
      </header>

      <section className="mt-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => (
            <li key={c.slug}>
              <CountryCard country={c} locale={params.lang} />
            </li>
          ))}
        </ul>
      </section>

      <JobsCTA locale={params.lang} heading={`Remote roles across ${name}`} />
      <PartnerStack
        locale={params.lang}
        categories={['banking', 'insurance', 'esim', 'travel-meta', 'accommodation']}
      />
    </article>
  );
}
