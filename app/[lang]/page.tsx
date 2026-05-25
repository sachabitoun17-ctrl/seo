import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: dict.home.heroTitle,
    description: dict.home.heroSubtitle,
    pathForLocale: (l) => `/${l}`,
  });
}

export default async function HomePage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  return (
    <div className="py-16 sm:py-24">
      <section className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tightish leading-[1.1]">
          {dict.home.heroTitle}
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl">
          {dict.home.heroSubtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${params.lang}/countries`}
            className="inline-flex items-center rounded-md bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-ink/90 transition-colors"
          >
            {dict.home.exploreCountries}
          </Link>
          <Link
            href={`/${params.lang}/cities`}
            className="inline-flex items-center rounded-md border border-line px-5 py-2.5 text-sm font-medium hover:border-ink transition-colors"
          >
            {dict.home.exploreCities}
          </Link>
        </div>
      </section>
    </div>
  );
}
