import Link from 'next/link';
import type { City } from '@/lib/data/cities';
import type { Locale } from '@/lib/i18n';
import { getCityName } from '@/lib/data/cities';
import { getCountry } from '@/lib/data/countries';
import { flagEmoji } from '@/lib/flag';

type Props = { city: City; locale: Locale };

export function CityCard({ city, locale }: Props) {
  const country = getCountry(city.country);
  return (
    <Link
      href={`/${locale}/cities/${city.slug}`}
      className="group block rounded-xl border border-line bg-paper px-5 py-5 card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none mt-0.5" aria-hidden>
            {flagEmoji(country?.code)}
          </span>
          <div>
            <h3 className="text-base font-semibold tracking-tightish group-hover:text-accent transition-colors">
              {getCityName(city, locale)}
            </h3>
            <p className="mt-0.5 text-xs text-muted">{country ? country.name[locale] || country.name.en : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px]">
          <span className="font-bold text-accent text-sm">{city.nomadScore}</span>
          <span className="text-muted">/10</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted leading-relaxed line-clamp-2">{city.highlight}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
        <div className="rounded-lg bg-sage-soft/50 px-2 py-1.5 text-center">
          <div className="text-muted">Cost</div>
          <div className="font-semibold text-ink">{city.costIndex}</div>
        </div>
        <div className="rounded-lg bg-sky-soft/50 px-2 py-1.5 text-center">
          <div className="text-muted">Mbps</div>
          <div className="font-semibold text-ink">{city.internetMbps}</div>
        </div>
        <div className="rounded-lg bg-sand-soft/50 px-2 py-1.5 text-center">
          <div className="text-muted">Safe</div>
          <div className="font-semibold text-ink">{city.safetyIndex}</div>
        </div>
      </div>
    </Link>
  );
}
