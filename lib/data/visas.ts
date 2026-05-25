import visasData from '@/data/visas.json';

export type Visa = {
  slug: string;
  country: string;
  name: string;
  type: 'digital-nomad' | 'passive-income' | 'investor' | 'freelance';
  minIncomeMonthlyEur: number;
  durationMonths: number;
  renewable: boolean;
  taxResidency: 'required' | 'optional' | 'not-required';
  processingDays: number;
  familyEligible: boolean;
  highlights: string[];
  officialUrl: string;
};

const VISAS = visasData as Visa[];
const bySlug = new Map(VISAS.map((v) => [v.slug, v]));

export function getAllVisas(): Visa[] {
  return VISAS;
}

export function getVisa(slug: string): Visa | undefined {
  return bySlug.get(slug);
}

export function getVisasByCountry(countrySlug: string): Visa[] {
  return VISAS.filter((v) => v.country === countrySlug);
}

export function getVisasByType(type: Visa['type']): Visa[] {
  return VISAS.filter((v) => v.type === type);
}
