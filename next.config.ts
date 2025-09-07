import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import withPlaiceholder from "@plaiceholder/next"

const withBundlerAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundlerAnalyzer({
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    // tree shaking
    optimizePackageImports: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/postprocessing',
      'framer-motion',
      'animejs',
      'firebase',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-scroll-area',
      'react-syntax-highlighter',
      'prismjs',
      'shiki',
      '@tsparticles/react',
      'posthog-js'
    ]
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