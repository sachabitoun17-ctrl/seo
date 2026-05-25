import Link from 'next/link';
import type { Guide } from '@/lib/data/guides';
import type { Locale } from '@/lib/i18n';
import { getGuideTitle, getGuideDescription } from '@/lib/data/guides';

type Props = { guide: Guide; locale: Locale };

export function GuideCard({ guide, locale }: Props) {
  return (
    <Link
      href={`/${locale}/guides/${guide.slug}`}
      className="block rounded-lg border border-line bg-white/40 px-5 py-4 hover:border-ink transition-colors"
    >
      <p className="text-xs uppercase tracking-widest text-muted">{guide.topic}</p>
      <h3 className="mt-1 text-lg font-semibold tracking-tightish leading-snug">
        {getGuideTitle(guide, locale)}
      </h3>
      <p className="mt-2 text-sm text-muted line-clamp-3">
        {getGuideDescription(guide, locale)}
      </p>
    </Link>
  );
}
