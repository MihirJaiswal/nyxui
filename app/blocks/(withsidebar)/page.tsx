import { getRegistryCounts } from "@/lib/registry";
import { absoluteUrl, getCurrentYear } from "@/lib/utils";
import type { Metadata } from "next";
import { componentsData } from "@/registry/Data";
import { ComponentCard } from "@/components/components/gallery/ComponentCard";
import { blockCategoryHref, getBlockCategory } from "@/lib/links";
import { createBaseMetadata } from "@/lib/docs";
import { publisher } from "@/lib/docs-schema";
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

  // Group blocks by their bucket (Hero / Feature / Mockups / Auth / …)
  // — the index shows one card per category, each linking to its
  // /blocks/category/<slug> page.
  const categories = new Map<
    string,
    { count: number; image: string; imageClassName?: string; isPro: boolean }
  >();
  Object.entries(componentsData.blocks).forEach(([slug, block]) => {
    const category = getBlockCategory(slug, block.tags ?? []);
    const existing = categories.get(category);
    categories.set(category, {
      count: (existing?.count ?? 0) + 1,
      // The isRepresentative block's image is the category cover; otherwise
      // fall back to the first block's image.
      image: block.isRepresentative
        ? block.image
        : (existing?.image ?? block.image),
      imageClassName: block.isRepresentative
        ? block.imageClassName
        : (existing?.imageClassName ?? block.imageClassName),
      isPro: (existing?.isPro ?? false) || block.isPro === true,
    });
  });

  const sortedCategories = Array.from(categories.keys()).sort();

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
      {/* Same grid shell ComponentGrid uses (max-w-[120ch] + xl:3 cols)
          — one card per category bucket instead of per block. */}
      <div className="mx-auto grid w-full max-w-[120ch] grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {sortedCategories.map((category) => {
          const { image, imageClassName, count, isPro } =
            categories.get(category)!;
          return (
            <ComponentCard
              key={category}
              type="blocks"
              slug={category}
              title={category}
              imageSrc={image || "/assets/logos/nyx-logo.webp"}
              imageClassName={imageClassName}
              href={blockCategoryHref(category)}
              count={count}
              isPro={isPro}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlocksPage;
