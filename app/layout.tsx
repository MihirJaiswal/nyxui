import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Banner } from "../components/global/Banner";
import Footer from "../components/global/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://nyxui.com/"),
  title: {
    default: "Nyx UI",
    template: "%s | Nyx UI - React UI Library"
  },
  description:
    "Beautiful React UI components for Next.js developers. Copy, customize, and ship responsive apps faster with Nyx UI",
  keywords: [
    "Nyx UI",
    "nyxui",
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
    "UI kit"
  ],
  authors: [{ name: "Mihir Jaiswal", url: "https://mihirjaiswal-portfolio.vercel.app/" }],
  creator: "Mihir Jaiswal",
  publisher: "Mihir Jaiswal",
  alternates: {
    canonical: "https://nyxui.com",
  },
  openGraph: {
    title: "Nyx UI",
    description:
      "The most comprehensive React UI library for Next.js. 30+ modern components built with Tailwind CSS and Framer Motion. Start building beautiful interfaces today.",
    images: [{ 
      url: "/nyx.png", 
      width: 1200, 
      height: 630,
      alt: "Nyx UI - Modern React UI Library Components Preview"
    }],
    type: "website",
    locale: "en_US",
    siteName: "Nyx UI"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyx UI",
    description:
      "30+ modern React components built with Tailwind CSS and Framer Motion. The ultimate UI library for modern Next.js applications.",
    images: ["/nyx.png"],
    creator: "@mihir_jaiswal_",
    site: "@mihir_jaiswal_",
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
  verification: {
    google: "XNSEycxa9cfRCuvJ0zP9yC5u_J0R-oriqXxyEM4Yp-Q",
  },
  other: {
    "application-name": "Nyx UI",
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
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
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
              "description": "Modern React UI library with 50+ components for Next.js applications",
              "url": "https://nyxui.com/",
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
      <body className="bg-background">
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

