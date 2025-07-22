import React from "react";
import { ComponentSidebar } from "../../components/components/component-sidebar";
import Header from "../../components/global/Header";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col lg:flex-row lg:gap-8 xl:gap-0 px-6 lg:px-6 xl:px-22 xl:container mx-auto">
        <aside className="hidden lg:block w-full shrink-0 lg:w-auto lg:min-w-[220px] xl:min-w-[300px]">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-x-hidden overflow-y-auto hide-scrollbar">
            <ComponentSidebar />
          </div>
        </aside>
        <main className="flex-1">
          <div className="w-full h-full py-4 md:py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
