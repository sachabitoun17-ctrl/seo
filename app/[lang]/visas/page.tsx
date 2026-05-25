import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllVisas } from '@/lib/data/visas';
import { VisaCard } from '@/components/VisaCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `Digital nomad ${dict.nav.visas.toLowerCase()} 2026: 35+ programs`,
    description: '35+ digital nomad and freelance visas compared: income, duration, tax, family eligibility.',
    pathForLocale: (l) => `/${l}/visas`,
  });
}

export default async function VisasIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const visas = getAllVisas();

  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/visas`, label: dict.nav.visas },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          Digital nomad {dict.nav.visas.toLowerCase()}
        </h1>
        <p className="mt-3 text-muted">
          {visas.length} digital nomad and freelance visa programs, ranked by income threshold and ease.
        </p>
      </header>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visas.map((v) => (
          <li key={v.slug}>
            <VisaCard visa={v} locale={params.lang} />
          </li>
        ))}
      </ul>
    </div>
  );
}
