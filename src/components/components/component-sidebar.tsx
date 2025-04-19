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
    <aside className="fixed top-16 z-30 md:sticky hidden h-[calc(100vh-4rem)] md:w-64 lg:w-72 shrink-0 md:block border-r border-border/10 dark:border-border/5 bg-background/80 backdrop-blur-md">
      <div className="h-full py-4 px-2 md:px-3">
        <div className="flex h-full flex-col">
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
