import { ComponentCard } from "./ComponentCard";
import { componentsData } from "@/registry/Data";

interface ComponentGridProps {
  type?: "components" | "blocks" | "templates";
}

export default function ComponentGrid({
  type = "components",
}: ComponentGridProps) {
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
  const sortedItems = Object.entries(data).sort(([, a], [, b]) =>
    a.title.localeCompare(b.title),
  );

  return (
    <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2 lg:gap-6 xl:grid-cols-2">
      {sortedItems.map(([slug, item]) => (
        <ComponentCard
          key={slug}
          slug={slug}
          title={item.title}
          description={item.description}
          imageSrc={item.image}
          imageFit={item.imageFit}
          type={type}
        />
      ))}
    </div>
  );
}
