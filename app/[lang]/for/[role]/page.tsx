import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllRoles, getRole, getRoleName, getCitiesForRole } from '@/lib/data/roles';
import { CityCard } from '@/components/CityCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JobsCTA } from '@/components/JobsCTA';
import { AiToolsCTA } from '@/components/AiToolsCTA';
import { PartnerStack } from '@/components/PartnerStack';

export const dynamicParams = false;
export const revalidate = false;

type Props = { params: { lang: Locale; role: string } };

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    getAllRoles().map((r) => ({ lang, role: r.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getRole(params.role);
  if (!r) return {};
  const name = getRoleName(r, params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `Best digital nomad cities for ${name.toLowerCase()} (2026)`,
    description: r.description,
    pathForLocale: (l) => `/${l}/for/${r.slug}`,
  });
}

export default async function RoleDetailPage({ params }: Props) {
  const r = getRole(params.role);
  if (!r) notFound();
  const name = getRoleName(r, params.lang);
  const cities = getCitiesForRole(r);

  return (
    <article className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/for`, label: 'By job role' },
        { href: `/${params.lang}/for/${r.slug}`, label: name },
      ]} />

      <header className="max-w-3xl mt-4">
        <p className="text-xs uppercase tracking-widest text-accent-deep font-semibold">For job role</p>
        <h1 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tightish font-display">
          Best digital nomad cities for {name.toLowerCase()}
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">{r.description}</p>
        <p className="mt-2 text-sm text-muted">{cities.length} cities match.</p>
      </header>

      <section className="mt-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <li key={c.slug}>
              <CityCard city={c} locale={params.lang} />
            </li>
          ))}
        </ul>
      </section>

      <JobsCTA locale={params.lang} heading={`Remote ${r.slug.replace(/s$/, '')} jobs from across the web`} />
      <AiToolsCTA locale={params.lang} role={r.slug.replace(/s$/, '')} />
      <PartnerStack
        locale={params.lang}
        categories={['productivity', 'ai-llm', 'voice-ai', 'earn-while-traveling', 'newsletter', 'banking']}
        heading="Tools to fund the slow-travel life"
      />
    </article>
  );
}
