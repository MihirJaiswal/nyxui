"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Coins, Play, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { CyberpunkCard } from "@/registry/ui/cyberpunk-card";
import { Button } from "@/components/ui/button";

const REELS = [
  { digits: ["3", "1", "2", "9", "7", "4"], spinDur: "0.4s", parkDur: "0.9s" },
  { digits: ["8", "1", "6", "2", "7", "5"], spinDur: "0.5s", parkDur: "1.4s" },
  { digits: ["2", "9", "4", "1", "7", "3"], spinDur: "0.6s", parkDur: "1.9s" },
];

const Reel = ({
  digits,
  spinDur,
  parkDur,
  rolling,
}: {
  digits: string[];
  spinDur: string;
  parkDur: string;
  rolling: boolean;
}) => (
  <div className="relative h-16 w-14 overflow-hidden rounded-md border border-amber-300/50 bg-black/70">
    <div
      className={cn("flex flex-col", rolling ? "slot-spin-fast" : "slot-park")}
      style={
        {
          "--slot-dur": spinDur,
          "--park-dur": parkDur,
          "--slot-stop": "-33.333%",
        } as CSSProperties
      }
    >
      {[...digits, ...digits].map((d, i) => (
        <div
          key={i}
          className={cn(
            "flex h-16 w-14 shrink-0 items-center justify-center text-4xl font-black",
            d === "7"
              ? "text-white [text-shadow:0_0_14px_#f59e0b]"
              : rolling
                ? "text-amber-300/40"
                : "text-amber-300/60",
          )}
        >
          {d}
        </div>
      ))}
    </div>
    <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/90 to-transparent" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/90 to-transparent" />
  </div>
);

export const CyberpunkCardDemo3 = () => {
  const [rolling, setRolling] = useState(true);
  const [parked, setParked] = useState(false);
  const parkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!rolling) {
      parkTimer.current = setTimeout(() => setParked(true), 2000);
    } else {
      setParked(false);
    }
    return () => {
      if (parkTimer.current) clearTimeout(parkTimer.current);
    };
  }, [rolling]);

  return (
    <div>
      {/* Pachinko slot machine */}
      <CyberpunkCard
        theme="neon-orange"
        borderStyle="animated"
        backgroundEffect="particles"
        rounded="lg"
        className="w-full max-w-xs font-mono"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-100">
              Kabuto 歌舞伎町
            </p>
          </div>
          <div className="relative">
            <div className="flex gap-2.5">
              {REELS.map((reel, i) => (
                <Reel
                  key={i}
                  digits={reel.digits}
                  spinDur={reel.spinDur}
                  parkDur={reel.parkDur}
                  rolling={rolling}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            {parked ? (
              <p className="bg-gradient-to-r from-amber-100 via-white to-amber-100 bg-clip-text text-3xl font-black uppercase italic tracking-tight text-transparent">
                Jackpot!
              </p>
            ) : (
              <p className="text-3xl font-black uppercase tracking-widest text-white">
                Spinning
              </p>
            )}
          </div>

          <div className="relative mt-1 flex h-14 w-14 items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              disabled={!rolling && !parked}
              onClick={(e) => {
                e.stopPropagation();
                setRolling((r) => !r);
              }}
              className={cn(
                "group relative z-10 flex items-center justify-center gap-2 overflow-hidden text-amber-950 transition-all duration-200 ease-out disabled:opacity-50",
                rolling
                  ? "bg-amber-400 border-orange-950 hover:bg-amber-600"
                  : "bg-amber-400 border-orange-950 hover:bg-amber-600",
              )}
            >
              {rolling ? (
                <Square className="h-3.5 w-3.5 fill-amber-950" />
              ) : (
                <Play className="h-3.5 w-3.5 translate-x-[1px] fill-amber-950" />
              )}
              <span className="font-bold uppercase">
                {rolling ? "Stop" : "Spin"}
              </span>
            </Button>
          </div>
        </div>
      </CyberpunkCard>
    </div>
  );
};
