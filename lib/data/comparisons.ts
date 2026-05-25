import data from '@/data/comparisons.json';

export type Comparison = {
  slug: string;
  a: string;
  b: string;
  type: 'country' | 'city';
  verdict: string;
};

const COMPARISONS = data as Comparison[];
const bySlug = new Map(COMPARISONS.map((c) => [c.slug, c]));

export function getAllComparisons(): Comparison[] {
  return COMPARISONS;
}

export function getComparison(slug: string): Comparison | undefined {
  return bySlug.get(slug);
}
