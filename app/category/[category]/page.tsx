import { componentsData } from "../../../registry/Data";
import { ComponentCard } from "../../../components/components/ComponentCard";
import type { Metadata } from "next";
import { absoluteUrl } from "../../../lib/utils";

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
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-red-500">
          Error: Category parameter is missing
        </h1>
      </div>
    );
  }

  const displayCategory =
    decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

  const filteredComponents = Object.entries(componentsData.components).filter(
    ([, component]) =>
      component.tags.some(
        (tag) => tag.toLowerCase() === decodedCategory.toLowerCase(),
      ),
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        {displayCategory} Components
      </h1>

      <div className="relative z-40 grid grid-cols-1 items-start gap-6 pb-12 md:grid-cols-1 lg:grid-cols-2 lg:gap-10 xl:grid-cols-2">
        {filteredComponents.map(([slug, component]) => (
          <ComponentCard
            key={slug}
            slug={slug}
            title={component.title}
            description={component.description}
            imageSrc={component.image}
          />
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 dark:text-gray-300">
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

  return {
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
    alternates: {
      canonical: absoluteUrl(`/category/${encodeURIComponent(normalized)}`),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${titleCategory} Components | Nyx UI`,
      description,
      url: absoluteUrl(`/category/${encodeURIComponent(normalized)}`),
      siteName: "Nyx UI",
      type: "website",
      images: [
        {
          url: "/nyx.webp",
          width: 1200,
          height: 630,
          alt: `${titleCategory} Components - Nyx UI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleCategory} Components | Nyx UI`,
      description,
      images: ["/nyx.webp"],
    },
  };
}

export const revalidate = 86400; // Revalidate daily

export async function generateStaticParams(): Promise<
  Awaited<CategoryPageProps["params"]>[]
> {
  const categories = new Set<string>();
  
  Object.values(componentsData.components).forEach((component) => {
    component.tags.forEach((tag) => {
      categories.add(tag.toLowerCase());
    });
  });
  
  return Array.from(categories).map((category) => ({
    category,
  }));
}