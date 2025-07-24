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
    title: "Nyx UI - Premium React UI Library & Component Collection",
    description:
      "The most comprehensive React UI library for Next.js. 30+ premium components built with Tailwind CSS and Framer Motion. Start building beautiful interfaces today.",
    images: [{ 
      url: "/nyx.png", 
      width: 1200, 
      height: 630,
      alt: "Nyx UI - Premium React UI Library Components Preview"
    }],
    type: "website",
    locale: "en_US",
    siteName: "Nyx UI"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyx UI - Premium React UI Library for Next.js",
    description:
      "30+ premium React components built with Tailwind CSS and Framer Motion. The ultimate UI library for modern Next.js applications.",
    images: ["/nyx.png"],
    creator: "@nyx_ui",
    site: "@nyx_ui"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "Web Development",
  alternates: {
    canonical: "https://nyxui.vercel.app/",
  },
  other: {
    "application-name": "Nyx UI",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
    "google-site-verification": "google23857aecce6e6602"
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
                "url": "https://x.com/nyx_ui"
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
      <body className="bg-white dark:bg-[#0A0A0A]">
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
