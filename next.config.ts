import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }];
  },
  async rewrites() {
    return [
      {
        source: '/assets/crumb',
        destination: '/assets/crumb.png',
      },
      {
        source: '/assets/crumb.png',
        destination: '/assets/crumb.png',
      },
      {
        source: '/assets/crumb-logo',
        destination: '/assets/crumb-logo.png',
      },
      {
        source: '/assets/crumb-logo.png',
        destination: '/assets/crumb-logo.png',
      },
      {
        source: '/assets/apple-touch-icon.png',
        destination: '/apple-touch-icon.png',
      },
    ];
  },
};
export default nextConfig;
