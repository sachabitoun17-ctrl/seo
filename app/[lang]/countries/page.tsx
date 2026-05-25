import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllCountries } from '@/lib/data/countries';
import { CountryCard } from '@/components/CountryCard';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: dict.nav.countries,
    description: dict.home.heroSubtitle,
    pathForLocale: (l) => `/${l}/countries`,
  });
}

export default async function CountriesIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const countries = getAllCountries();

  return (
    <div className="py-14">
      <header className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          {dict.nav.countries}
        </h1>
        <p className="mt-3 text-muted">{dict.home.heroSubtitle}</p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => (
          <li key={c.slug}>
            <CountryCard country={c} locale={params.lang} />
          </li>
        ))}
      </ul>
    </div>
  );
}
