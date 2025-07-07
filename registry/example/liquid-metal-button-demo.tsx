"use client";
import React, { useState } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { toast, Toaster } from "sonner";
import { LiquidMetalButton } from "@/registry/ui/liquid-metal-button";
import { Copy, Crown, Download, Shield, ShoppingCart, Trophy, Zap, Check } from "lucide-react";

interface ButtonsCard {
  children: React.ReactNode;
  onClick: () => void;
  isCopied: boolean;
}

type LiquidMetalButtonType = {
  name: string;
  description: string;
  component: React.ReactNode;
  code?: string;
};

const ButtonsCard = ({ children, onClick, isCopied }: ButtonsCard) => {
  return (
    <div
      className="border group relative border-gray-300 dark:border-zinc-800 hover:border-zinc-500 hover:dark:border-zinc-500 rounded-lg p-6 flex flex-col items-center justify-center h-52 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}    
    >
      <div className="mb-4">
        {children}
      </div>
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

export function LiquidMetalButtons() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = (button: LiquidMetalButtonType, index: number) => {
    if (button.code) {
      copyToClipboard(button.code, index);
      return;
    }
    let buttonString = reactElementToJSXString(button.component);

    if (buttonString) {
      const textToCopy = buttonString;
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
    <div className="pb-12 px-4 w-full">
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto gap-10">
        {liquidMetalButtons.map((button, idx) => (
          <ButtonsCard 
            key={idx} 
            onClick={() => copy(button, idx)}
            isCopied={copiedIndex === idx}
          >
            {button.component}
          </ButtonsCard>
        ))}
      </div>
    </div>
  );
}

export const liquidMetalButtons = [
  {
    name: "Gold Crown",
    description: "Gold liquid metal button with crown icon",
    component: (
      <LiquidMetalButton
        variant="default"
        theme="gold"
        className="rounded-lg"
        size="lg"
      >
        <div className="flex items-center">
          <Crown className="mr-2 h-4 w-4" />
          <span>Gold</span>
        </div>
      </LiquidMetalButton>
    ),
  },
  {
    name: "Silver Shield",
    description: "Silver liquid metal button with shield icon",
    component: (
      <LiquidMetalButton
        variant="default"
        theme="silver"
        className="rounded-lg"
      >
        <div className="flex items-center">
          <Shield className="mr-2 h-4 w-4" />
          <span>Silver</span>
        </div>
      </LiquidMetalButton>
    ),
  },
  {
    name: "Copper Trophy",
    description: "Copper liquid metal button with trophy icon",
    component: (
      <LiquidMetalButton
        variant="default"
        theme="copper"
        className="rounded-lg"
      >
        <div className="flex items-center">
          <Trophy className="mr-2 h-4 w-4" />
          <span>Copper</span>
        </div>
      </LiquidMetalButton>
    ),
  },
  {
    name: "Steel Zap",
    description: "Steel liquid metal button with zap icon",
    component: (
      <LiquidMetalButton
        variant="default"
        theme="steel"
        className="rounded-lg"
      >
        <div className="flex items-center">
          <Zap className="mr-2 h-4 w-4" />
          <span>Steel</span>
        </div>
      </LiquidMetalButton>
    ),
  },
  {
    name: "Gold Outline",
    description: "Gold outline liquid metal button",
    component: (
      <LiquidMetalButton
        variant="outline"
        theme="gold"
        className="rounded-lg"
      >
        <div className="flex items-center">
          <Crown className="mr-2 h-4 w-4" />
          <span>Outline</span>
        </div>
      </LiquidMetalButton>
    ),
  },
  {
    name: "Mercury Flow",
    description: "Mercury flow liquid metal button with animation",
    component: (
      <LiquidMetalButton
        variant="mercury"
        theme="mercury"
        intensity={5}
        className="rounded-lg"
      >
        <div className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          <span>Mercury Flow</span>
        </div>
      </LiquidMetalButton>
    ),
  },
  {
    name: "Ripple Wave",
    description: "Steel ripple wave liquid metal button",
    component: (
      <LiquidMetalButton
        variant="ripple"
        theme="steel"
        intensity={4}
        className="rounded-lg group"
      >
        <div className="flex items-center">
          <ShoppingCart className="mr-2 h-4 w-4" />
          <span>Ripple Wave</span>
        </div>
      </LiquidMetalButton>
    ),
  },
  {
    name: "Gold Premium",
    description: "Premium gold liquid metal button with texture",
    component: (
      <LiquidMetalButton
        variant="mercury"
        theme="gold"
        intensity={5}
        textured={true}
        className="rounded-lg relative bg-background"
      >
        <div className="flex items-center">
          <Crown className="mr-2 h-4 w-4" />
          <span>Gold Premium</span>
        </div>
      </LiquidMetalButton>
    ),
  },
  {
    name: "Steel Elite",
    description: "Elite steel liquid metal button with ripple effect",
    component: (
      <LiquidMetalButton
        variant="ripple"
        theme="steel"
        intensity={5}
        textured={true}
        className="rounded-lg relative group bg-background"
      >
        <div className="flex items-center">
          <Zap className="mr-2 h-4 w-4" />
          <span>Steel Elite</span>
        </div>
      </LiquidMetalButton>
    ),
  }
];