"use client";

import { useEffect } from "react";
import { preloadTick, playHoverTick } from "../lib/hover-tick";

export function useHoverTick() {
  useEffect(() => {
    preloadTick();
  }, []);

  return playHoverTick;
}
