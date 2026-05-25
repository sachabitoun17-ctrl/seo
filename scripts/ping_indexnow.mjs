#!/usr/bin/env node
// Submit the site's sitemap URLs to Bing IndexNow.
// Usage: node scripts/ping_indexnow.mjs
// Required env: NEXT_PUBLIC_SITE_URL, INDEXNOW_KEY

import { setTimeout as wait } from 'node:timers/promises';

const SITE = process.env.NEXT_PUBLIC_SITE_URL;
const KEY = process.env.INDEXNOW_KEY;
if (!SITE || !KEY) {
  console.error('Missing NEXT_PUBLIC_SITE_URL or INDEXNOW_KEY');
  process.exit(1);
}

const HOST = new URL(SITE).host;
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

async function fetchSitemap() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submitBatch(urlList) {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });
  return res.status;
}

const all = await fetchSitemap();
console.log(`Submitting ${all.length} URLs to IndexNow`);

const BATCH = 1000;
for (let i = 0; i < all.length; i += BATCH) {
  const slice = all.slice(i, i + BATCH);
  const status = await submitBatch(slice);
  console.log(`  batch ${i / BATCH + 1}: ${slice.length} URLs → HTTP ${status}`);
  await wait(500);
}
console.log('Done.');
