import Link from 'next/link';
import type { Country } from '@/lib/data/countries';
import type { Locale } from '@/lib/i18n';
import { getCountryName } from '@/lib/data/countries';
import { countryPhoto, flagSvg, gradientFor } from '@/lib/images';

type Props = { country: Country; locale: Locale };

export function CountryCard({ country, locale }: Props) {
  const photo = countryPhoto(country.slug, 800, 480);
  const flag = flagSvg(country.code, 80);
  const name = getCountryName(country, locale);
  return (
    <Link
      href={`/${locale}/countries/${country.slug}`}
      className="group block rounded-xl overflow-hidden border border-line bg-paper card-hover"
    >
      <div className="relative h-40 w-full overflow-hidden" style={photo ? undefined : { background: gradientFor(country.slug) }}>
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
        {country.tags.includes('trending') && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-accent text-cream text-[10px] uppercase tracking-widest font-bold">
            Trending
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 text-cream">
          <h3 className="text-lg font-semibold tracking-tightish leading-snug">{name}</h3>
          <p className="text-xs text-cream/80">{country.capital} · {country.currency}</p>
        </div>
      </div>
      <div className="px-4 py-3 grid grid-cols-3 gap-2 text-[11px]">
        <div className="rounded-md bg-sage-soft/50 px-2 py-1 text-center">
          <div className="text-muted">Cost</div>
          <div className="font-semibold text-ink">{country.costIndex}</div>
        </div>
        <div className="rounded-md bg-sky-soft/50 px-2 py-1 text-center">
          <div className="text-muted">Mbps</div>
          <div className="font-semibold text-ink">{country.internetMbps}</div>
        </div>
        <div className="rounded-md bg-sand-soft/50 px-2 py-1 text-center">
          <div className="text-muted">Safe</div>
          <div className="font-semibold text-ink">{country.safetyIndex}</div>
        </div>
      </div>
    </Link>
  );
}
