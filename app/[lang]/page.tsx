import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata, SITE_NAME, SITE_URL } from '@/lib/seo';
import { getTopCities } from '@/lib/data/cities';
import { getAllCountries } from '@/lib/data/countries';
import { getAllVisas } from '@/lib/data/visas';
import { getAllGuides } from '@/lib/data/guides';
import { CityCard } from '@/components/CityCard';
import { VisaCard } from '@/components/VisaCard';
import { GuideCard } from '@/components/GuideCard';
import { JsonLd } from '@/components/JsonLd';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: dict.home.heroTitle,
    description: dict.home.heroSubtitle,
    pathForLocale: (l) => `/${l}`,
  });
}

export default async function HomePage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const cities = getTopCities(9);
  const visas = getAllVisas().slice(0, 6);
  const guides = getAllGuides().slice(0, 6);
  const countryCount = getAllCountries().length;

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: params.lang,
    description: dict.home.heroSubtitle,
  };

  return (
    <div className="py-16 sm:py-24">
      <section className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tightish leading-[1.1]">
          {dict.home.heroTitle}
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl">
          {dict.home.heroSubtitle}
        </p>
        <p className="mt-3 text-sm text-muted">
          {countryCount} countries · 55 cities · 35 nomad visas · {guides.length}+ guides
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${params.lang}/cities`}
            className="inline-flex items-center rounded-md bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-ink/90 transition-colors"
          >
            {dict.home.exploreCities}
          </Link>
          <Link
            href={`/${params.lang}/visas`}
            className="inline-flex items-center rounded-md border border-line px-5 py-2.5 text-sm font-medium hover:border-ink transition-colors"
          >
            {dict.nav.visas}
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tightish">Top nomad cities</h2>
          <Link
            href={`/${params.lang}/cities`}
            className="text-sm text-accent hover:underline underline-offset-4"
          >
            See all →
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <li key={c.slug}>
              <CityCard city={c} locale={params.lang} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tightish">Digital nomad visas</h2>
          <Link
            href={`/${params.lang}/visas`}
            className="text-sm text-accent hover:underline underline-offset-4"
          >
            See all →
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visas.map((v) => (
            <li key={v.slug}>
              <VisaCard visa={v} locale={params.lang} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tightish">Long-stay guides</h2>
          <Link
            href={`/${params.lang}/guides`}
            className="text-sm text-accent hover:underline underline-offset-4"
          >
            See all →
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} locale={params.lang} />
            </li>
          ))}
        </ul>
      </section>

      <JsonLd data={websiteLd} />
    </div>
  );
}
