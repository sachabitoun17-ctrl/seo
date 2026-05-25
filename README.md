# Slowmadly

Country guides for nomads who travel slowly. Multilingual (7 languages), built with Next.js 14 App Router, deployed on Cloudflare Pages.

Domain: **slowmadly.com**

## Stack
- Next.js 14 App Router + TypeScript strict
- Tailwind CSS
- `@cloudflare/next-on-pages` adapter
- Cloudflare Pages (edge CDN, free)
- Cloudflare Web Analytics (cookieless, free)
- IndexNow for Bing fast indexing
- GitHub Actions for CI/CD and weekly cron

## Local dev
```bash
npm install
cp .env.example .env.local   # fill NEXT_PUBLIC_SITE_URL, etc.
npm run dev                  # localhost:3000
npm run pages:build          # build for Cloudflare
npm run pages:dev            # serve the Cloudflare build locally
```

## Deploy

Fully automated via GitHub Actions. Every push to any branch deploys a
preview; `main` deploys to production.

### One-time setup
1. Create a Cloudflare API token at
   https://dash.cloudflare.com/profile/api-tokens with permissions:
   - `Account / Cloudflare Pages / Edit`
   - `Account / Account Settings / Read`
2. Add GitHub repo secrets at
   https://github.com/sachabitoun17-ctrl/seo/settings/secrets/actions :
   - `CLOUDFLARE_API_TOKEN` — the token above
   - `CLOUDFLARE_ACCOUNT_ID` — visible in Cloudflare dashboard top-right
   - `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` (optional) — from Web Analytics
   - `NEXT_PUBLIC_AFF_SAFETYWING`, `NEXT_PUBLIC_AFF_TRAVELPAYOUTS`,
     `NEXT_PUBLIC_AFF_VIATOR` (optional)
   - `CF_PAGES_DEPLOY_HOOK` — created automatically once project exists,
     used by the weekly cron to trigger rebuilds
3. Push to `main`. The Action builds and deploys.

### Custom domain
After the first successful deploy, attach `slowmadly.com` via
Cloudflare dashboard → Pages → slowmadly → Custom domains → Set up
domain. Cloudflare auto-detects the DNS zone and issues SSL.

## Structure
```
app/
  layout.tsx                       html lang="en" + viewport + CF analytics
  opengraph-image.tsx              dynamic OG image (edge runtime)
  [lang]/                          7 locales: en, fr, es, pt, it, de, pl
    layout.tsx, page.tsx           home
    countries/page.tsx + [country]/page.tsx
    cities/page.tsx + [city]/page.tsx
    visas/page.tsx + [visa]/page.tsx + type/[type]/page.tsx
    compare/page.tsx + [pair]/page.tsx
    guides/page.tsx + [guide]/page.tsx
    regions/page.tsx + [region]/page.tsx
    best/page.tsx + [criterion]/page.tsx
    cost-of-living/page.tsx + [city]/page.tsx
    glossary/page.tsx
    about, contact, legal
  api/cron/refresh-data/route.ts   edge runtime, called by Actions weekly
  robots.ts, sitemap.ts            auto-generated
components/                        Header, Footer, CountryCard, CityCard,
                                   VisaCard, GuideCard, RegionCard,
                                   CompareCard, FaqSection, Breadcrumbs,
                                   JsonLd, PartnerStack, LangSwitcher
lib/
  i18n.ts                          locales + cached dictionaries
  seo.ts                           metadata + hreflang builder
  partners.ts                      affiliate links
  faq-templates.ts                 multilingual FAQ generators
  data/                            countries, cities, visas, comparisons,
                                   guides, regions, criteria, cost
data/                              source-of-truth JSON files
locales/                           en, fr, es, pt, it, de, pl
scripts/
  ping_indexnow.mjs                Bing IndexNow batch submit
.github/workflows/
  deploy.yml                       build + deploy on push
  weekly-rebuild.yml               Sunday 03:00 UTC deploy hook trigger
```

## Non-negotiable conventions
- Root `app/layout.tsx` keeps `<html lang="en">` static. Never call
  `headers()` or `cookies()` here.
- All dynamic pages export `revalidate = false` and `dynamicParams = false`.
- Every dynamic page sets `alternates.languages` for all 7 locales.
- No `background-attachment: fixed`, no `backdrop-blur-xl` on sticky.
- No em-dash in body text.

## Pages built
~2 700 prerendered URLs across 7 locales (countries, cities, visas,
comparisons, guides, regions, best-criteria, cost-of-living, glossary,
plus structural pages).

## Affiliations
Active out of the box: Wise, Revolut, Airalo (`SACHA6010`). Placeholders
loaded from env: SafetyWing, Travelpayouts, Viator.
