import { gradientFor } from '@/lib/images';

type Props = {
  src?: string;
  alt: string;
  slug: string;
  /** Optional badge / pill / kicker shown above the title */
  kicker?: string;
  title: string;
  subtitle?: string;
  flagSrc?: string;
};

/**
 * Big hero block at the top of country / city / visa detail pages.
 * Uses a real photo if available, falls back to a deterministic gradient.
 */
export function HeroImage({ src, alt, slug, kicker, title, subtitle, flagSrc }: Props) {
  return (
    <section className="relative -mx-5 sm:-mx-8 mb-10">
      <div
        className="relative h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden"
        style={src ? undefined : { background: gradientFor(slug) }}
      >
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-container w-full mx-auto px-5 sm:px-8 pb-8 sm:pb-12 text-cream">
            {kicker && (
              <p className="text-xs uppercase tracking-widest text-cream/80 font-semibold">
                {kicker}
              </p>
            )}
            <div className="mt-2 flex items-center gap-4">
              {flagSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={flagSrc}
                  alt=""
                  width={64}
                  height={48}
                  className="rounded-md shadow-lg border border-cream/20"
                />
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tightest leading-[1.05] font-display">
                {title}
              </h1>
            </div>
            {subtitle && (
              <p className="mt-3 text-base sm:text-lg text-cream/85 max-w-2xl">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
