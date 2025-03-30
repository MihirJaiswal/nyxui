'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Circle, PanelLeft, LayoutGrid, Pencil, Layers, MessageSquare, Menu, Settings, Share2, Lightbulb, Sparkles, ChevronRight, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { componentsData } from "../../nyxui/resgistry"
import React from "react"

export const ComponentSidebar = () => {
  const currentPath = usePathname()
  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    "Layout": LayoutGrid,
    "Forms": Pencil,
    "Data Display": Layers,
    "Feedback": MessageSquare,
    "Navigation": Menu,
    "Overlays": Layers,
    "Utils": Settings,
    "Buttons": Share2,
    "Animation": Sparkles,
    "UI Elements": Lightbulb,
  }
  const grouped: Record<string, { category: string; icon: React.ComponentType<{ className?: string }>; items: { name: string; href: string }[] }> = {}
  Object.values(componentsData).forEach((component) => {
    const category = component.category || "Uncategorized"
    if (!grouped[category]) {
      grouped[category] = {
        category,
        icon: categoryIcons[category] || Settings,
        items: []
      }
    }
    grouped[category].items.push({
      name: component.name,
      href: `/components/${component.name.toLowerCase().replace(/\s+/g, '-')}`
    })
  })
  const categorizedComponents = Object.values(grouped).sort((a, b) =>
    a.category.localeCompare(b.category)
  )
  const activeCategory = categorizedComponents.find(category =>
    category.items.some(item => currentPath === item.href)
  )?.category

  return (
    <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full max-w-sm shrink-0 border-r border-border bg-card/50 backdrop-blur-sm md:sticky md:block">
      <div className="h-full py-6 pl-6 pr-4">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border pb-4 mb-2">
            <BookOpen className="size-5 text-primary" />
            <h3 className="font-semibold text-foreground">Components</h3>
          </div>
          <div className="overflow-y-auto py-2 pr-2 scrollbar-thin">
            <Accordion
              type="multiple"
              defaultValue={[activeCategory || '', ...categorizedComponents.map((c) => c.category)]}
              className="w-full"
            >
              {categorizedComponents.map((category) => {
                const isActiveCategory = category.category === activeCategory
                return (
                  <AccordionItem
                    key={category.category}
                    value={category.category}
                    className={cn("border-b-0 mb-1", isActiveCategory && "")}
                  >
                    <AccordionTrigger
                      className={cn(
                        "py-2 px-2 text-sm hover:no-underline rounded-md transition-colors",
                        isActiveCategory ? "text-foreground font-medium" : "text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {React.createElement(category.icon, { className: cn("size-4", isActiveCategory && "text-primary") })}
                        <span>{category.category}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1 pt-0 pl-2">
                      <div className="flex flex-col gap-1 pl-4 border-l border-border/50">
                        {category.items.map((item) => {
                          const isActive = currentPath === item.href
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted group",
                                isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {isActive ? (
                                <ChevronRight className="size-3 text-primary" />
                              ) : (
                                <Circle className="size-1.5 group-hover:text-foreground" />
                              )}
                              <span>{item.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </aside>
  )
}
