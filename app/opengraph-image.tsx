import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/seo';

export const runtime = 'edge';
export const alt = 'Slowmad: country guides for slow nomads';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#fafaf8',
          color: '#111113',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>
          {SITE_NAME}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1.05 }}>
            Country guides for nomads
            <br />
            who stay a while.
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: '#6b6660' }}>
            56 countries · 65 cities · 42 nomad visas
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#c46f4d' }} />
          <div style={{ fontSize: 24, color: '#6b6660' }}>slowmadly.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
