'use client';

import { useMemo, useState } from 'react';
import { CountryCard } from '@/components/CountryCard';
import type { Country } from '@/lib/data/countries';
import type { Locale } from '@/lib/i18n';

type SortKey = 'name' | 'cheapest' | 'fastest' | 'safest';

type Props = {
  countries: Country[];
  locale: Locale;
};

const REGIONS = ['Europe', 'Asia', 'Americas', 'Africa', 'Oceania'] as const;
const VISA_FILTERS = [
  { v: 'any', label: 'Any visa' },
  { v: 'dnv', label: 'Has digital nomad visa' },
  { v: 'pi', label: 'Has passive income visa' },
  { v: 'free', label: 'Visa-free short stay' },
] as const;
type VisaFilter = (typeof VISA_FILTERS)[number]['v'];

export function CountriesFilters({ countries, locale }: Props) {
  const [region, setRegion] = useState<string>('any');
  const [maxCost, setMaxCost] = useState<number>(100);
  const [minMbps, setMinMbps] = useState<number>(0);
  const [minSafety, setMinSafety] = useState<number>(0);
  const [visaFilter, setVisaFilter] = useState<VisaFilter>('any');
  const [trendingOnly, setTrendingOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('name');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = countries.filter((c) => {
      if (region !== 'any' && c.region !== region) return false;
      if (c.costIndex > maxCost) return false;
      if (c.internetMbps < minMbps) return false;
      if (c.safetyIndex < minSafety) return false;
      if (trendingOnly && !c.tags.includes('trending')) return false;
      if (visaFilter === 'dnv' && c.visa.digitalNomad.toLowerCase().includes('none')) return false;
      if (visaFilter === 'pi' && c.visa.passiveIncome.toLowerCase().includes('none')) return false;
      if (visaFilter === 'free' && !c.visa.shortStay.toLowerCase().includes('visa-free')) return false;
      if (q) {
        const name = (c.name[locale] || c.name.en).toLowerCase();
        if (!name.includes(q) && !c.slug.includes(q)) return false;
      }
      return true;
    });
    if (sort === 'cheapest') list = list.sort((a, b) => a.costIndex - b.costIndex);
    else if (sort === 'fastest') list = list.sort((a, b) => b.internetMbps - a.internetMbps);
    else if (sort === 'safest') list = list.sort((a, b) => b.safetyIndex - a.safetyIndex);
    else list = list.sort((a, b) => (a.name[locale] || a.name.en).localeCompare(b.name[locale] || b.name.en));
    return list;
  }, [countries, region, maxCost, minMbps, minSafety, visaFilter, trendingOnly, sort, query, locale]);

  const reset = () => {
    setRegion('any');
    setMaxCost(100);
    setMinMbps(0);
    setMinSafety(0);
    setVisaFilter('any');
    setTrendingOnly(false);
    setSort('name');
    setQuery('');
  };

  return (
    <div>
      <div className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs uppercase tracking-widest text-muted font-semibold">Filters</p>
          <button
            type="button"
            onClick={reset}
            className="text-xs text-muted hover:text-ink transition-colors underline underline-offset-4"
          >
            Reset
          </button>
        </div>

        <div className="mt-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a country…"
            className="w-full rounded-md border border-line bg-cream px-4 py-2.5 text-sm placeholder:text-muted focus:outline-none focus:border-ink"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip active={region === 'any'} onClick={() => setRegion('any')}>All regions</Chip>
          {REGIONS.map((r) => (
            <Chip key={r} active={region === r} onClick={() => setRegion(r)}>{r}</Chip>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {VISA_FILTERS.map((v) => (
            <Chip key={v.v} active={visaFilter === v.v} onClick={() => setVisaFilter(v.v)}>{v.label}</Chip>
          ))}
          <Chip active={trendingOnly} onClick={() => setTrendingOnly(!trendingOnly)}>
            Trending only
          </Chip>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Slider label="Max cost" help={`≤ ${maxCost}/100`} min={30} max={100} step={5} value={maxCost} onChange={setMaxCost} />
          <Slider label="Min internet" help={`≥ ${minMbps} Mbps`} min={0} max={250} step={10} value={minMbps} onChange={setMinMbps} />
          <Slider label="Min safety" help={`≥ ${minSafety}/100`} min={0} max={100} step={5} value={minSafety} onChange={setMinSafety} />
        </div>

        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted uppercase tracking-widest font-semibold">Sort by</span>
          {([
            ['name', 'A–Z'],
            ['cheapest', 'Cheapest'],
            ['fastest', 'Fastest internet'],
            ['safest', 'Safest'],
          ] as [SortKey, string][]).map(([v, label]) => (
            <Chip key={v} active={sort === v} onClick={() => setSort(v)}>{label}</Chip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">{filtered.length} countries match your filters</p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-line px-6 py-12 text-center text-muted">
          No country matches. Try loosening one of the constraints.
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <li key={c.slug}>
              <CountryCard country={c} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
        active ? 'bg-ink text-cream' : 'bg-cream border border-line text-charcoal hover:border-ink'
      }`}
    >
      {children}
    </button>
  );
}

function Slider({
  label, help, min, max, step, value, onChange,
}: {
  label: string; help: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-semibold tracking-tightish">{label}</label>
        <span className="text-[11px] text-muted tabular-nums">{help}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-accent"
      />
    </div>
  );
}
