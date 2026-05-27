'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { City } from '@/lib/data/cities';
import type { Country } from '@/lib/data/countries';
import type { Locale } from '@/lib/i18n';
import { CityCard } from '@/components/CityCard';

type Budget = 'tight' | 'medium' | 'comfortable' | 'unlimited';
type Speed = 'any' | 'standard' | 'fast' | 'ultra';
type Climate = 'warm' | 'mild' | 'cold-ok' | 'any';
type Region = 'any' | 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania';
type Lifestyle = 'beach' | 'city' | 'mountain' | 'budget' | 'any';
type Visa = 'none' | 'digital-nomad' | 'passive-income' | 'any';

const BUDGET_CAP: Record<Budget, number> = {
  tight: 50,
  medium: 65,
  comfortable: 80,
  unlimited: 200,
};
const SPEED_MIN: Record<Speed, number> = {
  any: 0,
  standard: 50,
  fast: 100,
  ultra: 200,
};

type Props = {
  locale: Locale;
  cities: City[];
  countries: Country[];
};

export function Finder({ locale, cities, countries }: Props) {
  const [budget, setBudget] = useState<Budget>('medium');
  const [speed, setSpeed] = useState<Speed>('fast');
  const [climate, setClimate] = useState<Climate>('warm');
  const [region, setRegion] = useState<Region>('any');
  const [lifestyle, setLifestyle] = useState<Lifestyle>('any');
  const [visa, setVisa] = useState<Visa>('any');
  const [submitted, setSubmitted] = useState(false);

  const countryBySlug = useMemo(
    () => new Map(countries.map((c) => [c.slug, c])),
    [countries],
  );

  const ranked = useMemo(() => {
    if (!submitted) return [];
    return cities
      .map((c) => {
        const country = countryBySlug.get(c.country);
        let score = 0;
        const reasons: string[] = [];

        // Budget — hard cap softly
        const budgetCap = BUDGET_CAP[budget];
        if (c.costIndex <= budgetCap) {
          score += 25;
          reasons.push(`Fits ${budget} budget (${c.costIndex}/100)`);
        } else {
          score -= (c.costIndex - budgetCap) * 0.4;
        }

        // Internet
        const speedMin = SPEED_MIN[speed];
        if (c.internetMbps >= speedMin) {
          score += 20;
          if (speed !== 'any') reasons.push(`${c.internetMbps} Mbps internet`);
        } else {
          score -= (speedMin - c.internetMbps) * 0.2;
        }

        // Climate — based on temp range
        if (climate === 'warm' && c.tempMinC >= 15) {
          score += 15;
          reasons.push(`Warm year-round (${c.tempMinC}-${c.tempMaxC}°C)`);
        } else if (climate === 'mild' && c.tempMaxC <= 28 && c.tempMinC >= 5) {
          score += 15;
          reasons.push(`Mild climate (${c.tempMinC}-${c.tempMaxC}°C)`);
        } else if (climate === 'cold-ok') {
          score += 5;
        } else if (climate === 'any') {
          score += 5;
        }

        // Region
        if (region !== 'any' && country) {
          if (country.region === region) {
            score += 15;
          } else {
            score -= 30;
          }
        }

        // Lifestyle (tag-based)
        if (lifestyle !== 'any' && country) {
          const tags = country.tags || [];
          if (lifestyle === 'beach' && (tags.includes('beach') || tags.includes('coastal') || tags.includes('island'))) {
            score += 10;
            reasons.push('Beach lifestyle');
          }
          if (lifestyle === 'city' && (tags.includes('urban') || tags.includes('capital'))) {
            score += 10;
            reasons.push('Urban energy');
          }
          if (lifestyle === 'mountain' && (tags.includes('mountain') || tags.includes('nature'))) {
            score += 10;
            reasons.push('Mountains & nature');
          }
          if (lifestyle === 'budget' && c.costIndex <= 55) {
            score += 10;
            reasons.push('Budget-friendly');
          }
        }

        // Visa
        if (visa !== 'any' && country) {
          if (visa === 'none' && country.visa.shortStay.toLowerCase().includes('visa-free')) {
            score += 10;
            reasons.push('Visa-free access');
          }
          if (visa === 'digital-nomad' && !country.visa.digitalNomad.toLowerCase().includes('none')) {
            score += 12;
            reasons.push('Digital nomad visa available');
          }
          if (visa === 'passive-income' && !country.visa.passiveIncome.toLowerCase().includes('none')) {
            score += 12;
            reasons.push('Passive income visa');
          }
        }

        // Nomad score baseline
        score += c.nomadScore * 2;
        score += (100 - c.costIndex) * 0.15;
        score += c.safetyIndex * 0.1;

        return { city: c, country, score: Math.round(score), reasons: reasons.slice(0, 3) };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 9);
  }, [budget, speed, climate, region, lifestyle, visa, submitted, cities, countryBySlug]);

  return (
    <div>
      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-2xl border border-line bg-paper p-6 sm:p-8 space-y-7"
        >
          <Q
            label="Monthly budget"
            help="All-in: rent, food, transport, coworking. Western cities are 'comfortable'+."
            value={budget}
            onChange={setBudget}
            options={[
              { v: 'tight', label: '< €1 000', sub: 'SE Asia, LATAM' },
              { v: 'medium', label: '€1 000–1 800', sub: 'East Europe, Mexico' },
              { v: 'comfortable', label: '€1 800–3 000', sub: 'Lisbon, Madrid, BCN' },
              { v: 'unlimited', label: '€3 000+', sub: 'No constraint' },
            ]}
          />
          <Q
            label="Internet you need"
            help="200+ Mbps is overkill for most. 50 is fine unless you stream/code in calls 8h/day."
            value={speed}
            onChange={setSpeed}
            options={[
              { v: 'any', label: 'Any', sub: 'Email + light meetings' },
              { v: 'standard', label: '50+ Mbps', sub: 'Daily Zoom calls' },
              { v: 'fast', label: '100+ Mbps', sub: 'Video editing, devs' },
              { v: 'ultra', label: '200+ Mbps', sub: 'Streaming + uploads' },
            ]}
          />
          <Q
            label="Climate"
            help="Based on annual temperature range from city data."
            value={climate}
            onChange={setClimate}
            options={[
              { v: 'warm', label: 'Warm year-round', sub: 'Never below 15°C' },
              { v: 'mild', label: 'Mild seasons', sub: '5–28°C' },
              { v: 'cold-ok', label: 'Cold is fine', sub: 'I like winter' },
              { v: 'any', label: 'No preference', sub: '' },
            ]}
          />
          <Q
            label="Region"
            value={region}
            onChange={setRegion}
            options={[
              { v: 'any', label: 'Anywhere', sub: '' },
              { v: 'Europe', label: 'Europe', sub: 'PT, ES, IT, EE…' },
              { v: 'Asia', label: 'Asia', sub: 'TH, ID, VN, JP…' },
              { v: 'Americas', label: 'Americas', sub: 'MX, CO, AR, BR…' },
              { v: 'Africa', label: 'Africa', sub: 'MA, ZA, CV…' },
              { v: 'Oceania', label: 'Oceania', sub: 'NZ' },
            ]}
          />
          <Q
            label="Lifestyle"
            value={lifestyle}
            onChange={setLifestyle}
            options={[
              { v: 'any', label: 'No preference', sub: '' },
              { v: 'beach', label: 'Beach & coastal', sub: 'Island vibes' },
              { v: 'city', label: 'Big city', sub: 'Cafés, events, talent' },
              { v: 'mountain', label: 'Nature / mountains', sub: 'Slow pace' },
              { v: 'budget', label: 'Cheapest possible', sub: 'Stretch the runway' },
            ]}
          />
          <Q
            label="Visa pathway"
            help="If you'll stay longer than 90 days, you usually need a visa."
            value={visa}
            onChange={setVisa}
            options={[
              { v: 'any', label: 'Not sure', sub: '' },
              { v: 'none', label: 'Visa-free for me', sub: 'Short stays only' },
              { v: 'digital-nomad', label: 'Digital nomad visa', sub: 'Work-from-anywhere visa' },
              { v: 'passive-income', label: 'Passive income visa', sub: 'D7, NLV, etc.' },
            ]}
          />

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-ink text-cream px-6 py-3.5 text-sm font-semibold hover:bg-accent-deep transition-colors"
          >
            Find my best places to work →
          </button>
        </form>
      ) : (
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-semibold">Your matches</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tightish font-display">
                Top {ranked.length} places for you
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="rounded-md border border-line bg-paper px-4 py-2 text-sm font-semibold hover:border-ink transition-colors"
            >
              ← Refine my answers
            </button>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.map(({ city, score, reasons }, i) => (
              <li key={city.slug} className="relative">
                <div className="absolute -top-2 -left-2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent text-cream text-sm font-bold shadow-md">
                  #{i + 1}
                </div>
                <CityCard city={city} locale={locale} />
                {reasons.length > 0 && (
                  <ul className="mt-2 space-y-0.5 text-xs text-muted px-1">
                    {reasons.map((r) => (
                      <li key={r} className="flex gap-1">
                        <span className="text-accent">✓</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-accent-soft bg-accent-soft/30 p-6 sm:p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-accent-deep font-semibold">Next step</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tightish font-display">
              Found your place? Now find the job.
            </h3>
            <p className="mt-2 text-sm text-muted max-w-xl mx-auto">
              Every remote role we know about is aggregated daily on Slate Remote — our sister
              job board. One search, every source.
            </p>
            <a
              href={`https://slateremote.com/${locale}`}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-ink text-cream px-6 py-3 text-sm font-semibold hover:bg-accent-deep transition-colors"
            >
              Browse remote jobs on slateremote.com <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

type Opt<T extends string> = { v: T; label: string; sub: string };

function Q<T extends string>({
  label,
  help,
  value,
  onChange,
  options,
}: {
  label: string;
  help?: string;
  value: T;
  onChange: (v: T) => void;
  options: Opt<T>[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold tracking-tightish">{label}</legend>
      {help && <p className="mt-1 text-xs text-muted">{help}</p>}
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {options.map((o) => {
          const active = o.v === value;
          return (
            <button
              type="button"
              key={o.v}
              onClick={() => onChange(o.v)}
              className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
                active
                  ? 'border-accent bg-accent-soft/40 ring-1 ring-accent'
                  : 'border-line bg-paper hover:border-ink'
              }`}
            >
              <div className="text-sm font-semibold tracking-tightish">{o.label}</div>
              {o.sub && <div className="mt-0.5 text-[11px] text-muted">{o.sub}</div>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
