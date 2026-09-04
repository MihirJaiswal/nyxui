import IntroductionPage from "@/components/docs/Introduction";
// import DocsSidebar from "@/components/docs/DocSidebar";

const DocsPage = () => {
  return (
    <div className="w-full h-full py-4 md:py-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="flex-1 order-2 lg:order-1 min-w-0">
          <IntroductionPage />
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
