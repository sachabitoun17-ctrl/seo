import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getAllCities } from '@/lib/data/cities';
import { getAllCountries } from '@/lib/data/countries';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Finder } from '@/components/Finder';
import { PromoBanner } from '@/components/PromoBanner';
import { SlateRemoteBanner } from '@/components/SlateRemoteBanner';

export const runtime = 'edge';

type Props = { params: { lang: Locale } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return buildPageMetadata({
    locale: params.lang,
    title: dict.meta.finderTitle,
    description: dict.meta.finderDesc,
    pathForLocale: (l) => `/${l}/finder`,
  });
}

export default async function FinderPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const cities = getAllCities();
  const countries = getAllCountries();

  return (
    <div className="py-14">
      <Breadcrumbs items={[
        { href: `/${params.lang}`, label: dict.common.home },
        { href: `/${params.lang}/finder`, label: dict.nav.findMyCity },
      ]} />
      <header className="max-w-2xl mt-4">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold">{dict.home.curatedBadge}</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tightest font-display">
          {dict.home.findMyBestCity}
        </h1>
        <p className="mt-4 text-muted text-lg leading-relaxed">{dict.home.pitchFinderText}</p>
      </header>

      <div className="mt-10">
        <Finder locale={params.lang} cities={cities} countries={countries} />
      </div>

      <div className="mt-16 grid gap-4 lg:grid-cols-2">
        <PromoBanner locale={params.lang} variant="setup" />
        <PromoBanner locale={params.lang} variant="insurance" />
      </div>

      <SlateRemoteBanner locale={params.lang} className="mt-10" />
    </div>
  );
}
