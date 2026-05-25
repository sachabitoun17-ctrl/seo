import Link from 'next/link';
import type { Comparison } from '@/lib/data/comparisons';
import type { Locale } from '@/lib/i18n';
import { getCountry, getCountryName } from '@/lib/data/countries';
import { getCity, getCityName } from '@/lib/data/cities';

type Props = { comparison: Comparison; locale: Locale };

function label(slug: string, type: 'country' | 'city', locale: Locale): string {
  if (type === 'country') {
    const c = getCountry(slug);
    return c ? getCountryName(c, locale) : slug;
  }
  const c = getCity(slug);
  return c ? getCityName(c, locale) : slug;
}

export function CompareCard({ comparison, locale }: Props) {
  const a = label(comparison.a, comparison.type, locale);
  const b = label(comparison.b, comparison.type, locale);
  return (
    <Link
      href={`/${locale}/compare/${comparison.slug}`}
      className="block rounded-lg border border-line bg-white/40 px-5 py-4 hover:border-ink transition-colors"
    >
      <h3 className="text-lg font-semibold tracking-tightish">
        {a} <span className="text-muted font-normal">vs</span> {b}
      </h3>
      <p className="mt-2 text-sm text-muted line-clamp-2">{comparison.verdict}</p>
    </Link>
  );
}
