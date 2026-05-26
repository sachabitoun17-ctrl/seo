import Link from 'next/link';
import type { Guide } from '@/lib/data/guides';
import type { Locale } from '@/lib/i18n';
import { getGuideTitle, getGuideDescription } from '@/lib/data/guides';

const TOPIC_COLORS: Record<Guide['topic'], string> = {
  visas: 'bg-accent-soft text-accent-deep',
  cost: 'bg-sage-soft text-sage',
  tax: 'bg-sand-soft text-sand',
  infrastructure: 'bg-sky-soft text-sky',
  'city-guide': 'bg-accent-soft text-accent-deep',
  tools: 'bg-cream border border-line text-charcoal',
};

type Props = { guide: Guide; locale: Locale };

export function GuideCard({ guide, locale }: Props) {
  return (
    <Link
      href={`/${locale}/guides/${guide.slug}`}
      className="group block rounded-xl border border-line bg-paper px-5 py-5 card-hover"
    >
      <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-widest ${TOPIC_COLORS[guide.topic]}`}>
        {guide.topic.replace('-', ' ')}
      </span>
      <h3 className="mt-3 text-base font-semibold tracking-tightish leading-snug group-hover:text-accent transition-colors">
        {getGuideTitle(guide, locale)}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
        {getGuideDescription(guide, locale)}
      </p>
    </Link>
  );
}
