import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllCriteria, getCriterionTitle } from '@/lib/data/criteria';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PromoBanner } from '@/components/PromoBanner';
import { SlateRemoteBanner } from '@/components/SlateRemoteBanner';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: dict.meta.bestTitle,
    description: dict.meta.bestDesc,
    pathForLocale: (l) => `/${l}/best`,
  });
}

export default async function BestIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const criteria = getAllCriteria();
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/best`, label: dict.nav.bestFor },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          Browse by criterion
        </h1>
        <p className="mt-3 text-muted">
          {criteria.length} curated angles to filter the 56 digital nomad countries.
        </p>
      </header>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {criteria.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${params.lang}/best/${c.slug}`}
              className="block rounded-lg border border-line bg-white/40 px-5 py-4 hover:border-ink transition-colors"
            >
              <h2 className="text-base font-semibold tracking-tightish">
                {getCriterionTitle(c, params.lang)}
              </h2>
              <p className="mt-2 text-sm text-muted line-clamp-2">{c.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <PromoBanner locale={params.lang} variant="setup" />
        <PromoBanner locale={params.lang} variant="insurance" />
      </div>
      <SlateRemoteBanner locale={params.lang} className="mt-10" />
    </div>
  );
}
