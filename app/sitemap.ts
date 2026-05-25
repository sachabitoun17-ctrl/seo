import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';
import { SITE_URL } from '@/lib/seo';
import { getAllCountries } from '@/lib/data/countries';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const lang of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    });
    entries.push({
      url: `${SITE_URL}/${lang}/countries`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
    for (const country of getAllCountries()) {
      entries.push({
        url: `${SITE_URL}/${lang}/countries/${country.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
