"use client"
import { Copy, Palette, Code } from "lucide-react"
import { CyberpunkCard } from "@/registry/ui/cyberpunk-card"

export default function Cyber() {
  return (
    <div className="flex items-end justify-end h-full w-full relative">
      <div className="w-72 flex items-end justify-end z-10">
        <CyberpunkCard
          theme="custom"
          customColors={{
            primary: "#2D1B69",
            secondary: "#1A0B3D",
            accent: "#8B5CF6",
          }}
          glowIntensity={4}
          backgroundEffect="circuit"
          dataStream={true}
          className="w-full transition-all duration-500"
        >
          <div className="flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold tracking-tight text-white">Cyberpunk Card</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-purple-300">COMPONENT</span>
                </div>
              </div>
            </div>

            {/* Copy • Paste • Customize Flow */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-transparent rounded-lg border-l-2 border-purple-400">
                <Copy className="w-5 h-5 text-purple-300" />
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">COPY</span>
                  <div className="text-xs text-purple-200">Instant duplication</div>
                </div>
                <span className="text-xs font-bold text-purple-300">01</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-900/40 to-transparent rounded-lg border-l-2 border-blue-400">
                <Code className="w-5 h-5 text-blue-300" />
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">PASTE</span>
                  <div className="text-xs text-blue-200">Deploy anywhere</div>
                </div>
                <span className="text-xs font-bold text-blue-300">02</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-transparent rounded-lg border-l-2 border-purple-400">
                <Palette className="w-5 h-5 text-purple-300" />
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">CUSTOMIZE</span>
                  <div className="text-xs text-purple-200">Adapt & style</div>
                </div>
                <span className="text-xs font-bold text-purple-300">03</span>
              </div>
            </div>

            {/* Action Button */}
           {/*  <Button className="mt-auto bg-purple-600/20 text-purple-100 hover:bg-purple-500/40 border border-purple-400/30 w-full justify-between text-sm py-3 font-bold">
              <span></span>
              <ChevronRight className="w-5 h-5" />
            </Button> */}
          </div>
        </CyberpunkCard>
      </div>
      <div className="absolute inset-0 h-full w-72 top-8 left-16 z-9">
        <CyberpunkCard
          theme="neon-blue"
          customColors={{
            primary: "#2D1B69",
            secondary: "#1A0B3D",
            accent: "#8B5CF6",
          }}
          glowIntensity={4}
          backgroundEffect="circuit"
          dataStream={true}
          className="w-full transition-all duration-500"
        >
          <div className="flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold tracking-tight text-white">Cyberpunk Card</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-purple-300">COMPONENT</span>
                </div>
              </div>
            </div>

            {/* Copy • Paste • Customize Flow */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-transparent rounded-lg border-l-2 border-purple-400">
                <Copy className="w-5 h-5 text-purple-300" />
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">COPY</span>
                  <div className="text-xs text-purple-200">Instant duplication</div>
                </div>
                <span className="text-xs font-bold text-purple-300">01</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-900/40 to-transparent rounded-lg border-l-2 border-blue-400">
                <Code className="w-5 h-5 text-blue-300" />
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">PASTE</span>
                  <div className="text-xs text-blue-200">Deploy anywhere</div>
                </div>
                <span className="text-xs font-bold text-blue-300">02</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-transparent rounded-lg border-l-2 border-purple-400">
                <Palette className="w-5 h-5 text-purple-300" />
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">CUSTOMIZE</span>
                  <div className="text-xs text-purple-200">Adapt & style</div>
                </div>
                <span className="text-xs font-bold text-purple-300">03</span>
              </div>
            </div>

            {/* Action Button */}
           {/*  <Button className="mt-auto bg-purple-600/20 text-purple-100 hover:bg-purple-500/40 border border-purple-400/30 w-full justify-between text-sm py-3 font-bold">
              <span></span>
              <ChevronRight className="w-5 h-5" />
            </Button> */}
          </div>
        </CyberpunkCard>
      </div>
      <div className="absolute inset-0 h-full w-72 -top-2 left-32 z-8">
        <CyberpunkCard
          theme="neon-pink"
          customColors={{
            primary: "#2D1B69",
            secondary: "#1A0B3D",
            accent: "#8B5CF6",
          }}
          glowIntensity={4}
          backgroundEffect="circuit"
          dataStream={true}
          className="w-full transition-all duration-500"
        >
          <div className="flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold tracking-tight text-white">Cyberpunk Card</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-purple-300">COMPONENT</span>
                </div>
              </div>
            </div>

            {/* Copy • Paste • Customize Flow */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-transparent rounded-lg border-l-2 border-purple-400">
                <Copy className="w-5 h-5 text-purple-300" />
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">COPY</span>
                  <div className="text-xs text-purple-200">Instant duplication</div>
                </div>
                <span className="text-xs font-bold text-purple-300">01</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-900/40 to-transparent rounded-lg border-l-2 border-blue-400">
                <Code className="w-5 h-5 text-blue-300" />
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">PASTE</span>
                  <div className="text-xs text-blue-200">Deploy anywhere</div>
                </div>
                <span className="text-xs font-bold text-blue-300">02</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-transparent rounded-lg border-l-2 border-purple-400">
                <Palette className="w-5 h-5 text-purple-300" />
                <div className="flex-1">
                  <span className="text-white font-bold text-sm">CUSTOMIZE</span>
                  <div className="text-xs text-purple-200">Adapt & style</div>
                </div>
                <span className="text-xs font-bold text-purple-300">03</span>
              </div>
            </div>

            {/* Action Button */}
           {/*  <Button className="mt-auto bg-purple-600/20 text-purple-100 hover:bg-purple-500/40 border border-purple-400/30 w-full justify-between text-sm py-3 font-bold">
              <span></span>
              <ChevronRight className="w-5 h-5" />
            </Button> */}
          </div>
        </CyberpunkCard>
      </div>
    </div>
  )
}