import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllCities } from '@/lib/data/cities';
import { CityCard } from '@/components/CityCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `${dict.nav.cities} for digital nomads in 2026`,
    description: 'Best digital nomad cities ranked by cost, internet, safety and community.',
    pathForLocale: (l) => `/${l}/cities`,
  });
}

export default async function CitiesIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const cities = [...getAllCities()].sort((a, b) => b.nomadScore - a.nomadScore);

  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/cities`, label: dict.nav.cities },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          {dict.nav.cities}
        </h1>
        <p className="mt-3 text-muted">
          {cities.length} cities ranked for digital nomads in 2026.
        </p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <li key={c.slug}>
            <CityCard city={c} locale={params.lang} />
          </li>
        ))}
      </ul>
    </div>
  );
}
