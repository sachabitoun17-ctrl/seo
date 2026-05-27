import type { Metadata } from 'next';
import { LOCALES, type Locale } from './i18n';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://slowmadly.com';
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Slowmadly';

const TITLE_MAX = 60;
const DESCRIPTION_MIN = 110;
const DESCRIPTION_MAX = 158;

type AlternateBuilder = (locale: Locale) => string;

export function buildLanguageAlternates(pathForLocale: AlternateBuilder): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[l] = pathForLocale(l);
  out['x-default'] = pathForLocale('en');
  return out;
}

type PageMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  pathForLocale: AlternateBuilder;
  ogImage?: string;
  noindex?: boolean;
  /** Override OG type. Defaults to 'website' (or 'article' if you pass it). */
  ogType?: 'website' | 'article';
};

function clampTitle(t: string): string {
  const trimmed = t.trim();
  if (trimmed.length <= TITLE_MAX) return trimmed;
  // Truncate at word boundary if possible
  const slice = trimmed.slice(0, TITLE_MAX - 1);
  const lastSpace = slice.lastIndexOf(' ');
  return (lastSpace > 30 ? slice.slice(0, lastSpace) : slice).replace(/[,;:.\s]+$/, '') + '…';
}

function clampDescription(d: string): string {
  const trimmed = d.trim();
  // Pad short ones
  let value = trimmed;
  if (value.length < DESCRIPTION_MIN) {
    value = `${value} ${SITE_NAME}: country guides for nomads who travel slowly. 67 countries, 106 cities, 41 visas, 7 languages.`.trim();
  }
  if (value.length <= DESCRIPTION_MAX) return value;
  const slice = value.slice(0, DESCRIPTION_MAX - 1);
  const lastSpace = slice.lastIndexOf(' ');
  return (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).replace(/[,;:.\s]+$/, '') + '…';
}

export function buildPageMetadata(input: PageMetaInput): Metadata {
  const canonical = input.pathForLocale(input.locale);
  const title = clampTitle(input.title);
  const description = clampDescription(input.description);
  const alternateLocales = LOCALES.filter((l) => l !== input.locale);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(input.pathForLocale),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: input.locale,
      alternateLocale: alternateLocales,
      type: input.ogType || 'website',
      images: input.ogImage
        ? [{ url: input.ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: input.ogImage ? [input.ogImage] : undefined,
    },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
