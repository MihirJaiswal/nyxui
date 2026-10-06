"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ComponentSidebar } from "@/components/components/sidebar/component-sidebar";
import { useSidebarCollapse } from "@/hooks/use-sidebar-collapse";
import { CONTAINER, hasTightSidebarGap } from "@/lib/layout";
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
  const pathname = usePathname();
  const tightGap = hasTightSidebarGap(pathname ?? "");

  return (
    <div className="flex flex-1 flex-col">
      <div
        className={cn(
          CONTAINER.wide,
          "flex flex-1 flex-col lg:flex-row lg:gap-8 xl:mx-auto",
          tightGap ? "xl:gap-0" : isCollapsed ? "xl:gap-12" : "xl:gap-24",
        )}
      >
        <aside className="hidden w-full shrink-0 lg:block lg:w-auto">
          <div className="sticky top-16 mt-3 h-[calc(100vh-4rem)] overflow-x-hidden overflow-y-auto hide-scrollbar">
            <ComponentSidebar type={sidebarType} />
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full py-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
