import React from "react";
import type { Metadata } from "next";
import { ComponentSidebar } from "../../components/components/component-sidebar";
import Header from "../../components/global/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://nuvyxui.vercel.app/"),
  title: "Components | Nuvyx UI",
  description:
    "Explore Nuvyx UI's comprehensive component library featuring responsive, accessible, and customizable UI elements built with Tailwind CSS, Framer Motion, and TypeScript for modern Next.js applications.",
  keywords: [
    "React components",
    "UI components",
    "Next.js components",
    "Tailwind UI",
    "TypeScript components",
    "Animation components",
    "Framer Motion",
    "UI library",
    "nuvyx UI",
    "Design system",
    "Frontend components",
  ],
  authors: [{ name: "Mihir", url: "https://x.com/nuvyx_ui" }],
  creator: "Mihir",
  publisher: "Mihir",
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
    canonical: "https://nuvyxui.vercel.app/components",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nuvyxui.vercel.app/components",
    siteName: "nuvyx UI Components",
    title: "Nuvyx UI - Stunning React Components for Next.js Applications",
    description:
      "Browse our collection of premium UI components built with Tailwind CSS, Framer Motion, and TypeScript. Create beautiful user interfaces with minimal effort.",
    images: [
      {
        url: "/docs/docs-cover.png",
        width: 1200,
        height: 630,
        alt: "nuvyx UI Components Preview",
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

export default function ComponentsLayout({
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
        <main className="flex-1">
          <div className="w-full h-full px-4 sm:px-6 md:px-8 py-4 md:py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
