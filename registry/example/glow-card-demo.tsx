import { Badge } from "@/components/ui/badge";
import { Cloud, Star, Target, Waves, Wifi } from "lucide-react";
import { GlowCard } from "../ui/glow-card";

export function GlowCardDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto">
      <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
            <GlowCard variant="cosmic" intensity={1.2} className="h-64 aspect-4/3 shadow-gray-500/30 shadow-md border">
              <div className="space-y-3">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Cloud className="w-3 h-3 mr-1" />
                  Cosmic
                </Badge>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Cosmic Effect</h3>
                  <p className="text-slate-300 text-xs">Stars, nebula gas, and cosmic dust particles.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard variant="glitch" intensity={1.3} className="h-64 aspect-4/3 shadow-gray-500/30 shadow-md">
              <div className="space-y-3">
                <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                  <Wifi className="w-3 h-3 mr-1" />
                  Glitch
                </Badge>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Glitch Effect</h3>
                  <p className="text-slate-300 text-xs">Corrupted digital effects with scan lines.</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard variant="liquid" liquidColor="#f59e0b" intensity={1.0} className="h-64 aspect-4/3 shadow-gray-500/30 shadow-md">
              <div className="space-y-3">
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  <Waves className="w-3 h-3 mr-1" />
                  Liquid
                </Badge>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Liquid Effect</h3>
                  <p className="text-slate-300 text-xs">Smooth liquid effects with click ripples.</p>
                </div>
              </div>
            </GlowCard>
            <GlowCard variant="laser" intensity={1.2} className="h-64 aspect-4/3 shadow-gray-500/30 shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                    <Target className="w-3 h-3 mr-1" />
                    Laser
                  </Badge>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Laser Effect</h3>
                  <p className="text-slate-300 text-sm">
                    High-precision crosshair laser.
                  </p>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
    </div>
  );
}
