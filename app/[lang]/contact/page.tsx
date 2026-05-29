import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata, SITE_NAME } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: `${dict.footer.contact} ${SITE_NAME}`,
    description: dict.meta.contactDesc.replace('{site}', SITE_NAME),
    pathForLocale: (l) => `/${l}/contact`,
  });
}

export default async function ContactPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/contact`, label: dict.footer.contact },
      ]} />
      <article className="max-w-prose mt-6 prose-content">
        <h1 className="text-4xl font-semibold tracking-tightish">{dict.footer.contact}</h1>
        <p>
          Spotted outdated data, a missing visa, or want to suggest a city we missed?
          Drop us a note.
        </p>
        <p>
          <a href="mailto:hello@slowmad.example">hello@slowmad.example</a>
        </p>
        <h2>Build a site like this</h2>
        <p>
          We build multilingual long-stay travel sites end to end (data pipeline, SEO,
          monetization) from €4 000. Same email.
        </p>
      </article>
    </div>
  );
}
