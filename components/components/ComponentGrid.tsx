import { ComponentCard } from "./ComponentCard";
import { componentsData } from "../../registry/Data";

interface ComponentGridProps {
  type?: "components" | "blocks" | "templates";
}

export default function ComponentGrid({ type = "components" }: ComponentGridProps) {
  const getData = () => {
    switch (type) {
      case "blocks":
        return componentsData.blocks;
      case "templates":
        return componentsData.templates;
      default:
        return componentsData.components;
    }
  };

  const data = getData();
  const sortedItems = Object.entries(data).sort(
    ([, a], [, b]) => a.title.localeCompare(b.title)
  );

  return (
    <div className="xl:container mx-auto md:px-2 py-8">
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