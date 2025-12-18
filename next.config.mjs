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
      ['/blogs/la-ruta-del-sol-un-viaje-de-transicion-entre-los-andes-y-el-altiplano', '/faqs/ruta-del-sol'],
      ['/blogs/explorando-los-encantos-de-lima-una-aventura-urbana-inolvidable', '/faqs/lima-capital-peruano'],
      ['/blogs/capacidad-de-entrada-a-machu-picchu-y-accesos', '/faqs/entradas-a-machu-picchu'],
      ['/blogs/guia-definitiva-para-tu-viaje-a-cusco-descubre-los-mejores-lugares-de-la-ciudad', '/destinos/lugares-turisticos-cusco'],
      ['/blogs/que-llevar-al-valle-sagrado', '/faqs/que-llevar-valle-sagrado'],
      ['/blogs/la-ruta-del-barroco-andino-en-cusco', '/faqs/ruta-del-barroco-andino'],
      ['/blogs/otra-forma-de-disfrutar-tu-visita-en-las-noches-cusquenas', '/destinos/noches-cusquenas'],
      ['/blogs/16-lugares-que-puedes-visitar-con-el-boleto-turistico-del-cusco', '/faqs/boleto-turistico-cusco'],
      ['/blogs/la-historia-de-los-antepasados-reflejada-en-nuestros-dias', '/atracciones/cusco-cultura-tradicion'],
    ];

    return [
      ...oneOffs.map(([from, to]) => ({
        source: from,
        destination: to,
        permanent: true,
      })),
    ];
  }
};

export default withBundleAnalyzer(nextConfig);
