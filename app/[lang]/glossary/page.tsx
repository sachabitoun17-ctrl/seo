import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildPageMetadata({
    locale: params.lang,
    title: 'Digital nomad glossary 2026: visa, tax and remote work terms',
    description: 'All the visa, tax residency, remote work and immigration terms a digital nomad needs to understand in 2026.',
    pathForLocale: (l) => `/${l}/glossary`,
  });
}

type Term = { term: string; def: string };

const TERMS: Term[] = [
  { term: '183-day rule', def: 'Rule used by most countries to determine tax residency: spending 183 days or more in a country in any 12-month period typically makes you a tax resident there.' },
  { term: 'Beckham Law (Spain)', def: 'Spanish special tax regime allowing newly-arrived workers to pay 24% flat tax on Spanish-source income for the year of arrival plus 5 more years, instead of progressive rates up to 47%.' },
  { term: 'CFC (Controlled Foreign Corporation)', def: 'Anti-avoidance tax rule that taxes profits of foreign companies controlled by residents, even when undistributed. Major impact for nomads with offshore companies.' },
  { term: 'D7 visa (Portugal)', def: 'Portuguese passive income visa requiring around €870/month of stable income. Path to permanent residency in 5 years and citizenship in another 5.' },
  { term: 'D8 visa (Portugal)', def: 'Portugal digital nomad visa for remote workers earning at least 4× Portuguese minimum wage (€3,480/month in 2026).' },
  { term: 'DAFT (Netherlands)', def: 'Dutch American Friendship Treaty: a self-employment visa available exclusively to US citizens with a €4,500 business deposit.' },
  { term: 'Domicile vs residency', def: 'Domicile is the long-term home you intend to return to; residency is where you currently live. Some countries (UK) tax based on domicile, not residency.' },
  { term: 'DTA (Double Tax Agreement / Treaty)', def: 'Bilateral agreement between two countries to avoid taxing the same income twice. Determines which country has primary taxing rights based on residency and source.' },
  { term: 'DTV (Thailand Destination Thailand Visa)', def: '5-year multi-entry visa launched in 2024 for remote workers, freelancers and soft-power enthusiasts. 180-day stays per entry, no income threshold.' },
  { term: 'e-Residency (Estonia)', def: 'Digital identity issued by Estonia to non-residents, allowing them to register and run an Estonian company online. Not a visa or residency permit.' },
  { term: 'FEIE (Foreign Earned Income Exclusion)', def: 'US tax provision allowing citizens abroad to exclude up to $126,500 (2026) of foreign-earned income if they pass the Bona Fide Residence or Physical Presence test.' },
  { term: 'Golden Visa', def: 'Residency or citizenship granted in exchange for investment (real estate, business, donation). Portugal, Spain, Greece, Malta all have variants, often phased out for housing investment.' },
  { term: 'Habitual residence', def: 'Test used by EU and some other countries: where your main interests (family, work, social ties) are located, regardless of physical days count.' },
  { term: 'IFICI (Portugal)', def: 'Successor to the NHR regime launched in 2024. 20% flat tax on Portuguese professional income for 10 years for highly-qualified workers in specific fields.' },
  { term: 'Non-dom regime', def: 'Tax status (UK, Ireland, Cyprus, Malta) where foreign income is only taxed if remitted to the country. Often used by high-net-worth nomads.' },
  { term: 'Nomad Pass / DE Rantau', def: 'Malaysia digital nomad visa launched in 2022, renewable for 12 months. No tax on foreign income.' },
  { term: 'NHR (Non-Habitual Resident, Portugal)', def: 'Original Portuguese tax regime offering reduced tax rates for new residents. Closed to new entrants in 2024, replaced by IFICI.' },
  { term: 'PE (Permanent Establishment)', def: 'Tax concept meaning your business activity creates a taxable presence in a country, even without local registration. Risk for nomads working long-term in one place.' },
  { term: 'PR (Permanent Residency)', def: 'Long-term residence status with most rights of a citizen but no passport. Typically requires 5-10 years of temporary residency first.' },
  { term: 'Schengen 90/180 rule', def: 'Allows up to 90 days within any 180-day period across all Schengen countries combined, for visa-waiver nationals.' },
  { term: 'SE (Self-Employed) visa', def: 'Visa category in some countries (Germany Freiberufler, Czech Zivno) for workers operating as freelance or sole traders.' },
  { term: 'Tax residency certificate', def: 'Official document issued by your tax authority confirming you are a tax resident, used to invoke tax treaty benefits.' },
  { term: 'Territorial taxation', def: 'Tax system (Panama, Paraguay, Costa Rica, Hong Kong) that taxes only locally-sourced income. Foreign income is not taxed regardless of residency.' },
  { term: 'Working holiday visa', def: '1-2 year visa for young adults (typically 18-30 or 18-35) allowing both tourism and casual work. Different from a DNV.' },
];

export default async function GlossaryPage({ params }: Props) {
  const terms = [...TERMS].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <article className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/glossary`, label: 'Glossary' },
      ]} />
      <header className="max-w-3xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tightish">
          Digital nomad glossary 2026
        </h1>
        <p className="mt-3 text-muted">
          Every visa, tax and remote-work term you will run into. {terms.length} definitions.
        </p>
      </header>
      <dl className="mt-10 max-w-3xl space-y-6">
        {terms.map((t) => (
          <div key={t.term} className="border-b border-line pb-6 last:border-0" id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
            <dt className="font-semibold tracking-tightish">{t.term}</dt>
            <dd className="mt-2 text-muted leading-relaxed">{t.def}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
