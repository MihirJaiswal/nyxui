import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import withPlaiceholder from "@plaiceholder/next"

const withBundlerAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundlerAnalyzer({
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
});

export default withContentCollections(withPlaiceholder(nextConfig));
