import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Banner } from "../components/global/Banner";
import Footer from "../components/global/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://nyxui.vercel.app/"),
  title: {
    default: "Nyx UI - Premium React UI Library & Components for Next.js",
    template: "%s | Nyx UI - React UI Library"
  },
  description:
    "Nyx UI is the ultimate React UI library with 30+ premium components for Next.js. Built with Tailwind CSS, Framer Motion, and TypeScript. Create beautiful, responsive interfaces faster with our comprehensive UI component library.",
  keywords: [
    "UI library",
    "React UI library", 
    "Next.js UI library",
    "component library",
    "React component library",
    "UI components",
    "Next.js components",
    "React components",
    "Tailwind CSS components",
    "TypeScript UI components",
    "premium UI library",
    "modern UI library",
    "Framer Motion components",
    "responsive UI components",
    "accessible UI library",
    "customizable UI components",
    "nyx UI",
    "frontend UI library",
    "Tailwind UI library",
    "React design system",
    "UI kit",
    "component framework"
  ],
  authors: [{ name: "Mihir Jaiswal", url: "https://mihirjaiswal-portfolio.vercel.app/" }],
  creator: "Mihir Jaiswal",
  publisher: "Mihir Jaiswal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nyxui.vercel.app/",
    title: "Nyx UI - Premium React UI Library & Components for Next.js",
    description: "Nyx UI is the ultimate React UI library with 30+ premium components for Next.js. Built with Tailwind CSS, Framer Motion, and TypeScript.",
    siteName: "Nyx UI",
    images: [
      {
        url: "https://nyxui.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nyx UI - Premium React UI Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyx UI - Premium React UI Library & Components for Next.js",
    description: "Nyx UI is the ultimate React UI library with 30+ premium components for Next.js. Built with Tailwind CSS, Framer Motion, and TypeScript.",
    images: ["https://nyxui.vercel.app/og-image.png"],
    creator: "@mihir_jaiswal_",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent FOUC by setting theme before page loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('nyx-ui-theme') || 'dark';
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Nyx UI",
              "description": "Premium React UI library with 50+ components for Next.js applications",
              "url": "https://nyxui.vercel.app/",
              "author": {
                "@type": "Person",
                "name": "Mihir Jaiswal",
                "url": "https://x.com/mihir_jaiswal_"
              },
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "keywords": "UI library, React components, Next.js, Tailwind CSS, TypeScript"
            })
          }}
        />
      </head>
      <body className="bg-white dark:bg-[#0A0A0A] transition-colors duration-150">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Banner />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

