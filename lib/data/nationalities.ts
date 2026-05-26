import { getAllVisas, type Visa } from './visas';
import type { Locale } from '@/lib/i18n';

export type Nationality = {
  slug: string;
  name: Record<Locale, string>;
  passportName: string; // e.g. "US passport"
  visaFreeCount: number;
  eligibleVisaSlugs: string[]; // visas particularly relevant
  blockedVisaSlugs?: string[]; // visas that don't apply
  note: string;
};

export const NATIONALITIES: Nationality[] = [
  {
    slug: 'us-citizens',
    name: { en: 'US citizens', fr: 'Citoyens américains', es: 'Ciudadanos de EE.UU.', pt: 'Cidadãos dos EUA', it: 'Cittadini USA', de: 'US-Bürger', pl: 'Obywatele USA' },
    passportName: 'US passport',
    visaFreeCount: 188,
    eligibleVisaSlugs: ['portugal-d8', 'portugal-d7', 'spain-digital-nomad', 'italy-digital-nomad', 'greece-digital-nomad', 'croatia-digital-nomad', 'mexico-temporary-resident', 'thailand-dtv', 'uae-dubai-remote-work', 'colombia-digital-nomad', 'costa-rica-rentista', 'barbados-welcome-stamp', 'malaysia-de-rantau', 'japan-digital-nomad'],
    note: 'US citizens are eligible for nearly every digital nomad visa worldwide. The Netherlands DAFT visa is exclusive to US citizens. Key constraint: US taxes citizens on worldwide income (use FEIE up to $126,500/yr in 2026).',
  },
  {
    slug: 'eu-citizens',
    name: { en: 'EU citizens', fr: 'Citoyens européens', es: 'Ciudadanos de la UE', pt: 'Cidadãos da UE', it: 'Cittadini UE', de: 'EU-Bürger', pl: 'Obywatele UE' },
    passportName: 'EU passport',
    visaFreeCount: 175,
    eligibleVisaSlugs: ['thailand-dtv', 'uae-dubai-remote-work', 'mexico-temporary-resident', 'colombia-digital-nomad', 'argentina-digital-nomad', 'barbados-welcome-stamp', 'brazil-digital-nomad', 'japan-digital-nomad', 'south-korea-workation', 'south-africa-digital-nomad'],
    note: 'EU citizens can live and work in any EU member state without a visa. DNVs are mainly useful outside the EU. Schengen 90/180 day rule applies in most non-EU/Schengen countries.',
  },
  {
    slug: 'uk-citizens',
    name: { en: 'UK citizens', fr: 'Citoyens britanniques', es: 'Ciudadanos del Reino Unido', pt: 'Cidadãos do Reino Unido', it: 'Cittadini britannici', de: 'UK-Bürger', pl: 'Obywatele Wielkiej Brytanii' },
    passportName: 'UK passport',
    visaFreeCount: 188,
    eligibleVisaSlugs: ['portugal-d8', 'portugal-d7', 'spain-digital-nomad', 'italy-digital-nomad', 'greece-digital-nomad', 'croatia-digital-nomad', 'cyprus-digital-nomad', 'malta-nomad-residence', 'thailand-dtv', 'uae-dubai-remote-work', 'mexico-temporary-resident', 'colombia-digital-nomad'],
    note: 'Post-Brexit, UK citizens are limited to Schengen 90/180 days in Europe. DNVs are particularly useful for staying longer in the EU. UK has DTAs with most popular destinations.',
  },
  {
    slug: 'canadian-citizens',
    name: { en: 'Canadian citizens', fr: 'Citoyens canadiens', es: 'Ciudadanos canadienses', pt: 'Cidadãos canadianos', it: 'Cittadini canadesi', de: 'Kanadische Bürger', pl: 'Obywatele Kanady' },
    passportName: 'Canadian passport',
    visaFreeCount: 185,
    eligibleVisaSlugs: ['portugal-d8', 'spain-digital-nomad', 'italy-digital-nomad', 'greece-digital-nomad', 'croatia-digital-nomad', 'thailand-dtv', 'uae-dubai-remote-work', 'mexico-temporary-resident', 'colombia-digital-nomad', 'japan-digital-nomad', 'south-korea-workation'],
    note: 'Canadian passport gives 185 visa-free destinations. Tax: Canada uses physical presence test (not citizenship-based). Easier to break tax residency than US citizens.',
  },
  {
    slug: 'australian-citizens',
    name: { en: 'Australian citizens', fr: 'Citoyens australiens', es: 'Ciudadanos australianos', pt: 'Cidadãos australianos', it: 'Cittadini australiani', de: 'Australische Bürger', pl: 'Obywatele Australii' },
    passportName: 'Australian passport',
    visaFreeCount: 185,
    eligibleVisaSlugs: ['portugal-d8', 'spain-digital-nomad', 'thailand-dtv', 'indonesia-b211a', 'malaysia-de-rantau', 'japan-digital-nomad', 'south-korea-workation', 'uae-dubai-remote-work', 'mexico-temporary-resident', 'colombia-digital-nomad'],
    note: 'Australian passport is one of the strongest globally. Working Holiday agreements with 40+ countries (up to age 35), a great alternative to DNVs for younger nomads.',
  },
  {
    slug: 'indian-citizens',
    name: { en: 'Indian citizens', fr: 'Citoyens indiens', es: 'Ciudadanos indios', pt: 'Cidadãos indianos', it: 'Cittadini indiani', de: 'Indische Bürger', pl: 'Obywatele Indii' },
    passportName: 'Indian passport',
    visaFreeCount: 60,
    eligibleVisaSlugs: ['thailand-dtv', 'uae-dubai-remote-work', 'malaysia-de-rantau', 'indonesia-b211a', 'sri-lanka-nomad', 'mauritius-premium', 'georgia-visa-free'],
    note: 'Indian passport requires advance visas for most destinations. DNVs are the cleanest path. Strong eligibility for tax-friendly Gulf countries and SEA neighbours.',
  },
  {
    slug: 'south-african-citizens',
    name: { en: 'South African citizens', fr: 'Citoyens sud-africains', es: 'Ciudadanos sudafricanos', pt: 'Cidadãos sul-africanos', it: 'Cittadini sudafricani', de: 'Südafrikanische Bürger', pl: 'Obywatele RPA' },
    passportName: 'South African passport',
    visaFreeCount: 100,
    eligibleVisaSlugs: ['portugal-d8', 'spain-digital-nomad', 'thailand-dtv', 'mauritius-premium', 'uae-dubai-remote-work', 'malaysia-de-rantau', 'mexico-temporary-resident'],
    note: 'South African passport is mid-tier globally. DNVs unlock long stays in EU + Asia where short-stay visas are required.',
  },
  {
    slug: 'brazilian-citizens',
    name: { en: 'Brazilian citizens', fr: 'Citoyens brésiliens', es: 'Ciudadanos brasileños', pt: 'Cidadãos brasileiros', it: 'Cittadini brasiliani', de: 'Brasilianische Bürger', pl: 'Obywatele Brazylii' },
    passportName: 'Brazilian passport',
    visaFreeCount: 170,
    eligibleVisaSlugs: ['portugal-d8', 'portugal-d7', 'spain-digital-nomad', 'italy-digital-nomad', 'thailand-dtv', 'mexico-temporary-resident', 'colombia-digital-nomad', 'uae-dubai-remote-work'],
    note: 'Strong passport with 170+ visa-free destinations. Special bilateral agreement with Portugal (CPLP) makes Portugal D8/D7 the easiest pathway.',
  },
];

const bySlug = new Map(NATIONALITIES.map((n) => [n.slug, n]));

export function getAllNationalities(): Nationality[] {
  return NATIONALITIES;
}

export function getNationality(slug: string): Nationality | undefined {
  return bySlug.get(slug);
}

export function getNationalityName(n: Nationality, locale: Locale): string {
  return n.name[locale] || n.name.en;
}

export function getEligibleVisas(n: Nationality): Visa[] {
  const all = getAllVisas();
  return n.eligibleVisaSlugs
    .map((s) => all.find((v) => v.slug === s))
    .filter((v): v is Visa => Boolean(v));
}
