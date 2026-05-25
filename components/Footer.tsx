import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { SITE_NAME } from '@/lib/seo';

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line mt-24 py-10 text-sm text-muted">
      <div className="max-w-container mx-auto px-5 sm:px-8 grid gap-6 md:grid-cols-3">
        <div>
          <p className="font-semibold text-ink">{SITE_NAME}</p>
          <p className="mt-2 max-w-xs">{dict.footer.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4 md:justify-center">
          <Link href={`/${locale}/about`} className="hover:text-ink">
            {dict.nav.about}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-ink">
            {dict.footer.contact}
          </Link>
          <Link href={`/${locale}/legal`} className="hover:text-ink">
            {dict.footer.legal}
          </Link>
        </div>
        <div className="md:text-right">
          <p>© {year} {SITE_NAME}. {dict.footer.rights}</p>
          <p className="mt-2 text-xs leading-relaxed max-w-xs md:ml-auto">
            {dict.footer.affiliateNotice}
          </p>
        </div>
      </div>
    </footer>
  );
}
