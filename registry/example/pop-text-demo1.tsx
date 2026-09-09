"use client";

import { PopText } from "@/registry/ui/pop-text";

export const PopTextCustomDemo = () => {
  return (
    <div className="grid w-full place-content-center px-4 py-24">
      <PopText
        text="Watchmechangecolor"
        color="#fda4af"
        hoverColor="#fff1f2"
        className="text-6xl font-extralight"
      />
    </div>
  );
};
