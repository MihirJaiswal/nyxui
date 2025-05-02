import IntroductionPage from "@/components/docs/Introduction";
import DocsSidebar from "@/components/docs/DocSidebar";

const DocsPage = () => {
  return (
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
  );
};

export default DocsPage;