import ComponentGrid from "../../components/components/ComponentGrid";

const ComponentsPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
      <div className="flex-1 order-2 lg:order-1 min-w-0">
        <ComponentGrid />
      </div>
    </div>
  );
};

export default ComponentsPage;
