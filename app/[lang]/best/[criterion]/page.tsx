import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import {
  getAllCriteria,
  getCriterion,
  getCriterionTitle,
  getCountriesForCriterion,
} from '@/lib/data/criteria';
import { CountryCard } from '@/components/CountryCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PartnerStack } from '@/components/PartnerStack';

export const dynamicParams = false;
export const revalidate = false;

type Props = { params: { lang: Locale; criterion: string } };

export function generateStaticParams() {
  const criteria = getAllCriteria();
  return LOCALES.flatMap((lang) =>
    criteria.map((c) => ({ lang, criterion: c.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const criterion = getCriterion(params.criterion);
  if (!criterion) return {};
  const title = getCriterionTitle(criterion, params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title,
    description: criterion.description,
    pathForLocale: (l) => `/${l}/best/${criterion.slug}`,
  });
}

export default async function BestCriterionPage({ params }: Props) {
  const criterion = getCriterion(params.criterion);
  if (!criterion) notFound();
  const title = getCriterionTitle(criterion, params.lang);
  const countries = getCountriesForCriterion(criterion.slug);

  return (
    <article className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/best`, label: 'Best' },
        { href: `/${params.lang}/best/${criterion.slug}`, label: title },
      ]} />

      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tightish">{title}</h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">{criterion.description}</p>
        <p className="mt-3 text-sm text-muted">{countries.length} countries match.</p>
      </header>

      <section className="mt-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => (
            <li key={c.slug}>
              <CountryCard country={c} locale={params.lang} />
            </li>
          ))}
        </ul>
      </section>

      <PartnerStack />
    </article>
  );
}
