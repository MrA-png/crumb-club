import type { Metadata, Viewport } from 'next';
import { site } from '@/lib/config';
import './globals.css';
export const metadata: Metadata = {
  title: 'CRUMB — Small bird. Big crumb energy.',
  description: site.description,
  ...(site.siteUrl ? { metadataBase: new URL(site.siteUrl), alternates: { canonical: '/' } } : {}),
  openGraph: { title: 'Small bird. Big crumb energy.', description: site.description, type: 'website', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CRUMB, the internet pigeon' }] },
  twitter: { card: 'summary_large_image', title: 'CRUMB — Small bird. Big crumb energy.', description: site.description, images: ['/og-image.png'] },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
  robots: { index: Boolean(site.siteUrl), follow: Boolean(site.siteUrl) },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f4f1e9' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
