import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { Logo } from './Logo';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: 'Explore',
      links: [
        { href: `/${locale}/countries`, label: dict.nav.countries },
        { href: `/${locale}/cities`, label: dict.nav.cities },
        { href: `/${locale}/regions`, label: dict.nav.regions },
        { href: `/${locale}/best`, label: 'Best for…' },
      ],
    },
    {
      title: 'Practical',
      links: [
        { href: `/${locale}/visas`, label: dict.nav.visas },
        { href: `/${locale}/cost-of-living`, label: 'Cost of living' },
        { href: `/${locale}/glossary`, label: 'Glossary' },
        { href: `/${locale}/guides`, label: dict.nav.guides },
      ],
    },
    {
      title: 'About',
      links: [
        { href: `/${locale}/about`, label: dict.nav.about },
        { href: `/${locale}/contact`, label: dict.footer.contact },
        { href: `/${locale}/legal`, label: dict.footer.legal },
      ],
    },
  ];

  return (
    <footer className="mt-28 border-t border-line/70 bg-paper-gradient">
      <div className="max-w-container mx-auto px-5 sm:px-8 py-14 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-muted max-w-xs">{dict.footer.tagline}</p>
        </div>
        {sections.map((s) => (
          <div key={s.title}>
            <p className="text-xs uppercase tracking-widest text-muted">{s.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line/70">
        <div className="max-w-container mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-muted">
          <p>© {year} Slowmadly. {dict.footer.rights}</p>
          <p className="max-w-md sm:text-right">{dict.footer.affiliateNotice}</p>
        </div>
      </div>
    </footer>
  );
}
