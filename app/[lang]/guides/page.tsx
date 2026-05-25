import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllGuides } from '@/lib/data/guides';
import { GuideCard } from '@/components/GuideCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `${dict.nav.guides} for digital nomads in 2026`,
    description: 'In-depth guides on nomad visas, cost of living, tax residency, eSIM, banking and city basecamps.',
    pathForLocale: (l) => `/${l}/guides`,
  });
}

export default async function GuidesIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const guides = getAllGuides();

  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/guides`, label: dict.nav.guides },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          {dict.nav.guides}
        </h1>
        <p className="mt-3 text-muted">
          {guides.length} long-form guides on the topics nomads ask about most.
        </p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <li key={g.slug}>
            <GuideCard guide={g} locale={params.lang} />
          </li>
        ))}
      </ul>
    </div>
  );
}
