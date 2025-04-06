import { ComponentSidebar } from "@/components/components/component-sidebar"
import Header from "@/components/global/Header"
import { GradientButton } from "@/nyxui/components/GradientButton"
import { MorphingButton } from "@/nyxui/components/MorphingButton"
import { Fragment } from "react"

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
      <div className="w-full sm:w-1/2 p-3 sm:p-4">
        <div className="h-full flex flex-col border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-lg">
          <div className="bg-gray-50 dark:bg-zinc-900 h-40 sm:h-52 md:h-64 flex items-center justify-center p-4">
            {DemoComponent}
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col md:flex-row">
        {/* Sidebar - Mobile: Hidden (could be off-canvas menu), Desktop: Fixed sidebar */}
        <aside className="w-full md:w-auto md:min-w-[220px] lg:min-w-[240px] shrink-0 border-r hidden md:block">
          <div className="sticky top-16">
            <ComponentSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Component Demos</h1>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
                Interactive demonstrations of our UI component library
              </p>
            </div>
            
            <div className="flex flex-wrap -mx-3 sm:-mx-4">
              {demoComponents.map((demo) => (
                <DemoBox
                  key={demo.id}
                  title={demo.title}
                  description={demo.description}
                  DemoComponent={demo.DemoComponent}
                />
              ))}
              
              {/* Add empty placeholders when there are odd number of items 
                  to maintain consistent grid appearance */}
              {demoComponents.length % 2 !== 0 && (
                <div className="w-full sm:w-1/2 p-3 sm:p-4" aria-hidden="true"></div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ComponentsPage