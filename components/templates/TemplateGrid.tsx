import { ComponentCard } from "./TemplateCard";
import { componentsData } from "../../registry/Data";

export default function TemplateGrid() {
  const sortedComponents = Object.entries(componentsData.templates).sort(
    ([, a], [, b]) => a.title.localeCompare(b.title)
  );

  return (
    <div className="container mx-auto py-8">
      <div className="relative z-40 grid grid-cols-1 items-start gap-4 pb-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-10 xl:grid-cols-2">
        {sortedComponents.map(([slug, template]) => (
          <ComponentCard
            key={slug}
            slug={slug}
            title={template.title}
            description={template.description}
            imageSrc={template.image}
          />
        ))}
      </div>
    </div>
  );
}