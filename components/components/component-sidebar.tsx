import { componentsData } from "../../registry/Data";
import { ComponentSidebarClient } from "./ComponentSidebarClient";
import { itemHref, getComponentCategory } from "@/lib/links";

interface ComponentSidebarProps {
  type?: "components" | "blocks";
}

export const ComponentSidebar = ({
  type = "components",
}: ComponentSidebarProps) => {
  const processedComponents = Object.entries(componentsData.components || {})
    .map(([key, component]) => {
      return {
        name: component.title,
        href: itemHref("components", key),
        isNew: Boolean(component.isNew),
        category: getComponentCategory(component.title, component.tags),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Add processing for templates
  const processedTemplates = Object.entries(componentsData.templates || {})
    .map(([key, template]) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: (template as any).title,
        href: itemHref("templates", key),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isNew: Boolean((template as any).isNew),
        category: "Portfolio",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Add processing for blocks
  const processedBlocks = Object.entries(componentsData.blocks || {})
    .map(([key, block]) => {
      return {
        name: block.title,
        href: itemHref("blocks", key),
        isNew: Boolean(block.isNew),
        category: "Blocks",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const gettingStartedItems = componentsData.links
    ? Object.entries(componentsData.links).map(([key, title]) => ({
        name: String(title),
        href: `/${key}`,
        isNew: false,
      }))
    : [{ name: "Introduction", href: "/docs", isNew: false }];

  return (
    <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-auto shrink-0 pt-[22px] backdrop-blur-md lg:sticky lg:block">
      <div className="h-full py-4">
        <div className="flex h-full flex-col">
          <ComponentSidebarClient
            gettingStartedSection={{
              title: "Getting Started",
              items: gettingStartedItems,
            }}
            componentItems={processedComponents}
            templateItems={processedTemplates}
            blockItems={processedBlocks}
            type={type}
          />
        </div>
      </div>
    </aside>
  );
};
