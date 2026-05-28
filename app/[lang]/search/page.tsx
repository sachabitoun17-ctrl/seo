import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { buildSearchIndex } from '@/lib/data/search-index';
import { SearchBox } from '@/components/SearchBox';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: dict.meta.searchTitle,
    description: dict.meta.searchDesc,
    pathForLocale: (l) => `/${l}/search`,
  });
}

export default async function SearchPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const entries = buildSearchIndex(params.lang);
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/search`, label: dict.nav.search },
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
