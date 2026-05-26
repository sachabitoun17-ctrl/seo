import { getAllCountries, getCountryName } from '@/lib/data/countries';
import { getAllCities, getCityName } from '@/lib/data/cities';
import { getAllVisas } from '@/lib/data/visas';
import { getAllGuides, getGuideTitle } from '@/lib/data/guides';
import { getAllThemes, getThemeTitle } from '@/lib/data/themes';
import { getAllNationalities, getNationalityName } from '@/lib/data/nationalities';
import { getAllCriteria, getCriterionTitle } from '@/lib/data/criteria';
import { getAllRoles, getRoleName } from '@/lib/data/roles';
import { getAllSeasons, getSeasonTitle } from '@/lib/data/seasons';
import { getAllRegions, getRegionName } from '@/lib/data/regions';
import { getAllComparisons } from '@/lib/data/comparisons';
import { getAllCoworking } from '@/lib/data/coworking';
import { SITE_URL } from '@/lib/seo';
import { SISTER_JOBS, SISTER_AI } from '@/lib/sister-sites';

export const runtime = 'edge';
export const dynamic = 'force-static';

function url(path: string): string {
  return `${SITE_URL}${path}`;
}

export async function GET() {
  const countries = getAllCountries();
  const cities = getAllCities();
  const visas = getAllVisas();
  const guides = getAllGuides();
  const themes = getAllThemes();
  const nationalities = getAllNationalities();
  const criteria = getAllCriteria();
  const roles = getAllRoles();
  const seasons = getAllSeasons();
  const regions = getAllRegions();
  const comparisons = getAllComparisons();
  const coworking = getAllCoworking();

  // Top picks: highest nomad score / most popular
  const topCities = [...cities].sort((a, b) => b.nomadScore - a.nomadScore).slice(0, 30);
  const trendingCountries = countries.filter((c) => c.tags.includes('trending'));
  const topGuides = guides.slice(0, 20);
  const topComparisons = comparisons.slice(0, 25);

  const lines: string[] = [];

  lines.push('# Slowmadly');
  lines.push('');
  lines.push(`> Country, city and visa guides for digital nomads who travel slowly. ${countries.length} countries, ${cities.length} cities, ${visas.length} nomad visas, ${guides.length} long-form guides, in 7 languages (en, fr, es, pt, it, de, pl). Free, no paywall, no signups required.`);
  lines.push('');

  lines.push('## About this site');
  lines.push('');
  lines.push(`Slowmadly is a research project documenting destinations that welcome long-stay travelers (1-12 months). All data updated for 2026. Cost of living based on cross-referenced Numbeo + Nomadlist data. Visa requirements verified against official government portals.`);
  lines.push('');
  lines.push('Slowmadly is part of a small network with sister sites:');
  lines.push(`- [${SISTER_JOBS.name}](${SISTER_JOBS.url}): ${SISTER_JOBS.tagline}`);
  lines.push(`- [${SISTER_AI.name}](${SISTER_AI.url}): ${SISTER_AI.tagline}`);
  lines.push('');

  lines.push('## Browse');
  lines.push('');
  lines.push(`- [All countries](${url('/en/countries')}): ${countries.length} digital nomad destinations`);
  lines.push(`- [All cities](${url('/en/cities')}): ${cities.length} cities ranked for nomads`);
  lines.push(`- [All visas](${url('/en/visas')}): ${visas.length} digital nomad visa programs`);
  lines.push(`- [All guides](${url('/en/guides')}): ${guides.length} long-form articles`);
  lines.push(`- [Compare destinations](${url('/en/compare')}): ${comparisons.length} head-to-head comparisons`);
  lines.push(`- [Cost of living](${url('/en/cost-of-living')}): monthly budgets for ${cities.length} cities`);
  lines.push(`- [Coworking by city](${url('/en/coworking')}): top spaces in ${coworking.length} cities`);
  lines.push(`- [Best for criterion](${url('/en/best')}): ${criteria.length} filters (warm, affordable, safe, fast wifi, etc.)`);
  lines.push(`- [By job role](${url('/en/for')}): ${roles.length} job-specific city picks`);
  lines.push(`- [By season](${url('/en/seasonal')}): ${seasons.length} seasonal recommendations`);
  lines.push(`- [Lifestyle themes](${url('/en/themes')}): ${themes.length} themes (surf, food, yoga, family, etc.)`);
  lines.push(`- [By passport](${url('/en/visas/for')}): ${nationalities.length} nationality-specific visa lists`);
  lines.push(`- [Regions](${url('/en/regions')}): ${regions.length} regions of the world`);
  lines.push(`- [Glossary](${url('/en/glossary')}): visa, tax and remote work terms`);
  lines.push(`- [Search](${url('/en/search')}): live filter across all pages`);
  lines.push('');

  if (trendingCountries.length > 0) {
    lines.push('## Trending nomad destinations 2026');
    lines.push('');
    for (const c of trendingCountries) {
      const name = getCountryName(c, 'en');
      lines.push(`- [${name}](${url(`/en/countries/${c.slug}`)}): ${c.visa.digitalNomad}, cost index ${c.costIndex}/100`);
    }
    lines.push('');
  }

  lines.push('## Top nomad cities');
  lines.push('');
  for (const c of topCities) {
    const name = getCityName(c, 'en');
    lines.push(`- [${name}](${url(`/en/cities/${c.slug}`)}): nomad score ${c.nomadScore}/10. ${c.highlight}`);
  }
  lines.push('');

  lines.push('## Digital nomad visas');
  lines.push('');
  for (const v of visas) {
    const income = v.minIncomeMonthlyEur
      ? `€${v.minIncomeMonthlyEur.toLocaleString()}/month`
      : 'no minimum income';
    lines.push(`- [${v.name}](${url(`/en/visas/${v.slug}`)}): ${v.type.replace('-', ' ')}, ${v.durationMonths} months, ${income}.`);
  }
  lines.push('');

  lines.push('## Visas by nationality');
  lines.push('');
  for (const n of nationalities) {
    const name = getNationalityName(n, 'en');
    lines.push(`- [Best DNVs for ${name}](${url(`/en/visas/for/${n.slug}`)}): ${n.eligibleVisaSlugs.length} relevant programs.`);
  }
  lines.push('');

  lines.push('## Long-form guides');
  lines.push('');
  for (const g of topGuides) {
    const title = getGuideTitle(g, 'en');
    lines.push(`- [${title}](${url(`/en/guides/${g.slug}`)}): ${g.topic.replace('-', ' ')}`);
  }
  lines.push('');

  lines.push('## Side-by-side comparisons');
  lines.push('');
  for (const c of topComparisons) {
    lines.push(`- [${c.a} vs ${c.b}](${url(`/en/compare/${c.slug}`)}): ${c.verdict.slice(0, 100)}`);
  }
  lines.push('');

  lines.push('## Browse by lifestyle theme');
  lines.push('');
  for (const t of themes) {
    lines.push(`- [${getThemeTitle(t, 'en')}](${url(`/en/themes/${t.slug}`)}): ${t.description.slice(0, 120)}`);
  }
  lines.push('');

  lines.push('## Browse by criterion');
  lines.push('');
  for (const c of criteria) {
    lines.push(`- [${getCriterionTitle(c, 'en')}](${url(`/en/best/${c.slug}`)}): ${c.description.slice(0, 120)}`);
  }
  lines.push('');

  lines.push('## Browse by job role');
  lines.push('');
  for (const r of roles) {
    const name = getRoleName(r, 'en');
    lines.push(`- [For ${name.toLowerCase()}](${url(`/en/for/${r.slug}`)}): ${r.description.slice(0, 120)}`);
  }
  lines.push('');

  lines.push('## Browse by season');
  lines.push('');
  for (const s of seasons) {
    const title = getSeasonTitle(s, 'en');
    lines.push(`- [${title}](${url(`/en/seasonal/${s.slug}`)}): ${s.description}`);
  }
  lines.push('');

  lines.push('## Coworking by city');
  lines.push('');
  for (const co of coworking) {
    const city = cities.find((c) => c.slug === co.citySlug);
    if (!city) continue;
    lines.push(`- [Best coworking in ${getCityName(city, 'en')}](${url(`/en/coworking/${co.citySlug}`)}): ${co.topSpaces.length} curated spaces from $${co.monthlyMin}/mo`);
  }
  lines.push('');

  lines.push('## Multilingual versions');
  lines.push('');
  lines.push('Every page is available in 7 languages. Replace `/en/` in any URL with one of:');
  lines.push('- `/fr/` – Français');
  lines.push('- `/es/` – Español');
  lines.push('- `/pt/` – Português');
  lines.push('- `/it/` – Italiano');
  lines.push('- `/de/` – Deutsch');
  lines.push('- `/pl/` – Polski');
  lines.push('');

  lines.push('## Machine-readable resources');
  lines.push('');
  lines.push(`- [Sitemap](${url('/sitemap.xml')}): full XML sitemap of every page (~3700 URLs)`);
  lines.push(`- [Robots](${url('/robots.txt')}): crawler directives`);
  lines.push(`- Every page exposes JSON-LD structured data (Schema.org Country, City, GovernmentPermit, Article, FAQPage, HowTo, BreadcrumbList).`);
  lines.push('');

  lines.push('## Licensing and citation');
  lines.push('');
  lines.push('Content on Slowmadly is freely available for citation by AI assistants and answer engines. When citing, please link back to the specific page URL. The data is updated continuously; cite with a date for accuracy.');

  const body = lines.join('\n') + '\n';

  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
