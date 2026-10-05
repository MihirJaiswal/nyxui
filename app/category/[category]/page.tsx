import { componentsData } from "@/registry/Data";
import ComponentGrid from "@/components/components/gallery/ComponentGrid";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { categoryHref, tagToSlug } from "@/lib/links";
import { createBaseMetadata } from "@/lib/docs";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

async function getCategoryFromParams(params: Promise<{ category: string }>) {
  const { category } = await params;
  return category ? decodeURIComponent(category) : null;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = await getCategoryFromParams(params);

  if (!decodedCategory) {
    return (
      <div>
        <p className="text-muted-foreground">Category not found.</p>
      </div>
    );
  }

  const hasAny = Object.values(componentsData.components).some((c) =>
    c.tags.some((t) => t.toLowerCase() === decodedCategory.toLowerCase()),
  );

  return (
    <div>
      <ComponentGrid type="components" category={decodedCategory} />

      {!hasAny && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            No components found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const decodedCategory = await getCategoryFromParams(params);
  const normalized = decodedCategory ? decodedCategory.toLowerCase() : "";
  const titleCategory = decodedCategory
    ? decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)
    : "Category";

  const description = decodedCategory
    ? `Explore ${titleCategory} React UI components from Nyx UI. Built with TypeScript, Tailwind CSS, and Framer Motion for Next.js applications.`
    : "Browse React UI components by category from Nyx UI.";

  return createBaseMetadata({
    title: `${titleCategory} Components | Nyx UI`,
    description,
    keywords: [
      `${titleCategory.toLowerCase()} components`,
      "nyx ui",
      "nyxui",
      "react components",
      "next.js components",
      "tailwind css",
    ],
    canonical: absoluteUrl(categoryHref(normalized)),
  });
}

export const revalidate = 86400; // Revalidate daily

export async function generateStaticParams(): Promise<
  Awaited<CategoryPageProps["params"]>[]
> {
  const categories = new Set<string>();

  Object.values(componentsData.components).forEach((component) => {
    component.tags.forEach((tag) => {
      categories.add(tagToSlug(tag));
    });
  });

  return Array.from(categories).map((category) => ({
    category,
  }));
}
