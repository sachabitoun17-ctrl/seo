'use client';

import { useMemo, useState } from 'react';
import type { City } from '@/lib/data/cities';
import type { Country } from '@/lib/data/countries';
import type { Locale } from '@/lib/i18n';
import { CityCard } from '@/components/CityCard';

type Budget = 'tight' | 'medium' | 'comfortable' | 'open';
type Workday = 'solo' | 'mixed' | 'calls' | 'heavy';
type Morning = 'beach' | 'urban' | 'nature' | 'quiet';
type Stay = 'weeks' | 'month-two' | 'basecamp' | 'home';
type Priority = 'budget' | 'community' | 'outdoors' | 'warmth';

const BUDGET_CAP: Record<Budget, number> = {
  tight: 50,
  medium: 65,
  comfortable: 80,
  open: 200,
};
const SPEED_MIN: Record<Workday, number> = {
  solo: 25,
  mixed: 50,
  calls: 100,
  heavy: 200,
};

type Props = {
  locale: Locale;
  cities: City[];
  countries: Country[];
};

export function Finder({ locale, cities, countries }: Props) {
  const [budget, setBudget] = useState<Budget>('medium');
  const [workday, setWorkday] = useState<Workday>('mixed');
  const [morning, setMorning] = useState<Morning>('urban');
  const [stay, setStay] = useState<Stay>('basecamp');
  const [priority, setPriority] = useState<Priority>('community');
  const [submitted, setSubmitted] = useState(false);

  const countryBySlug = useMemo(
    () => new Map(countries.map((c) => [c.slug, c])),
    [countries],
  );

  const ranked = useMemo(() => {
    if (!submitted) return [];
    const budgetCap = BUDGET_CAP[budget];
    const speedMin = SPEED_MIN[workday];

    return cities
      .map((c) => {
        const country = countryBySlug.get(c.country);
        const tags = country?.tags || [];
        let score = 0;
        const reasons: string[] = [];

        // Budget — soft cap
        if (c.costIndex <= budgetCap) {
          score += 25;
          if (budget !== 'open') reasons.push(`Fits ${c.costIndex}/100 cost index`);
        } else {
          score -= (c.costIndex - budgetCap) * 0.5;
        }

        // Internet
        if (c.internetMbps >= speedMin) {
          score += 18;
          if (workday !== 'solo') reasons.push(`${c.internetMbps} Mbps internet`);
        } else {
          score -= (speedMin - c.internetMbps) * 0.25;
        }

        // Morning → climate + lifestyle inferred together
        if (morning === 'beach') {
          if (c.tempMinC >= 15) score += 12;
          else score -= 5;
          if (tags.includes('beach') || tags.includes('coastal') || tags.includes('island')) {
            score += 12;
            reasons.push('Coastal, warm year-round');
          } else if (c.tempMinC >= 18) {
            score += 4;
          }
        } else if (morning === 'urban') {
          if (c.tempMaxC <= 30 && c.tempMinC >= 0) score += 8;
          if (tags.includes('urban') || tags.includes('capital')) {
            score += 12;
            reasons.push('Big-city energy');
          }
          // Coworking density is a great urban proxy
          if (c.coworkingCount >= 10) score += 6;
        } else if (morning === 'nature') {
          if (tags.includes('mountain') || tags.includes('nature') || tags.includes('outdoors')) {
            score += 14;
            reasons.push('Mountains & nature nearby');
          }
          // Cooler places skew nature
          if (c.tempMaxC <= 26) score += 4;
        } else if (morning === 'quiet') {
          // Smaller cities — proxy via coworking count being moderate (not zero, not 50+)
          if (c.coworkingCount > 0 && c.coworkingCount <= 15) score += 6;
          if (c.tempMaxC <= 28 && c.tempMinC >= 5) score += 6;
          // Penalise capitals
          if (tags.includes('capital')) score -= 4;
        }

        // Stay duration → visa pathway
        if (country) {
          const sShort = country.visa.shortStay.toLowerCase();
          const sDnv = country.visa.digitalNomad.toLowerCase();
          const sPi = country.visa.passiveIncome.toLowerCase();
          if (stay === 'weeks') {
            if (sShort.includes('visa-free')) {
              score += 8;
              reasons.push('Visa-free for short stays');
            }
          } else if (stay === 'month-two') {
            if (sShort.includes('visa-free')) score += 10;
          } else if (stay === 'basecamp') {
            if (!sDnv.includes('none')) {
              score += 14;
              reasons.push('Digital nomad visa available');
            } else if (sShort.includes('90')) {
              score += 4;
            }
          } else if (stay === 'home') {
            if (!sPi.includes('none')) {
              score += 14;
              reasons.push('Long-term residency pathway');
            } else if (!sDnv.includes('none')) {
              score += 8;
            }
          }
        }

        // Priority — reweight the tiebreaker
        if (priority === 'budget') {
          score += (100 - c.costIndex) * 0.35;
        } else if (priority === 'community') {
          score += c.coworkingCount * 0.4;
          score += c.nomadScore * 1.5;
        } else if (priority === 'outdoors') {
          if (tags.includes('mountain') || tags.includes('nature') || tags.includes('island') || tags.includes('coastal')) {
            score += 8;
          }
        } else if (priority === 'warmth') {
          score += Math.max(0, (c.tempMinC - 5)) * 0.8;
        }

        // Baseline nomad score + safety
        score += c.nomadScore * 1.8;
        score += c.safetyIndex * 0.08;

        return { city: c, country, score: Math.round(score), reasons: reasons.slice(0, 3) };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 9);
  }, [budget, workday, morning, stay, priority, submitted, cities, countryBySlug]);

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
            label="A fair monthly budget for everything"
            help="Rent, food, transport, a coworking pass — all in."
            value={budget}
            onChange={setBudget}
            options={[
              { v: 'tight', label: 'Under €1 000', sub: 'I stretch every euro' },
              { v: 'medium', label: '€1 000–1 800', sub: 'Comfortable, not flashy' },
              { v: 'comfortable', label: '€1 800–3 000', sub: 'Like home, abroad' },
              { v: 'open', label: 'No real ceiling', sub: 'Pick the right place' },
            ]}
          />
          <Q
            label="What does your work actually look like?"
            help="Hint at what your bandwidth needs to handle."
            value={workday}
            onChange={setWorkday}
            options={[
              { v: 'solo', label: 'Mostly solo work', sub: 'Writing, docs, the odd call' },
              { v: 'mixed', label: 'A few meetings a day', sub: 'Standard remote rhythm' },
              { v: 'calls', label: 'Back-to-back calls', sub: 'Screen sharing all day' },
              { v: 'heavy', label: 'Heavy upload work', sub: 'Video, dev pushes, streaming' },
            ]}
          />
          <Q
            label="The morning that makes you happy"
            help="Tells us about climate and the kind of place you want around you."
            value={morning}
            onChange={setMorning}
            options={[
              { v: 'beach', label: 'Coffee with a sea breeze', sub: 'Sun, slow, salt in the air' },
              { v: 'urban', label: 'A walk through a buzzing city', sub: 'Cafés, talent, things to do' },
              { v: 'nature', label: 'A trail before the laptop', sub: 'Mountains, forest, cool air' },
              { v: 'quiet', label: 'A quiet café, no rush', sub: 'Small streets, low key' },
            ]}
          />
          <Q
            label="How long are you really planning to stay?"
            help="Drives the visa pathway and what to optimise for."
            value={stay}
            onChange={setStay}
            options={[
              { v: 'weeks', label: 'A few weeks then move', sub: 'Trying it on' },
              { v: 'month-two', label: 'A month or two', sub: 'Slow travel pace' },
              { v: 'basecamp', label: '3 to 12 months', sub: 'A real basecamp' },
              { v: 'home', label: 'A year or more', sub: 'Building a home base' },
            ]}
          />
          <Q
            label="When it comes down to two places, what tips the scale?"
            value={priority}
            onChange={setPriority}
            options={[
              { v: 'budget', label: 'Stretches my runway', sub: 'Cheap wins' },
              { v: 'community', label: 'A real nomad scene', sub: 'Coworking, events, people' },
              { v: 'outdoors', label: 'Wild outdoors nearby', sub: 'Hikes, beaches, escapes' },
              { v: 'warmth', label: 'Just keep it warm', sub: 'I cannot do grey winters' },
            ]}
          />

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-ink text-cream px-6 py-3.5 text-sm font-semibold hover:bg-accent-deep transition-colors"
          >
            Show me my matches →
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
            {ranked.map(({ city, reasons }, i) => (
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
