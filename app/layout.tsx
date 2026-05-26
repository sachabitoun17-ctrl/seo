import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fafaf8',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://slowmadly.com'),
  title: {
    default: 'Slowmadly: country guides for slow nomads',
    template: '%s · Slowmadly',
  },
  description: 'Long-stay country and city guides for digital nomads who travel slowly.',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cfToken =
    process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ||
    'e22d5f9e3bf74faaa2399d1a7ef53ee3';
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
        {cfToken && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfToken })}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
