import { getRegistryCounts } from "@/lib/registry";
import { absoluteUrl, getCurrentYear } from "@/lib/utils";
import type { Metadata } from "next";
import ComponentGrid from "@/components/components/ComponentGrid";
import { createBaseMetadata, publisher } from "@/lib/docs";
import { JsonLd } from "@/components/global/JsonLd";

function getBlockCount() {
  return getRegistryCounts().blocks;
}

export async function generateMetadata(): Promise<Metadata> {
  const blockCount = getBlockCount();
  const currentYear = getCurrentYear();
  const canonical = absoluteUrl("/blocks");

  return createBaseMetadata({
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
      "cta blocks",
    ],
    canonical,
    image: "/api/og/blocks",
  });
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
    publisher,
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="flex-1 order-2 lg:order-1 min-w-0">
          <ComponentGrid type="blocks" />
        </div>
      </div>
    </>
  );
};

export default BlocksPage;
