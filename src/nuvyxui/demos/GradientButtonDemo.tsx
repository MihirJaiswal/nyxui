import React from "react";
import { GradientButton } from "@/nuvyxui/components/GradientButton";

export const GradientButtonDemo = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4">
      <GradientButton variant="pulse" theme="sunset" className="rounded-lg">
        Pulse Effect
      </GradientButton>

      <GradientButton variant="glow" theme="ocean" className="rounded-lg">
        Glow Effect
      </GradientButton>

      <GradientButton variant="sweep" theme="neon" className="rounded-lg">
        Sweep Effect
      </GradientButton>

      <GradientButton variant="shine" theme="forest" className="rounded-lg">
        Shine Effect
      </GradientButton>

      <GradientButton variant="outline" theme="berry" className="rounded-lg">
        Outline Effect
      </GradientButton>
    </div>
  );
};
