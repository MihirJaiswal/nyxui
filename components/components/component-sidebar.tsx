import { componentsData } from "../../registry/Data";
import { ComponentSidebarClient } from "./ComponentSidebarClient";

export const ComponentSidebar = () => {
  const processedComponents = Object.entries(
    componentsData.components || {},
  )
    .map(([key, component]) => {
      return {
        name: component.title,
        href: `/docs/components/${key}`,
        isNew: Boolean(component.isNew),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Add processing for templates
  const processedTemplates = Object.entries(
    componentsData.templates || {},
  )
    .map(([key, template]) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: (template as any).title,
        href: `/docs/templates/${key}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isNew: Boolean((template as any).isNew),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const gettingStartedItems = componentsData.links
    ? Object.entries(componentsData.links).map(([key, title]) => ({
        name: String(title),
        href: `/${key}`,
        isNew: false,
      }))
    : [{ name: "Introduction", href: "/documentation", isNew: false }];

  return (
    <aside className="fixed top-16 z-30 lg:sticky hidden h-[calc(100vh-4rem)] w-72 shrink-0 lg:block backdrop-blur-md pt-[22px]">
      <div className="h-full py-4">
        <div className="flex h-full flex-col ml-14">
          <ComponentSidebarClient
            gettingStartedSection={{
              title: "Getting Started",
              items: gettingStartedItems,
            }}
            componentItems={processedComponents}
            templateItems={processedTemplates}
          />
        </div>
      </div>
    </aside>
  );
};