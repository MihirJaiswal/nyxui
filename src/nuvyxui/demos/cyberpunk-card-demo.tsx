import { CyberpunkCard } from "@/nuvyxui/components/cyberpunk-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Cpu, Zap, Shield } from "lucide-react";

export const CyberpunkCardDemo = () => {
  return (
    <div className="flex items-center justify-center rounded-xl scale-85 md:scale-100">
      <CyberpunkCard
        theme="neon-pink"
        borderStyle="glitch"
        className="h-full transition-transform duration-200"
      >
        <div className="flex flex-col gap-2 p-1 max-w-xs">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold tracking-tight text-pink-100">
              Lucy
            </h3>
            <Badge className="bg-pink-500/20 text-pink-200 hover:bg-pink-500/30 text-xs">
              Edgerunner
            </Badge>
          </div>

          <div className="relative w-80 h-40 mx-auto">
            <div className="w-full h-full bg-[url('/assets/images/cyberpunk-card/lucy.webp')] bg-cover bg-center rounded-lg" />
          </div>

          <p className="text-xs text-gray-100 my-3">
            Advanced cybernetic enhancement module for combat performance
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-pink-100" />
              <div className="h-1.5 bg-pink-900/50 rounded-full w-full">
                <div className="h-1.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full w-4/5"></div>
              </div>
              <span className="text-xs font-medium text-pink-200">80%</span>
            </div>

            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-pink-100" />
              <div className="h-1.5 bg-pink-900/50 rounded-full w-full">
                <div className="h-1.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full w-3/4"></div>
              </div>
              <span className="text-xs font-medium text-pink-200">75%</span>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-pink-100" />
              <div className="h-1.5 bg-pink-900/50 rounded-full w-full">
                <div className="h-1.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full w-3/5"></div>
              </div>
              <span className="text-xs font-medium text-pink-300">60%</span>
            </div>
          </div>

          <Button className="mt-1 bg-pink-500/20 text-pink-100 hover:bg-pink-500/40 w-full justify-between text-sm">
            ENGAGE <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CyberpunkCard>
    </div>
  );
};
