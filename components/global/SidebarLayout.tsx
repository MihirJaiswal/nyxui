"use client";

import React from "react";
import { ComponentSidebar } from "@/components/components/sidebar/component-sidebar";
import { useSidebarCollapse } from "@/hooks/use-sidebar-collapse";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-1 flex-col">
      <div
        className={cn(
          "max-w-345 mx-auto flex w-full flex-1 flex-col px-6 lg:flex-row lg:px-6 xl:mx-auto lg:gap-8",
          isCollapsed ? "xl:gap-12" : "xl:gap-24",
        )}
      >
        <aside className="hidden w-full shrink-0 lg:block lg:w-auto">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-x-hidden overflow-y-auto hide-scrollbar">
            <ComponentSidebar type={sidebarType} />
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full py-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
