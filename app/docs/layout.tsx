import React from "react";
import type { Metadata } from "next";
import SidebarLayout from "@/components/global/SidebarLayout";
import { absoluteUrl } from "@/lib/utils";
import { externalLinks, siteLinks } from "@/lib/links";

export const metadata: Metadata = {
  metadataBase: new URL(`${externalLinks.site}/`),
  title: "Docs | Nyx UI",
  description:
    "Comprehensive documentation for Nyx UI - a premium collection of responsive, accessible React components built with Tailwind CSS, Framer Motion, and TypeScript for modern Next.js applications.",
  keywords: [
    "React components",
    "UI library",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Framer Motion",
    "responsive design",
    "accessible components",
    "nyx UI",
    "web development",
    "frontend framework",
  ],
  authors: [{ name: "Mihir Jaiswal", url: externalLinks.twitter }],
  creator: "Mihir Jaiswal",
  publisher: "Mihir Jaiswal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: absoluteUrl(siteLinks.components),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl(siteLinks.components),
    siteName: "Nyx UI Documentation",
    title: "Nyx UI - Beautiful React Components for Next.js",
    description:
      "Modern UI components for Next.js applications built with Tailwind CSS, Framer Motion, and TypeScript. Create stunning user interfaces with ease.",
    images: [
      {
        url: "/docs/docs-cover.png",
        width: 1200,
        height: 630,
        alt: "Nyx UI Component Library Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyx UI - Modern React Components Library",
    description:
      "Discover beautiful UI components for Next.js applications built with Tailwind CSS, Framer Motion, and TypeScript.",
    images: ["/nyx.webp"],
    creator: "@nuvyx_ui",
    site: "@nuvyx_ui",
  },
  category: "Technology",
  classification: "Web Development",
  applicationName: "Nyx UI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
