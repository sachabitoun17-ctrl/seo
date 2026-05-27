import Link from 'next/link';
import { LangSwitcher } from './LangSwitcher';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import type { Dictionary, Locale } from '@/lib/i18n';
import { SISTER_JOBS, slateremoteHomeUrl } from '@/lib/sister-sites';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const jobsUrl = slateremoteHomeUrl(locale);
  const nav = [
    { href: `/${locale}/finder`, label: dict.nav.findMyCity },
    { href: `/${locale}/countries`, label: dict.nav.countries },
    { href: `/${locale}/cities`, label: dict.nav.cities },
    { href: `/${locale}/visas`, label: dict.nav.visas },
    { href: `/${locale}/compare`, label: dict.nav.compare },
    { href: `/${locale}/guides`, label: dict.nav.guides },
    { href: `/${locale}/themes`, label: dict.nav.themes },
    { href: `/${locale}/for`, label: dict.nav.byJobRole },
    { href: `/${locale}/seasonal`, label: dict.nav.bySeason },
    { href: `/${locale}/cost-of-living`, label: dict.nav.costOfLiving },
    { href: `/${locale}/coworking`, label: dict.nav.coworking },
    { href: `/${locale}/regions`, label: dict.nav.regions },
    { href: `/${locale}/best`, label: dict.nav.bestFor },
    { href: `/${locale}/tools`, label: dict.nav.tools },
    { href: `/${locale}/glossary`, label: dict.nav.glossary },
    { href: `/${locale}/search`, label: dict.nav.search },
    { href: `/${locale}/about`, label: dict.nav.about },
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
            href={jobsUrl}
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
