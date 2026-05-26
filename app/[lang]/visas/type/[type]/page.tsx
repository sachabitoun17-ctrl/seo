import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getVisasByType, type Visa } from '@/lib/data/visas';
import { VisaCard } from '@/components/VisaCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JobsCTA } from '@/components/JobsCTA';
import { PartnerStack } from '@/components/PartnerStack';

const VALID: Visa['type'][] = ['digital-nomad', 'passive-income', 'investor', 'freelance'];

const TITLES: Record<Visa['type'], string> = {
  'digital-nomad': 'Digital nomad visas',
  'passive-income': 'Passive income visas',
  'investor': 'Investor and golden visas',
  'freelance': 'Freelance and self-employment visas',
};

const DESCRIPTIONS: Record<Visa['type'], string> = {
  'digital-nomad': 'Visas designed for remote workers earning foreign income. 30+ countries now offer them in 2026.',
  'passive-income': 'Visas for retirees, rentiers and passive income earners. No remote work or local employment required.',
  'investor': 'Long-term residency in exchange for investment or bank deposit. Path to citizenship in some.',
  'freelance': 'Visas for liberal professions and self-employed workers. Local clients usually allowed.',
};

export const dynamicParams = false;
export const revalidate = false;

type Props = { params: { lang: Locale; type: Visa['type'] } };

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => VALID.map((type) => ({ lang, type })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!VALID.includes(params.type)) return {};
  return buildPageMetadata({
    locale: params.lang,
    title: `${TITLES[params.type]} in 2026`,
    description: DESCRIPTIONS[params.type],
    pathForLocale: (l) => `/${l}/visas/type/${params.type}`,
  });
}

export default async function VisaTypePage({ params }: Props) {
  if (!VALID.includes(params.type)) notFound();
  const visas = getVisasByType(params.type);
  return (
    <article className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/visas`, label: 'Visas' },
        { href: `/${params.lang}/visas/type/${params.type}`, label: TITLES[params.type] },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          {TITLES[params.type]}
        </h1>
        <p className="mt-3 text-muted">{DESCRIPTIONS[params.type]}</p>
        <p className="mt-2 text-sm text-muted">{visas.length} programs.</p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visas.map((v) => (
          <li key={v.slug}>
            <VisaCard visa={v} locale={params.lang} />
          </li>
        ))}
      </ul>

      <JobsCTA heading="Have the visa, need the job?" />
      <PartnerStack categories={['banking', 'insurance']} />
    </article>
  );
}
