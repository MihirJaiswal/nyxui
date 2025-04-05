import { ComponentSidebar } from "@/components/components/component-sidebar"
import Header from "@/components/global/Header"
import { GradientButton } from "@/nyxui/components/GradientButton"
import { MorphingButton } from "@/nyxui/components/MorphingButton"

const ComponentsPage = () => {
  const demoComponents = [
    {
      id: 2,
      title: "Gradient Button",
      description: "A component that creates a gradient button with a custom color palette.",
      DemoComponent: <GradientButton>Click me</GradientButton>
    },
    {
      id: 3,
      title: "Morphing Button",
      description: "A component that creates a morphing button with a custom color palette.",
      DemoComponent: <MorphingButton>Click me</MorphingButton>
    }
  ]

  const DemoBox = ({ title, description, DemoComponent }: { title: string; description: string; DemoComponent: React.ReactNode }) => {
    return (
      <div className="w-full md:w-1/2 p-4">
        <div className="h-full flex flex-col border border-gray-200 dark:border-gray-800 rounded-md shadow-md overflow-hidden transition-all hover:shadow-lg">
          <div className="bg-gray-50 dark:bg-zinc-900 h-64 flex items-center justify-center">
            {DemoComponent}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <ComponentSidebar />
        <main className="relative py-6 max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Component Demos</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Interactive demonstrations of our UI component library
            </p>
          </div>
          
          <div className="flex flex-wrap -mx-4">
            {demoComponents.map((demo) => (
              <DemoBox
                key={demo.id}
                title={demo.title}
                description={demo.description}
                DemoComponent={demo.DemoComponent}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ComponentsPage