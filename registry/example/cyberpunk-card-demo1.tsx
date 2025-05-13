import { Terminal } from "lucide-react";
import { CyberpunkCard } from "../ui/cyberpunk-card";
import Image from "next/image";

export default function CyberpunkCardDemo1() {
  return (
    <CyberpunkCard
      theme="neon-purple"
      borderStyle="dashed"
      glowIntensity={5}
      className="lg:scale-85"
    >
      <div className="space-y-2 sm:space-y-4">
        <div className="relative flex items-center justify-between bg-purple-900/70 px-2 sm:px-3 py-1 sm:py-2 rounded border-b border-purple-500/50">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Terminal className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-1 h-1 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-ping"></span>
            </div>
            <h3 className="text-sm sm:text-base md:text-xl font-bold tracking-wider text-white">
              HACKING SUITE
            </h3>
          </div>
          <div className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/40 rounded text-xs border border-purple-500/30 flex items-center gap-1 sm:gap-2">
            <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-green-400 rounded-full"></span>
            <span className="text-green-300 font-mono text-xs">ONLINE</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm opacity-90 border-l-2 border-purple-200 pl-2 sm:pl-3 py-1 italic text-purple-100">
          Advanced intrusion tools with ICE-breaking capabilities and
          self-modifying algorithms
        </p>

        <div className="w-full h-1.5 sm:h-2 bg-[#120917] rounded overflow-hidden">
          <div
            className="h-full bg-purple-100 w-3/4"
            style={{ boxShadow: "0 0 8px rgb(207, 156, 255)" }}
          ></div>
        </div>

        <div className="flex justify-between text-xs font-mono text-purple-100">
          <span className="text-[10px] sm:text-xs">SYSTEM INTEGRITY: 75%</span>
          <span className="text-[10px] sm:text-xs">UPTIME: 13:42:06</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-4">
          <div className="bg-[#0F090F] p-2 sm:p-3 rounded border border-purple-600/30 relative overflow-hidden">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/cyberpunk-card/img2.jpg"
                alt="logo1"
                width={200}
                height={200}
                className="w-full h-auto max-h-32 sm:max-h-full object-contain"
                quality={100}
                loading="lazy"
              />
            </div>
          </div>

          <div className="bg-purple-900/70 p-2 sm:p-3 rounded border border-purple-600/30 font-mono relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundSize: "20px 20px",
                backgroundImage:
                  "linear-gradient(to right,rgb(210, 163, 255) 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)",
              }}
            ></div>

            <div className="text-purple-100 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
              CONNECTION:
            </div>

            <div className="mt-1 flex items-center gap-1 sm:gap-2 bg-purple-800/30 px-1 sm:px-2 py-0.5 sm:py-1 rounded border-l border-r border-purple-500/30 text-xs">
              <span className="inline-block w-1.5 h-1.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-300">SECURED</span>
            </div>

            <div className="mt-2 sm:mt-3 text-purple-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
              TARGET:
            </div>

            <div className="mt-1 truncate bg-purple-800/30 px-1 sm:px-2 py-0.5 sm:py-1 rounded border-l border-r border-purple-500/30 animate-pulse text-xs">
              Arasaka Database
            </div>

            <div className="mt-2 sm:mt-3 text-purple-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
              PING:
            </div>

            <div className="mt-1 flex justify-between text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/30 rounded border-l border-r border-purple-500/30">
              <span>127ms</span>
              <span>|||||||||||||</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-purple-600/30">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/30 rounded-full border border-purple-500/30">
              ICE: 3/7
            </span>
            <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/30 rounded-full border border-purple-500/30">
              CPU: 42%
            </span>
          </div>
          <div className="animate-pulse text-green-300">SYSTEM READY</div>
        </div>
      </div>
    </CyberpunkCard>
  );
}
