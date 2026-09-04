"use client";

import React from "react";
import { ComponentSidebar } from "@/components/components/sidebar/component-sidebar";
import Navbar from "@/components/global/header/Navbar";
import { useSidebarCollapse } from "@/hooks/use-sidebar-collapse";

interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebarType?: React.ComponentProps<typeof ComponentSidebar>["type"];
}

export default function SidebarLayout({
  children,
  sidebarType,
}: SidebarLayoutProps) {
  const [isCollapsed] = useSidebarCollapse();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div
        className={`flex w-full flex-1 flex-col px-6 lg:flex-row lg:px-6 xl:container xl:mx-auto xl:px-22 lg:gap-8 ${isCollapsed ? "xl:gap-0" : "xl:gap-24"}`}
      >
        <aside className="hidden w-full shrink-0 lg:block lg:w-auto">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-x-hidden overflow-y-auto hide-scrollbar">
            <ComponentSidebar type={sidebarType} />
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1200px] py-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
