import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import withPlaiceholder from "@plaiceholder/next";

const withBundlerAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundlerAnalyzer({
  productionBrowserSourceMaps: false,
  // Pro mockup/interaction slugs were normalised to kebab-case; keep the old
  // doc URLs working so existing links and bookmarks do not 404.
  async redirects() {
    return [
      {
        source: "/blocks/analogclock",
        destination: "/blocks/analog-clock",
        permanent: true,
      },
      {
        source: "/blocks/codediff",
        destination: "/blocks/code-diff",
        permanent: true,
      },
      {
        source: "/blocks/collabcursors",
        destination: "/blocks/collab-cursors",
        permanent: true,
      },
      {
        source: "/blocks/commandpalette",
        destination: "/blocks/command-palette",
        permanent: true,
      },
      {
        source: "/blocks/contributionheatmap",
        destination: "/blocks/contribution-heatmap",
        permanent: true,
      },
      {
        source: "/blocks/dragreorder",
        destination: "/blocks/drag-reorder",
        permanent: true,
      },
      {
        source: "/blocks/encryptioncard",
        destination: "/blocks/encryption-card",
        permanent: true,
      },
      {
        source: "/blocks/fraudshield",
        destination: "/blocks/fraud-shield",
        permanent: true,
      },
      {
        source: "/blocks/kanbanflow",
        destination: "/blocks/kanban-flow",
        permanent: true,
      },
      {
        source: "/blocks/linechart",
        destination: "/blocks/line-chart",
        permanent: true,
      },
      {
        source: "/blocks/mergeflow",
        destination: "/blocks/merge-flow",
        permanent: true,
      },
      {
        source: "/blocks/milestonetimeline",
        destination: "/blocks/milestone-timeline",
        permanent: true,
      },
      {
        source: "/blocks/pipelinerun",
        destination: "/blocks/pipeline-run",
        permanent: true,
      },
      {
        source: "/blocks/radarchart",
        destination: "/blocks/radar-chart",
        permanent: true,
      },
      {
        source: "/blocks/signedpayload",
        destination: "/blocks/signed-payload",
        permanent: true,
      },
      {
        source: "/blocks/starrating",
        destination: "/blocks/star-rating",
        permanent: true,
      },
      {
        source: "/blocks/swipecards",
        destination: "/blocks/swipe-cards",
        permanent: true,
      },
      {
        source: "/blocks/txnintegrity",
        destination: "/blocks/txn-integrity",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  // These routes read Pro files off disk at request time. They live outside
  // public/, so tracing has to be told to ship them.
  outputFileTracingIncludes: {
    "/api/pro/source/[name]": ["./registry/pro/**/*.tsx"],
  },
  experimental: {
    optimizeCss: true,
    // tree shaking
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/postprocessing",
      "motion",
      "firebase",
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-scroll-area",
      "prismjs",
      "posthog-js",
    ],
  },
  images: {
    // Bypass Vercel image optimizer — quota exhausted (402) until billing resets
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
});

export default withContentCollections(withPlaiceholder(nextConfig));
