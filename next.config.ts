// next.config.ts  (or .js if your project is already ESM)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['newzone.audio'],
  },
  // …any other options
};

export default nextConfig;