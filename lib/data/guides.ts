import data from '@/data/guides.json';
import type { Locale } from '@/lib/i18n';

export type GuideFaq = { q: string; a: string };

export type Guide = {
  slug: string;
  topic: 'visas' | 'cost' | 'infrastructure' | 'tax' | 'city-guide' | 'tools';
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  relatedCountries?: string[];
  relatedCities?: string[];
  relatedVisas?: string[];
  faq: GuideFaq[];
};

const GUIDES = data as Guide[];
const bySlug = new Map(GUIDES.map((g) => [g.slug, g]));

export function getAllGuides(): Guide[] {
  return GUIDES;
}

export function getGuide(slug: string): Guide | undefined {
  return bySlug.get(slug);
}

export function getGuideTitle(g: Guide, locale: Locale): string {
  return g.title[locale] || g.title.en;
}

export function getGuideDescription(g: Guide, locale: Locale): string {
  return g.description[locale] || g.description.en;
}

export function getGuidesByTopic(topic: Guide['topic']): Guide[] {
  return GUIDES.filter((g) => g.topic === topic);
}

export function getGuidesForCountry(countrySlug: string): Guide[] {
  return GUIDES.filter((g) => g.relatedCountries?.includes(countrySlug));
}

export function getGuidesForCity(citySlug: string): Guide[] {
  return GUIDES.filter((g) => g.relatedCities?.includes(citySlug));
}

export function getGuidesForVisa(visaSlug: string): Guide[] {
  return GUIDES.filter((g) => g.relatedVisas?.includes(visaSlug));
}
