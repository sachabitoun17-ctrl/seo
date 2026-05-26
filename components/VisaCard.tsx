import Link from 'next/link';
import type { Visa } from '@/lib/data/visas';
import type { Locale } from '@/lib/i18n';
import { getCountry } from '@/lib/data/countries';
import { flagEmoji } from '@/lib/flag';

type Props = { visa: Visa; locale: Locale };

const TYPE_COLORS: Record<Visa['type'], string> = {
  'digital-nomad': 'bg-accent-soft text-accent-deep',
  'passive-income': 'bg-sage-soft text-sage',
  'investor': 'bg-sand-soft text-sand',
  'freelance': 'bg-sky-soft text-sky',
};

export function VisaCard({ visa, locale }: Props) {
  const country = getCountry(visa.country);
  const incomeLabel = visa.minIncomeMonthlyEur
    ? `€${visa.minIncomeMonthlyEur.toLocaleString()}/mo`
    : 'No income';
  return (
    <Link
      href={`/${locale}/visas/${visa.slug}`}
      className="group block rounded-xl border border-line bg-paper px-5 py-5 card-hover"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5" aria-hidden>{flagEmoji(country?.code)}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold tracking-tightish leading-snug group-hover:text-accent transition-colors">
            {visa.name}
          </h3>
          <p className="mt-1 text-xs text-muted">{visa.durationMonths} months · ~{visa.processingDays} days processing</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
        <span className={`px-2 py-1 rounded-md font-semibold uppercase tracking-widest ${TYPE_COLORS[visa.type]}`}>
          {visa.type.replace('-', ' ')}
        </span>
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
    </Link>
  );
}
