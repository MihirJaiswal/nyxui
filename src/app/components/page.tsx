import { ComponentSidebar } from "@/components/components/component-sidebar"
import Header from "@/components/global/Header"
import IntroductionPage from "@/components/components/Introduction"

const ComponentsPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <ComponentSidebar />
        <main className="relative ">
          <div className="mx-auto max-w-4xl">
            <IntroductionPage/>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ComponentsPage
