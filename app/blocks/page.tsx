import { componentsData } from "../../registry/Data";
import { absoluteUrl } from "../../lib/utils";
import type { Metadata } from "next";
import ComponentGrid from "../../components/components/ComponentGrid";

function getBlockCount() {
  return Object.keys(componentsData.blocks).length;
}

export async function generateMetadata(): Promise<Metadata> {
  const blockCount = getBlockCount();
  const currentYear = new Date().getFullYear();
  
  return {
    title: `Nyx UI | Blocks`,
    description: `Browse ${blockCount}+ modern React UI blocks. Complete sections like hero, footer, CTA, and more. Built with TypeScript, Tailwind CSS & Framer Motion.`,
    keywords: [
      "nyx ui blocks",
      "nyxui block library", 
      "react ui blocks",
      "nextjs blocks",
      "tailwind css blocks",
      `react blocks ${currentYear}`,
      "free react blocks",
      "ui block library",
      "typescript blocks",
      "section blocks",
      "hero blocks",
      "footer blocks",
      "cta blocks"
    ],

    openGraph: {
      title: `NyxUI Blocks - ${blockCount}+ React Section Blocks`,
      description: `Browse and copy ${blockCount}+ premium React section blocks for your next project.`,
      url: absoluteUrl("/blocks"),
      siteName: "Nyx UI",
      images: [{
        url: "/api/og/blocks",
        width: 1200,
        height: 630,
        alt: `NyxUI Blocks Library - ${blockCount}+ Section Blocks`,
      }],
    },

    twitter: {
      card: "summary_large_image",
      title: `NyxUI - ${blockCount}+ React Section Blocks`,
      description: `Modern React section blocks for Next.js. Built with TypeScript & Tailwind CSS.`,
      images: ["/nyx.webp"],
      creator: "@mihir_jaiswal_",
    },

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: absoluteUrl("/blocks"),
    }
  };
}

const BlocksPage = () => {
  const blockCount = getBlockCount();
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nyx UI Blocks",
    description: `${blockCount}+ React UI section blocks for Next.js applications`,
    url: absoluteUrl("/blocks"),
    mainEntity: {
      "@type": "ItemList",
      name: "React Section Blocks",
      numberOfItems: blockCount,
    },
    publisher: {
      "@type": "Organization",
      name: "Nyx UI",
      url: "https://nyxui.com/"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="flex-1 order-2 lg:order-1 min-w-0">
          <ComponentGrid type="blocks" />
        </div>
      </div>
    </>
  );
};

export default BlocksPage;





