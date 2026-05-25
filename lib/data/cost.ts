import type { City } from './cities';
import type { Country } from './countries';

export type CostBreakdown = {
  rent1brCenter: number;
  rent1brOutside: number;
  utilities: number;
  internet: number;
  mealLocal: number;
  mealMid: number;
  groceries: number;
  coffee: number;
  coworking: number;
  publicTransport: number;
  total: { solo: number; couple: number; family: number };
};

export function estimateCostUsd(input: { costIndex: number }): CostBreakdown {
  const i = input.costIndex;
  const rent1brCenter = Math.round((i * 22 + 50) / 25) * 25;
  const rent1brOutside = Math.round((i * 15 + 30) / 25) * 25;
  const utilities = Math.round(40 + i * 0.8);
  const internet = 30 + Math.round(i * 0.2);
  const mealLocal = Math.round((i * 0.12 + 2) * 2) / 2;
  const mealMid = Math.round((i * 0.4 + 8));
  const groceries = Math.round(200 + i * 3.5);
  const coffee = Math.round((i * 0.07 + 1.5) * 4) / 4;
  const coworking = Math.round((i * 3.8 + 80) / 5) * 5;
  const publicTransport = Math.round(20 + i * 0.6);

  const solo = rent1brCenter + utilities + internet + groceries + coworking + publicTransport + Math.round(mealLocal * 12 + mealMid * 4);
  const couple = Math.round(solo * 1.55);
  const family = Math.round(solo * 2.2);

  return {
    rent1brCenter, rent1brOutside, utilities, internet,
    mealLocal, mealMid, groceries, coffee, coworking, publicTransport,
    total: { solo, couple, family },
  };
}

export function estimateForCity(city: City): CostBreakdown {
  return estimateCostUsd({ costIndex: city.costIndex });
}

export function estimateForCountry(country: Country): CostBreakdown {
  return estimateCostUsd({ costIndex: country.costIndex });
}
