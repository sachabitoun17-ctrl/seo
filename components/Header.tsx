import Link from 'next/link';
import { LangSwitcher } from './LangSwitcher';
import type { Dictionary, Locale } from '@/lib/i18n';
import { SITE_NAME } from '@/lib/seo';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const nav = [
    { href: `/${locale}/countries`, label: dict.nav.countries },
    { href: `/${locale}/cities`, label: dict.nav.cities },
    { href: `/${locale}/visas`, label: dict.nav.visas },
    { href: `/${locale}/guides`, label: dict.nav.guides },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];
  return (
    <header className="sticky top-0 z-30 bg-cream/95 border-b border-line">
      <div className="max-w-container mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-6">
        <Link
          href={`/${locale}`}
          className="font-semibold tracking-tightish text-base"
        >
          {SITE_NAME}
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm text-muted">
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
