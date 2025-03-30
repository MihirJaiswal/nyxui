import { Github, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ComponentSidebar } from "@/components/components/component-sidebar"
import { componentsData } from "@/nyxui/resgistry"
import Header from "@/components/global/Header"
import { PreviewCodeToggle } from "@/components/components/PreviewCodeToggle"
import { Badge } from "@/components/ui/badge"
import { InstallationSection } from "@/components/components/Installation"

interface ComponentPageProps {
  params: {
    component: string
  }
}

const ComponentPage = async ({ params }: ComponentPageProps) => {
  const component = await params.component

  if (!componentsData) {
    console.error("componentsData is not properly loaded")
    notFound()
  }
  if (!(component in componentsData)) {
    console.error(`Component "${component}" not found in componentsData`)
    notFound()
  }

  const componentData = componentsData[component as keyof typeof componentsData]

  if (!componentData) {
    console.error(`Component data for "${component}" is undefined`)
    notFound()
  }

  if (!componentData.name || !componentData.description || !componentData.preview) {
    console.error(`Component "${component}" is missing required fields`)
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        <aside className="sticky top-16 self-start hidden md:block">
          <ComponentSidebar />
        </aside>
        <main className="relative py-8 lg:py-10 px-6">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="space-y-4 border-b pb-8">
              <div className="flex items-center gap-3">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
                  {componentData.name}
                </h1>
                <Badge variant="outline" className="font-medium">
                  UI Component
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {componentData.description}
              </p>
              <div className="flex gap-3 pt-2">
                <Button size="sm" variant="default">
                  <Github className="mr-2 size-4" />
                  View Source
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-2 size-4" />
                  Documentation
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Preview</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-medium">
                    Responsive
                  </Badge>
                  <Badge variant="secondary" className="font-medium">
                    Accessible
                  </Badge>
                </div>
              </div>
              <div className="rounded-xl border bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm overflow-hidden">
                <PreviewCodeToggle
                  preview={
                    <div className="flex flex-wrap justify-center gap-4 p-10">
                      {componentData.preview}
                    </div>
                  }
                  code={componentData.usage}
                />
              </div>
            </div>
            <InstallationSection componentData={componentData} />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
              {componentData.props &&
                componentData.props.map((propGroup) => (
                  <div key={propGroup.name} className="space-y-3">
                    <h3 className="text-lg font-semibold">{propGroup.name} Props</h3>
                    <div className="rounded-lg border overflow-hidden">
                      <div className="grid grid-cols-4 bg-muted/40 px-4 py-2 border-b text-sm font-medium">
                        <div>Name</div>
                        <div>Type</div>
                        <div>Default</div>
                        <div>Description</div>
                      </div>
                      <div className="divide-y">
                        {propGroup.items.map((prop) => (
                          <div
                            key={prop.name}
                            className="grid grid-cols-4 px-4 py-3 hover:bg-muted/20 transition-colors"
                          >
                            <div className="font-mono text-xs font-medium">{prop.name}</div>
                            <div className="text-xs text-muted-foreground">{prop.type}</div>
                            <div className="text-xs text-muted-foreground">{prop.default || "-"}</div>
                            <div className="text-xs text-muted-foreground">{prop.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
              {componentData.examples &&
                componentData.examples.map((example) => (
                  <div key={example.name} className="space-y-4">
                    <PreviewCodeToggle
                      preview={
                        <div className="flex flex-wrap justify-center gap-4 p-10">
                          {example.preview}
                        </div>
                      }
                      code={example.code}
                    />
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ComponentPage
