'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/i18n';

type Props = { currentLocale: Locale };

export function LangSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Locale;
    if (next === currentLocale) return;
    const segments = (pathname || '/').split('/');
    if (segments[1] && LOCALES.includes(segments[1] as Locale)) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join('/') || `/${next}`);
  }

  return (
    <select
      aria-label="Language"
      value={currentLocale}
      onChange={onChange}
      className="bg-transparent border border-line rounded-md px-2 py-1 text-sm hover:border-muted focus:outline-none focus:border-ink"
    >
      {LOCALES.map((l) => (
        <option key={l} value={l}>
          {LOCALE_LABELS[l]}
        </option>
      ))}
    </select>
  );
}
