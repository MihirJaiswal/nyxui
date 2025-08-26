import { notFound } from "next/navigation";
import { componentsData } from "../../../registry/Data";
import { Index } from "../../../__registry__";

interface PreviewPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function BlockPreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const blockName = slug[0];
  const block = componentsData.blocks[blockName];
  const Component = Index[blockName]?.component;

  if (!block || !Component) {
    notFound();
  }

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center flex-1 flex-col lg:flex-row lg:gap-8 xl:gap-0 px-6 lg:px-6 xl:px-22 xl:container mx-auto">
      <Component />
    </div>
  );
}
