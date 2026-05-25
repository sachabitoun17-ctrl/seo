import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, LOCALES, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllCountries, getCountry, getCountryName } from '@/lib/data/countries';
import { PartnerStack } from '@/components/PartnerStack';

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
  const dict = await getDictionary(params.lang);
  const name = getCountryName(country, params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `${name} — ${dict.country.overview}`,
    description: `${name}: ${dict.country.visa.toLowerCase()}, ${dict.country.costOfLiving.toLowerCase()}, ${dict.country.internet.toLowerCase()}.`,
    pathForLocale: (l) => `/${l}/countries/${country.slug}`,
  });
}

export default async function CountryDetailPage({ params }: Props) {
  const country = getCountry(params.country);
  if (!country) notFound();
  const dict = await getDictionary(params.lang);
  const name = getCountryName(country, params.lang);

  const stats = [
    { label: dict.country.costOfLiving, value: `Index ${country.costIndex} / 100` },
    { label: dict.country.internet, value: `${country.internetMbps} Mbps avg` },
    { label: dict.country.safety, value: `Index ${country.safetyIndex} / 100` },
    { label: dict.country.weather, value: `${country.weather.tempMinC}° – ${country.weather.tempMaxC}°C` },
  ];

  return (
    <article className="py-14">
      <header className="max-w-3xl">
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

      <PartnerStack />
    </article>
  );
}
