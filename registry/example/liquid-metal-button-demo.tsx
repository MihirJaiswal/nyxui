import React from "react";
import { LiquidMetalButton } from "../ui/liquid-metal-button";
import {
  Crown,
  Download,
  Shield,
  ShoppingCart,
  Trophy,
  Zap,
} from "lucide-react";

export const LiquidMetalButtonDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full relative">
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
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
      </div>

      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
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
      </div>

      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
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
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
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
      </div>

      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
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
      </div>

      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
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
      </div>

      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <LiquidMetalButton
          variant="ripple"
          theme="steel"
          intensity={4}
          className="rounded-lg"
        >
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Ripple Wave</span>
          </div>
        </LiquidMetalButton>
      </div>

      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <LiquidMetalButton
          variant="mercury"
          theme="gold"
          intensity={5}
          textured={true}
          className="rounded-lg relative"
        >
          <div className="flex items-center">
            <Crown className="mr-2 h-4 w-4" />
            <span>Gold Premium</span>
          </div>
        </LiquidMetalButton>
      </div>

      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <LiquidMetalButton
          variant="ripple"
          theme="steel"
          intensity={5}
          textured={true}
          className="rounded-lg relative"
        >
          <div className="flex items-center">
            <Zap className="mr-2 h-4 w-4" />
            <span>Steel Elite</span>
          </div>
        </LiquidMetalButton>
      </div>
    </div>
  );
};
