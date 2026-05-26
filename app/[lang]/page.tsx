import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata, SITE_NAME, SITE_URL } from '@/lib/seo';
import { getTopCities } from '@/lib/data/cities';
import { getAllCountries, getCountry, getCountryName } from '@/lib/data/countries';
import { getAllVisas } from '@/lib/data/visas';
import { getAllGuides } from '@/lib/data/guides';
import { getAllCriteria, getCriterionTitle } from '@/lib/data/criteria';
import { CityCard } from '@/components/CityCard';
import { CountryCard } from '@/components/CountryCard';
import { VisaCard } from '@/components/VisaCard';
import { GuideCard } from '@/components/GuideCard';
import { JsonLd } from '@/components/JsonLd';
import { LogoMark } from '@/components/Logo';
import { flagEmoji } from '@/lib/flag';

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
  const countries = getAllCountries();
  const trendingCountries = countries.filter((c) => c.tags.includes('trending')).slice(0, 5);
  const criteria = getAllCriteria().slice(0, 6);

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: params.lang,
    description: dict.home.heroSubtitle,
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-noise pt-16 pb-20 sm:pt-24 sm:pb-28 -mx-5 sm:-mx-8 px-5 sm:px-8">
        <div className="max-w-container mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent-deep text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Curated for slow nomads · 2026
              </div>
              <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tightest leading-[1.02] font-display">
                {dict.home.heroTitle}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-charcoal leading-relaxed max-w-2xl">
                {dict.home.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/${params.lang}/cities`}
                  className="inline-flex items-center gap-2 rounded-md bg-ink text-cream px-6 py-3 text-sm font-medium hover:bg-accent-deep transition-colors"
                >
                  {dict.home.exploreCities}
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href={`/${params.lang}/visas`}
                  className="inline-flex items-center rounded-md border border-ink/20 px-6 py-3 text-sm font-medium hover:bg-paper hover:border-ink transition-colors"
                >
                  {dict.nav.visas}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-paper border border-line p-5">
                <p className="text-3xl font-semibold tracking-tightest">{countries.length}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted">Countries</p>
              </div>
              <div className="rounded-2xl bg-sage-soft/40 border border-sage/20 p-5">
                <p className="text-3xl font-semibold tracking-tightest">{cities.length}+</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted">Nomad cities</p>
              </div>
              <div className="rounded-2xl bg-sand-soft/40 border border-sand/20 p-5">
                <p className="text-3xl font-semibold tracking-tightest">{visas.length}+</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted">Nomad visas</p>
              </div>
              <div className="rounded-2xl bg-sky-soft/40 border border-sky/20 p-5">
                <p className="text-3xl font-semibold tracking-tightest">{guides.length}+</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted">Long guides</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      {trendingCountries.length > 0 && (
        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-semibold">Google Trends 2026</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tightish font-display">
                Trending right now
              </h2>
            </div>
            <Link
              href={`/${params.lang}/best/trending-countries`}
              className="text-sm text-accent hover:underline underline-offset-4"
            >
              See all →
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {trendingCountries.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${params.lang}/countries/${c.slug}`}
                  className="block rounded-xl border border-line bg-paper p-4 card-hover text-center"
                >
                  <div className="text-4xl mb-2">{flagEmoji(c.code)}</div>
                  <div className="font-semibold tracking-tightish">{getCountryName(c, params.lang)}</div>
                  <div className="mt-1 text-xs text-muted">{c.region}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Top cities */}
      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tightish font-display">Top nomad cities</h2>
          <Link href={`/${params.lang}/cities`} className="text-sm text-accent hover:underline underline-offset-4">
            See all {dict.nav.cities.toLowerCase()} →
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

      {/* Browse by criterion */}
      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tightish font-display">Browse by criterion</h2>
          <Link href={`/${params.lang}/best`} className="text-sm text-accent hover:underline underline-offset-4">
            All filters →
          </Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {criteria.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${params.lang}/best/${c.slug}`}
                className="block rounded-xl border border-line bg-paper px-5 py-4 card-hover"
              >
                <h3 className="font-semibold tracking-tightish">{getCriterionTitle(c, params.lang)}</h3>
                <p className="mt-1 text-sm text-muted line-clamp-2">{c.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Visas */}
      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tightish font-display">Digital nomad visas</h2>
          <Link href={`/${params.lang}/visas`} className="text-sm text-accent hover:underline underline-offset-4">
            See all visas →
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

      {/* Guides */}
      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tightish font-display">Long-stay guides</h2>
          <Link href={`/${params.lang}/guides`} className="text-sm text-accent hover:underline underline-offset-4">
            See all guides →
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

      {/* CTA strip */}
      <section className="mt-24 rounded-3xl bg-paper-gradient border border-line p-10 sm:p-14 text-center">
        <LogoMark size={48} className="text-accent mx-auto" />
        <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tightest font-display">
          Stay longer. Live deeper.
        </h2>
        <p className="mt-3 text-muted max-w-xl mx-auto">
          Every page on Slowmadly is researched for nomads who pick a place and settle in
          for a month, a season, or a year.
        </p>
        <div className="mt-7">
          <Link
            href={`/${params.lang}/best`}
            className="inline-flex items-center gap-2 rounded-md bg-ink text-cream px-6 py-3 text-sm font-medium hover:bg-accent-deep transition-colors"
          >
            Find your next basecamp <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <JsonLd data={websiteLd} />
    </>
  );
}
