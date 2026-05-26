import Link from 'next/link';
import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllCoworking, getCoworkingCities } from '@/lib/data/coworking';
import { getCityName } from '@/lib/data/cities';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { flagEmoji } from '@/lib/flag';
import { getCountry } from '@/lib/data/countries';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.lang,
    title: 'Best coworking spaces by city for digital nomads (2026)',
    description: 'Top coworking spaces in 20+ nomad cities (Lisbon, Bali, Bangkok, Berlin, Mexico City…) with hot-desk monthly rates and community notes.',
    pathForLocale: (l) => `/${l}/coworking`,
  });
}

export default async function CoworkingIndexPage({ params }: Props) {
  const entries = getAllCoworking();
  const cities = getCoworkingCities();
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/coworking`, label: 'Coworking' },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish font-display">Coworking by city</h1>
        <p className="mt-3 text-muted">
          The best coworking spaces in {entries.length} nomad cities. Curated picks, monthly rates, and what each space is best for.
        </p>
      </header>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => {
          const country = getCountry(c.country);
          const co = entries.find((e) => e.citySlug === c.slug)!;
          return (
            <li key={c.slug}>
              <Link
                href={`/${params.lang}/coworking/${c.slug}`}
                className="block rounded-xl border border-line bg-paper px-5 py-4 card-hover"
              >
                <div className="flex items-baseline justify-between">
                  <h2 className="font-semibold tracking-tightish flex items-center gap-2">
                    <span>{flagEmoji(country?.code)}</span>
                    {getCityName(c, params.lang)}
                  </h2>
                  <span className="text-xs text-muted">${co.monthlyAvg}/mo avg</span>
                </div>
                <p className="mt-1 text-xs text-muted line-clamp-1">{co.note}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
