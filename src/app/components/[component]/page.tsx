import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { componentsData } from "@/nuvyxui/resgistry";
import { PreviewCodeToggle } from "@/components/components/PreviewCodeToggle";
import { InstallationSection } from "@/components/components/Installation";
import React from "react";
import Link from "next/link";
import { PropsTable } from "@/components/components/PropsTable";

const ComponentPage = async ({
  params,
}: {
  params: Promise<{ component: string }>;
}) => {
  const { component } = await params;

  if (!componentsData) {
    console.error("componentsData is not properly loaded");
    return notFound();
  }

  if (!(component in componentsData)) {
    console.error(`Component "${component}" not found in componentsData`);
    return notFound();
  }

  const componentData =
    componentsData[component as keyof typeof componentsData];

  if (!componentData) {
    console.error(`Component data for "${component}" is undefined`);
    return notFound();
  }

  if (
    !componentData.name ||
    !componentData.description ||
    !componentData.preview
  ) {
    console.error(`Component "${component}" is missing required fields`);
    return notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 md:py-8 lg:px-8 xl:px-10">
      <div className="space-y-4 pb-6 md:pb-8 mt-3">
        <div className="flex flex-wrap items-start gap-3 sm:items-center">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl break-words">
            {componentData.name}
          </h1>
        </div>
        <div>
          <p className="text-muted-foreground dark:text-[#A1A1AA] text-lg">
            <span className="inline-block align-top no-underline [text-wrap:balance]">
              {componentData.description}
            </span>
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {
              (componentData.tags || []).map((tag, index) => (
                <Link key={index} href="/docs" className="whitespace-nowrap">
                  <Button size="sm" variant="outline" className="text-xs">
                    {tag}
                  </Button>
                </Link>
              ))
            }
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 sm:space-y-6">
        <div className="rounded-xl border bg-white dark:bg-black backdrop-blur-sm overflow-hidden">
          <PreviewCodeToggle
            preview={
              <div className="flex flex-wrap justify-center items-center w-full gap-4 p-4 sm:p-6 md:p-10">
                {componentData.preview}
              </div>
            }
            code={componentData.usage}
          />
        </div>
      </div>

      <div className="mt-10">
        <InstallationSection componentData={componentData} />
      </div>

      {componentData.examples && componentData.examples.length > 0 && (
        <div className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Examples
          </h2>
          {componentData.examples.map((example, idx) => (
            <div
              key={`example-${idx}-${example.name}`}
              className="space-y-4"
            >
              <div className="rounded-xl border overflow-hidden bg-white dark:bg-black">
                <PreviewCodeToggle
                  preview={
                    <div className="flex flex-wrap justify-center items-center w-full gap-4 p-4 sm:p-6 md:p-10">
                      {example.preview}
                    </div>
                  }
                  code={example.code}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="mt-10 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Props
        </h2>
        <PropsTable propGroups={componentData.props} />
      </section>
    </div>
  );
};

export default ComponentPage;