import citiesData from '@/data/cities.json';
import type { Locale } from '@/lib/i18n';

export type City = {
  slug: string;
  country: string;
  code: string;
  name: Record<Locale, string>;
  costIndex: number;
  internetMbps: number;
  safetyIndex: number;
  tempMinC: number;
  tempMaxC: number;
  bestMonths: string[];
  nomadScore: number;
  neighborhoods: string[];
  coworkingCount: number;
  highlight: string;
};

const CITIES = citiesData as City[];
const bySlug = new Map(CITIES.map((c) => [c.slug, c]));

export function getAllCities(): City[] {
  return CITIES;
}

export function getCity(slug: string): City | undefined {
  return bySlug.get(slug);
}

export function getCitiesByCountry(countrySlug: string): City[] {
  return CITIES.filter((c) => c.country === countrySlug);
}

export function getCityName(c: City, locale: Locale): string {
  return c.name[locale] || c.name.en;
}

export function getTopCities(limit = 12): City[] {
  return [...CITIES].sort((a, b) => b.nomadScore - a.nomadScore).slice(0, limit);
}
