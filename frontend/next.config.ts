import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/kuruvamess',
  assetPrefix: '/kuruvamess/',
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'ui-avatars.com',
      'upload.wikimedia.org'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
