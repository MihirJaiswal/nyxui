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
  // Bundle splitting configuration
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // React core
          react: {
            name: 'react-vendor',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            chunks: 'all',
            priority: 10,
          },
          // Three.js
          threejs: {
            name: 'three-vendor',
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            chunks: 'all',
            priority: 9,
          },
          // Animation libraries
          animations: {
            name: 'animation-vendor',
            test: /[\\/]node_modules[\\/](framer-motion|animejs|motion)[\\/]/,
            chunks: 'all',
            priority: 8,
          },
          // Firebase
          firebase: {
            name: 'firebase-vendor',
            test: /[\\/]node_modules[\\/]firebase[\\/]/,
            chunks: 'all',
            priority: 7,
          },
          // UI libraries
          ui: {
            name: 'ui-vendor',
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
            chunks: 'all',
            priority: 6,
          },
          // Other vendors
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 5,
            minChunks: 1,
          },
        },
      };
    }
    
    return config;
  },
});

export default withContentCollections(withPlaiceholder(nextConfig));