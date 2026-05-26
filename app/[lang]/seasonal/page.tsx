import Link from 'next/link';
import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllSeasons, getSeasonTitle } from '@/lib/data/seasons';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.lang,
    title: 'Best digital nomad destinations by season (2026)',
    description: 'Where to nomad in winter, spring, summer or autumn 2026. Cities and countries optimised for each season.',
    pathForLocale: (l) => `/${l}/seasonal`,
  });
}

export default async function SeasonalIndexPage({ params }: Props) {
  const seasons = getAllSeasons();
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/seasonal`, label: 'Seasonal' },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish font-display">By season</h1>
        <p className="mt-3 text-muted">Time the world. Pick destinations that are at their best when you visit.</p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {seasons.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${params.lang}/seasonal/${s.slug}`}
              className="block rounded-xl border border-line bg-paper px-6 py-5 card-hover"
            >
              <p className="text-xs uppercase tracking-widest text-accent-deep font-semibold">{s.months.join(' · ')}</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tightish font-display">
                {getSeasonTitle(s, params.lang)}
              </h2>
              <p className="mt-2 text-sm text-muted">{s.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
