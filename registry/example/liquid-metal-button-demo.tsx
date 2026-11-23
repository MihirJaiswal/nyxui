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
    description:
      "The stock settings: shallow arcs, crisp lines and a thin gold/blue fringe",
    component: <LiquidMetalButton>Steel</LiquidMetalButton>,
    code: `<LiquidMetalButton>Steel</LiquidMetalButton>`,
  },
  {
    name: "Chrome",
    description: "No fringe at all: plain polished steel",
    component: (
      <LiquidMetalButton shiftRed={0} shiftBlue={0}>
        Chrome
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton shiftRed={0} shiftBlue={0}>Chrome</LiquidMetalButton>`,
  },
  {
    name: "Prism",
    description: "Red and blue pulled well apart for a wide rainbow edge",
    component: (
      <LiquidMetalButton shiftRed={1} shiftBlue={1}>
        Prism
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton shiftRed={1} shiftBlue={1}>Prism</LiquidMetalButton>`,
  },
  {
    name: "Satin",
    description: "Soft edges between light and dark",
    component: <LiquidMetalButton softness={1}>Satin</LiquidMetalButton>,
    code: `<LiquidMetalButton softness={1}>Satin</LiquidMetalButton>`,
  },
  {
    name: "Razor",
    description: "Hard edges with no blur",
    component: <LiquidMetalButton softness={0}>Razor</LiquidMetalButton>,
    code: `<LiquidMetalButton softness={0}>Razor</LiquidMetalButton>`,
  },
  {
    name: "Busy",
    description: "More stripes of light across the rim",
    component: <LiquidMetalButton repetition={8}>Busy</LiquidMetalButton>,
    code: `<LiquidMetalButton repetition={8}>Busy</LiquidMetalButton>`,
  },
  {
    name: "Broad",
    description: "Fewer, wider bands",
    component: <LiquidMetalButton repetition={2}>Broad</LiquidMetalButton>,
    code: `<LiquidMetalButton repetition={2}>Broad</LiquidMetalButton>`,
  },
  {
    name: "Molten",
    description: "Noise bends the stripes into a liquid wobble",
    component: <LiquidMetalButton distortion={0.6}>Molten</LiquidMetalButton>,
    code: `<LiquidMetalButton distortion={0.6}>Molten</LiquidMetalButton>`,
  },
  {
    name: "Crosswind",
    description: "Stripes running the other diagonal",
    component: <LiquidMetalButton angle={135}>Crosswind</LiquidMetalButton>,
    code: `<LiquidMetalButton angle={135}>Crosswind</LiquidMetalButton>`,
  },
  {
    name: "Rush",
    description: "A faster flow",
    component: <LiquidMetalButton speed={1.8}>Rush</LiquidMetalButton>,
    code: `<LiquidMetalButton speed={1.8}>Rush</LiquidMetalButton>`,
  },
  {
    name: "Icon",
    description: "Square, icon-only, with a label for screen readers",
    component: (
      <LiquidMetalButton
        className="aspect-square w-12 px-0 py-0"
        aria-label="Sparkle"
      >
        <Sparkles className="size-4" aria-hidden />
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  className="aspect-square w-12 px-0 py-0"
  aria-label="Sparkle"
>
  <Sparkles className="size-4" aria-hidden />
</LiquidMetalButton>`,
  },
  {
    name: "Inverted",
    description: "Metal rim over a light surface",
    component: (
      <LiquidMetalButton
        surfaceClassName="bg-gradient-to-b from-white to-neutral-200 dark:from-neutral-100 dark:to-neutral-300"
        className="text-neutral-800 dark:text-neutral-900"
      >
        Inverted
      </LiquidMetalButton>
    ),
    code: `<LiquidMetalButton
  surfaceClassName="bg-gradient-to-b from-white to-neutral-200 dark:from-neutral-100 dark:to-neutral-300"
  className="text-neutral-800 dark:text-neutral-900"
>
  Inverted
</LiquidMetalButton>`,
  },
];
