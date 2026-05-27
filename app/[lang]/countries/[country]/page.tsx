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
import { GuideCard } from '@/components/GuideCard';
import { FaqSection } from '@/components/FaqSection';
import { countryFaqs } from '@/lib/faq-templates';
import { getGuidesForCountry } from '@/lib/data/guides';
import { JobsCTA } from '@/components/JobsCTA';
import { HeroImage } from '@/components/HeroImage';
import { countryPhoto, flagSvg } from '@/lib/images';

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
    title: `${name} digital nomad guide 2026`,
    description: `${name} for nomads: digital nomad visa, cost of living index ${country.costIndex}/100, ${country.internetMbps} Mbps avg internet, safety, weather, top cities and what it actually costs to live there.`,
    pathForLocale: (l) => `/${l}/countries/${country.slug}`,
    ogType: 'article',
  });
}

export default async function CountryDetailPage({ params }: Props) {
  const country = getCountry(params.country);
  if (!country) notFound();
  const dict = await getDictionary(params.lang);
  const name = getCountryName(country, params.lang);
  const cities = getCitiesByCountry(country.slug);
  const visas = getVisasByCountry(country.slug);
  const guides = getGuidesForCountry(country.slug);

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
    <article className="pb-14">
      <div className="pt-6">
        <Breadcrumbs items={[
          { href: `/${params.lang}`, label: 'Home' },
          { href: `/${params.lang}/countries`, label: dict.nav.countries },
          { href: `/${params.lang}/countries/${country.slug}`, label: name },
        ]} />
      </div>

      <HeroImage
        slug={country.slug}
        src={countryPhoto(country.slug)}
        alt={`${name} digital nomad guide`}
        kicker={country.region}
        title={name}
        subtitle={`${country.capital} · ${country.currency} · ${country.languages.join(', ')}`}
        flagSrc={flagSvg(country.code, 160)}
      />

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

      {guides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tightish">
            {dict.nav.guides} for {name}
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

      <JobsCTA countryName={name} countrySlug={country.slug} />
      <PartnerStack
        locale={params.lang}
        categories={['banking', 'insurance', 'esim', 'vpn', 'accommodation', 'travel-meta']}
        heading={`Set up before you go to ${name}`}
      />
      <FaqSection faqs={countryFaqs(country, name, params.lang)} />
      <JsonLd data={placeLd} />
    </article>
  );
}
