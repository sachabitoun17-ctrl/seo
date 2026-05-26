import { getPartners, type PartnerCategory } from '@/lib/partners';
import type { Locale } from '@/lib/i18n';

type Props = {
  locale?: Locale;
  categories?: PartnerCategory[];
  heading?: string;
  limit?: number;
};

export function PartnerStack({
  locale,
  categories,
  heading = 'Useful for this trip',
  limit = 6,
}: Props) {
  const partners = getPartners({ categories, locale, limit });
  if (partners.length === 0) return null;

  return (
    <section className="mt-12 border-t border-line pt-8">
      <h2 className="text-sm uppercase tracking-widest text-muted">{heading}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {partners.map((p) => (
          <li key={p.id}>
            <a
              href={p.url}
              target="_blank"
              rel="sponsored noopener"
              className="block rounded-lg border border-line bg-paper px-4 py-3 card-hover"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold tracking-tightish">{p.name}</p>
                <span className="text-[10px] uppercase tracking-widest text-muted">
                  {p.category.replace('-', ' ')}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted leading-snug">{p.blurb}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
