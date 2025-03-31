"use client"

import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg"
import { Card } from "@/components/ui/card"

export function AnimatedGradientBgDemo() {
  return (
    <div className="w-full flex flex-col gap-8 p-6">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Animated Gradient Background</h2>
        <Card className="relative overflow-hidden">
          <div className="relative h-64 w-full">
            <div className="absolute inset-0">
              <AnimatedGradientBg
                colors={["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"]}
                speed={1}
                blur={60}
                pattern="radial"
                patternIntensity={1}
                interactive={false}
                opacity={0.8}
                animate={true}
                position="absolute"
                size="full"
                zIndex={0}
              />
            </div>
            <div className="relative z-10 p-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Gradient Background</h3>
              <p>This is an animated gradient background inside a container.</p>
            </div>
          </div>
        </Card>
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden">
              <div className="relative h-[200px] w-full">
                <div className="absolute inset-0">
                  <AnimatedGradientBg
                    colors={["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"]}
                    blur={40}
                    pattern="radial"
                    opacity={0.8}
                    position="absolute"
                    size="full"
                    zIndex={0}
                  />
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center">
                  <h4 className="text-xl font-bold">Radial Gradient</h4>
                  <p>Smooth blue tones</p>
                </div>
              </div>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="relative h-[200px] w-full">
                <div className="absolute inset-0">
                  <AnimatedGradientBg
                    colors={["#f97316", "#ea580c", "#c2410c", "#9a3412"]}
                    blur={30}
                    pattern="mesh"
                    patternIntensity={1.5}
                    opacity={0.7}
                    position="absolute"
                    size="full"
                    zIndex={0}
                  />
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center">
                  <h4 className="text-xl font-bold">Mesh Pattern</h4>
                  <p>Warm orange tones</p>
                </div>
              </div>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="relative h-[200px] w-full">
                <div className="absolute inset-0">
                  <AnimatedGradientBg
                    colors={["#10b981", "#059669", "#047857", "#065f46"]}
                    blur={50}
                    pattern="noise"
                    patternIntensity={1.2}
                    opacity={0.6}
                    position="absolute"
                    size="full"
                    zIndex={0}
                  />
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center">
                  <h4 className="text-xl font-bold">Noise Pattern</h4>
                  <p>Textured green tones</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
