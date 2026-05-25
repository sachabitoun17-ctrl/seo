import data from '@/data/regions.json';
import type { Locale } from '@/lib/i18n';

export type Region = {
  slug: string;
  name: Record<Locale, string>;
  countries: string[];
  description: string;
};

const REGIONS = data as Region[];
const bySlug = new Map(REGIONS.map((r) => [r.slug, r]));

export function getAllRegions(): Region[] {
  return REGIONS;
}

export function getRegion(slug: string): Region | undefined {
  return bySlug.get(slug);
}

export function getRegionName(r: Region, locale: Locale): string {
  return r.name[locale] || r.name.en;
}
