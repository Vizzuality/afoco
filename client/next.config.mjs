import('./src/env.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages: ['@serverless-app-scaffold/types', 'lucide-react'],
  // images: {
  //   domains: ['api.mapbox.com'],
  // },
  async redirects() {
    return [
      {
       source: '/',
        destination: '/projects',
        permanent: true,
      },
    ]
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: [
  //       {
  //         loader: 'svg-sprite-loader',
  //       },
  //       {
  //         loader: 'svgo-loader',
  //         options: {
  //           plugins: [
  //             {
  //               name: 'preset-default',
  //               params: {
  //                 overrides: {
  //                   convertColors: { shorthex: false },
  //                   convertPathData: false,
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   });

  //   return config;
  // },
};






export default nextConfig;
