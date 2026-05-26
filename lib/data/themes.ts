import { getAllCities, type City } from './cities';
import type { Locale } from '@/lib/i18n';

export type Theme = {
  slug: string;
  title: Record<Locale, string>;
  description: string;
  citySlugs: string[];
};

export const THEMES: Theme[] = [
  {
    slug: 'surf',
    title: {
      en: 'Best surf cities for digital nomads',
      fr: 'Meilleures villes surf pour nomades digitaux',
      es: 'Mejores ciudades de surf para nómadas digitales',
      pt: 'Melhores cidades de surf para nómadas digitais',
      it: 'Migliori città surf per nomadi digitali',
      de: 'Beste Surf-Städte für digitale Nomaden',
      pl: 'Najlepsze miasta surfingowe dla cyfrowych nomadów',
    },
    description: 'Cities where you can paddle out before standup. Atlantic, Pacific or Indian Ocean breaks within 20 minutes of your laptop.',
    citySlugs: ['lisbon', 'porto', 'madeira', 'funchal', 'bali', 'phuket', 'cape-town', 'koh-phangan', 'da-nang', 'hoi-an', 'florianopolis'],
  },
  {
    slug: 'food',
    title: {
      en: 'Best food cities for digital nomads',
      fr: 'Meilleures villes pour la bouffe pour nomades digitaux',
      es: 'Mejores ciudades gastronómicas para nómadas digitales',
      pt: 'Melhores cidades gastronómicas para nómadas digitais',
      it: 'Migliori città gastronomiche per nomadi digitali',
      de: 'Beste Foodie-Städte für digitale Nomaden',
      pl: 'Najlepsze miasta dla foodies wśród nomadów',
    },
    description: 'Cities where eating well costs less than $10/meal and the food culture runs deep. Streets, markets, hole-in-the-walls.',
    citySlugs: ['mexico-city', 'oaxaca', 'bangkok', 'tokyo', 'osaka', 'hanoi', 'ho-chi-minh', 'penang', 'naples', 'istanbul', 'seoul', 'taipei'],
  },
  {
    slug: 'coworking',
    title: {
      en: 'Best coworking cities for digital nomads',
      fr: 'Meilleures villes coworking pour nomades digitaux',
      es: 'Mejores ciudades de coworking para nómadas digitales',
      pt: 'Melhores cidades de coworking para nómadas digitais',
      it: 'Migliori città di coworking per nomadi digitali',
      de: 'Beste Coworking-Städte für digitale Nomaden',
      pl: 'Najlepsze miasta z coworkingiem dla cyfrowych nomadów',
    },
    description: 'Cities with the deepest coworking density: 30+ spaces, hot desk under $200/month, fast fiber, a real community.',
    citySlugs: ['bangkok', 'bali', 'lisbon', 'mexico-city', 'medellin', 'chiang-mai', 'tbilisi', 'berlin', 'singapore', 'dubai', 'barcelona', 'istanbul'],
  },
  {
    slug: 'yoga-wellness',
    title: {
      en: 'Best yoga and wellness cities for nomads',
      fr: 'Meilleures villes yoga et bien-être pour nomades',
      es: 'Mejores ciudades de yoga y bienestar para nómadas',
      pt: 'Melhores cidades de yoga e bem-estar para nómadas',
      it: 'Migliori città di yoga e benessere per nomadi',
      de: 'Beste Yoga- und Wellness-Städte für Nomaden',
      pl: 'Najlepsze miasta jogi i wellness dla nomadów',
    },
    description: 'Cities where daily yoga, retreats, vegan food and intentional living are baked into the local culture.',
    citySlugs: ['ubud', 'bali', 'koh-phangan', 'goa', 'oaxaca', 'cusco', 'tulum', 'madeira', 'chiang-mai'],
  },
  {
    slug: 'family-friendly',
    title: {
      en: 'Best family-friendly cities for digital nomads',
      fr: 'Meilleures villes pour nomades digitaux avec enfants',
      es: 'Mejores ciudades familiares para nómadas digitales',
      pt: 'Melhores cidades para famílias de nómadas digitais',
      it: 'Migliori città familiari per nomadi digitali',
      de: 'Beste familienfreundliche Städte für digitale Nomaden',
      pl: 'Najlepsze miasta dla rodzin nomadów cyfrowych',
    },
    description: 'Safe streets, international schools, public parks, predictable healthcare. The 10 best cities for nomading with kids.',
    citySlugs: ['lisbon', 'porto', 'valencia', 'madrid', 'barcelona', 'tokyo', 'taipei', 'singapore', 'kuala-lumpur', 'vienna', 'amsterdam', 'tallinn'],
  },
  {
    slug: 'nightlife',
    title: {
      en: 'Best nightlife cities for digital nomads',
      fr: 'Meilleures villes nightlife pour nomades digitaux',
      es: 'Mejores ciudades de vida nocturna para nómadas',
      pt: 'Melhores cidades de vida noturna para nómadas',
      it: 'Migliori città di vita notturna per nomadi',
      de: 'Beste Nachtleben-Städte für digitale Nomaden',
      pl: 'Najlepsze miasta nocnego życia dla nomadów',
    },
    description: 'Cities that wake up at 9pm and party until sunrise. Where the post-work-week starts late and never feels lonely.',
    citySlugs: ['madrid', 'barcelona', 'berlin', 'belgrade', 'mexico-city', 'medellin', 'buenos-aires', 'bangkok', 'istanbul', 'rio-de-janeiro'],
  },
  {
    slug: 'nature-outdoors',
    title: {
      en: 'Best nature and outdoor cities for nomads',
      fr: 'Meilleures villes nature et plein air pour nomades',
      es: 'Mejores ciudades de naturaleza para nómadas',
      pt: 'Melhores cidades de natureza para nómadas',
      it: 'Migliori città outdoor per nomadi',
      de: 'Beste Natur- und Outdoor-Städte für Nomaden',
      pl: 'Najlepsze miasta natury dla nomadów',
    },
    description: 'Cities where mountains, ocean or jungle are 30 minutes from your desk. Trail running, surfing, climbing, hiking on a weekday.',
    citySlugs: ['cape-town', 'cusco', 'tbilisi', 'medellin', 'madeira', 'funchal', 'da-nang', 'bali', 'auckland', 'split'],
  },
  {
    slug: 'lgbtq-friendly',
    title: {
      en: 'Best LGBTQ+ friendly cities for digital nomads',
      fr: 'Meilleures villes LGBTQ+ friendly pour nomades',
      es: 'Mejores ciudades LGBTQ+ friendly para nómadas',
      pt: 'Melhores cidades LGBTQ+ friendly para nómadas',
      it: 'Migliori città LGBTQ+ friendly per nomadi',
      de: 'Beste LGBTQ+-freundliche Städte für Nomaden',
      pl: 'Najlepsze miasta LGBTQ+ przyjazne nomadom',
    },
    description: 'Welcoming local laws, visible communities, and city culture that lets you live as yourself.',
    citySlugs: ['lisbon', 'madrid', 'barcelona', 'berlin', 'amsterdam', 'mexico-city', 'medellin', 'buenos-aires', 'tel-aviv', 'taipei', 'bangkok'],
  },
  {
    slug: 'vegan-friendly',
    title: {
      en: 'Best vegan cities for digital nomads',
      fr: 'Meilleures villes vegan pour nomades digitaux',
      es: 'Mejores ciudades veganas para nómadas',
      pt: 'Melhores cidades veganas para nómadas',
      it: 'Migliori città vegane per nomadi',
      de: 'Beste vegane Städte für digitale Nomaden',
      pl: 'Najlepsze miasta wegańskie dla nomadów',
    },
    description: 'Cities with a dense plant-based food scene where you never have to compromise — Asian veg traditions, EU veg revolution, LATAM hits.',
    citySlugs: ['ubud', 'bali', 'berlin', 'lisbon', 'tel-aviv', 'chiang-mai', 'goa', 'taipei', 'osaka', 'london'],
  },
  {
    slug: 'beach-cities',
    title: {
      en: 'Best beach cities for digital nomads',
      fr: 'Meilleures villes côtières pour nomades digitaux',
      es: 'Mejores ciudades costeras para nómadas',
      pt: 'Melhores cidades costeiras para nómadas',
      it: 'Migliori città di mare per nomadi',
      de: 'Beste Strand-Städte für digitale Nomaden',
      pl: 'Najlepsze miasta nadmorskie dla nomadów',
    },
    description: 'Sand under your feet 5 days a week. Cities where the beach is a 15-minute walk from your laptop.',
    citySlugs: ['lisbon', 'madeira', 'malaga', 'phuket', 'koh-phangan', 'bali', 'da-nang', 'cape-town', 'cartagena', 'playa-del-carmen', 'tulum', 'florianopolis', 'antalya', 'barbados'],
  },
  {
    slug: 'mountain-cities',
    title: {
      en: 'Best mountain cities for digital nomads',
      fr: 'Meilleures villes montagne pour nomades digitaux',
      es: 'Mejores ciudades de montaña para nómadas',
      pt: 'Melhores cidades de montanha para nómadas',
      it: 'Migliori città di montagna per nomadi',
      de: 'Beste Berg-Städte für digitale Nomaden',
      pl: 'Najlepsze miasta górskie dla nomadów',
    },
    description: 'Cities surrounded by hiking, skiing, climbing or just clean alpine air. Altitude as part of daily life.',
    citySlugs: ['tbilisi', 'medellin', 'cusco', 'cape-town', 'sarajevo', 'kandy', 'taipei', 'vienna'],
  },
];

const bySlug = new Map(THEMES.map((t) => [t.slug, t]));

export function getAllThemes(): Theme[] {
  return THEMES;
}

export function getTheme(slug: string): Theme | undefined {
  return bySlug.get(slug);
}

export function getCitiesForTheme(slug: string): City[] {
  const theme = getTheme(slug);
  if (!theme) return [];
  const allCities = getAllCities();
  return theme.citySlugs
    .map((s) => allCities.find((c) => c.slug === s))
    .filter((c): c is City => Boolean(c));
}

export function getThemeTitle(t: Theme, locale: Locale): string {
  return t.title[locale] || t.title.en;
}
