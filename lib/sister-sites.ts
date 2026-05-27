import type { Locale } from '@/lib/i18n';
import { LOCALES } from '@/lib/i18n';

export const SISTER_JOBS = {
  name: 'Slate Remote',
  domain: 'slateremote.com',
  url: 'https://slateremote.com',
  tagline: 'Remote tech jobs from across the web, refreshed daily.',
} as const;

export const SISTER_AI = {
  name: 'AI by Job',
  domain: 'ai-by-job.com',
  url: 'https://ai-by-job.com',
  tagline: 'The best AI tools for every job, in 7 languages.',
} as const;

function slug(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Pick a locale supported by the sister sites (same 7 locales today). Falls back to 'en'. */
function pickSisterLocale(locale?: Locale | string): Locale {
  if (locale && (LOCALES as readonly string[]).includes(locale)) return locale as Locale;
  return 'en';
}

export function slateremoteHomeUrl(locale?: Locale | string): string {
  return `${SISTER_JOBS.url}/${pickSisterLocale(locale)}`;
}

export function aiByJobHomeUrl(locale?: Locale | string): string {
  return `${SISTER_AI.url}/${pickSisterLocale(locale)}`;
}

export function slateremoteCountryUrl(country?: string, locale?: Locale | string): string {
  const l = pickSisterLocale(locale);
  if (!country) return `${SISTER_JOBS.url}/${l}`;
  return `${SISTER_JOBS.url}/${l}/locations/${slug(country)}`;
}

export function slateremoteRoleUrl(role?: string, locale?: Locale | string): string {
  const l = pickSisterLocale(locale);
  if (!role) return `${SISTER_JOBS.url}/${l}`;
  return `${SISTER_JOBS.url}/${l}/jobs/${slug(role)}`;
}

export function aiByJobRoleUrl(role?: string, locale?: Locale | string): string {
  const l = pickSisterLocale(locale);
  if (!role) return `${SISTER_AI.url}/${l}`;
  return `${SISTER_AI.url}/${l}/jobs/${slug(role)}`;
}
