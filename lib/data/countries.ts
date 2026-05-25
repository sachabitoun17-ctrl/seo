import countriesData from '@/data/countries.json';
import type { Locale } from '@/lib/i18n';

export type Country = {
  slug: string;
  code: string;
  name: Record<Locale, string>;
  capital: string;
  currency: string;
  languages: string[];
  region: string;
  subregion: string;
  costIndex: number;
  internetMbps: number;
  safetyIndex: number;
  popularCities: string[];
  visa: {
    shortStay: string;
    digitalNomad: string;
    passiveIncome: string;
  };
  weather: {
    tempMinC: number;
    tempMaxC: number;
    bestMonths: string[];
  };
  tags: string[];
};

const COUNTRIES = countriesData as Country[];
const byslug = new Map(COUNTRIES.map((c) => [c.slug, c]));

export function getAllCountries(): Country[] {
  return COUNTRIES;
}

export function getCountry(slug: string): Country | undefined {
  return byslug.get(slug);
}

export function getCountriesByRegion(region: string): Country[] {
  return COUNTRIES.filter((c) => c.region === region);
}

export function getCountryName(c: Country, locale: Locale): string {
  return c.name[locale] || c.name.en;
}
