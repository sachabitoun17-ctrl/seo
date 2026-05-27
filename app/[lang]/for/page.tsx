import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllRoles, getRoleName } from '@/lib/data/roles';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PromoBanner } from '@/components/PromoBanner';
import { SlateRemoteBanner } from '@/components/SlateRemoteBanner';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.lang,
    title: 'Best digital nomad cities by job role (2026)',
    description: 'Best cities for developers, designers, product managers, marketers, data scientists, writers, founders and consultants in 2026.',
    pathForLocale: (l) => `/${l}/for`,
  });
}

export default async function RolesIndexPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const roles = getAllRoles();
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/for`, label: dict.nav.byJobRole },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish font-display">By job role</h1>
        <p className="mt-3 text-muted">Best digital nomad cities curated for your specific job.</p>
      </header>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/${params.lang}/for/${r.slug}`}
              className="block rounded-xl border border-line bg-paper px-5 py-4 card-hover"
            >
              <h2 className="font-semibold tracking-tightish">For {getRoleName(r, params.lang).toLowerCase()}</h2>
              <p className="mt-2 text-sm text-muted line-clamp-2">{r.description}</p>
              <p className="mt-2 text-xs text-muted">{r.citySlugs.length} cities</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <PromoBanner locale={params.lang} variant="ai" />
        <PromoBanner locale={params.lang} variant="setup" />
      </div>
      <SlateRemoteBanner locale={params.lang} className="mt-10" />
    </div>
  );
}
