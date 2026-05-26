import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDictionary, LOCALES, type Locale } from '@/lib/i18n';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import {
  getAllCities,
  getCity,
  getCityName,
  getCitiesByCountry,
} from '@/lib/data/cities';
import { getCountry, getCountryName } from '@/lib/data/countries';
import { getVisasByCountry } from '@/lib/data/visas';
import { PartnerStack } from '@/components/PartnerStack';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { VisaCard } from '@/components/VisaCard';
import { CityCard } from '@/components/CityCard';
import { GuideCard } from '@/components/GuideCard';
import { FaqSection } from '@/components/FaqSection';
import { cityFaqs } from '@/lib/faq-templates';
import { getGuidesForCity } from '@/lib/data/guides';
import { JobsCTA } from '@/components/JobsCTA';

export const dynamicParams = false;
export const revalidate = false;

type Props = { params: { lang: Locale; city: string } };

export function generateStaticParams() {
  const cities = getAllCities();
  return LOCALES.flatMap((lang) =>
    cities.map((c) => ({ lang, city: c.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity(params.city);
  if (!city) return {};
  const name = getCityName(city, params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `${name} for digital nomads 2026: cost, wifi, visa`,
    description: `${name}: rent, internet speed, safety, weather and visa guide. Nomad score ${city.nomadScore}/10.`,
    pathForLocale: (l) => `/${l}/cities/${city.slug}`,
  });
}

export default async function CityDetailPage({ params }: Props) {
  const city = getCity(params.city);
  if (!city) notFound();
  const dict = await getDictionary(params.lang);
  const country = getCountry(city.country);
  const name = getCityName(city, params.lang);
  const countryName = country ? getCountryName(country, params.lang) : city.country;
  const visas = country ? getVisasByCountry(country.slug) : [];
  const siblingCities = country
    ? getCitiesByCountry(country.slug).filter((c) => c.slug !== city.slug)
    : [];
  const guides = getGuidesForCity(city.slug);

  const place = {
    '@context': 'https://schema.org',
    '@type': 'City',
    name,
    containedInPlace: country ? { '@type': 'Country', name: countryName } : undefined,
    url: `${SITE_URL}/${params.lang}/cities/${city.slug}`,
    description: city.highlight,
  };

  const stats = [
    { label: dict.country.costOfLiving, value: `Index ${city.costIndex} / 100` },
    { label: dict.country.internet, value: `${city.internetMbps} Mbps avg` },
    { label: dict.country.safety, value: `Index ${city.safetyIndex} / 100` },
    { label: dict.country.weather, value: `${city.tempMinC}° – ${city.tempMaxC}°C` },
  ];

  return (
    <article className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/cities`, label: dict.nav.cities },
        { href: `/${params.lang}/cities/${city.slug}`, label: name },
      ]} />

      <header className="max-w-3xl mt-4">
        {country && (
          <Link
            href={`/${params.lang}/countries/${country.slug}`}
            className="text-sm uppercase tracking-widest text-muted hover:text-ink"
          >
            {countryName}
          </Link>
        )}
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tightish">{name}</h1>
        <p className="mt-3 text-lg text-muted">{city.highlight}</p>
        <p className="mt-2 text-sm text-muted">
          Nomad score <span className="text-ink font-semibold">{city.nomadScore}/10</span>
          {' · '}
          {city.coworkingCount}+ coworking spaces
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-line px-4 py-3">
            <p className="text-xs uppercase tracking-widest text-muted">{s.label}</p>
            <p className="mt-1 font-semibold">{s.value}</p>
          </div>
        ))}
      </section>

      {city.neighborhoods.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tightish">Where nomads stay</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {city.neighborhoods.map((n) => (
              <li key={n} className="px-3 py-1 rounded-full border border-line">
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      {visas.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tightish">
            Visas for {countryName}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visas.map((v) => (
              <li key={v.slug}>
                <VisaCard visa={v} locale={params.lang} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {siblingCities.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tightish">
            Other cities in {countryName}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siblingCities.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <CityCard city={c} locale={params.lang} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {guides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tightish">
            {dict.nav.guides}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <li key={g.slug}>
                <GuideCard guide={g} locale={params.lang} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <JobsCTA cityName={name} countryName={country ? countryName : undefined} countrySlug={country?.slug} />
      <PartnerStack />
      <FaqSection faqs={cityFaqs(city, name, params.lang)} />
      <JsonLd data={place} />
    </article>
  );
}
