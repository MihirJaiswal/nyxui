import Link from "next/link"
import {
  BoxIcon as ButtonIcon,
  CreditCard,
  Layers,
  LayoutGrid,
  Menu,
  MessageSquare,
  Pencil,
  TableIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const featuredComponents = [
  {
    name: "Button",
    description: "Trigger actions or events with a single click.",
    href: "/components/button",
    icon: ButtonIcon,
  },
  {
    name: "Card",
    description: "Display content in a container with a header and footer.",
    href: "/components/card",
    icon: CreditCard,
  },
  {
    name: "Dialog",
    description: "A modal dialog that interrupts the user with important content.",
    href: "/components/dialog",
    icon: Layers,
  },
  {
    name: "Dropdown Menu",
    description: "Display a menu to the user with a trigger element.",
    href: "/components/dropdown-menu",
    icon: Menu,
  },
  {
    name: "Table",
    description: "Display tabular data in a structured format.",
    href: "/components/table",
    icon: TableIcon,
  },
  {
    name: "Tabs",
    description: "Switch between different views with tabbed navigation.",
    href: "/components/tabs",
    icon: LayoutGrid,
  },
  {
    name: "Form",
    description: "Collect user input with various form elements.",
    href: "/components/form",
    icon: Pencil,
  },
  {
    name: "Toast",
    description: "Display brief, temporary notifications to users.",
    href: "/components/toast",
    icon: MessageSquare,
  },
]

export const ComponentGrid = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredComponents.map((component) => (
        <Card key={component.name} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <component.icon className="size-5" />
            <CardTitle className="text-xl">{component.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-2 min-h-[40px]">{component.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href={component.href}>View Component</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

