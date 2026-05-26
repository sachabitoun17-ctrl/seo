import { getAllCountries, getCountryName } from './countries';
import { getAllCities, getCityName } from './cities';
import { getAllVisas } from './visas';
import { getAllGuides, getGuideTitle } from './guides';
import { getAllComparisons } from './comparisons';
import { getAllThemes, getThemeTitle } from './themes';
import type { Locale } from '@/lib/i18n';

export type SearchEntry = {
  type: 'country' | 'city' | 'visa' | 'guide' | 'comparison' | 'theme';
  title: string;
  href: string;
  snippet: string;
  searchText: string; // lower-case, for matching
};

export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const c of getAllCountries()) {
    const name = getCountryName(c, locale);
    entries.push({
      type: 'country',
      title: name,
      href: `/${locale}/countries/${c.slug}`,
      snippet: `${c.capital} · ${c.region} · Cost ${c.costIndex}/100`,
      searchText: `${name} ${c.capital} ${c.region} ${c.tags.join(' ')}`.toLowerCase(),
    });
  }
  for (const c of getAllCities()) {
    const name = getCityName(c, locale);
    entries.push({
      type: 'city',
      title: name,
      href: `/${locale}/cities/${c.slug}`,
      snippet: c.highlight,
      searchText: `${name} ${c.country} ${c.neighborhoods.join(' ')} ${c.highlight}`.toLowerCase(),
    });
  }
  for (const v of getAllVisas()) {
    entries.push({
      type: 'visa',
      title: v.name,
      href: `/${locale}/visas/${v.slug}`,
      snippet: `${v.type.replace('-', ' ')} · ${v.durationMonths} months · ${v.country}`,
      searchText: `${v.name} ${v.country} ${v.type} ${v.highlights.join(' ')}`.toLowerCase(),
    });
  }
  for (const g of getAllGuides()) {
    const title = getGuideTitle(g, locale);
    entries.push({
      type: 'guide',
      title,
      href: `/${locale}/guides/${g.slug}`,
      snippet: g.topic,
      searchText: `${title} ${g.topic}`.toLowerCase(),
    });
  }
  for (const c of getAllComparisons()) {
    entries.push({
      type: 'comparison',
      title: `${c.a} vs ${c.b}`,
      href: `/${locale}/compare/${c.slug}`,
      snippet: c.verdict.slice(0, 80),
      searchText: `${c.a} vs ${c.b} ${c.verdict}`.toLowerCase(),
    });
  }
  for (const t of getAllThemes()) {
    const title = getThemeTitle(t, locale);
    entries.push({
      type: 'theme',
      title,
      href: `/${locale}/themes/${t.slug}`,
      snippet: t.description.slice(0, 80),
      searchText: `${title} ${t.description} ${t.citySlugs.join(' ')}`.toLowerCase(),
    });
  }

  return entries;
}
