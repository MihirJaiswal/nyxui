import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ComponentSidebar } from "@/components/components/component-sidebar";
import { componentsData } from "@/nuvyxui/resgistry";
import Header from "@/components/global/Header";
import { PreviewCodeToggle } from "@/components/components/PreviewCodeToggle";
import { InstallationSection } from "@/components/components/Installation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

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
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col md:flex-row">
        <aside className="sticky top-16 h-fit w-full shrink-0 md:w-auto md:min-w-[220px] lg:min-w-[280px] xl:min-w-[300px] hidden md:block">
          <div className="sticky top-16">
            <ComponentSidebar />
          </div>
        </aside>
        <main className="flex-1 overflow-hidden bg-white dark:bg-black lpr-12">
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
            </div>{componentData.examples && componentData.examples.length > 0 && (
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
              {componentData.props && componentData.props.length > 0 ? (
                <Tabs
                  defaultValue={componentData.props[0].name}
                  className="w-full"
                >
                  <div className="overflow-x-auto">
                    <TabsList className="mb-4 sm:mb-6 bg-zinc-100 dark:bg-zinc-800 p-0 shadow-sm flex">
                      {componentData.props.map((propGroup) => (
                        <TabsTrigger
                          key={propGroup.name}
                          value={propGroup.name}
                          className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base whitespace-nowrap data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900"
                        >
                          {propGroup.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {componentData.props.map((propGroup) => (
                    <TabsContent
                      key={propGroup.name}
                      value={propGroup.name}
                      className="space-y-4"
                    >
                      <div className="border shadow overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-zinc-50 dark:bg-black border-b">
                                <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-medium w-1/6 min-w-[100px] border-r">
                                  Name
                                </th>
                                <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-medium w-1/6 min-w-[100px] border-r">
                                  Type
                                </th>
                                <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-medium w-1/5 min-w-[100px] border-r">
                                  Default
                                </th>
                                <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-medium w-3/6 min-w-[200px]">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {propGroup.items.map((prop, index) => (
                                <React.Fragment
                                  key={`${propGroup.name}-${prop.name}`}
                                >
                                  <tr
                                    className={`transition-colors ${index % 2 === 0
                                        ? "bg-white dark:bg-black"
                                        : "bg-zinc-50 dark:bg-zinc-900"
                                      }`}
                                  >
                                    <td className="px-2` py-3 text-start ml-1 sm:py-4 font-mono text-xs sm:text-sm font-semibold border-r break-all">
                                      <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                                        {prop.name}
                                      </code>
                                    </td>
                                    <td className="px-3 py-3 sm:py-4 font-mono text-xs sm:text-sm border-r break-all">
                                      <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                                        {prop.type}
                                      </code>
                                    </td>
                                    <td className="px-2 py-3 sm:py-4 text-xs sm:text-sm border-r break-all">
                                      <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                                        {prop.default || "-"}
                                      </code>
                                    </td>
                                    <td className="px-2 py-3 sm:py-4 text-xs sm:text-sm">
                                      {prop.description}
                                    </td>
                                  </tr>
                                  {prop.subProps &&
                                    prop.subProps.length > 0 && (
                                      <tr
                                        key={`${propGroup.name}-${prop.name}-subprops`}
                                      >
                                        <td colSpan={4} className="p-0">
                                          <div className="bg-zinc-50 dark:bg-zinc-900 border">
                                            <div className="px-3 py-2 sm:px-3 sm:py-2 font-medium text-xs sm:text-sm bg-white dark:bg-black border-2 border-b">
                                              Properties of {prop.name}
                                            </div>
                                            <div className="overflow-x-auto">
                                              <table className="w-full border-collapse text-sm">
                                                <tbody className="divide-y">
                                                  {prop.subProps.map(
                                                    (subProp, subIndex) => (
                                                      <tr
                                                        key={`${propGroup.name}-${prop.name}-${subProp.name}`}
                                                        className={`transition-colors ${subIndex % 2 === 0
                                                            ? "bg-white/50 dark:bg-black/30"
                                                            : "bg-zinc-50/70 dark:bg-zinc-900/70"
                                                          }`}
                                                      >
                                                        <td className="pl-6 sm:pl-10 pr-3 sm:pr-6 py-2 sm:py-3 font-mono text-xs sm:text-sm font-medium border-r w-1/6 min-w-[100px] break-all">
                                                          <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                                                            {subProp.name}
                                                          </code>
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-3 sm:py-3 font-mono text-xs sm:text-sm border-r w-1/6 min-w-[100px] break-all">
                                                          <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                                                            {subProp.type}
                                                          </code>
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-r w-1/5 min-w-[100px] break-all">
                                                          <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                                                            {subProp.default ||
                                                              "-"}
                                                          </code>
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm w-3/6 min-w-[200px]">
                                                          {subProp.description}
                                                        </td>
                                                      </tr>
                                                    )
                                                  )}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                </React.Fragment>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <Card className="border p-4 sm:p-6 shadow">
                  <p className="text-zinc-500">
                    No props available for this component.
                  </p>
                </Card>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComponentPage;
