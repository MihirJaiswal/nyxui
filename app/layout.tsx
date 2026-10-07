import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Caveat } from "next/font/google";

const CaveatFont = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat-next",
  display: "swap",
});

const Satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/global/Footer";
import { JsonLd } from "@/components/global/JsonLd";
import { externalLinks } from "@/lib/links";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/global/header/Navbar";
import { ProAccessProvider } from "@/components/providers/pro-access-provider";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { PostHogIdentityBridge } from "@/components/providers/posthog-identity-bridge";
import { ProUpsellPopup } from "@/components/global/ProUpsellPopup";
import { ScrollProgress } from "@/components/global/ScrollProgress";

export const metadata: Metadata = {
  metadataBase: new URL(`${externalLinks.site}/`),
  title: {
    default: "Nyx UI — Animated React Component Library",
    template: "%s | Nyx UI",
  },
  description:
    "Build stunning landing pages and web apps with NyxUI — 25+ React + Tailwind components and templates, powered by Framer Motion for smooth animations.",

  keywords: [
    "Nyx UI",
    "React component library",
    "React UI library",
    "animated React components",
    "Tailwind CSS components",
    "Next.js components",
    "Framer Motion components",
    "shadcn components",
  ],
  authors: [
    {
      name: "Mihir Jaiswal",
      url: "https://mihirjaiswal-portfolio.vercel.app/",
    },
  ],
  creator: "Mihir Jaiswal",
  publisher: "Mihir Jaiswal",
  alternates: {
    canonical: externalLinks.site,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/assets/logos/nyx-logo.png",
  },
  openGraph: {
    title: "Nyx UI — Animated React Component Library",
    description:
      "The most comprehensive React UI library for Next.js. 30+ modern components built with Tailwind CSS and Framer Motion. Start building beautiful interfaces today.",
    images: [
      {
        url: "/assets/logos/nyx.webp",
        alt: "Nyx UI - Design Sharp. Ship Fast.",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Nyx UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyx UI — Animated React Component Library",
    description:
      "30+ modern React components built with Tailwind CSS and Framer Motion. The ultimate UI library for modern Next.js applications.",
    images: ["/assets/logos/nyx.webp"],
    creator: "@mihir_jaiswal_",
    site: "@mihir_jaiswal_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Web Development",
  verification: {
    google: "M2NNSOGxLgGT60G80UjLsGMvidIOIXtGO2OY4nJxe_k",
  },
  other: {
    "application-name": "Nyx UI",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Satoshi.variable} ${GeistSans.variable} ${GeistMono.variable} ${CaveatFont.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Three JSON-LD entities so Google can model the project cleanly:
            Organization (publisher), WebSite (searchable site), and
            SoftwareApplication (what the product actually is). All three can
            legally coexist; splitting them helps rich-result eligibility. */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${externalLinks.site}/#organization`,
            name: "Nyx UI",
            url: `${externalLinks.site}/`,
            logo: `${externalLinks.site}/assets/logos/nyx-logo.png`,
            sameAs: [externalLinks.githubRepo, externalLinks.twitter].filter(
              Boolean,
            ),
            founder: {
              "@type": "Person",
              name: "Mihir Jaiswal",
              url: externalLinks.twitter,
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${externalLinks.site}/#website`,
            name: "Nyx UI",
            url: `${externalLinks.site}/`,
            publisher: { "@id": `${externalLinks.site}/#organization` },
            inLanguage: "en",
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Nyx UI",
            description:
              "Nyx UI is an open-source React component library of animated, customizable components built with Tailwind CSS, TypeScript and Framer Motion.",
            url: `${externalLinks.site}/`,
            author: {
              "@type": "Person",
              name: "Mihir Jaiswal",
              url: externalLinks.twitter,
            },
            publisher: { "@id": `${externalLinks.site}/#organization` },
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }}
        />
      </head>
      <body className="bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {/* <Banner /> */}
          <PostHogProvider>
            <ProAccessProvider>
              <PostHogIdentityBridge />
              <div className="flex min-h-screen flex-col ">
                <Navbar />
                <main className="flex min-h-0 flex-1 flex-col">{children}</main>
                <Footer />
              </div>
            </ProAccessProvider>
          </PostHogProvider>
          <ProUpsellPopup />
          <Toaster />
          <ScrollProgress />
        </ThemeProvider>
      </body>
    </html>
  );
}
