import type { Metadata } from 'next';
import { LOCALES, type Locale } from './i18n';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://slowmadly.com';
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Slowmadly';

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
};

export function buildPageMetadata(input: PageMetaInput): Metadata {
  const canonical = input.pathForLocale(input.locale);
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(input.pathForLocale),
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: input.locale,
      type: 'website',
      images: input.ogImage ? [{ url: input.ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: input.ogImage ? [input.ogImage] : undefined,
    },
    robots: input.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
