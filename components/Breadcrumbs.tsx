import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { SITE_URL } from '@/lib/seo';

type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href.startsWith('http') ? c.href : `${SITE_URL}${c.href}`,
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden>/</span>}
              {i === items.length - 1 ? (
                <span className="text-ink">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={ld} />
    </>
  );
}
