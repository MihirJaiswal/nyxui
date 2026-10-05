"use client";

import { ScribbleCircle } from "@/registry/ui/scribble";

export const ScribbleCircleColorDemo = () => {
  return (
    <div className="grid w-full place-content-center bg-emerald-950 px-4 py-24 text-yellow-50">
      <h1 className="max-w-2xl text-center text-4xl leading-snug md:text-5xl">
        Never skip an{" "}
        <ScribbleCircle word="Episode" stroke="#FB7185" strokeWidth={4} />
      </h1>
    </div>
  );
};
