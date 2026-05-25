import { getAllCountries, type Country } from './countries';
import type { Locale } from '@/lib/i18n';

export type Criterion = {
  slug: string;
  title: Record<Locale, string>;
  description: string;
  match: (c: Country) => boolean;
  sort?: (a: Country, b: Country) => number;
};

export const CRITERIA: Criterion[] = [
  {
    slug: 'warm-countries',
    title: {
      en: 'Warm countries for digital nomads',
      fr: 'Pays chauds pour nomades digitaux',
      es: 'Países cálidos para nómadas digitales',
      pt: 'Países quentes para nómadas digitais',
      it: 'Paesi caldi per nomadi digitali',
      de: 'Warme Länder für digitale Nomaden',
      pl: 'Ciepłe kraje dla cyfrowych nomadów',
    },
    description: 'Destinations where winter never bites. Average lows above 15°C make these countries comfortable year-round.',
    match: (c) => c.weather.tempMinC >= 15,
  },
  {
    slug: 'affordable-countries',
    title: {
      en: 'Most affordable countries for digital nomads',
      fr: 'Pays les plus abordables pour nomades digitaux',
      es: 'Países más asequibles para nómadas digitales',
      pt: 'Países mais acessíveis para nómadas digitais',
      it: 'Paesi più accessibili per nomadi digitali',
      de: 'Günstigste Länder für digitale Nomaden',
      pl: 'Najtańsze kraje dla cyfrowych nomadów',
    },
    description: 'Cost-of-living index under 40 means you can live well under €1,500/month including coworking and travel.',
    match: (c) => c.costIndex <= 40,
    sort: (a, b) => a.costIndex - b.costIndex,
  },
  {
    slug: 'schengen-countries',
    title: {
      en: 'Schengen countries with a digital nomad visa',
      fr: 'Pays Schengen avec visa nomade digital',
      es: 'Países Schengen con visado de nómada digital',
      pt: 'Países Schengen com visto de nómada digital',
      it: 'Paesi Schengen con visto per nomadi digitali',
      de: 'Schengen-Länder mit Digital-Nomad-Visum',
      pl: 'Kraje strefy Schengen z wizą cyfrowego nomada',
    },
    description: '90-day Schengen access plus a long-stay DNV: the EU sweet spot for non-EU passport holders.',
    match: (c) => c.tags.includes('schengen'),
  },
  {
    slug: 'fast-internet-countries',
    title: {
      en: 'Best WiFi countries for remote work',
      fr: 'Meilleurs pays WiFi pour le télétravail',
      es: 'Mejores países WiFi para teletrabajo',
      pt: 'Melhores países WiFi para teletrabalho',
      it: 'Migliori paesi WiFi per il telelavoro',
      de: 'Beste WLAN-Länder für Remote Work',
      pl: 'Najlepsze kraje WiFi do pracy zdalnej',
    },
    description: 'Average internet speeds above 150 Mbps. Video calls, 4K streaming and large file uploads with zero stress.',
    match: (c) => c.internetMbps >= 150,
    sort: (a, b) => b.internetMbps - a.internetMbps,
  },
  {
    slug: 'safe-countries',
    title: {
      en: 'Safest countries for digital nomads',
      fr: 'Pays les plus sûrs pour nomades digitaux',
      es: 'Países más seguros para nómadas digitales',
      pt: 'Países mais seguros para nómadas digitais',
      it: 'Paesi più sicuri per nomadi digitali',
      de: 'Sicherste Länder für digitale Nomaden',
      pl: 'Najbezpieczniejsze kraje dla cyfrowych nomadów',
    },
    description: 'Safety index above 78. Walk anywhere at night and forget about petty theft.',
    match: (c) => c.safetyIndex >= 78,
    sort: (a, b) => b.safetyIndex - a.safetyIndex,
  },
  {
    slug: 'english-speaking-countries',
    title: {
      en: 'English-speaking countries for digital nomads',
      fr: 'Pays anglophones pour nomades digitaux',
      es: 'Países anglófonos para nómadas digitales',
      pt: 'Países anglófonos para nómadas digitais',
      it: 'Paesi anglofoni per nomadi digitali',
      de: 'Englischsprachige Länder für digitale Nomaden',
      pl: 'Kraje anglojęzyczne dla cyfrowych nomadów',
    },
    description: 'Daily life in English, no language friction. Setup, healthcare, admin: all in your language.',
    match: (c) => c.languages.includes('English'),
  },
  {
    slug: 'island-countries',
    title: {
      en: 'Best island countries for digital nomads',
      fr: 'Meilleurs pays insulaires pour nomades digitaux',
      es: 'Mejores países isleños para nómadas digitales',
      pt: 'Melhores países insulares para nómadas digitais',
      it: 'Migliori paesi insulari per nomadi digitali',
      de: 'Beste Insel-Länder für digitale Nomaden',
      pl: 'Najlepsze kraje wyspiarskie dla cyfrowych nomadów',
    },
    description: 'Slow island life with serious internet and a path to long-stay.',
    match: (c) => c.tags.includes('islands'),
  },
  {
    slug: 'trending-countries',
    title: {
      en: 'Trending digital nomad destinations 2026',
      fr: 'Destinations nomades digitales tendance 2026',
      es: 'Destinos nómadas digitales en tendencia 2026',
      pt: 'Destinos nómadas digitais em tendência 2026',
      it: 'Destinazioni nomadi digitali in tendenza 2026',
      de: 'Trending Digital-Nomad-Destinationen 2026',
      pl: 'Trendy nomadów cyfrowych 2026',
    },
    description: 'Top Google Trends risers for 2026: Colombia, New Zealand, Costa Rica, Latvia, Bulgaria and more.',
    match: (c) => c.tags.includes('trending'),
  },
  {
    slug: 'long-visa-free-countries',
    title: {
      en: 'Longest visa-free stays for digital nomads',
      fr: 'Plus longs séjours sans visa pour nomades digitaux',
      es: 'Estancias más largas sin visado para nómadas digitales',
      pt: 'Estadias mais longas sem visto para nómadas digitais',
      it: 'Soggiorni senza visto più lunghi per nomadi digitali',
      de: 'Längste visumfreie Aufenthalte für digitale Nomaden',
      pl: 'Najdłuższe pobyty bez wizy dla cyfrowych nomadów',
    },
    description: 'Countries where most passports get 180+ days visa-free on arrival. Skip the application entirely.',
    match: (c) => c.tags.includes('long-visa-free'),
  },
  {
    slug: 'coastal-countries',
    title: {
      en: 'Coastal countries for digital nomads',
      fr: 'Pays côtiers pour nomades digitaux',
      es: 'Países costeros para nómadas digitales',
      pt: 'Países costeiros para nómadas digitais',
      it: 'Paesi costieri per nomadi digitali',
      de: 'Küstenländer für digitale Nomaden',
      pl: 'Kraje nadmorskie dla cyfrowych nomadów',
    },
    description: 'Ocean view from your desk. Beach-meets-broadband destinations.',
    match: (c) => c.tags.includes('coastal') || c.tags.includes('islands'),
  },
  {
    slug: 'tax-friendly-countries',
    title: {
      en: 'Tax-friendly countries for digital nomads',
      fr: 'Pays fiscalement avantageux pour nomades digitaux',
      es: 'Países con buena fiscalidad para nómadas digitales',
      pt: 'Países com boa fiscalidade para nómadas digitais',
      it: 'Paesi fiscalmente vantaggiosi per nomadi digitali',
      de: 'Steuerfreundliche Länder für digitale Nomaden',
      pl: 'Przyjazne podatkowo kraje dla cyfrowych nomadów',
    },
    description: 'Zero or low tax on foreign income, special regimes for newcomers, or territorial systems.',
    match: (c) => c.tags.includes('tax-free') || c.tags.includes('tax-friendly') || c.tags.includes('easy-residency'),
  },
];

const bySlug = new Map(CRITERIA.map((c) => [c.slug, c]));

export function getAllCriteria(): Criterion[] {
  return CRITERIA;
}

export function getCriterion(slug: string): Criterion | undefined {
  return bySlug.get(slug);
}

export function getCountriesForCriterion(slug: string): Country[] {
  const c = getCriterion(slug);
  if (!c) return [];
  const matched = getAllCountries().filter(c.match);
  return c.sort ? matched.sort(c.sort) : matched;
}

export function getCriterionTitle(c: Criterion, locale: Locale): string {
  return c.title[locale] || c.title.en;
}
