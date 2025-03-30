import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ComponentSidebar } from "@/components/components/component-sidebar"
import { ComponentGrid } from "@/components/components/component-grid"

const ComponentsPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative size-8 overflow-hidden rounded-full bg-primary">
                <div className="absolute inset-0 flex items-center justify-center text-primary-foreground">UI</div>
              </div>
              <span className="font-bold">Prism UI</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/docs/getting-started">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <ComponentSidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Components</h1>
              <p className="text-lg text-muted-foreground">
                Explore our collection of beautifully crafted UI components.
              </p>
            </div>
            <div className="my-8">
              <ComponentGrid />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ComponentsPage
