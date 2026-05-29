import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const size = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #faf7f2 0%, #f5e7cc 100%)',
          color: '#1a1a1c',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="40" height="40" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="none" stroke="#c5563f" strokeWidth="2" />
            <path d="M 6 19 Q 11 14 16 19 Q 21 24 26 19" fill="none" stroke="#c5563f" strokeWidth="2.25" strokeLinecap="round" />
            <circle cx="22" cy="11" r="2" fill="#c5563f" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>slowmadly</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -2, lineHeight: 1.02 }}>
            Country guides
            <br />
            for slow nomads.
          </div>
          <div style={{ marginTop: 32, fontSize: 26, color: '#6b6660', fontFamily: 'sans-serif' }}>
            58 countries · 75 cities · 42 nomad visas
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'sans-serif' }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#c5563f' }} />
          <div style={{ fontSize: 22, color: '#6b6660' }}>slowmadly.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
