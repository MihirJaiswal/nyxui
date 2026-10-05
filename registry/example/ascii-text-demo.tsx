"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
import { AsciiText } from "@/registry/ui/ascii-text";

type AsciiVariant = {
  name: string;
  description: string;
  component: React.ReactNode;
  code: string;
};

const VariantCard = ({
  name,
  description,
  children,
  onClick,
  isCopied,
}: {
  name: string;
  description: string;
  children: React.ReactNode;
  onClick: () => void;
  isCopied: boolean;
}) => (
  <div
    className="group relative cursor-pointer rounded-lg border border-gray-300 p-4 transition-shadow duration-200 hover:border-zinc-500 dark:border-zinc-800 hover:dark:border-zinc-500"
    onClick={onClick}
  >
    <div className="mb-3 flex items-baseline gap-2">
      <span className="font-mono text-xs font-medium text-neutral-700 dark:text-neutral-300">
        {name}
      </span>
      <span className="text-xs text-neutral-500">{description}</span>
    </div>
    <div className="flex items-center justify-center overflow-hidden">
      {children}
    </div>
    <div className="absolute top-3 right-3">
      {isCopied ? (
        <Check className="h-3 w-3 text-green-500 transition-all duration-200" />
      ) : (
        <Copy className="h-3 w-3 text-zinc-300 group-hover:text-zinc-500 dark:text-zinc-700 group-hover:dark:text-zinc-500" />
      )}
    </div>
  </div>
);

export const AsciiTextDemo = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = (variant: AsciiVariant, index: number) => {
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
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5">
        {asciiVariants.map((variant, idx) => (
          <VariantCard
            key={variant.name}
            name={variant.name}
            description={variant.description}
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

export const asciiVariants: AsciiVariant[] = [
  {
    name: "wave",
    description: "a sine travels across the glyphs",
    component: <AsciiText text="NYX UI" animation="wave" />,
    code: `<AsciiText text="NYX UI" animation="wave" />`,
  },
  {
    name: "scan",
    description: "a bright band sweeps down",
    component: <AsciiText text="SCANLINE" animation="scan" />,
    code: `<AsciiText text="SCANLINE" animation="scan" />`,
  },
  {
    name: "glitch",
    description: "stable noise punches holes in the fill",
    component: (
      <AsciiText text="GLITCH" animation="glitch" color="#4ade80" glow />
    ),
    code: `<AsciiText text="GLITCH" animation="glitch" color="#4ade80" glow />`,
  },
  {
    name: "typewriter",
    description: "reveals column by column, then loops",
    component: <AsciiText text="HELLO 2026" animation="typewriter" />,
    code: `<AsciiText text="HELLO 2026" animation="typewriter" />`,
  },
  {
    name: "pulse",
    description: "the whole word breathes through the ramp",
    component: (
      <AsciiText text="PULSE" animation="pulse" color="#f97316" glow />
    ),
    code: `<AsciiText text="PULSE" animation="pulse" color="#f97316" glow />`,
  },
  {
    name: "none",
    description: "static, and the fallback under reduced motion",
    component: <AsciiText text="STATIC" animation="none" />,
    code: `<AsciiText text="STATIC" animation="none" />`,
  },
  {
    name: "custom ramp",
    description: "swap the density characters",
    component: (
      <AsciiText
        text="RAMP"
        animation="wave"
        ramp=".:-=+*#%@"
        color="#60a5fa"
      />
    ),
    code: `<AsciiText text="RAMP" animation="wave" ramp=".:-=+*#%@" color="#60a5fa" />`,
  },
  {
    name: "fixed size",
    description: "autoFit off, with tighter letter spacing",
    component: (
      <AsciiText
        text="FIXED"
        animation="wave"
        autoFit={false}
        fontSize={10}
        letterSpacing={1}
      />
    ),
    code: `<AsciiText
  text="FIXED"
  animation="wave"
  autoFit={false}
  fontSize={10}
  letterSpacing={1}
/>`,
  },
  {
    name: "punctuation",
    description: "digits and symbols are in the font too",
    component: <AsciiText text="404 - NOT_FOUND!" animation="scan" />,
    code: `<AsciiText text="404 - NOT_FOUND!" animation="scan" />`,
  },
];
