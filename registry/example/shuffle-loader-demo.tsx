"use client";

import { ShuffleLoader } from "@/registry/ui/shuffle-loader";

export const ShuffleLoaderDemo = () => {
  return (
    <div className="grid h-72 w-full place-content-center rounded-xl bg-neutral-950 p-4">
      <ShuffleLoader />
    </div>
  );
};
