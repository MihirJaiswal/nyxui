import { componentsData } from "@/registry/Data";
import { ComponentSidebarClient } from "./ComponentSidebarClient";
import { itemHref, getComponentCategory, getBlockCategory } from "@/lib/links";
import type { CategoryItem } from "@/types/sidebar";

interface ComponentSidebarProps {
  type?: "components" | "blocks";
}

interface SortableEntry {
  title: string;
  isNew?: boolean;
  isPro?: boolean;
  tags?: string[];
}

const TEMPLATE_CATEGORY = "Portfolio";
const DEFAULT_GETTING_STARTED_ITEM: CategoryItem = {
  name: "Introduction",
  href: "/docs",
  isNew: false,
};

function toSortedItems<T extends SortableEntry>(
  entries: Record<string, T> | undefined,
  mapItem: (key: string, item: T) => CategoryItem,
): CategoryItem[] {
  return Object.entries(entries ?? {})
    .map(([key, item]) => mapItem(key, item))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Sidebar labels shouldn't repeat the grouping category — items are
 * already grouped visually, so "Text Animation: Flipping Words"
 * collapses to "Flipping Words", "Mockup: Bank Card" to "Bank Card",
 * etc. Titles without a colon are left untouched.
 */
function labelForSidebar(title: string): string {
  const idx = title.indexOf(": ");
  return idx === -1 ? title : title.slice(idx + 2);
}

export const ComponentSidebar = ({
  type = "components",
}: ComponentSidebarProps) => {
  const processedComponents = toSortedItems(
    componentsData.components,
    (key, component) => ({
      name: labelForSidebar(component.title),
      href: itemHref("components", key),
      isNew: Boolean(component.isNew),
      isPro: Boolean(component.isPro),
      category: getComponentCategory(component.title, component.tags),
    }),
  );

  const processedTemplates = toSortedItems(
    componentsData.templates,
    (key, template) => ({
      name: labelForSidebar(template.title),
      href: itemHref("templates", key),
      isNew: Boolean(template.isNew),
      isPro: Boolean(template.isPro),
      category: TEMPLATE_CATEGORY,
    }),
  );

  const processedBlocks = toSortedItems(
    componentsData.blocks,
    (key, block) => ({
      name: labelForSidebar(block.title),
      href: itemHref("blocks", key),
      isNew: Boolean(block.isNew),
      isPro: Boolean(block.isPro),
      category: getBlockCategory(key, block.tags ?? []),
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
    <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-auto shrink-0 backdrop-blur-md lg:sticky lg:block">
      <div className="h-full py-7">
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
