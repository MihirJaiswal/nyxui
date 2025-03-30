import { BookOpen } from "lucide-react"
import { componentsData } from "../../nyxui/resgistry"
import { ComponentSidebarClient } from "./ComponentSidebarClient"

export const ComponentSidebar = () => {
  const processedComponents = Object.values(componentsData).map((component) => {
    return {
      name: component.name,
      category: component.category || "Uncategorized",
      href: `/components/${component.name.toLowerCase().replace(/\s+/g, '-')}`
    }
  })
  const groupedByCategory: Record<string, { name: string; href: string }[]> = {}
  processedComponents.forEach((component) => {
    if (!groupedByCategory[component.category]) {
      groupedByCategory[component.category] = []
    }
    groupedByCategory[component.category].push({
      name: component.name,
      href: component.href
    })
  })
  const categories = Object.keys(groupedByCategory).sort().map(category => ({
    category,
    items: groupedByCategory[category]
  }))
  return (
    <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full max-w-sm shrink-0 border-r border-border bg-card/50 backdrop-blur-sm md:sticky md:block">
      <div className="h-full py-4 pl-6 pr-4">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border pb-4 mb-2">
            <BookOpen className="size-5 text-primary" />
            <h3 className="font-semibold text-foreground">Components</h3>
          </div>
          <div className="overflow-y-auto pr-2 scrollbar-thin">
            <ComponentSidebarClient categories={categories} />
          </div>
        </div>
      </div>
    </aside>
  )
}