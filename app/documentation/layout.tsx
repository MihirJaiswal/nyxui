import React from "react";
import type { Metadata } from "next";
import { ComponentSidebar } from "../../components/components/component-sidebar";
import Header from "../../components/global/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://nuvyxui.vercel.app/"),
  title: "Docs | Nuvyx UI",
  description:
    "Comprehensive documentation for Nuvyx UI - a premium collection of responsive, accessible React components built with Tailwind CSS, Framer Motion, and TypeScript for modern Next.js applications.",
  keywords: [
    "React components",
    "UI library",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Framer Motion",
    "responsive design",
    "accessible components",
    "nuvyx UI",
    "web development",
    "frontend framework",
  ],
  authors: [{ name: "Mihir Jaiswal", url: "https://x.com/nuvyx_ui" }],
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
    canonical: "https://nuvyxui.vercel.app/docs",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nuvyxui.vercel.app/docs",
    siteName: "Nuvyx UI Documentation",
    title: "Nuvyx UI - Beautiful React Components for Next.js",
    description:
      "Premium UI components for Next.js applications built with Tailwind CSS, Framer Motion, and TypeScript. Create stunning user interfaces with ease.",
    images: [
      {
        url: "/docs/docs-cover.png",
        width: 1200,
        height: 630,
        alt: "Nuvyx UI Component Library Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuvyx UI - Modern React Components Library",
    description:
      "Discover beautiful UI components for Next.js applications built with Tailwind CSS, Framer Motion, and TypeScript.",
    images: ["/docs/docs-cover.png"],
    creator: "@nuvyx_ui",
    site: "@nuvyx_ui",
  },
  category: "Technology",
  classification: "Web Development",
  applicationName: "Nuvyx UI",
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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col lg:flex-row">
        <aside className="hidden lg:block w-full shrink-0 lg:w-auto lg:min-w-[220px] xl:min-w-[300px]">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <ComponentSidebar />
          </div>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
