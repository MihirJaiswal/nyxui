import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

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
        hostname: "raw.githubusercontent.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
});

export default withContentCollections(nextConfig);
