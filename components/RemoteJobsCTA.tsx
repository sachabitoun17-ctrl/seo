import { SISTER_JOBS } from '@/lib/sister-site';

type Props = {
  cityName?: string;
  countryName?: string;
  heading?: string;
};

export function RemoteJobsCTA({ cityName, countryName, heading }: Props) {
  const target = cityName || countryName;
  const defaultHeading = target
    ? `Working remotely from ${target}?`
    : 'Need a remote job to fund the slow travel?';
  return (
    <section className="mt-12 rounded-2xl border border-line bg-paper-gradient px-6 py-7 sm:px-8 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-accent-deep font-semibold">Sister site</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tightish font-display">
          {heading || defaultHeading}
        </h2>
        <p className="mt-2 text-sm text-muted max-w-md">
          {SISTER_JOBS.tagline} Fresh listings from 8 public APIs, deduplicated, indexed.
        </p>
      </div>
      <a
        href={SISTER_JOBS.url}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-2 rounded-md bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-accent-deep transition-colors whitespace-nowrap"
      >
        Browse on {SISTER_JOBS.domain} <span aria-hidden>↗</span>
      </a>
    </section>
  );
}
