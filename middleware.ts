import { NextResponse, type NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n';

export const config = {
  // Match every path except Next assets, the IndexNow key, static files, llms.txt
  matcher: ['/((?!_next|api|sitemap.xml|robots.txt|icon.svg|llms.txt|opengraph-image|.*\\.[a-z0-9]+$).*)'],
};

function pickLocale(req: NextRequest): string {
  const header = req.headers.get('accept-language') || '';
  for (const part of header.split(',')) {
    const tag = part.trim().split(';')[0].toLowerCase().slice(0, 2);
    if ((LOCALES as readonly string[]).includes(tag)) return tag;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // If path is already prefixed by a locale, do nothing
  const first = pathname.split('/')[1];
  if ((LOCALES as readonly string[]).includes(first)) {
    return NextResponse.next();
  }
  // Otherwise redirect (root or any unprefixed path) to /<locale> + remainder
  const locale = pickLocale(req);
  const target = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, req.url);
  return NextResponse.redirect(target, 307);
}
