import Link from 'next/link';
import type { City } from '@/lib/data/cities';
import type { Locale } from '@/lib/i18n';
import { getCityName } from '@/lib/data/cities';

type Props = { city: City; locale: Locale };

export function CityCard({ city, locale }: Props) {
  return (
    <Link
      href={`/${locale}/cities/${city.slug}`}
      className="block rounded-lg border border-line bg-white/40 px-5 py-4 hover:border-ink transition-colors"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tightish">
          {getCityName(city, locale)}
        </h3>
        <span className="text-xs text-muted">{city.code}</span>
      </div>
      <p className="mt-1 text-sm text-muted line-clamp-2">{city.highlight}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-0.5 rounded-full bg-accent-soft/60 text-ink">
          Score {city.nomadScore}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-line text-ink">
          {city.internetMbps} Mbps
        </span>
        <span className="px-2 py-0.5 rounded-full bg-line text-ink">
          Cost {city.costIndex}
        </span>
      </div>
    </Link>
  );
}
