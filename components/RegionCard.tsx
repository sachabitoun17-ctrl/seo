import Link from 'next/link';
import type { Region } from '@/lib/data/regions';
import type { Locale } from '@/lib/i18n';
import { getRegionName } from '@/lib/data/regions';

type Props = { region: Region; locale: Locale };

export function RegionCard({ region, locale }: Props) {
  return (
    <Link
      href={`/${locale}/regions/${region.slug}`}
      className="block rounded-lg border border-line bg-white/40 px-5 py-4 hover:border-ink transition-colors"
    >
      <h3 className="text-lg font-semibold tracking-tightish">
        {getRegionName(region, locale)}
      </h3>
      <p className="mt-2 text-sm text-muted line-clamp-2">{region.description}</p>
      <p className="mt-2 text-xs text-muted">{region.countries.length} countries</p>
    </Link>
  );
}
