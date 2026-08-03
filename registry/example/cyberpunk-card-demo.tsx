import { CyberpunkCard } from "@/registry/ui/cyberpunk-card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Cpu, Zap, Shield } from "lucide-react";

export const CyberpunkCardDemo = () => {
  return (
    <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:gap-8 py-4">
      <CyberpunkCard
        theme="neon-pink"
        colorShift
        borderStyle="circuit"
        backgroundEffect="circuit"
        className="w-full max-w-sm"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-pink-100 sm:text-2xl">
              Lucy
            </h3>
            <Badge className="border-pink-400/20 bg-pink-500/50 text-xs text-pink-200 hover:bg-pink-500/25">
              Edgerunner
            </Badge>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-[url('/assets/images/cyberpunk-card/lucy.webp')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-950/70 via-transparent to-transparent" />
          </div>

          <p className="text-sm text-gray-50">
            Advanced cybernetic enhancement module for combat performance
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 shrink-0 text-pink-200" />
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-pink-950/60">
                <div className="h-1.5 w-4/5 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500" />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-medium text-pink-200">
                80%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 shrink-0 text-pink-200" />
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-pink-950/60">
                <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500" />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-medium text-pink-200">
                75%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 shrink-0 text-pink-200" />
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-pink-950/60">
                <div className="h-1.5 w-3/5 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500" />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-medium text-pink-200">
                60%
              </span>
            </div>
          </div>

          <button className="mt-1 flex w-full items-center justify-between rounded-lg border border-pink-400 bg-pink-500/50 px-3 py-2 text-sm text-pink-100 hover:bg-pink-500/30">
            ENGAGE <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </CyberpunkCard>

      <CyberpunkCard
        theme="neon-blue"
        colorShift
        borderStyle="circuit"
        backgroundEffect="scanlines"
        className="w-full max-w-sm"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-blue-100 sm:text-2xl">
              David
            </h3>
            <Badge className="border-blue-400/20 bg-blue-500/50 text-xs text-blue-200 hover:bg-blue-500/25">
              Edgerunner
            </Badge>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-[url('/assets/images/cyberpunk-card/david.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />
          </div>

          <p className="text-sm text-gray-50">
            Advanced cybernetic enhancement module for combat performance
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 shrink-0 text-blue-100" />
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-950/60">
                <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-600" />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-medium text-blue-200">
                75%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 shrink-0 text-blue-100" />
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-950/60">
                <div className="h-1.5 w-4/5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-600" />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-medium text-blue-200">
                80%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 shrink-0 text-blue-100" />
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-950/60">
                <div className="h-1.5 w-5/6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-600" />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-medium text-blue-300">
                85%
              </span>
            </div>
          </div>

          <button className="mt-1 flex w-full items-center justify-between rounded-lg border border-blue-200/40 bg-blue-500/40 !shadow-none px-3 py-2 text-sm text-blue-100 hover:bg-blue-500/30">
            ENGAGE <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </CyberpunkCard>
    </div>
  );
};
