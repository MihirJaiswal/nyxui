import { ComponentSidebar } from "@/components/components/component-sidebar"
import Header from "@/components/global/Header"
import IntroductionPage from "@/components/docs/Introduction"
import DocsSidebar from "@/components/docs/DocSidebar"
import Footer from "@/components/global/Footer"

const DocsPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="container max-w-screen-2xl mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 bg-white dark:bg-zinc-950">
        <aside className="sticky top-16 self-start hidden md:block">
          <ComponentSidebar />
        </aside>
        <main className="relative py-4 px-5 w-full">
          <div className="w-full flex gap-10 space-y-10">
            <IntroductionPage />
            <DocsSidebar/>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  )
}

export default DocsPage