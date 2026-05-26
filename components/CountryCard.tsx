import Link from 'next/link';
import type { Country } from '@/lib/data/countries';
import type { Locale } from '@/lib/i18n';
import { getCountryName } from '@/lib/data/countries';
import { flagEmoji } from '@/lib/flag';

type Props = { country: Country; locale: Locale };

export function CountryCard({ country, locale }: Props) {
  return (
    <Link
      href={`/${locale}/countries/${country.slug}`}
      className="group block rounded-xl border border-line bg-paper px-5 py-5 card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none mt-0.5" aria-hidden>
            {flagEmoji(country.code)}
          </span>
          <div>
            <h3 className="text-base font-semibold tracking-tightish group-hover:text-accent transition-colors">
              {getCountryName(country, locale)}
            </h3>
            <p className="mt-0.5 text-xs text-muted">{country.capital} · {country.currency}</p>
          </div>
        </div>
        {country.tags.includes('trending') && (
          <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent-deep text-[10px] uppercase tracking-widest font-semibold whitespace-nowrap">
            Trending
          </span>
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
        <div className="rounded-lg bg-sage-soft/50 px-2 py-1.5 text-center">
          <div className="text-muted">Cost</div>
          <div className="font-semibold text-ink">{country.costIndex}</div>
        </div>
        <div className="rounded-lg bg-sky-soft/50 px-2 py-1.5 text-center">
          <div className="text-muted">Mbps</div>
          <div className="font-semibold text-ink">{country.internetMbps}</div>
        </div>
        <div className="rounded-lg bg-sand-soft/50 px-2 py-1.5 text-center">
          <div className="text-muted">Safe</div>
          <div className="font-semibold text-ink">{country.safetyIndex}</div>
        </div>
      </div>
    </Link>
  );
}
