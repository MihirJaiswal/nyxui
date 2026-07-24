import React from "react";
import { ComponentSidebar } from "@/components/components/component-sidebar";
import Header from "@/components/global/Header";

interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebarType?: React.ComponentProps<typeof ComponentSidebar>["type"];
}

export default function SidebarLayout({
  children,
  sidebarType,
}: SidebarLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col lg:flex-row lg:gap-8 xl:gap-24 px-6 lg:px-6 xl:px-22 xl:container mx-auto">
        <aside className="hidden lg:block w-full shrink-0 lg:w-auto">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-x-hidden overflow-y-auto hide-scrollbar">
            <ComponentSidebar type={sidebarType} />
          </div>
        </aside>
        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1200px] py-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
