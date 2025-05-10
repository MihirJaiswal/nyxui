import React from "react";
import InteractiveTerminal from "../components/terminali";
import { Coffee } from "lucide-react";

export default function TerminalDemo2() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
      <div className="overflow-hidden shadow-lg transform transition-all hover:shadow-amber-500/50">
        <InteractiveTerminal
          command="brew --coffee latte"
          icon={<Coffee className="mr-2" />}
          variant="retro"
          steps={[
            "Taking your order...",
            "Grinding fresh beans...",
            "Heating water to 93°C...",
            "Extracting espresso shot...",
            "Steaming milk to perfection...",
            "Adding artistic foam design...",
          ]}
          finalMessage={`
  ☕ ORDER COMPLETE! ☕
  
  Your perfect latte is ready:
  - Double shot espresso (Ethiopian beans)
  - Silky steamed oat milk
  - Artisanal foam leaf pattern
  
  Enjoy your coffee and have a wonderful day!
              `}
          stepDelay={1200}
          promptSymbol="☕"
          className="rounded-md"
        />
      </div>
    </div>
  );
}
