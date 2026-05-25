import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, LOCALES, type Locale } from '@/lib/i18n';
import { buildPageMetadata, SITE_URL } from '@/lib/seo';
import { getAllCountries, getCountry, getCountryName } from '@/lib/data/countries';
import { getCitiesByCountry } from '@/lib/data/cities';
import { getVisasByCountry } from '@/lib/data/visas';
import { PartnerStack } from '@/components/PartnerStack';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { CityCard } from '@/components/CityCard';
import { VisaCard } from '@/components/VisaCard';

export const dynamicParams = false;
export const revalidate = false;

type Props = { params: { lang: Locale; country: string } };

export function generateStaticParams() {
  const countries = getAllCountries();
  return LOCALES.flatMap((lang) =>
    countries.map((c) => ({ lang, country: c.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const country = getCountry(params.country);
  if (!country) return {};
  const name = getCountryName(country, params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `${name} for digital nomads 2026: visa, cost, internet`,
    description: `Living in ${name} as a nomad: visa options, cost of living, internet speed, safety, weather, top cities.`,
    pathForLocale: (l) => `/${l}/countries/${country.slug}`,
  });
}

export default async function CountryDetailPage({ params }: Props) {
  const country = getCountry(params.country);
  if (!country) notFound();
  const dict = await getDictionary(params.lang);
  const name = getCountryName(country, params.lang);
  const cities = getCitiesByCountry(country.slug);
  const visas = getVisasByCountry(country.slug);

  const placeLd = {
    '@context': 'https://schema.org',
    '@type': 'Country',
    name,
    url: `${SITE_URL}/${params.lang}/countries/${country.slug}`,
    description: `Digital nomad guide to ${name}: visa, cost of living, internet, safety.`,
  };

  const stats = [
    { label: dict.country.costOfLiving, value: `Index ${country.costIndex} / 100` },
    { label: dict.country.internet, value: `${country.internetMbps} Mbps avg` },
    { label: dict.country.safety, value: `Index ${country.safetyIndex} / 100` },
    { label: dict.country.weather, value: `${country.weather.tempMinC}° – ${country.weather.tempMaxC}°C` },
  ];

  return (
    <article className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/countries`, label: dict.nav.countries },
        { href: `/${params.lang}/countries/${country.slug}`, label: name },
      ]} />

      <header className="max-w-3xl mt-4">
        <p className="text-sm uppercase tracking-widest text-muted">{country.region}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tightish">{name}</h1>
        <p className="mt-3 text-muted">
          {country.capital} · {country.currency} · {country.languages.join(', ')}
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

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold tracking-tightish">{dict.country.visa}</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
          <div className="rounded-lg border border-line px-4 py-3">
            <dt className="text-xs uppercase tracking-widest text-muted">Short stay</dt>
            <dd className="mt-1 font-medium">{country.visa.shortStay}</dd>
          </div>
          <div className="rounded-lg border border-line px-4 py-3">
            <dt className="text-xs uppercase tracking-widest text-muted">Digital nomad</dt>
            <dd className="mt-1 font-medium">{country.visa.digitalNomad}</dd>
          </div>
          <div className="rounded-lg border border-line px-4 py-3">
            <dt className="text-xs uppercase tracking-widest text-muted">Passive income</dt>
            <dd className="mt-1 font-medium">{country.visa.passiveIncome}</dd>
          </div>
        </dl>
      </section>

      {cities.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tightish">
            {dict.nav.cities} in {name}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <CityCard city={c} locale={params.lang} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {visas.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tightish">
            {dict.nav.visas} for {name}
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

      <PartnerStack />
      <JsonLd data={placeLd} />
    </article>
  );
}
