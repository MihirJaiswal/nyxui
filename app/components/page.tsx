import ComponentGrid from "../../components/components/ComponentGrid";
import { allDocs } from "content-collections";
import { absoluteUrl } from "../../lib/utils";
import type { Metadata } from "next";


function getComponentCount() {
  if (!allDocs || !Array.isArray(allDocs)) return 0;
  return allDocs.filter((doc) => 
    doc.slugAsParams.startsWith("components/") && doc.published
  ).length;
}

export async function generateMetadata(): Promise<Metadata> {
  const componentCount = getComponentCount();
  const currentYear = new Date().getFullYear();
  
  return {
    title: ` Nyx UI | Components`,
    description: `Browse ${componentCount}+ premium React UI components. Built with TypeScript, Tailwind CSS & Framer Motion. Copy, paste, and ship faster with NyxUI component library.`,
    keywords: [
      "nyx ui components",
      "nyxui component library", 
      "react ui components",
      "nextjs components",
      "tailwind css components",
      `react components ${currentYear}`,
      "free react components",
      "ui component library",
      "typescript components",
      "component collection"
    ],

    openGraph: {
      title: `NyxUI Components - ${componentCount}+ React Components`,
      description: `Browse and copy ${componentCount}+ premium React components for your next project.`,
      url: absoluteUrl("/components"),
      siteName: "Nyx UI",
      images: [{
        url: "/api/og/components",
        width: 1200,
        height: 630,
        alt: `NyxUI Components Library - ${componentCount}+ Components`,
      }],
    },

    twitter: {
      card: "summary_large_image",
      title: `NyxUI - ${componentCount}+ React Components`,
      description: `Modern React components for Next.js. Built with TypeScript & Tailwind CSS.`,
      images: ["/nyx.png"],
      creator: "@mihir_jaiswal_",
    },

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: absoluteUrl("/components"),
    }
  };
}

const ComponentsPage = () => {
  const componentCount = getComponentCount();
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nyx UI Components",
    description: `${componentCount}+ React UI components for Next.js applications`,
    url: absoluteUrl("/components"),
    mainEntity: {
      "@type": "ItemList",
      name: "React Components",
      numberOfItems: componentCount,
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
          <ComponentGrid />
        </div>
      </div>
    </>
  );
};

export default ComponentsPage;