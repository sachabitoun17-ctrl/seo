import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllThemes, getThemeTitle } from '@/lib/data/themes';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PromoBanner } from '@/components/PromoBanner';
import { SlateRemoteBanner } from '@/components/SlateRemoteBanner';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: dict.meta.themesTitle,
    description: dict.meta.themesDesc,
    pathForLocale: (l) => `/${l}/themes`,
  });
}

export default async function ThemesIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const themes = getAllThemes();
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/themes`, label: dict.nav.themes },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish font-display">
          Browse by lifestyle
        </h1>
        <p className="mt-3 text-muted">
          {themes.length} curated themes to find your kind of city.
        </p>
      </header>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/${params.lang}/themes/${t.slug}`}
              className="block rounded-xl border border-line bg-paper px-5 py-4 card-hover"
            >
              <h2 className="font-semibold tracking-tightish">{getThemeTitle(t, params.lang)}</h2>
              <p className="mt-1 text-sm text-muted line-clamp-2">{t.description}</p>
              <p className="mt-2 text-xs text-muted">{t.citySlugs.length} cities</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <PromoBanner locale={params.lang} variant="setup" />
        <PromoBanner locale={params.lang} variant="esim" />
      </div>
      <SlateRemoteBanner locale={params.lang} className="mt-10" />
    </div>
  );
}
