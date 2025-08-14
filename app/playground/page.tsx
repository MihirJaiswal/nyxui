import { Metadata } from "next";
import { absoluteUrl } from "../../lib/utils";
import PlaygroundClient from "../../components/playground/PlaygroundClient";
import Header from "../../components/global/Header";

export const metadata: Metadata = {
  title: "Nyx UI | Component Playground",
  description: "Interactive playground to customize and edit React components. Live preview with real-time code generation.",
  keywords: [
    "component playground",
    "react component editor",
    "live preview",
    "component customization",
    "nyx ui playground",
    "react components",
    "interactive editor"
  ],
  openGraph: {
    title: "Nyx UI Component Playground",
    description: "Interactive playground to customize and edit React components with live preview.",
    url: absoluteUrl("/playground"),
    siteName: "Nyx UI",
    images: [{
      url: "/api/og/playground",
      width: 1200,
      height: 630,
      alt: "Nyx UI Component Playground",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyx UI Component Playground",
    description: "Interactive playground to customize React components with live preview.",
    images: ["/nyx.png"],
    creator: "@mihir_jaiswal_",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl("/playground"),
  }
};

export default function PlaygroundPage() {
  return (
  <>
  <Header />
    <div className=" px-6 lg:px-6 xl:px-22 xl:container mx-auto">
      <PlaygroundClient />
    </div>
  </>
  );
}
