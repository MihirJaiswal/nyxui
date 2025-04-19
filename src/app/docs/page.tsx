import { ComponentSidebar } from "@/components/components/component-sidebar";
import Header from "@/components/global/Header";
import IntroductionPage from "@/components/docs/Introduction";
import DocsSidebar from "@/components/docs/DocSidebar";

const DocsPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col md:flex-row">
        <aside className="hidden md:block w-full shrink-0 md:w-auto md:min-w-[220px] lg:min-w-[280px] xl:min-w-[300px]">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <ComponentSidebar />
          </div>
        </aside>
        <main className="flex-1">
          <div className="w-full h-full px-4 sm:px-6 md:px-8 py-4 md:py-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div className="flex-1 order-2 lg:order-1 min-w-0">
                <IntroductionPage />
              </div>
              <div className="w-full lg:w-64 xl:w-72 shrink-0 order-1 lg:order-2 hidden lg:block">
                <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
                  <DocsSidebar />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsPage;
