import('./src/env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@serverless-app-scaffold/types', 'lucide-react', 'hi'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'climation-staging.afocosec.org',
      },
      {
        protocol: 'https',
        hostname: 'afoco-staging-assets.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'afoco-production-assets.s3.ap-northeast-2.amazonaws.com',
      },
    ],
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
