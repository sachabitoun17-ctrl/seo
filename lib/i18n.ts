export const LOCALES = ['en', 'fr', 'es', 'pt', 'it', 'de', 'pl'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  it: 'Italiano',
  de: 'Deutsch',
  pl: 'Polski',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) throw new Error(`Invalid locale: ${value}`);
  return value;
}

// Dictionaries are loaded lazily and cached at module level.
const dictCache = new Map<Locale, Dictionary>();

export type Dictionary = {
  nav: {
    countries: string;
    cities: string;
    visas: string;
    guides: string;
    about: string;
  };
  footer: {
    tagline: string;
    legal: string;
    contact: string;
    rights: string;
    affiliateNotice: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    exploreCountries: string;
    exploreCities: string;
  };
  country: {
    overview: string;
    visa: string;
    costOfLiving: string;
    internet: string;
    safety: string;
    weather: string;
    keyFacts: string;
  };
  common: {
    updated: string;
    loading: string;
    notFound: string;
  };
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const cached = dictCache.get(locale);
  if (cached) return cached;
  const dict = (await import(`@/locales/${locale}.json`)).default as Dictionary;
  dictCache.set(locale, dict);
  return dict;
}
