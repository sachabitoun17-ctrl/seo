import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllComparisons } from '@/lib/data/comparisons';
import { CompareCard } from '@/components/CompareCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.lang,
    title: 'Compare digital nomad destinations side by side',
    description: '25+ head-to-head comparisons of digital nomad countries and cities: cost, visa, vibe, internet.',
    pathForLocale: (l) => `/${l}/compare`,
  });
}

export default async function CompareIndexPage({ params }: Props) {
  const comparisons = getAllComparisons();

  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/compare`, label: 'Compare' },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          Compare destinations
        </h1>
        <p className="mt-3 text-muted">
          {comparisons.length} head-to-head comparisons of cities and countries.
        </p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c) => (
          <li key={c.slug}>
            <CompareCard comparison={c} locale={params.lang} />
          </li>
        ))}
      </ul>
    </div>
  );
}
