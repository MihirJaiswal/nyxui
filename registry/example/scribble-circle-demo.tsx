"use client";

import { ScribbleCircle } from "@/registry/ui/scribble-circle";

export const ScribbleCircleVariantsDemo = () => {
  return (
    <div className="grid w-full place-content-center bg-emerald-950 px-4 py-24 text-yellow-50">
      <h1 className="max-w-3xl text-center text-3xl leading-loose md:text-4xl md:leading-loose">
        Mark a <ScribbleCircle word="circle" variant="circle" /> around the
        must-watch titles, run an{" "}
        <ScribbleCircle word="underline" variant="underline" stroke="#FB7185" />{" "}
        under the newest season, drop a{" "}
        <ScribbleCircle word="box" variant="box" stroke="#38BDF8" /> around
        tonight's finale, and{" "}
        <ScribbleCircle word="highlight" variant="highlight" stroke="#A3E635" />{" "}
        your entire watchlist.
      </h1>
    </div>
  );
};
