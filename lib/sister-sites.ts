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

export function slateremoteCountryUrl(country?: string): string {
  if (!country) return SISTER_JOBS.url;
  return `${SISTER_JOBS.url}/en/locations/${slug(country)}`;
}

export function slateremoteRoleUrl(role?: string): string {
  if (!role) return SISTER_JOBS.url;
  return `${SISTER_JOBS.url}/en/jobs/${slug(role)}`;
}

export function aiByJobRoleUrl(role?: string): string {
  if (!role) return SISTER_AI.url;
  return `${SISTER_AI.url}/en/jobs/${slug(role)}`;
}
