import('./src/env.mjs');
import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@serverless-app-scaffold/types', 'lucide-react'],
  images: {
    domains: ['api.mapbox.com'],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
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

export default withMDX(nextConfig);
