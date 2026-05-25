import type { Faq } from '@/lib/faq-templates';
import { JsonLd } from './JsonLd';
import { faqJsonLd } from '@/lib/faq-templates';

type Props = { faqs: Faq[]; heading?: string };

export function FaqSection({ faqs, heading = 'Frequently asked' }: Props) {
  if (faqs.length === 0) return null;
  return (
    <section className="mt-12 max-w-3xl">
      <h2 className="text-xl font-semibold tracking-tightish">{heading}</h2>
      <dl className="mt-6 space-y-6">
        {faqs.map((f) => (
          <div key={f.q} className="border-b border-line pb-6 last:border-0">
            <dt className="font-semibold">{f.q}</dt>
            <dd className="mt-2 text-muted leading-relaxed">{f.a}</dd>
          </div>
        ))}
      </dl>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  );
}
