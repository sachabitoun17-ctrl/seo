import { getActivePartners, type Partner } from '@/lib/partners';

type Props = {
  categories?: Partner['category'][];
  heading?: string;
};

export function PartnerStack({ categories, heading = 'Useful for this trip' }: Props) {
  let partners = getActivePartners();
  if (categories?.length) {
    partners = partners.filter((p) => categories.includes(p.category));
  }
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
              className="block rounded-lg border border-line px-4 py-3 hover:border-ink transition-colors"
            >
              <p className="font-semibold">{p.name}</p>
              <p className="mt-1 text-sm text-muted">{p.blurb}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
