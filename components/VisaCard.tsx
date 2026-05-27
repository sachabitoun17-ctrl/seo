import Link from 'next/link';
import type { Visa } from '@/lib/data/visas';
import type { Locale } from '@/lib/i18n';
import { getCountry, getCountryName } from '@/lib/data/countries';
import { countryPhoto, flagSvg, gradientFor } from '@/lib/images';

type Props = { visa: Visa; locale: Locale };

const TYPE_COLORS: Record<Visa['type'], string> = {
  'digital-nomad': 'bg-accent-soft text-accent-deep',
  'passive-income': 'bg-sage-soft text-sage',
  'investor': 'bg-sand-soft text-sand',
  'freelance': 'bg-sky-soft text-sky',
};

export function VisaCard({ visa, locale }: Props) {
  const country = getCountry(visa.country);
  const photo = country ? countryPhoto(country.slug, 800, 480) : undefined;
  const flag = flagSvg(country?.code, 80);
  const incomeLabel = visa.minIncomeMonthlyEur
    ? `€${visa.minIncomeMonthlyEur.toLocaleString()}/mo`
    : 'No income';
  return (
    <Link
      href={`/${locale}/visas/${visa.slug}`}
      className="group block rounded-xl overflow-hidden border border-line bg-paper card-hover"
    >
      <div className="relative h-32 w-full overflow-hidden" style={photo ? undefined : { background: gradientFor(visa.country) }}>
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
        <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${TYPE_COLORS[visa.type]}`}>
          {visa.type.replace('-', ' ')}
        </span>
        <div className="absolute bottom-3 left-3 right-3 text-cream">
          <h3 className="text-base font-semibold tracking-tightish leading-snug">{visa.name}</h3>
          <p className="text-xs text-cream/80">{country ? getCountryName(country, locale) : ''}</p>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-muted">{visa.durationMonths} months · ~{visa.processingDays} days processing</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
          <span className="px-2 py-1 rounded-md bg-cream border border-line font-semibold text-ink">
            {incomeLabel}
          </span>
          {visa.renewable && (
            <span className="px-2 py-1 rounded-md bg-cream border border-line text-charcoal">↻ Renewable</span>
          )}
          {visa.familyEligible && (
            <span className="px-2 py-1 rounded-md bg-cream border border-line text-charcoal">Family</span>
          )}
        </div>
      </div>
    </Link>
  );
}
