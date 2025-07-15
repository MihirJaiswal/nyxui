import { Badge } from "@/components/ui/badge";
import { Cloud, Star, Target, Waves, Wifi } from "lucide-react";
import { GlowCard } from "../ui/glow-card";
import { Button } from "@/components/ui/button";

export function GlowCardDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto">
      <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <GlowCard variant="cosmic" intensity={1.2} className="h-56 shadow-gray-500/30 shadow-lg border">
              <div className="space-y-3">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Cloud className="w-3 h-3 mr-1" />
                  Cosmic
                </Badge>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Cosmic Field</h3>
                  <p className="text-slate-300 text-xs">Stars, nebula gas, and cosmic dust particles.</p>
                </div>
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Explore
                </Button>
              </div>
            </GlowCard>

            <GlowCard variant="glitch" intensity={1.3} className="h-56 shadow-gray-500/30 shadow-lg">
              <div className="space-y-3">
                <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                  <Wifi className="w-3 h-3 mr-1" />
                  Glitch
                </Badge>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Digital Glitch</h3>
                  <p className="text-slate-300 text-xs">Corrupted digital effects with scan lines.</p>
                </div>
                <Button size="sm" className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                  Corrupt
                </Button>
              </div>
            </GlowCard>

            <GlowCard variant="liquid" liquidColor="#f59e0b" intensity={1.0} className="h-56 shadow-gray-500/30 shadow-lg">
              <div className="space-y-3">
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  <Waves className="w-3 h-3 mr-1" />
                  Liquid
                </Badge>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Liquid Gold</h3>
                  <p className="text-slate-300 text-xs">Smooth liquid effects with click ripples.</p>
                </div>
                <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Flow
                </Button>
              </div>
            </GlowCard>
            <GlowCard variant="laser" intensity={1.2} className="h-56 shadow-gray-500/30 shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                    <Target className="w-3 h-3 mr-1" />
                    Precision
                  </Badge>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Laser Targeting</h3>
                  <p className="text-slate-300 text-sm">
                    High-precision crosshair laser.
                  </p>
                </div>
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Corrupt
                </Button>
              </div>
            </GlowCard>
          </div>
        </div>
    </div>
  );
}
