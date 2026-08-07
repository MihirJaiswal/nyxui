import React from "react";
import InteractiveTerminal from "@/registry/ui/terminal";
import { Zap } from "lucide-react";

export default function TerminalDemo3() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
      <InteractiveTerminal
        command="run --midnight-drive"
        autoExecute
        variant="synthwave"
        title="tty1 — neon"
        icon={<Zap className="size-4" />}
        promptSymbol=">"
        steps={[
          "Starting the engine...",
          "Charging neon grid...",
          "Syncing cassette deck...",
          "Calibrating laser highway...",
          "Cruising at 88 mph...",
        ]}
        finalMessage={`✔ GRID ENGAGED
  Palm trees:       synced
  Sunset gradient:  locked
  Chrome fenders:   polished
  Tape deck:        playing

  Ride the wave.
        `}
        stepDelay={850}
      />
    </div>
  );
}
