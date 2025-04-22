import { componentsData } from "../../nuvyxui/resgistry";
import { ComponentSidebarClient } from "./ComponentSidebarClient";

export const ComponentSidebar = () => {
  const processedComponents = Object.values(componentsData).map((component) => {
    return {
      name: component.name,
      category: component.category || "Uncategorized",
      href: `/components/${component.name.toLowerCase().replace(/\s+/g, "-")}`,
      isNew: component.new === true,
    };
  });

  const groupedByCategory: Record<
    string,
    { name: string; href: string; isNew?: boolean }[]
  > = {};
  processedComponents.forEach((component) => {
    if (!groupedByCategory[component.category]) {
      groupedByCategory[component.category] = [];
    }
    groupedByCategory[component.category].push({
      name: component.name,
      href: component.href,
      isNew: component.isNew,
    });
  });

  const categories = Object.keys(groupedByCategory)
    .sort()
    .map((category) => ({
      category,
      items: groupedByCategory[category],
    }));

  return (
    <aside className="fixed top-16 z-30 lg:sticky hidden h-[calc(100vh-4rem)] w-72 shrink-0 lg:block backdrop-blur-md">
      <div className="h-full py-4">
        <div className="flex h-full flex-col ml-14">
          <ComponentSidebarClient
            categories={categories}
            gettingStartedSection={{
              title: "Getting Started",
              items: [{ name: "Introduction", href: "/docs", isNew: false }],
            }}
          />
        </div>
      </div>
    </aside>
  );
};
