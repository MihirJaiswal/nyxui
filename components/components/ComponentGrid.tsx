import { ComponentCard } from "./ComponentCard";
import { componentsData } from "../../registry/Data";

export default function ComponentGrid() {
  const sortedComponents = Object.entries(componentsData.components).sort(
    ([, a], [, b]) => a.title.localeCompare(b.title)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative z-40 grid grid-cols-1 items-start gap-4 pb-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-10 xl:grid-cols-2">
        {sortedComponents.map(([slug, component]) => (
          <ComponentCard
            key={slug}
            slug={slug}
            title={component.title}
            description={component.description}
            imageSrc={component.image}
          />
        ))}
      </div>
    </div>
  );
}