import type { Metadata } from "next";
import { componentsData } from "@/registry/Data";
import { Index } from "@/__registry__";
import { ComponentPreview } from "@/components/components/preview/component-preview";
import { ProCodeGate } from "@/components/components/code-block/pro-code-gate";
import { absoluteUrl } from "@/lib/utils";
import {
  blockCategoryHref,
  getBlockCategory,
  siteLinks,
  tagToSlug,
} from "@/lib/links";
import { createBaseMetadata } from "@/lib/docs";
import { createBreadcrumbSchema } from "@/lib/docs-schema";
import { JsonLd } from "@/components/global/JsonLd";

interface BlockCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

async function getCategoryFromParams(params: Promise<{ category: string }>) {
  const { category } = await params;
  return category ? decodeURIComponent(category) : null;
}

export default async function BlockCategoryPage({
  params,
}: BlockCategoryPageProps) {
  const decodedCategory = await getCategoryFromParams(params);

  if (!decodedCategory) {
    return (
      <div>
        <p className="text-muted-foreground">Category not found.</p>
      </div>
    );
  }

  // decodedCategory is a slug ("logo-cloud"), so slugify the bucket before
  // comparing — "Logo Cloud".toLowerCase() ("logo cloud") would never match.
  const filteredBlocks = Object.entries(componentsData.blocks).filter(
    ([slug, block]) =>
      tagToSlug(getBlockCategory(slug, block.tags ?? [])) ===
      decodedCategory.toLowerCase(),
  );

  // Derive the display title from an actual bucket name so multi-word
  // categories render as "Logo Cloud", not "Logo-cloud".
  const allBuckets = new Map<string, string>();
  Object.entries(componentsData.blocks).forEach(([slug, block]) => {
    const bucket = getBlockCategory(slug, block.tags ?? []);
    if (!allBuckets.has(tagToSlug(bucket)))
      allBuckets.set(tagToSlug(bucket), bucket);
  });
  const titleCategory =
    allBuckets.get(decodedCategory.toLowerCase()) ??
    decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

  const breadcrumbData = createBreadcrumbSchema([
    { name: "Nyx UI", url: absoluteUrl("/") },
    { name: "Blocks", url: absoluteUrl(siteLinks.blocks) },
    { name: titleCategory, url: absoluteUrl(blockCategoryHref(titleCategory)) },
  ]);

  return (
    <div className="mx-auto max-w-[120ch] w-full">
      <JsonLd data={breadcrumbData} />
      {/* Every block in this category is rendered LIVE, stacked one
          after another. The Installation / license setup section lives
          ONLY on the individual /blocks/<name> page. Mockups and
          interactions are narrow enough to sit two per row. */}
      <div
        className={
          decodedCategory.toLowerCase() === "mockups" ||
          decodedCategory.toLowerCase() === "interactions"
            ? "grid grid-cols-1 gap-4 2xl:grid-cols-2 items-stretch"
            : "flex flex-col gap-4"
        }
      >
        {filteredBlocks.map(([slug, block]) => {
          // For pro *components* (clip-path-links, hover-image-links,
          // typing-words) the
          // registry ships a `-demo` file with sample props — rendering
          // the raw component with no props would crash. Prefer the demo
          // when it exists, mirroring what the individual MDX does.
          const demoSlug = `${slug}-demo`;
          const previewSlug = Index[demoSlug] ? demoSlug : slug;
          const entry = Index[slug];
          const isPro = entry?.meta?.pro === true;

          return (
            <section
              key={slug}
              id={slug}
              className="flex scroll-mt-20 flex-col"
              aria-label={block.title}
            >
              <ComponentPreview name={previewSlug} type="blocks" titled>
                {isPro ? <ProCodeGate name={slug} /> : null}
              </ComponentPreview>
            </section>
          );
        })}
      </div>

      {filteredBlocks.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-xl text-muted-foreground">
            No {titleCategory.toLowerCase()} blocks found.
          </p>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({
  params,
}: BlockCategoryPageProps): Promise<Metadata> {
  const decodedCategory = await getCategoryFromParams(params);
  const titleCategory = decodedCategory
    ? decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)
    : "Category";

  return createBaseMetadata({
    title: `${titleCategory} Blocks | Nyx UI`,
    description: `Explore ${titleCategory} React UI blocks from Nyx UI. Built with TypeScript, Tailwind CSS, and Framer Motion for Next.js applications.`,
    keywords: [
      `${titleCategory.toLowerCase()} blocks`,
      "nyx ui",
      "nyxui",
      "react blocks",
      "next.js blocks",
      "tailwind css",
    ],
    canonical: absoluteUrl(blockCategoryHref(titleCategory)),
  });
}

export const revalidate = 86400; // Revalidate daily

export async function generateStaticParams(): Promise<
  Awaited<BlockCategoryPageProps["params"]>[]
> {
  const categories = new Set<string>();

  Object.entries(componentsData.blocks).forEach(([slug, block]) => {
    categories.add(tagToSlug(getBlockCategory(slug, block.tags ?? [])));
  });

  return Array.from(categories).map((category) => ({
    category,
  }));
}
