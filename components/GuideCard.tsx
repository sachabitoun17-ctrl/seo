import Link from 'next/link';
import type { Guide } from '@/lib/data/guides';
import type { Locale } from '@/lib/i18n';
import { getGuideTitle, getGuideDescription } from '@/lib/data/guides';
import { getCountry } from '@/lib/data/countries';
import { getCity } from '@/lib/data/cities';
import { cityPhoto, countryPhoto, flagSvg, gradientFor } from '@/lib/images';

const TOPIC_COLORS: Record<Guide['topic'], string> = {
  visas: 'bg-accent-soft text-accent-deep',
  cost: 'bg-sage-soft text-sage',
  tax: 'bg-sand-soft text-sand',
  infrastructure: 'bg-sky-soft text-sky',
  'city-guide': 'bg-accent-soft text-accent-deep',
  tools: 'bg-cream border border-line text-charcoal',
  freelancing: 'bg-sage-soft text-sage',
};

type Props = { guide: Guide; locale: Locale };

export function GuideCard({ guide, locale }: Props) {
  const citySlug = guide.relatedCities?.[0];
  const countrySlug = guide.relatedCountries?.[0];
  const city = citySlug ? getCity(citySlug) : undefined;
  const country = countrySlug ? getCountry(countrySlug) : city ? getCountry(city.country) : undefined;
  const photo = (citySlug && cityPhoto(citySlug, 800, 480)) || (countrySlug && countryPhoto(countrySlug, 800, 480)) || undefined;
  const flag = flagSvg(country?.code, 80);
  const fallbackSlug = citySlug || countrySlug || guide.slug;

  return (
    <Link
      href={`/${locale}/guides/${guide.slug}`}
      className="group block rounded-xl overflow-hidden border border-line bg-paper card-hover"
    >
      <div className="relative h-32 w-full overflow-hidden" style={photo ? undefined : { background: gradientFor(fallbackSlug) }}>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
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
        <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${TOPIC_COLORS[guide.topic]}`}>
          {guide.topic.replace('-', ' ')}
        </span>
      </div>
      <div className="px-5 py-4">
        <h3 className="text-base font-semibold tracking-tightish leading-snug group-hover:text-accent transition-colors">
          {getGuideTitle(guide, locale)}
        </h3>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
          {getGuideDescription(guide, locale)}
        </p>
      </div>
    </Link>
  );
}
