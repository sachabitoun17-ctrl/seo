import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { buildSearchIndex } from '@/lib/data/search-index';
import { SearchBox } from '@/components/SearchBox';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.lang,
    title: 'Search countries, cities, visas, guides (2026)',
    description: 'Search 3700+ pages on Slowmadly: countries, nomad cities, digital nomad visas, comparisons, lifestyle themes and long-form guides.',
    pathForLocale: (l) => `/${l}/search`,
  });
}

export default async function SearchPage({ params }: Props) {
  const entries = buildSearchIndex(params.lang);
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/search`, label: 'Search' },
      ]} />
      <header className="max-w-3xl mt-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish font-display">Search</h1>
        <p className="mt-3 text-muted">Filter across {entries.length} pages by type.</p>
      </header>
      <div className="max-w-3xl">
        <SearchBox entries={entries} />
      </div>
    </div>
  );
}
