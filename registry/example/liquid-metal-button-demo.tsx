"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Sparkles } from "lucide-react";
import { LiquidMetalButton } from "@/registry/ui/liquid-metal-button";

interface VariantCardProps {
  children: React.ReactNode;
  onClick: () => void;
  isCopied: boolean;
}

type LiquidMetalVariant = {
  name: string;
  description: string;
  component: React.ReactNode;
  code: string;
};

const VariantCard = ({ children, onClick, isCopied }: VariantCardProps) => {
  return (
    <div
      className="group relative flex h-52 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 p-3 transition-shadow duration-200 hover:border-zinc-500 dark:border-zinc-800 hover:dark:border-zinc-500"
      onClick={onClick}
    >
      <div className="mb-4">{children}</div>
      <div className="absolute top-2 right-2">
        {isCopied ? (
          <Check className="h-3 w-3 text-green-500 transition-all duration-200" />
        ) : (
          <Copy className="h-3 w-3 text-zinc-300 group-hover:text-zinc-500 dark:text-zinc-700 group-hover:dark:text-zinc-500" />
        )}
      </div>
    </div>
  );
};

export const LiquidMetalButtonDemo = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = (variant: LiquidMetalVariant, index: number) => {
    navigator.clipboard
      .writeText(variant.code)
      .then(() => {
        toast.success("Copied to clipboard");
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch(() => toast.error("Error copying to clipboard"));
  };

  return (
    <div className="w-full px-4 pb-4">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {liquidMetalButtons.map((variant, idx) => (
          <VariantCard
            key={variant.name}
            onClick={() => copy(variant, idx)}
            isCopied={copiedIndex === idx}
          >
            {variant.component}
          </VariantCard>
        ))}
      </div>
    </div>
  );
};

export const liquidMetalButtons: LiquidMetalVariant[] = [
  {
    name: "Steel",
    description: "The stock palette — amber and blue over dark chrome",
    component: <LiquidMetalButton>Steel</LiquidMetalButton>,
    code: `<LiquidMetalButton>Steel</LiquidMetalButton>`,
  },
  {
    name: "Gold",
    description: "Warm gold through amber",
    component: (
      <LiquidMetalButton
        colors={{
          shadow: "#1a1206",
          highlight: "#fff2d6",
          warm: "#ffd27f",
          cool: "#ff9d2e",
        }}
      >
        Gold
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  colors={{
    shadow: "#1a1206",
    highlight: "#fff2d6",
    warm: "#ffd27f",
    cool: "#ff9d2e",
  }}
>
  Gold
</LiquidMetalButton>`,
  },
  {
    name: "Rose",
    description: "Hot pink into crimson",
    component: (
      <LiquidMetalButton
        colors={{
          shadow: "#1a0610",
          highlight: "#ffe6f2",
          warm: "#ff6ec7",
          cool: "#ff2d6f",
        }}
      >
        Rose
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  colors={{
    shadow: "#1a0610",
    highlight: "#ffe6f2",
    warm: "#ff6ec7",
    cool: "#ff2d6f",
  }}
>
  Rose
</LiquidMetalButton>`,
  },
  {
    name: "Emerald",
    description: "Mint through deep green",
    component: (
      <LiquidMetalButton
        colors={{
          shadow: "#04160e",
          highlight: "#e0fff0",
          warm: "#7cffb2",
          cool: "#00d98b",
        }}
      >
        Emerald
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  colors={{
    shadow: "#04160e",
    highlight: "#e0fff0",
    warm: "#7cffb2",
    cool: "#00d98b",
  }}
>
  Emerald
</LiquidMetalButton>`,
  },
  {
    name: "Violet",
    description: "Lilac into electric purple",
    component: (
      <LiquidMetalButton
        colors={{
          shadow: "#0f0618",
          highlight: "#f0e6ff",
          warm: "#c77dff",
          cool: "#7b2cff",
        }}
      >
        Violet
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  colors={{
    shadow: "#0f0618",
    highlight: "#f0e6ff",
    warm: "#c77dff",
    cool: "#7b2cff",
  }}
>
  Violet
</LiquidMetalButton>`,
  },
  {
    name: "Ice",
    description: "Pale sky through cobalt",
    component: (
      <LiquidMetalButton
        colors={{
          shadow: "#06101a",
          highlight: "#eaf6ff",
          warm: "#a8e6ff",
          cool: "#4d94ff",
        }}
      >
        Ice
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  colors={{
    shadow: "#06101a",
    highlight: "#eaf6ff",
    warm: "#a8e6ff",
    cool: "#4d94ff",
  }}
>
  Ice
</LiquidMetalButton>`,
  },
  {
    name: "Copper",
    description: "Warm metal with no cool band",
    component: (
      <LiquidMetalButton
        colors={{
          shadow: "#140b06",
          highlight: "#f0d2b8",
          warm: "#ffa060",
          cool: "#ff7a3d",
        }}
      >
        Copper
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  colors={{
    shadow: "#140b06",
    highlight: "#f0d2b8",
    warm: "#ffa060",
    cool: "#ff7a3d",
  }}
>
  Copper
</LiquidMetalButton>`,
  },
  {
    name: "Sunset",
    description: "Amber crossing into red",
    component: (
      <LiquidMetalButton
        colors={{
          shadow: "#1a0a06",
          highlight: "#fff0e6",
          warm: "#ffb347",
          cool: "#ff4d6d",
        }}
      >
        Sunset
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  colors={{
    shadow: "#1a0a06",
    highlight: "#fff0e6",
    warm: "#ffb347",
    cool: "#ff4d6d",
  }}
>
  Sunset
</LiquidMetalButton>`,
  },
  {
    name: "Toxic",
    description: "Acid lime into spring green",
    component: (
      <LiquidMetalButton
        colors={{
          shadow: "#0a1a04",
          highlight: "#f2ffe0",
          warm: "#d4ff4d",
          cool: "#00ff9d",
        }}
      >
        Toxic
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  colors={{
    shadow: "#0a1a04",
    highlight: "#f2ffe0",
    warm: "#d4ff4d",
    cool: "#00ff9d",
  }}
>
  Toxic
</LiquidMetalButton>`,
  },
  {
    name: "Oil Slick",
    description: "Every hue at once, with banding off",
    component: (
      <LiquidMetalButton
        banding={0}
        chromaticShift={1}
        colors={{
          shadow: "#05040a",
          highlight: "#ffffff",
          warm: "#ff3df0",
          cool: "#3dfff0",
        }}
      >
        <Sparkles className="size-4" aria-hidden />
        Oil Slick
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  banding={0}
  chromaticShift={1}
  colors={{
    shadow: "#05040a",
    highlight: "#ffffff",
    warm: "#ff3df0",
    cool: "#3dfff0",
  }}
>
  <Sparkles className="size-4" aria-hidden />
  Oil Slick
</LiquidMetalButton>`,
  },
  {
    name: "Chrome",
    description: "No dispersion at all — plain polished steel",
    component: <LiquidMetalButton chromaticShift={0}>Chrome</LiquidMetalButton>,
    code: `<LiquidMetalButton chromaticShift={0}>Chrome</LiquidMetalButton>`,
  },
  {
    name: "Inverted",
    description: "Pale rim over a light surface",
    component: (
      <LiquidMetalButton
        colors={{
          shadow: "#9aa0b0",
          highlight: "#ffffff",
          warm: "#ffd9a8",
          cool: "#a8c8ff",
        }}
        surfaceClassName="bg-gradient-to-b from-white to-neutral-200 dark:from-neutral-100 dark:to-neutral-300"
        className="text-neutral-800 dark:text-neutral-900"
      >
        Inverted
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  colors={{
    shadow: "#9aa0b0",
    highlight: "#ffffff",
    warm: "#ffd9a8",
    cool: "#a8c8ff",
  }}
  surfaceClassName="bg-gradient-to-b from-white to-neutral-200 dark:from-neutral-100 dark:to-neutral-300"
  className="text-neutral-800 dark:text-neutral-900"
>
  Inverted
</LiquidMetalButton>`,
  },
];
