// Centralized affiliate links. Active links go in env / hardcoded below.
// Placeholders use TOKEN_X — replaced via env once signups are approved.

export type Partner = {
  id: string;
  name: string;
  url: string;
  blurb: string;
  category: 'banking' | 'insurance' | 'esim' | 'travel-meta' | 'tours' | 'vpn';
  active: boolean;
};

const SAFETYWING = process.env.NEXT_PUBLIC_AFF_SAFETYWING || 'TOKEN_SAFETYWING';
const TRAVELPAYOUTS = process.env.NEXT_PUBLIC_AFF_TRAVELPAYOUTS || 'TOKEN_TRAVELPAYOUTS';
const VIATOR = process.env.NEXT_PUBLIC_AFF_VIATOR || 'TOKEN_VIATOR';

export const PARTNERS: Partner[] = [
  {
    id: 'wise',
    name: 'Wise',
    url: 'https://wise.prf.hn/click/camref:1100l5KwDi',
    blurb: 'Multi-currency account, low FX fees, get paid in 40+ currencies.',
    category: 'banking',
    active: true,
  },
  {
    id: 'revolut',
    name: 'Revolut',
    url: 'https://revolut.com/referral/?referral-code=sacha5bp%21MAY2-26-AR-TR5DDH1-H1',
    blurb: 'Free EU account with virtual cards, FX at the real rate.',
    category: 'banking',
    active: true,
  },
  {
    id: 'airalo',
    name: 'Airalo',
    url: 'https://www.airalo.com/?ref=SACHA6010',
    blurb: 'eSIM data plans in 200+ countries. Use code SACHA6010 for $3 off.',
    category: 'esim',
    active: true,
  },
  {
    id: 'safetywing',
    name: 'SafetyWing',
    url: SAFETYWING.startsWith('http') ? SAFETYWING : 'https://safetywing.com',
    blurb: 'Nomad health and travel insurance built for remote workers.',
    category: 'insurance',
    active: SAFETYWING.startsWith('http'),
  },
  {
    id: 'travelpayouts',
    name: 'Travelpayouts',
    url: TRAVELPAYOUTS.startsWith('http') ? TRAVELPAYOUTS : 'https://www.travelpayouts.com',
    blurb: 'Single account for Booking, Skyscanner, Kiwi, GetYourGuide and 90+ brands.',
    category: 'travel-meta',
    active: TRAVELPAYOUTS.startsWith('http'),
  },
  {
    id: 'viator',
    name: 'Viator',
    url: VIATOR.startsWith('http') ? VIATOR : 'https://www.viator.com',
    blurb: 'Tours, day trips and activities in 2 500+ destinations.',
    category: 'tours',
    active: VIATOR.startsWith('http'),
  },
];

export function getPartner(id: string): Partner | undefined {
  return PARTNERS.find((p) => p.id === id);
}

export function getPartnersByCategory(category: Partner['category']): Partner[] {
  return PARTNERS.filter((p) => p.category === category);
}

export function getActivePartners(): Partner[] {
  return PARTNERS.filter((p) => p.active);
}
