import { componentsData } from "@/registry/Data";
import { ComponentSidebarClient } from "./ComponentSidebarClient";
import { itemHref, getComponentCategory } from "@/lib/links";
import type { CategoryItem } from "../../../types/sidebar-types";

interface ComponentSidebarProps {
  type?: "components" | "blocks";
}

interface RegistryEntry {
  title: string;
  isNew?: boolean;
  tags?: string[];
}

const TEMPLATE_CATEGORY = "Portfolio";
const BLOCK_CATEGORY = "Blocks";
const DEFAULT_GETTING_STARTED_ITEM: CategoryItem = {
  name: "Introduction",
  href: "/docs",
  isNew: false,
};

function toSortedItems<T extends RegistryEntry>(
  entries: Record<string, T> | undefined,
  mapItem: (key: string, item: T) => CategoryItem,
): CategoryItem[] {
  return Object.entries(entries ?? {})
    .map(([key, item]) => mapItem(key, item))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const ComponentSidebar = ({
  type = "components",
}: ComponentSidebarProps) => {
  const processedComponents = toSortedItems(
    componentsData.components,
    (key, component) => ({
      name: component.title,
      href: itemHref("components", key),
      isNew: Boolean(component.isNew),
      category: getComponentCategory(component.title, component.tags),
    }),
  );

  const processedTemplates = toSortedItems(
    componentsData.templates,
    (key, template) => ({
      name: template.title,
      href: itemHref("templates", key),
      isNew: Boolean(template.isNew),
      category: TEMPLATE_CATEGORY,
    }),
  );

  const processedBlocks = toSortedItems(
    componentsData.blocks,
    (key, block) => ({
      name: block.title,
      href: itemHref("blocks", key),
      isNew: Boolean(block.isNew),
      category: BLOCK_CATEGORY,
    }),
  );

  const gettingStartedItems: CategoryItem[] = componentsData.links
    ? Object.entries(componentsData.links).map(([key, title]) => ({
        name: String(title),
        href: `/${key}`,
        isNew: false,
      }))
    : [DEFAULT_GETTING_STARTED_ITEM];

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
