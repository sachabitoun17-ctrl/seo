import { getPartner } from '@/lib/partners';

type Props = {
  id: string;
  /** Optional text override for the link */
  text?: string;
  /** Sentence prefix, e.g. "Save on transfers with" */
  prefix?: string;
  /** Sentence suffix */
  suffix?: string;
};

/**
 * Inline contextual mention of a partner. Used inside body copy.
 * Renders as: "Save on transfers with Wise →"
 */
export function PartnerInline({ id, text, prefix, suffix }: Props) {
  const p = getPartner(id);
  if (!p) return null;
  return (
    <span className="inline">
      {prefix && <span>{prefix} </span>}
      <a
        href={p.url}
        target="_blank"
        rel="sponsored noopener"
        className="font-semibold text-accent hover:text-accent-deep underline underline-offset-4 transition-colors"
      >
        {text || p.name}
        <span aria-hidden> ↗</span>
      </a>
      {suffix && <span> {suffix}</span>}
    </span>
  );
}
