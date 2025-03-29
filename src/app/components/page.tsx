import { ComponentSidebar } from "@/components/components/component-sidebar"
import { ComponentGrid } from "@/components/components/component-grid"
import Header from "@/components/global/Header"

export default function ComponentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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

