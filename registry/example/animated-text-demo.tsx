"use client";
import React, { useState } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { toast, Toaster } from "sonner";
import { AnimateText } from "../ui/animated-text";
import { Copy, Check } from "lucide-react";

interface AnimationCard {
  children: React.ReactNode;
  onClick: () => void;
  isCopied: boolean;
  title: string;
}

type AnimatedTextType = {
  name: string;
  description: string;
  component: React.ReactNode;
  code?: string;
};

const AnimationCard = ({ children, onClick, isCopied, title }: AnimationCard) => {
  return (
    <div
      className="border group relative rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <p className="text-xs sm:text-sm font-semibold mb-2">{title}</p>
      <div className="overflow-hidden">{children}</div>
      <div className="absolute top-2 right-2">
        {isCopied ? (
          <Check className="h-3 w-3 text-green-500 transition-all duration-200" />
        ) : (
          <Copy className="h-3 w-3 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 group-hover:dark:text-zinc-500" />
        )}
      </div>
    </div>
  );
};

export const AnimationTextDemo = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = (animation: AnimatedTextType, index: number) => {
    if (animation.code) {
      copyToClipboard(animation.code, index);
      return;
    }
    let animationString = reactElementToJSXString(animation.component, {
      displayName: (element) => {
        if (
          typeof element === "object" &&
          element !== null &&
          "type" in element &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element as any).type?.name === "AnimateText"
        ) {
          return "AnimateText";
        }
        if (
          typeof element === "object" &&
          element !== null &&
          "type" in element &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element as any).type?.name
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (element as any).type.name;
        }
        return "UnknownComponent";
      },
      functionValue: (fn) => fn.name || 'function',
    });

    if (animationString) {
      const textToCopy = animationString;
      copyToClipboard(textToCopy, index);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
        toast.success("Copied to clipboard");
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error copying text to clipboard:", err);
        toast.error("Error copying to clipboard");
      });
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto pb-12">
      <Toaster position="top-center" />
      <div className="flex flex-col">
        <div className="flex flex-col py-2 sm:py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {animatedTextComponents.map((animation, idx) => (
              <AnimationCard
                key={idx}
                onClick={() => copy(animation, idx)}
                isCopied={copiedIndex === idx}
                title={animation.name}
              >
                {animation.component}
              </AnimationCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const animatedTextComponents = [
  {
    name: "Cascade",
    description: "Text animation with cascade effect",
    component: <AnimateText text="Cascade" type="cascade" />,
    code: `<AnimateText text="Cascade" type="cascade" />`
  },
  {
    name: "Flicker",
    description: "Text animation with flicker effect",
    component: <AnimateText text="Flicker" type="flicker" />,
    code: `<AnimateText text="Flicker" type="flicker" />`
  },
  {
    name: "Blink",
    description: "Text animation with blink effect",
    component: <AnimateText text="Blink" type="blink" custom={1} />,
    code: `<AnimateText text="Blink" type="blink" custom={1} />`
  },
  {
    name: "Expand",
    description: "Text animation with expand effect",
    component: <AnimateText text="Expand" type="expand" />,
    code: `<AnimateText text="Expand" type="expand" />`
  },
  {
    name: "Rise",
    description: "Text animation with rise effect",
    component: <AnimateText text="Rise" type="rise" />,
    code: `<AnimateText text="Rise" type="rise" />`
  },
  {
    name: "Glide",
    description: "Text animation with glide effect",
    component: <AnimateText text="Glide" type="glide" custom={1} />,
    code: `<AnimateText text="Glide" type="glide" custom={1} />`
  },
  {
    name: "Elastic",
    description: "Text animation with elastic effect",
    component: <AnimateText text="Elastic" type="elastic" custom={1} />,
    code: `<AnimateText text="Elastic" type="elastic" custom={1} />`
  },
  {
    name: "Float",
    description: "Text animation with float effect",
    component: <AnimateText text="Float" type="float" custom={1} />,
    code: `<AnimateText text="Float" type="float" custom={1} />`
  },
];