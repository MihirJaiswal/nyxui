import ComponentGrid from "@/components/components/gallery/ComponentGrid";
import { getPublishedDocCount } from "@/lib/registry";
import { absoluteUrl, getCurrentYear } from "@/lib/utils";
import type { Metadata } from "next";
import { createBaseMetadata, publisher } from "@/lib/docs";
import { JsonLd } from "@/components/global/JsonLd";

function getComponentCount() {
  return getPublishedDocCount("components");
}

export async function generateMetadata(): Promise<Metadata> {
  const componentCount = getComponentCount();
  const currentYear = getCurrentYear();
  const canonical = absoluteUrl("/components");

  return createBaseMetadata({
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
      "component collection",
    ],
    canonical,
    image: "/api/og/components",
  });
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
    publisher,
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="flex-1 order-2 lg:order-1 min-w-0">
          <ComponentGrid />
        </div>
      </div>
    </>
  );
};

export default ComponentsPage;
