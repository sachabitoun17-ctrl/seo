import Link from 'next/link';
import { LangSwitcher } from './LangSwitcher';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import type { Dictionary, Locale } from '@/lib/i18n';
import { SISTER_JOBS } from '@/lib/sister-sites';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const nav = [
    { href: `/${locale}/countries`, label: dict.nav.countries },
    { href: `/${locale}/cities`, label: dict.nav.cities },
    { href: `/${locale}/visas`, label: dict.nav.visas },
    { href: `/${locale}/compare`, label: dict.nav.compare },
    { href: `/${locale}/guides`, label: dict.nav.guides },
    { href: `/${locale}/themes`, label: 'Themes' },
    { href: `/${locale}/for`, label: 'By job role' },
    { href: `/${locale}/seasonal`, label: 'By season' },
    { href: `/${locale}/cost-of-living`, label: 'Cost of living' },
    { href: `/${locale}/coworking`, label: 'Coworking' },
    { href: `/${locale}/regions`, label: dict.nav.regions },
    { href: `/${locale}/best`, label: 'Best for…' },
    { href: `/${locale}/glossary`, label: 'Glossary' },
    { href: `/${locale}/search`, label: 'Search' },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: SISTER_JOBS.url, label: 'Find remote jobs ↗', external: true },
  ];
  const desktop = nav.slice(0, 5);
  return (
    <header className="sticky top-0 z-30 bg-cream border-b border-line/70">
      <div className="max-w-container mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-charcoal">
          {desktop.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink transition-colors">
              {item.label}
            </Link>
          ))}
          <a
            href={SISTER_JOBS.url}
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-deep transition-colors font-medium"
          >
            Find remote jobs ↗
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitcher currentLocale={locale} />
          <MobileMenu items={nav} />
        </div>
      </div>
    </header>
  );
}
