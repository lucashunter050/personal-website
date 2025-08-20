import type { NextConfig } from "next";
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Setup Cloudflare dev platform for local development
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  
  // Image optimization configuration for static export
  images: {
    unoptimized: true,
  },
  
  // Asset prefix for proper loading
  assetPrefix: '',
  
  // Disable server-side features for static export
  reactStrictMode: true,
  
  // Ensure proper handling of static assets
  experimental: {
    // Enable if you need app directory features
    // appDir: true,
  },
};

export default nextConfig;
