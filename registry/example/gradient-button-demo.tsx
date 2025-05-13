import React from "react";
import { GradientButton } from "../ui/gradient-button";

export const GradientButtonDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GradientButton variant="pulse" theme="sunset" className="rounded-lg">
          Pulse Effect
        </GradientButton>
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GradientButton variant="glow" theme="ocean" className="rounded-lg">
          Glow Effect
        </GradientButton>
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GradientButton variant="sweep" theme="neon" className="rounded-lg">
          Sweep Effect
        </GradientButton>
      </div>

      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GradientButton variant="shine" theme="forest" className="rounded-lg">
          Shine Effect
        </GradientButton>
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GradientButton variant="outline" theme="berry" className="rounded-lg">
          Outline Effect
        </GradientButton>
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GradientButton variant="pulse" theme="ocean" className="rounded-lg">
          Ocean Pulse
        </GradientButton>
      </div>
    </div>
  );
};
