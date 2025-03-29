"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Circle, Layers, LayoutGrid, Menu, MessageSquare, PanelLeft, Pencil, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const components = [
  {
    category: "Layout",
    icon: LayoutGrid,
    items: [
      { name: "Container", href: "/components/container" },
      { name: "Grid", href: "/components/grid" },
      { name: "Sidebar", href: "/components/sidebar" },
    ],
  },
  {
    category: "Forms",
    icon: Pencil,
    items: [
      { name: "Button", href: "/components/button" },
      { name: "Checkbox", href: "/components/checkbox" },
      { name: "Input", href: "/components/input" },
      { name: "Radio Group", href: "/components/radio-group" },
      { name: "Select", href: "/components/select" },
      { name: "Textarea", href: "/components/textarea" },
      { name: "Toggle", href: "/components/toggle" },
    ],
  },
  {
    category: "Data Display",
    icon: Layers,
    items: [
      { name: "Card", href: "/components/card" },
      { name: "Table", href: "/components/table" },
      { name: "Badge", href: "/components/badge" },
      { name: "Avatar", href: "/components/avatar" },
    ],
  },
  {
    category: "Feedback",
    icon: MessageSquare,
    items: [
      { name: "Alert", href: "/components/alert" },
      { name: "Toast", href: "/components/toast" },
      { name: "Progress", href: "/components/progress" },
      { name: "Skeleton", href: "/components/skeleton" },
    ],
  },
  {
    category: "Navigation",
    icon: Menu,
    items: [
      { name: "Dropdown Menu", href: "/components/dropdown-menu" },
      { name: "Tabs", href: "/components/tabs" },
      { name: "Pagination", href: "/components/pagination" },
      { name: "Breadcrumb", href: "/components/breadcrumb" },
    ],
  },
  {
    category: "Overlays",
    icon: Layers,
    items: [
      { name: "Dialog", href: "/components/dialog" },
      { name: "Drawer", href: "/components/drawer" },
      { name: "Popover", href: "/components/popover" },
      { name: "Tooltip", href: "/components/tooltip" },
    ],
  },
  {
    category: "Utils",
    icon: Settings,
    items: [
      { name: "Accordion", href: "/components/accordion" },
      { name: "Collapsible", href: "/components/collapsible" },
      { name: "Scroll Area", href: "/components/scroll-area" },
      { name: "Separator", href: "/components/separator" },
    ],
  },
]

export const ComponentSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
      <div className="h-full py-6 pl-8 pr-6 lg:py-8">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center gap-2">
            <PanelLeft className="size-4" />
            <h4 className="font-medium">Components</h4>
          </div>
          <div className="overflow-y-auto py-2">
            <Accordion type="multiple" defaultValue={components.map((c) => c.category)} className="w-full">
              {components.map((category) => (
                <AccordionItem key={category.category} value={category.category} className="border-b-0">
                  <AccordionTrigger className="py-2 text-sm hover:no-underline">
                    <div className="flex items-center gap-2">
                      <category.icon className="size-4" />
                      <span>{category.category}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-0">
                    <div className="flex flex-col gap-1">
                      {category.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                            pathname === item.href ? "bg-muted font-medium" : "text-muted-foreground",
                          )}
                        >
                          <Circle className="size-1" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </aside>
  )
}

