import Link from 'next/link';
import type { Country } from '@/lib/data/countries';
import type { Locale } from '@/lib/i18n';
import { getCountryName } from '@/lib/data/countries';

type Props = { country: Country; locale: Locale };

export function CountryCard({ country, locale }: Props) {
  return (
    <Link
      href={`/${locale}/countries/${country.slug}`}
      className="block rounded-lg border border-line bg-white/40 px-5 py-4 hover:border-ink transition-colors"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tightish">
          {getCountryName(country, locale)}
        </h3>
        <span className="text-xs text-muted">{country.code}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{country.capital} · {country.currency}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-0.5 rounded-full bg-accent-soft/60 text-ink">
          Cost {country.costIndex}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-line text-ink">
          {country.internetMbps} Mbps
        </span>
        <span className="px-2 py-0.5 rounded-full bg-line text-ink">
          Safety {country.safetyIndex}
        </span>
      </div>
    </Link>
  );
}
