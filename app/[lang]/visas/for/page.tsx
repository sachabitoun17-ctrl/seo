import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllNationalities, getNationalityName } from '@/lib/data/nationalities';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PromoBanner } from '@/components/PromoBanner';
import { SlateRemoteBanner } from '@/components/SlateRemoteBanner';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.lang,
    title: 'Digital nomad visas by nationality (2026)',
    description: 'Best digital nomad visas for US, EU, UK, Canadian, Australian, Indian, South African and Brazilian passports.',
    pathForLocale: (l) => `/${l}/visas/for`,
  });
}

export default async function NationalitiesIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const nationalities = getAllNationalities();
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/visas`, label: 'Visas' },
        { href: `/${params.lang}/visas/for`, label: 'By nationality' },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish font-display">
          Digital nomad visas by nationality
        </h1>
        <p className="mt-3 text-muted">
          {nationalities.length} passports analysed. Find the digital nomad visas you're most likely to get approved for.
        </p>
      </header>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nationalities.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/${params.lang}/visas/for/${n.slug}`}
              className="block rounded-xl border border-line bg-paper px-5 py-5 card-hover"
            >
              <h2 className="font-semibold tracking-tightish">For {getNationalityName(n, params.lang)}</h2>
              <p className="mt-2 text-sm text-muted line-clamp-2">{n.note}</p>
              <p className="mt-2 text-xs text-muted">{n.eligibleVisaSlugs.length} relevant visas · {n.visaFreeCount} visa-free</p>
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
