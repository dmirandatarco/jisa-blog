import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  analyzerMode: 'static',
  openAnalyzer: false,
  generateStatsFile: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'sistema.jisaadventure.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 768, 960, 1080, 1280, 1536, 1920, 2560],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async redirects() {
    const oneOffs = [
      ['/tours/tour-montana-de-colores', '/tours/tour-montana-7-colores'],
      ['/trekking-machu-picchu ', '/peru-trekking'],
    ];

    return [
      // General: /paquetes/... -> /tours/...
      {
        source: '/paquetes/:slug*',
        destination: '/tours/:slug*',
        permanent: true, // 308 (equivalente a 301 para SEO)
        // locale: false, // descomenta si usas i18n y no quieres prefijos
      },

      // Específicas
      ...oneOffs.map(([from, to]) => ({
        source: from,
        destination: to,
        permanent: true,
        // locale: false, // descomenta si usas i18n
      })),
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
