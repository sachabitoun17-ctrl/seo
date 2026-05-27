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
  return buildPageMetadata({
    locale: params.lang,
    title: 'Find your best place to work remotely — quiz',
    description: 'Tell us your budget, internet needs and climate preference. We rank 100+ nomad cities and match you with the best basecamp.',
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
        { href: `/${params.lang}`, label: 'Home' },
        { href: `/${params.lang}/finder`, label: 'Find your basecamp' },
      ]} />
      <header className="max-w-2xl mt-4">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold">Interactive · 60 seconds</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tightest font-display">
          Find your best place to work remotely
        </h1>
        <p className="mt-4 text-muted text-lg leading-relaxed">
          Six questions. {cities.length} cities scored on your priorities — budget,
          internet, climate, visa, lifestyle. No signup.
        </p>
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
