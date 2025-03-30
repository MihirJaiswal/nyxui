import Link from "next/link"
import { Sparkles, Layers, BadgeCheck, CreditCard, Loader, Star, Palette, BoxIcon as Box3d } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const featuredComponents = [
  {
    name: "Gradient Button",
    description: "Modern buttons with gradient backgrounds and hover effects.",
    href: "/components/gradient-button",
    icon: Sparkles,
  },
  {
    name: "Glass Card",
    description: "Modern glassmorphism cards with blur effects and gradient borders.",
    href: "/components/glass-card",
    icon: Layers,
  },
  {
    name: "3D Card",
    description: "Interactive 3D cards with tilt effects and depth.",
    href: "/components/3d-card",
    icon: Box3d,
  },
  {
    name: "Gradient Badge",
    description: "Modern badges with gradient backgrounds and animations.",
    href: "/components/gradient-badge",
    icon: BadgeCheck,
  },
  {
    name: "Testimonial Card",
    description: "Modern testimonial cards with avatars and quotes.",
    href: "/components/testimonial-card",
    icon: Star,
  },
  {
    name: "Animated Loader",
    description: "Modern loading animations and spinners with gradients and effects.",
    href: "/components/animated-loader",
    icon: Loader,
  },
  {
    name: "Pricing Card",
    description: "Modern pricing cards with gradients, animations, and feature lists.",
    href: "/components/pricing-card",
    icon: CreditCard,
  },
  {
    name: "Color Palette",
    description: "Beautiful color palettes and gradient generators.",
    href: "/components/color-palette",
    icon: Palette,
  },
]

export function ComponentGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredComponents.map((component) => (
        <Card
          key={component.name}
          className="group overflow-hidden border-slate-200 transition-all duration-300 hover:border-primary/50 hover:shadow-md dark:border-slate-800"
        >
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <div className="rounded-full bg-primary/10 p-1.5 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <component.icon className="size-5" />
            </div>
            <CardTitle className="text-xl">{component.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-2 min-h-[40px]">{component.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full transition-all group-hover:border-primary/50 group-hover:text-primary"
            >
              <Link href={component.href}>View Component</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

