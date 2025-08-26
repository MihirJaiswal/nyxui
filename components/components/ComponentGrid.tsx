import { ComponentCard } from "./ComponentCard";
import { componentsData } from "../../registry/Data";

interface ComponentGridProps {
  type?: "components" | "blocks";
}

export default function ComponentGrid({ type = "components" }: ComponentGridProps) {
  const data = type === "blocks" ? componentsData.blocks : componentsData.components;
  const sortedItems = Object.entries(data).sort(
    ([, a], [, b]) => a.title.localeCompare(b.title)
  );

  return (
    <div className="xl:container mx-auto py-8">
      <div className="relative z-40 grid grid-cols-1 items-start gap-4 pb-8 md:grid-cols-2 lg:gap-10 xl:grid-cols-2">
        {sortedItems.map(([slug, item]) => (
          <ComponentCard
            key={slug}
            slug={slug}
            title={item.title}
            description={item.description}
            imageSrc={item.image}
            type={type}
          />
        ))}
      </div>
    </div>
  );
}