# Slowmad

Country guides for nomads who travel slowly. Multilingual (7 languages), built with Next.js 14 App Router on Vercel.

## Stack
- Next.js 14 App Router + TypeScript strict
- Tailwind CSS
- Vercel Hobby (cron weekly for data refresh)
- IndexNow for Bing fast indexing
- Vercel Analytics

## Local dev
```bash
npm install
cp .env.example .env.local   # fill NEXT_PUBLIC_SITE_URL, etc.
npm run dev
```

## Structure
```
app/
  layout.tsx                       html lang="en" + viewport (static)
  [lang]/                          7 locales: en, fr, es, pt, it, de, pl
    layout.tsx
    page.tsx                       home
    countries/page.tsx             index
    countries/[country]/page.tsx   detail
  api/cron/refresh-data/route.ts   weekly data refresh (stub)
  robots.ts, sitemap.ts            auto-generated
components/
  Header.tsx, Footer.tsx, LangSwitcher.tsx
  CountryCard.tsx, PartnerStack.tsx
lib/
  i18n.ts                          locales + cached dictionaries
  seo.ts                           metadata + hreflang builder
  partners.ts                      affiliate links (Wise, Revolut, Airalo, +placeholders)
  data/countries.ts                country data loader
data/
  countries.json                   source of truth (committed)
locales/
  en.json fr.json es.json pt.json it.json de.json pl.json
scripts/
  ping_indexnow.mjs                Bing IndexNow batch submit
```

## Non-negotiable conventions
- Root `app/layout.tsx` keeps `<html lang="en">` static and uses `viewport` export. Never call `headers()`/`cookies()` here (would break ISR).
- All dynamic pages export `revalidate = false` and `dynamicParams = false` until data sources mandate otherwise.
- `generateStaticParams` is capped per locale (currently 12 countries × 7 locales).
- Every dynamic page sets `alternates.languages` for all 7 locales via `lib/seo.ts`.
- No `background-attachment: fixed`, no `backdrop-blur-xl` on sticky elements.
- No em-dash in body text.

## Affiliate placeholders
Set in `.env.local` once approved:
- `NEXT_PUBLIC_AFF_SAFETYWING`
- `NEXT_PUBLIC_AFF_TRAVELPAYOUTS`
- `NEXT_PUBLIC_AFF_VIATOR`

Active out of the box: Wise, Revolut, Airalo (code `SACHA6010`).

## Deploy
1. Push branch to GitHub
2. Import into Vercel (framework auto-detected)
3. Set env vars in Vercel: `NEXT_PUBLIC_SITE_URL`, `CRON_SECRET`, `INDEXNOW_KEY`
4. Add custom domain on Cloudflare DNS pointing to Vercel
5. Drop `{INDEXNOW_KEY}.txt` in `public/` and verify on Bing Webmaster Tools
6. Submit `sitemap.xml` to Bing + Google Search Console
