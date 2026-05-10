import type { NextConfig } from "next";

const basePath = '/fashion-hero-shop';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
