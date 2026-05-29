// Local SEO crawl: status codes, broken internal links, meta lengths, OG, hreflang/lang.
const BASE = 'http://localhost:3000';
const LIMIT_LINKCHECK = 8000;

async function getSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, BASE),
  );
}

function pick(urls, perType, n) {
  const seen = new Map();
  const out = [];
  for (const u of urls) {
    const path = u.replace(BASE, '');
    // route key: drop locale + last slug segment
    const parts = path.split('/').filter(Boolean); // [lang, ...rest]
    const key = parts.slice(1, -1).join('/') || parts.slice(1).join('/') || 'home';
    const c = seen.get(key) || 0;
    if (c < perType) { out.push(u); seen.set(key, c + 1); }
    if (out.length >= n) break;
  }
  return out;
}

const titleLen = (h) => { const m = h.match(/<title>([^<]*)<\/title>/i); return m ? m[1].length : null; };
const descLen = (h) => { const m = h.match(/<meta name="description" content="([^"]*)"/i); return m ? m[1].length : null; };
const htmlLang = (h) => { const m = h.match(/<html[^>]*\blang="([^"]+)"/i); return m ? m[1] : null; };
function ogCheck(h) {
  const has = (p) => new RegExp(`<meta property="${p}"`, 'i').test(h);
  return { title: has('og:title'), desc: has('og:description'), image: has('og:image'), url: has('og:url'), type: has('og:type') };
}
function selfHreflang(h, lang) {
  // collect all hreflang values
  const tags = [...h.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*>/gi)].map((m) => m[1]);
  return { all: tags, hasSelf: tags.includes(lang) };
}
function internalLinks(h) {
  return [...h.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1])
    .filter((p) => !p.startsWith('//') && !/\.(png|jpg|svg|ico|css|js|txt|xml|webmanifest)$/i.test(p));
}

async function status(url) {
  try { const r = await fetch(url, { redirect: 'manual' }); return r.status; }
  catch { return 0; }
}

async function main() {
  const all = await getSitemapUrls();
  console.log(`sitemap URLs: ${all.length}`);

  // 1) Sample one page per route type for meta/OG/lang audit
  const sample = pick(all, 1, 60);
  console.log(`\n== META / OG / LANG on ${sample.length} sampled route types ==`);
  const issues = { titleLong: [], descShort: [], descLong: [], ogIncomplete: [], langMismatch: [] };
  const pageHtml = new Map();
  for (const u of sample) {
    const r = await fetch(u);
    const h = await r.text();
    pageHtml.set(u, h);
    const lang = u.replace(BASE, '').split('/')[1];
    const t = titleLen(h), d = descLen(h);
    const og = ogCheck(h);
    const hl = htmlLang(h);
    const hf = selfHreflang(h, lang);
    if (t && t > 60) issues.titleLong.push(`${u} (${t})`);
    if (d != null && d < 110) issues.descShort.push(`${u} (${d})`);
    if (d != null && d > 158) issues.descLong.push(`${u} (${d})`);
    if (!og.title || !og.desc || !og.image || !og.url || !og.type)
      issues.ogIncomplete.push(`${u} ${JSON.stringify(og)}`);
    if (hl !== lang || !hf.hasSelf)
      issues.langMismatch.push(`${u} htmlLang=${hl} hreflangs=[${hf.all.join(',')}]`);
  }
  for (const [k, v] of Object.entries(issues)) {
    console.log(`\n  ${k}: ${v.length}`);
    v.slice(0, 8).forEach((x) => console.log(`    - ${x}`));
  }

  // 2) Broken-link check: gather internal links from sampled pages, dedupe, check status
  const linkSet = new Set();
  for (const h of pageHtml.values())
    for (const p of internalLinks(h)) linkSet.add(p.replace(/\/$/, '') || '/');
  const links = [...linkSet].slice(0, LIMIT_LINKCHECK);
  console.log(`\n== BROKEN LINK CHECK: ${links.length} unique internal links ==`);
  const broken = [];
  let i = 0;
  const conc = 24;
  await Promise.all(Array.from({ length: conc }, async () => {
    while (i < links.length) {
      const idx = i++; const p = links[idx];
      const s = await status(BASE + p);
      if (s >= 400 || s === 0) broken.push(`${s} ${p}`);
    }
  }));
  console.log(`  broken (>=400): ${broken.length}`);
  broken.sort().slice(0, 40).forEach((b) => console.log(`    - ${b}`));

  // 3) Sitemap status spot-check: sample 1 per type
  console.log(`\n== SITEMAP STATUS SPOT-CHECK (${sample.length}) ==`);
  const smBad = [];
  for (const u of sample) { const s = await status(u); if (s !== 200) smBad.push(`${s} ${u}`); }
  console.log(`  non-200: ${smBad.length}`);
  smBad.forEach((b) => console.log(`    - ${b}`));
}
main();
