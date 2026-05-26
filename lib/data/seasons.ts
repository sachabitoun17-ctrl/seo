import { getAllCountries, type Country } from './countries';
import { getAllCities, type City } from './cities';
import type { Locale } from '@/lib/i18n';

export type Season = {
  slug: string;
  title: Record<Locale, string>;
  description: string;
  months: string[];
  // Match either a city or country based on best months
  matches: (entity: { bestMonths: string[] }) => boolean;
};

const has = (months: string[]) => (entity: { bestMonths: string[] }) =>
  entity.bestMonths.some((m) => months.includes(m));

export const SEASONS: Season[] = [
  {
    slug: 'winter',
    title: {
      en: 'Best digital nomad destinations for winter 2026',
      fr: 'Meilleures destinations nomades digitales pour l\'hiver 2026',
      es: 'Mejores destinos nómadas digitales para el invierno 2026',
      pt: 'Melhores destinos nómadas digitais para o inverno 2026',
      it: 'Migliori destinazioni nomadi digitali per l\'inverno 2026',
      de: 'Beste Digital-Nomad-Destinationen für den Winter 2026',
      pl: 'Najlepsze destynacje cyfrowych nomadów na zimę 2026',
    },
    description: 'Where to nomad December through February: warm Asian beaches, Latin American spring, Middle Eastern sun.',
    months: ['Dec', 'Jan', 'Feb'],
    matches: has(['Dec', 'Jan', 'Feb']),
  },
  {
    slug: 'spring',
    title: {
      en: 'Best digital nomad destinations for spring 2026',
      fr: 'Meilleures destinations nomades digitales pour le printemps 2026',
      es: 'Mejores destinos nómadas digitales para la primavera 2026',
      pt: 'Melhores destinos nómadas digitais para a primavera 2026',
      it: 'Migliori destinazioni nomadi digitali per la primavera 2026',
      de: 'Beste Digital-Nomad-Destinationen für den Frühling 2026',
      pl: 'Najlepsze destynacje cyfrowych nomadów na wiosnę 2026',
    },
    description: 'March through May: Iberia in bloom, Japan cherry blossoms, Eastern Europe waking up, perfect SEA shoulder season.',
    months: ['Mar', 'Apr', 'May'],
    matches: has(['Mar', 'Apr', 'May']),
  },
  {
    slug: 'summer',
    title: {
      en: 'Best digital nomad destinations for summer 2026',
      fr: 'Meilleures destinations nomades digitales pour l\'été 2026',
      es: 'Mejores destinos nómadas digitales para el verano 2026',
      pt: 'Melhores destinos nómadas digitais para o verão 2026',
      it: 'Migliori destinazioni nomadi digitali per l\'estate 2026',
      de: 'Beste Digital-Nomad-Destinationen für den Sommer 2026',
      pl: 'Najlepsze destynacje cyfrowych nomadów na lato 2026',
    },
    description: 'June through August: Nordic light, Balkans on the Adriatic, mountain escapes when Southern Europe overheats.',
    months: ['Jun', 'Jul', 'Aug'],
    matches: has(['Jun', 'Jul', 'Aug']),
  },
  {
    slug: 'autumn',
    title: {
      en: 'Best digital nomad destinations for autumn 2026',
      fr: 'Meilleures destinations nomades digitales pour l\'automne 2026',
      es: 'Mejores destinos nómadas digitales para el otoño 2026',
      pt: 'Melhores destinos nómadas digitais para o outono 2026',
      it: 'Migliori destinazioni nomadi digitali per l\'autunno 2026',
      de: 'Beste Digital-Nomad-Destinationen für den Herbst 2026',
      pl: 'Najlepsze destynacje cyfrowych nomadów na jesień 2026',
    },
    description: 'September through November: Mediterranean returns to perfect, Asian dry season starts, LATAM shoulder.',
    months: ['Sep', 'Oct', 'Nov'],
    matches: has(['Sep', 'Oct', 'Nov']),
  },
];

const bySlug = new Map(SEASONS.map((s) => [s.slug, s]));

export function getAllSeasons(): Season[] { return SEASONS; }
export function getSeason(slug: string): Season | undefined { return bySlug.get(slug); }
export function getSeasonTitle(s: Season, locale: Locale): string {
  return s.title[locale] || s.title.en;
}
export function getCitiesForSeason(s: Season): City[] {
  return getAllCities().filter(s.matches);
}
export function getCountriesForSeason(s: Season): Country[] {
  return getAllCountries().filter((c) => s.matches(c.weather));
}
