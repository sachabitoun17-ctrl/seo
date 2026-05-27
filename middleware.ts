import { NextResponse, type NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n';

export const config = {
  // Match every path except Next assets, the IndexNow key, static files, llms.txt
  matcher: ['/((?!_next|api|sitemap.xml|robots.txt|icon.svg|llms.txt|opengraph-image|.*\\.[a-z0-9]+$).*)'],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // If path is already prefixed by a locale, do nothing
  const first = pathname.split('/')[1];
  if ((LOCALES as readonly string[]).includes(first)) {
    return NextResponse.next();
  }
  // Otherwise redirect (root or any unprefixed path) to the default locale (English).
  // We deliberately do NOT auto-detect from Accept-Language: English is the canonical
  // entry point. Users can switch via the LangSwitcher.
  const target = new URL(`/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`, req.url);
  return NextResponse.redirect(target, 307);
}
