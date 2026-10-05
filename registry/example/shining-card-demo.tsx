"use client";

import { ShiningCard } from "@/registry/ui/shining-card";

export const ShiningCardDemo = () => {
  return (
    <div
      className="
        flex h-[480px] w-full items-center justify-center rounded-xl

        bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)]
        bg-[size:24px_24px]

        dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]
      "
    >
      <ShiningCard
        imageUrl="/assets/images/shining-card/pokemon-card.avif"
        shineStrength={0.6}
        imageOverlayOpacity={0.2}
        cardClassName="rounded-2xl"
      />
    </div>
  );
};
