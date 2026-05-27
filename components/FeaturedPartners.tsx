import { getPartners, type Partner, type PartnerCategory } from '@/lib/partners';
import type { Locale } from '@/lib/i18n';

type Props = {
  locale: Locale;
  categories: PartnerCategory[];
  heading?: string;
  /** show only the 1-2 most relevant partners as primary CTA buttons */
  limit?: number;
};

/**
 * Eye-catching primary CTA block. Used at the TOP of detail pages
 * to capture attention before the user reads the data.
 */
export function FeaturedPartners({ locale, categories, heading = 'Set up in 2 minutes', limit = 3 }: Props) {
  const partners = getPartners({ categories, locale, tier: 'primary', limit });
  if (partners.length === 0) return null;

  return (
    <section className="mt-6 rounded-2xl border border-accent-soft bg-accent-soft/30 px-5 py-5 sm:px-6 sm:py-6">
      <p className="text-[10px] uppercase tracking-widest text-accent-deep font-semibold">{heading}</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {partners.map((p: Partner) => (
          <li key={p.id}>
            <a
              href={p.url}
              target="_blank"
              rel="sponsored noopener"
              className="block rounded-lg bg-paper border border-line px-4 py-3 hover:border-ink card-hover h-full"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-sm tracking-tightish">{p.name}</span>
                <span aria-hidden className="text-accent text-sm">↗</span>
              </div>
              <p className="mt-1 text-xs text-muted line-clamp-2">{p.blurb}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
