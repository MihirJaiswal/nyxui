"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const sidebarCollapsedAtom = atomWithStorage<boolean>(
  "nyxui:sidebar-collapsed",
  false,
);

export function useSidebarCollapse() {
  return useAtom(sidebarCollapsedAtom);
}
