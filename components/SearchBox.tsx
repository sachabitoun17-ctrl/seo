'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { SearchEntry } from '@/lib/data/search-index';

type Props = { entries: SearchEntry[] };

const TYPE_LABELS: Record<SearchEntry['type'], string> = {
  country: 'Country',
  city: 'City',
  visa: 'Visa',
  guide: 'Guide',
  comparison: 'Comparison',
  theme: 'Theme',
};

const TYPE_COLORS: Record<SearchEntry['type'], string> = {
  country: 'bg-accent-soft text-accent-deep',
  city: 'bg-sage-soft text-sage',
  visa: 'bg-sand-soft text-sand',
  guide: 'bg-sky-soft text-sky',
  comparison: 'bg-cream border border-line text-charcoal',
  theme: 'bg-accent-soft text-accent-deep',
};

export function SearchBox({ entries }: Props) {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<SearchEntry['type'] | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = entries;
    if (activeType !== 'all') {
      list = list.filter((e) => e.type === activeType);
    }
    if (q) {
      list = list.filter((e) => e.searchText.includes(q));
    }
    return list.slice(0, 100); // cap to 100 results for perf
  }, [entries, query, activeType]);

  const types: (SearchEntry['type'] | 'all')[] = ['all', 'country', 'city', 'visa', 'guide', 'comparison', 'theme'];

  return (
    <div>
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search countries, cities, visas, guides…"
          autoFocus
          className="w-full text-lg px-5 py-4 rounded-xl border border-line bg-paper focus:border-ink focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
          >
            ✕
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveType(t)}
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${
              activeType === t
                ? 'bg-ink text-cream'
                : 'bg-paper border border-line text-charcoal hover:border-ink'
            }`}
          >
            {t === 'all' ? `All (${entries.length})` : `${TYPE_LABELS[t]}s`}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted">
        {query || activeType !== 'all'
          ? `${filtered.length} result${filtered.length === 1 ? '' : 's'}`
          : `${entries.length} pages searchable`}
      </p>

      <ul className="mt-6 divide-y divide-line border-t border-line">
        {filtered.map((e, i) => (
          <li key={e.href + i}>
            <Link
              href={e.href}
              className="flex items-start gap-3 py-3 hover:bg-paper transition-colors px-2 -mx-2 rounded"
            >
              <span
                className={`mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-widest ${TYPE_COLORS[e.type]} flex-shrink-0`}
              >
                {TYPE_LABELS[e.type]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium tracking-tightish truncate">{e.title}</p>
                <p className="text-sm text-muted line-clamp-1">{e.snippet}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <div className="mt-8 text-center text-muted">
          <p>No results for "{query}".</p>
        </div>
      )}
    </div>
  );
}
