import Link from 'next/link';
import type { City } from '@/lib/data/cities';
import type { Locale } from '@/lib/i18n';
import { getCityName } from '@/lib/data/cities';
import { getCountry } from '@/lib/data/countries';
import { cityPhoto, flagSvg, gradientFor } from '@/lib/images';

type Props = { city: City; locale: Locale };

export function CityCard({ city, locale }: Props) {
  const country = getCountry(city.country);
  const photo = cityPhoto(city.slug, 800, 480);
  const flag = flagSvg(country?.code, 80);
  const name = getCityName(city, locale);
  return (
    <Link
      href={`/${locale}/cities/${city.slug}`}
      className="group block rounded-xl overflow-hidden border border-line bg-paper card-hover"
    >
      <div className="relative h-40 w-full overflow-hidden" style={photo ? undefined : { background: gradientFor(city.slug) }}>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        {flag && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={flag}
            alt=""
            width={28}
            height={20}
            loading="lazy"
            className="absolute top-3 left-3 w-7 h-5 rounded-sm shadow-md ring-1 ring-cream/30 object-cover"
          />
        )}
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-cream/95 text-ink text-[10px] font-bold tracking-tightish">
          {city.nomadScore} <span className="font-normal text-muted">/10</span>
        </span>
        <div className="absolute bottom-3 left-3 right-3 text-cream">
          <h3 className="text-lg font-semibold tracking-tightish leading-snug">{name}</h3>
          <p className="text-xs text-cream/80">{country ? country.name[locale] || country.name.en : ''}</p>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-muted leading-relaxed line-clamp-2">{city.highlight}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
          <div className="rounded-md bg-sage-soft/50 px-2 py-1 text-center">
            <div className="text-muted">Cost</div>
            <div className="font-semibold text-ink">{city.costIndex}</div>
          </div>
          <div className="rounded-md bg-sky-soft/50 px-2 py-1 text-center">
            <div className="text-muted">Mbps</div>
            <div className="font-semibold text-ink">{city.internetMbps}</div>
          </div>
          <div className="rounded-md bg-sand-soft/50 px-2 py-1 text-center">
            <div className="text-muted">Safe</div>
            <div className="font-semibold text-ink">{city.safetyIndex}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
