export interface CategoryItem {
  name: string;
  href: string;
  isNew?: boolean;
  category?: string;
}

export interface GettingStartedSection {
  title: string;
  items: CategoryItem[];
}

export interface ComponentSidebarClientProps {
  gettingStartedSection: GettingStartedSection;
  componentItems: CategoryItem[];
  templateItems?: CategoryItem[];
  blockItems?: CategoryItem[];
  type?: "components" | "blocks";
}
