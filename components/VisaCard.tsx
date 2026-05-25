import Link from 'next/link';
import type { Visa } from '@/lib/data/visas';
import type { Locale } from '@/lib/i18n';

type Props = { visa: Visa; locale: Locale };

export function VisaCard({ visa, locale }: Props) {
  const incomeLabel = visa.minIncomeMonthlyEur
    ? `€${visa.minIncomeMonthlyEur.toLocaleString()}/mo`
    : 'No income threshold';
  return (
    <Link
      href={`/${locale}/visas/${visa.slug}`}
      className="block rounded-lg border border-line bg-white/40 px-5 py-4 hover:border-ink transition-colors"
    >
      <h3 className="text-base font-semibold tracking-tightish">{visa.name}</h3>
      <p className="mt-1 text-xs text-muted uppercase tracking-widest">
        {visa.type.replace('-', ' ')} · {visa.durationMonths} months
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-0.5 rounded-full bg-accent-soft/60 text-ink">
          {incomeLabel}
        </span>
        {visa.renewable && (
          <span className="px-2 py-0.5 rounded-full bg-line text-ink">Renewable</span>
        )}
        {visa.familyEligible && (
          <span className="px-2 py-0.5 rounded-full bg-line text-ink">Family OK</span>
        )}
      </div>
    </Link>
  );
}
