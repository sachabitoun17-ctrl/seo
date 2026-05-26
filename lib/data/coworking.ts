import { getAllCities, type City } from './cities';
import type { Locale } from '@/lib/i18n';

// Generic, defensible content per city. Real coworking names where reasonably
// well-known; otherwise a generic suggestion. Not exhaustive — links to
// coworker.com for the full local catalog.

export type CoworkingEntry = {
  citySlug: string;
  topSpaces: { name: string; vibe: string }[];
  monthlyMin: number;
  monthlyAvg: number;
  monthlyPremium: number;
  bestForVibe: 'community' | 'quiet-focus' | 'startup' | 'premium' | 'mixed';
  note: string;
};

export const COWORKING: CoworkingEntry[] = [
  { citySlug: 'lisbon', topSpaces: [
    { name: 'Second Home Lisboa', vibe: 'jungle-style premium, designer scene' },
    { name: 'Heden', vibe: 'sunny terrace, founder crowd' },
    { name: 'Outsite Príncipe Real', vibe: 'expat / nomad community' },
    { name: 'Selina Secret Garden', vibe: 'easy day-pass, social' },
  ], monthlyMin: 120, monthlyAvg: 200, monthlyPremium: 350, bestForVibe: 'community', note: '42+ spaces. Best concentration in Príncipe Real and LX Factory.' },
  { citySlug: 'porto', topSpaces: [
    { name: 'CRU Cowork', vibe: 'design-y, in Cedofeita' },
    { name: 'Selina Porto', vibe: 'budget-friendly, social' },
    { name: 'Porto i/o', vibe: 'startup focus, 3 locations' },
  ], monthlyMin: 90, monthlyAvg: 160, monthlyPremium: 280, bestForVibe: 'community', note: '18+ spaces. Cheaper than Lisbon, tighter community.' },
  { citySlug: 'madeira', topSpaces: [
    { name: 'Cowork Funchal', vibe: 'central, slow vibe' },
    { name: 'Nomad Cowork Village (Ponta do Sol)', vibe: 'the original nomad village' },
  ], monthlyMin: 80, monthlyAvg: 130, monthlyPremium: 220, bestForVibe: 'community', note: '12+ spaces. Nomad Village 2.0 launched 2022.' },
  { citySlug: 'barcelona', topSpaces: [
    { name: 'OneCoWork (Plaza Catalunya)', vibe: 'premium central' },
    { name: 'Aticco', vibe: 'rooftop terraces, 4 locations' },
    { name: 'Cloudworks', vibe: 'design-led, founder scene' },
    { name: 'Talent Garden Poblenou', vibe: 'startup mecca' },
  ], monthlyMin: 150, monthlyAvg: 280, monthlyPremium: 500, bestForVibe: 'startup', note: '58+ spaces. Densest scene in Gracia + Poblenou.' },
  { citySlug: 'madrid', topSpaces: [
    { name: 'Utopicus', vibe: 'multiple central locations' },
    { name: 'Spaces Río', vibe: 'IWG corporate but reliable' },
    { name: 'Impact Hub Madrid', vibe: 'social-impact founders' },
  ], monthlyMin: 130, monthlyAvg: 250, monthlyPremium: 450, bestForVibe: 'startup', note: '52+ spaces. Tech district around Castellana.' },
  { citySlug: 'valencia', topSpaces: [
    { name: 'Wayco', vibe: 'multiple locations, Spanish chain' },
    { name: 'BioHub', vibe: 'beach-adjacent, surf-friendly' },
    { name: 'Talent Garden Valencia', vibe: 'startup community' },
  ], monthlyMin: 100, monthlyAvg: 180, monthlyPremium: 320, bestForVibe: 'community', note: '28+ spaces. Quality at 40% Barcelona prices.' },
  { citySlug: 'mexico-city', topSpaces: [
    { name: 'Selina La Roma', vibe: 'social, walk-in' },
    { name: 'Público', vibe: 'design-y, Roma Norte' },
    { name: 'WeWork Reforma', vibe: 'corporate reliable' },
    { name: 'IMPACT Hub', vibe: 'social entrepreneurs' },
  ], monthlyMin: 100, monthlyAvg: 200, monthlyPremium: 400, bestForVibe: 'mixed', note: '45+ spaces. Roma Norte and Polanco are the hubs.' },
  { citySlug: 'medellin', topSpaces: [
    { name: 'Selina Medellín', vibe: 'social, nomad crowd' },
    { name: 'La Casa Redonda', vibe: 'design, El Poblado' },
    { name: 'Tinkko', vibe: 'startup focus' },
    { name: 'Atom House', vibe: 'community + events' },
  ], monthlyMin: 80, monthlyAvg: 150, monthlyPremium: 280, bestForVibe: 'community', note: '38+ spaces. El Poblado dominates.' },
  { citySlug: 'bali', topSpaces: [
    { name: 'Dojo Bali (Canggu)', vibe: 'OG nomad space, packed' },
    { name: 'Outpost Ubud', vibe: 'jungle setting, calmer' },
    { name: 'Tropical Nomad (Canggu)', vibe: 'café + cowork hybrid' },
    { name: 'BWork', vibe: 'budget option' },
  ], monthlyMin: 150, monthlyAvg: 230, monthlyPremium: 400, bestForVibe: 'community', note: '62+ spaces. Canggu = social, Ubud = focus.' },
  { citySlug: 'chiang-mai', topSpaces: [
    { name: 'CAMP @ Maya Mall', vibe: '24/7 free with food purchase' },
    { name: 'Punspace', vibe: 'multiple locations, classic nomad' },
    { name: 'C.A.M.P.', vibe: 'student-friendly, cheap' },
    { name: 'Yellow Coworking', vibe: 'budget, Nimman' },
  ], monthlyMin: 80, monthlyAvg: 130, monthlyPremium: 220, bestForVibe: 'community', note: '45+ spaces. Nimman = heart of the scene.' },
  { citySlug: 'bangkok', topSpaces: [
    { name: 'WeWork (multiple)', vibe: 'premium central' },
    { name: 'Hubba', vibe: 'multiple locations, social' },
    { name: 'The Hive', vibe: 'community-driven' },
    { name: 'Glowfish Sathorn', vibe: 'business-oriented' },
  ], monthlyMin: 150, monthlyAvg: 250, monthlyPremium: 500, bestForVibe: 'mixed', note: '85+ spaces. Sukhumvit + Thonglor + Sathorn dominate.' },
  { citySlug: 'tbilisi', topSpaces: [
    { name: 'Impact Hub Tbilisi', vibe: 'social impact crowd' },
    { name: 'Lokal Tbilisi', vibe: 'central Vake' },
    { name: 'Terminal', vibe: 'multiple locations' },
  ], monthlyMin: 80, monthlyAvg: 140, monthlyPremium: 240, bestForVibe: 'community', note: '22+ spaces. Vake and Vera neighborhoods.' },
  { citySlug: 'berlin', topSpaces: [
    { name: 'Factory Berlin', vibe: 'big tech, members-club' },
    { name: 'Mindspace', vibe: 'design-led, multiple locations' },
    { name: 'Betahaus', vibe: 'the original, Kreuzberg' },
    { name: 'St. Oberholz', vibe: 'café-cowork, café history' },
  ], monthlyMin: 150, monthlyAvg: 280, monthlyPremium: 500, bestForVibe: 'startup', note: '68+ spaces. Kreuzberg, Mitte, Prenzlauer.' },
  { citySlug: 'dubai', topSpaces: [
    { name: 'AstroLabs', vibe: 'startup accelerator vibe' },
    { name: 'A4 Space', vibe: 'arts-district, JBR' },
    { name: 'Servcorp', vibe: 'corporate, multiple towers' },
    { name: 'In5 Tech', vibe: 'free for startups' },
  ], monthlyMin: 200, monthlyAvg: 400, monthlyPremium: 800, bestForVibe: 'premium', note: '68+ spaces. Premium prices, premium WiFi.' },
  { citySlug: 'singapore', topSpaces: [
    { name: 'The Working Capitol', vibe: 'design, Tiong Bahru' },
    { name: 'JustCo', vibe: 'Asian chain, multiple sites' },
    { name: 'WeWork (multiple)', vibe: 'premium central' },
    { name: 'The Hive Singapore', vibe: 'community-led' },
  ], monthlyMin: 250, monthlyAvg: 500, monthlyPremium: 1000, bestForVibe: 'premium', note: '80+ spaces. Most expensive in SEA but world-class.' },
  { citySlug: 'tokyo', topSpaces: [
    { name: 'WeWork (multiple)', vibe: 'premium central' },
    { name: 'Shibuya QWS', vibe: 'innovation hub' },
    { name: 'NagataCho GRiD', vibe: 'creative scene' },
    { name: 'co-ba (multiple)', vibe: 'Japanese community-driven' },
  ], monthlyMin: 200, monthlyAvg: 380, monthlyPremium: 700, bestForVibe: 'premium', note: '55+ spaces. Shibuya, Roppongi, Nakameguro hubs.' },
  { citySlug: 'da-nang', topSpaces: [
    { name: 'DNC Cowork', vibe: 'central, English-friendly' },
    { name: 'Enouvo Space', vibe: 'multiple locations, polished' },
    { name: 'CityHub Coworking', vibe: 'beachside, social' },
  ], monthlyMin: 60, monthlyAvg: 110, monthlyPremium: 200, bestForVibe: 'community', note: '20+ spaces. Fastest growing SEA scene.' },
  { citySlug: 'amsterdam', topSpaces: [
    { name: 'WeWork (multiple)', vibe: 'premium central' },
    { name: 'B. Amsterdam', vibe: 'tech focused, 3 locations' },
    { name: 'TSH Collab', vibe: 'student / nomad hostel hybrid' },
    { name: 'Spaces (multiple)', vibe: 'corporate-friendly' },
  ], monthlyMin: 200, monthlyAvg: 380, monthlyPremium: 650, bestForVibe: 'startup', note: '48+ spaces. Tech triangle around Zuid.' },
  { citySlug: 'istanbul', topSpaces: [
    { name: 'Kolektif House', vibe: 'multiple locations, premium' },
    { name: 'Workhaus', vibe: 'central Beyoğlu, design' },
    { name: 'Impact Hub Istanbul', vibe: 'social entrepreneurs' },
  ], monthlyMin: 80, monthlyAvg: 150, monthlyPremium: 280, bestForVibe: 'community', note: '42+ spaces. Kadıköy + Beşiktaş are the hubs.' },
  { citySlug: 'budapest', topSpaces: [
    { name: 'Loffice', vibe: 'design, multiple locations' },
    { name: 'KAPTÁR', vibe: 'central, founder scene' },
    { name: 'Impact Hub Budapest', vibe: 'social impact' },
  ], monthlyMin: 80, monthlyAvg: 150, monthlyPremium: 280, bestForVibe: 'community', note: '32+ spaces. District V and VII are the hubs.' },
];

const bySlug = new Map(COWORKING.map((c) => [c.citySlug, c]));

export function getAllCoworking(): CoworkingEntry[] { return COWORKING; }
export function getCoworking(citySlug: string): CoworkingEntry | undefined { return bySlug.get(citySlug); }
export function getCoworkingCities(): City[] {
  const all = getAllCities();
  return COWORKING.map((co) => all.find((c) => c.slug === co.citySlug)).filter((c): c is City => Boolean(c));
}
