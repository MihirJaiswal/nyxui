import { componentsData } from "@/nuvyxui/Data";
import { ComponentCard } from "@/components/components/ComponentCard";

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
      <div className="container mx-auto px-4 py-8">
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        {displayCategory} Components
      </h1>

      <div className="relative z-40 grid grid-cols-1 items-start gap-20 pb-12 md:grid-cols-1 lg:grid-cols-2 lg:gap-10 xl:grid-cols-2">
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