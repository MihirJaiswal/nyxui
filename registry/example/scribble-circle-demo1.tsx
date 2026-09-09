"use client";

import { ScribbleCircle } from "@/registry/ui/scribble-circle";

export const ScribbleCircleDemo = () => {
  return (
    <div className="grid w-full place-content-center bg-emerald-950 px-4 py-24 text-yellow-50">
      <h1 className="max-w-2xl text-center text-4xl leading-snug md:text-5xl">
        Stream every <ScribbleCircle word="Episode" /> the same hour it airs
      </h1>
    </div>
  );
};
