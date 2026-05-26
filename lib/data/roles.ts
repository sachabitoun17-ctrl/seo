import { getAllCities, type City } from './cities';
import type { Locale } from '@/lib/i18n';

export type Role = {
  slug: string;
  name: Record<Locale, string>;
  description: string;
  // What this role values most in a city (lower-case tags / keywords)
  prefers: ('fast-internet' | 'safe' | 'affordable' | 'english' | 'coworking' | 'community' | 'warm' | 'tech-hub')[];
  citySlugs: string[];
};

export const ROLES: Role[] = [
  {
    slug: 'developers',
    name: { en: 'Developers', fr: 'Développeurs', es: 'Desarrolladores', pt: 'Programadores', it: 'Sviluppatori', de: 'Entwickler', pl: 'Programiści' },
    description: 'Cities with fast fiber, dense tech meetups, time zone overlap with US/EU teams, and a real community of remote devs.',
    prefers: ['fast-internet', 'tech-hub', 'coworking', 'community'],
    citySlugs: ['lisbon', 'berlin', 'amsterdam', 'tallinn', 'medellin', 'mexico-city', 'bangkok', 'bali', 'singapore', 'tel-aviv', 'taipei', 'tbilisi'],
  },
  {
    slug: 'designers',
    name: { en: 'Designers', fr: 'Designers', es: 'Diseñadores', pt: 'Designers', it: 'Designer', de: 'Designer', pl: 'Designerzy' },
    description: 'Cities with creative scenes, design studios, museum density, and good light for those who care about aesthetics.',
    prefers: ['community', 'tech-hub', 'english'],
    citySlugs: ['lisbon', 'berlin', 'amsterdam', 'mexico-city', 'tokyo', 'copenhagen', 'milan', 'paris', 'porto', 'tel-aviv', 'barcelona'],
  },
  {
    slug: 'product-managers',
    name: { en: 'Product Managers', fr: 'Product Managers', es: 'Product Managers', pt: 'Product Managers', it: 'Product Manager', de: 'Product Manager', pl: 'Product Managerowie' },
    description: 'Cities that overlap working hours with HQs, with deep startup density and reliable infrastructure for daily standups.',
    prefers: ['fast-internet', 'tech-hub', 'english'],
    citySlugs: ['lisbon', 'mexico-city', 'medellin', 'berlin', 'dublin', 'tel-aviv', 'singapore', 'tokyo', 'london', 'tallinn'],
  },
  {
    slug: 'marketing-managers',
    name: { en: 'Marketing Managers', fr: 'Marketing Managers', es: 'Marketing Managers', pt: 'Marketing Managers', it: 'Marketing Manager', de: 'Marketing Manager', pl: 'Marketing Managerowie' },
    description: 'Cities with English-first tech scenes, deep agency ecosystems, and easy travel for client visits.',
    prefers: ['english', 'tech-hub', 'community'],
    citySlugs: ['lisbon', 'berlin', 'amsterdam', 'london', 'dublin', 'singapore', 'tel-aviv', 'mexico-city', 'medellin'],
  },
  {
    slug: 'data-scientists',
    name: { en: 'Data Scientists', fr: 'Data Scientists', es: 'Data Scientists', pt: 'Data Scientists', it: 'Data Scientist', de: 'Data Scientists', pl: 'Data Scientists' },
    description: 'Cities with strong fiber for moving datasets, ML meetups, ARM-friendly cloud regions nearby.',
    prefers: ['fast-internet', 'tech-hub'],
    citySlugs: ['lisbon', 'berlin', 'amsterdam', 'tel-aviv', 'singapore', 'taipei', 'tokyo', 'london', 'dublin', 'bangkok'],
  },
  {
    slug: 'writers',
    name: { en: 'Writers and content creators', fr: 'Rédacteurs et créateurs de contenu', es: 'Escritores y creadores de contenido', pt: 'Escritores e criadores de conteúdo', it: 'Scrittori e creator', de: 'Autoren und Content-Creator', pl: 'Pisarze i twórcy treści' },
    description: 'Cities with great cafés, slow rhythm, atmospheric streets, low cost so you can write all morning.',
    prefers: ['affordable', 'community'],
    citySlugs: ['lisbon', 'porto', 'mexico-city', 'oaxaca', 'chiang-mai', 'kandy', 'goa', 'cusco', 'tbilisi', 'istanbul', 'sintra'],
  },
  {
    slug: 'founders',
    name: { en: 'Founders and entrepreneurs', fr: 'Fondateurs et entrepreneurs', es: 'Fundadores y emprendedores', pt: 'Fundadores e empreendedores', it: 'Fondatori e imprenditori', de: 'Gründer und Unternehmer', pl: 'Założyciele i przedsiębiorcy' },
    description: 'Cities with low burn rate, founder communities, easy company formation, and good airline connectivity.',
    prefers: ['tech-hub', 'community', 'affordable'],
    citySlugs: ['lisbon', 'tallinn', 'singapore', 'dubai', 'bangkok', 'mexico-city', 'tel-aviv', 'london', 'medellin', 'tbilisi'],
  },
  {
    slug: 'consultants',
    name: { en: 'Consultants', fr: 'Consultants', es: 'Consultores', pt: 'Consultores', it: 'Consulenti', de: 'Berater', pl: 'Konsultanci' },
    description: 'Cities with strong airport hubs for client travel, fast wifi, and a professional environment.',
    prefers: ['fast-internet', 'tech-hub'],
    citySlugs: ['lisbon', 'amsterdam', 'singapore', 'dubai', 'london', 'paris', 'milan', 'dublin'],
  },
];

const bySlug = new Map(ROLES.map((r) => [r.slug, r]));

export function getAllRoles(): Role[] { return ROLES; }
export function getRole(slug: string): Role | undefined { return bySlug.get(slug); }
export function getRoleName(r: Role, locale: Locale): string {
  return r.name[locale] || r.name.en;
}
export function getCitiesForRole(r: Role): City[] {
  const all = getAllCities();
  return r.citySlugs
    .map((s) => all.find((c) => c.slug === s))
    .filter((c): c is City => Boolean(c));
}
