import('./src/env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@serverless-app-scaffold/types', 'lucide-react'],
  images: {
    domains: ['api.mapbox.com'],
  },
  cssLoaderOptions: {
    url: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/projects',
        permanent: false,
      },
    ];
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
