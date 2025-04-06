import { ComponentSidebar } from "@/components/components/component-sidebar"
import Header from "@/components/global/Header"
import IntroductionPage from "@/components/docs/Introduction"
import DocsSidebar from "@/components/docs/DocSidebar"
import Footer from "@/components/global/Footer"

const DocsPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex w-full flex-1 flex-col md:flex-row">
        {/* Main Sidebar - Hidden on mobile, visible on desktop */}
        <aside className="sticky top-16 h-fit w-full shrink-0 md:w-auto md:min-w-[220px] lg:min-w-[280px] xl:min-w-[300px] hidden md:block border-r bg-white dark:bg-zinc-950">
          <div className="sticky top-16">
            <ComponentSidebar />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white dark:bg-zinc-950 overflow-hidden">
          <div className="w-full h-full px-4 sm:px-6 md:px-8 py-4 md:py-6">
            {/* Content and Secondary Sidebar Layout */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Main Content */}
              <div className="flex-1 order-2 lg:order-1 min-w-0">
                <IntroductionPage />
              </div>
              
              {/* Secondary Sidebar - Right side on desktop, top on mobile */}
              <div className="w-full lg:w-64 xl:w-72 shrink-0 order-1 lg:order-2">
                <div className="sticky top-20">
                  <DocsSidebar />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default DocsPage