import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllCountries } from '@/lib/data/countries';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CountriesFilters } from '@/components/CountriesFilters';
import { PromoBanner } from '@/components/PromoBanner';
import { SlateRemoteBanner } from '@/components/SlateRemoteBanner';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `${dict.nav.countries} ${dict.meta.forNomads2026}`,
    description: dict.meta.countriesDesc,
    pathForLocale: (l) => `/${l}/countries`,
  });
}

export default async function CountriesIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const countries = getAllCountries();

  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/countries`, label: dict.nav.countries },
      ]} />
      <header className="max-w-3xl mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
            {dict.nav.countries}
          </h1>
          <p className="mt-3 text-muted">
            {countries.length} countries ranked for digital nomads in 2026. Filter by visa, cost, internet, safety.
          </p>
        </div>
        <Link
          href={`/${params.lang}/finder`}
          className="inline-flex items-center gap-2 rounded-md bg-accent text-cream px-5 py-2.5 text-sm font-semibold hover:bg-accent-deep transition-colors whitespace-nowrap"
        >
          {dict.detail.takeQuiz} →
        </Link>
      </header>

      <div className="mt-10">
        <CountriesFilters countries={countries} locale={params.lang} />
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <PromoBanner locale={params.lang} variant="setup" />
        <PromoBanner locale={params.lang} variant="insurance" />
      </div>

      <SlateRemoteBanner locale={params.lang} className="mt-10" />
    </div>
  );
}
