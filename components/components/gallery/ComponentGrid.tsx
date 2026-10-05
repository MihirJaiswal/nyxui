import { ComponentCard } from "./ComponentCard";
import { componentsData } from "@/registry/Data";
import { getBlockCategory, tagToSlug } from "@/lib/links";

interface ComponentGridProps {
  type?: "components" | "blocks" | "templates";
  /** Optional filter — matches items whose tags contain this value, or (for blocks) whose slug-derived bucket matches. */
  category?: string;
}

export default function ComponentGrid({
  type = "components",
  category,
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
  const needle = category?.toLowerCase();
  const sortedItems = Object.entries(data)
    .filter(([slug, item]) => {
      if (!needle) return true;
      // Match on any tag.
      if ((item.tags ?? []).some((tag) => tag.toLowerCase() === needle)) {
        return true;
      }
      // Blocks additionally use a slug-derived bucket (Hero / Feature /
      // Auth / …) that isn't always in tags — match on that too.
      if (type === "blocks") {
        return tagToSlug(getBlockCategory(slug, item.tags ?? [])) === needle;
      }
      return false;
    })
    .sort(([, a], [, b]) => a.title.localeCompare(b.title));

  return (
    <div className="mx-auto max-w-[120ch] w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6 2xl:grid-cols-3">
      {sortedItems.map(([slug, item]) => (
        <ComponentCard
          key={slug}
          slug={slug}
          title={item.title}
          description={item.description}
          imageSrc={item.image}
          imageClassName={item.imageClassName}
          type={type}
          isPro={item.isPro}
          proUrl={"proUrl" in item ? item.proUrl : undefined}
        />
      ))}
    </div>
  );
}
