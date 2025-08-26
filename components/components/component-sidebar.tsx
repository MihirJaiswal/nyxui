import { componentsData } from "../../registry/Data";
import { ComponentSidebarClient } from "./ComponentSidebarClient";

interface ComponentSidebarProps {
  type?: "components" | "blocks";
}

export const ComponentSidebar = ({ type = "components" }: ComponentSidebarProps) => {
  const processedComponents = Object.entries(
    componentsData.components || {},
  )
    .map(([key, component]) => {
      return {
        name: component.title,
        href: `/components/${key}`,
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
        href: `/templates/${key}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isNew: Boolean((template as any).isNew),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Add processing for blocks
  const processedBlocks = Object.entries(
    componentsData.blocks || {},
  )
    .map(([key, block]) => {
      return {
        name: block.title,
        href: `/blocks/${key}`,
        isNew: Boolean(block.isNew),
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
    <aside className="fixed top-16 z-30 lg:sticky hidden h-[calc(100vh-4rem)] w-60 shrink-0 lg:block backdrop-blur-md pt-[22px]">
      <div className="h-full py-4">
        <div className="flex h-full flex-col">
          <div className="space-y-2 md:space-y-3 mb-2">
            <div className="font-bold tracking-wider text-black dark:text-white px-1 md:px-2 text-sm md:text-base">
              Twitter
            </div>
            <div className="space-y-0.5">
              <a 
                className="group flex items-center w-full text-xs md:text-sm py-1.5 md:py-2 rounded-md transition-all duration-200 hover:text-foreground text-black dark:text-[#A1A1AA] hover:bg-muted/50 ml-2 group-hover:ml-2 transition-all duration-200"
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://x.com/mihir_jaiswal_"
              >
               @mihir_jaiswal_
              </a>
            </div>
            <div className="w-[80%]">
              <div className="shrink-0 bg-border h-[1px] w-full" />
            </div>
          </div>
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