import Link from 'next/link';
import { LangSwitcher } from './LangSwitcher';
import { Logo } from './Logo';
import type { Dictionary, Locale } from '@/lib/i18n';

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
  ];
  return (
    <header className="sticky top-0 z-30 bg-cream border-b border-line/70">
      <div className="max-w-container mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <Link href={`/${locale}`} className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-charcoal">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <LangSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}
