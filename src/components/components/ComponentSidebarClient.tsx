'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { Circle, LayoutGrid, Pencil, Layers, MessageSquare, Menu, Settings, Share2, Lightbulb, Sparkles, ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface CategoryItem {
  name: string;
  href: string;
}

interface CategoryType {
  category: string;
  items: CategoryItem[];
}

interface ComponentSidebarClientProps {
  categories: CategoryType[];
}

export const ComponentSidebarClient: React.FC<ComponentSidebarClientProps> = ({ categories }) => {
  const currentPath = usePathname()
  const categoryIcons: Record<string, React.ElementType> = {
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
  
  const activeCategory = categories.find(category =>
    category.items.some(item => currentPath === item.href)
  )?.category

  return (
    <Accordion
      type="multiple"
      defaultValue={[activeCategory || '', ...categories.map((c) => c.category)]}
      className="w-full"
    >
      {categories.map((category: CategoryType) => {
        const isActiveCategory = category.category === activeCategory
        const IconComponent = categoryIcons[category.category] || Settings
        
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
                <IconComponent className={cn("size-4", isActiveCategory && "text-primary")} />
                <span>{category.category}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-1 pt-0 pl-2">
              <div className="flex flex-col gap-1 pl-4 border-l border-border/50">
                {category.items.map((item: CategoryItem) => {
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
  )
}
