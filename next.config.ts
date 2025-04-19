import type { NextConfig } from "next";

const withBundlerAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = withBundlerAnalyzer({
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
      },
      {
        hostname: 'uploads-ssl.webflow.com',
      },
      {
        hostname: 'findicons.com',
      },
      
    ],
  },
});

export default nextConfig;
