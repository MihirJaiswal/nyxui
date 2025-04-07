"use client"

import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Define pattern type to match the expected values in AnimatedGradientBg
type PatternType = "linear" | "radial" | "waves" | "noise" | "mesh" | "conic";

// Define theme configuration type
type ThemeConfig = {
  colors: string[];
  pattern: PatternType;
};

// Define preset themes with proper types
type PresetThemes = {
  [key: string]: ThemeConfig;
};

export function AnimatedGradientBgDemo() {
  const presetThemes: PresetThemes = {
    "Cosmic Twilight": {
      colors: ["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"],
      pattern: "radial"
    },
    "Sunset Horizon": {
      colors: ["#f97316", "#db2777", "#9a3412", "#fbbf24"],
      pattern: "linear"
    },
    "Deep Ocean": {
      colors: ["#0ea5e9", "#0284c7", "#0c4a6e", "#075985"],
      pattern: "waves"
    },
    "Forest Mist": {
      colors: ["#10b981", "#059669", "#047857", "#065f46"],
      pattern: "noise"
    },
    "Neon Glow": {
      colors: ["#f0abfc", "#c026d3", "#4f46e5", "#7c3aed"],
      pattern: "mesh"
    },
    "Northern Lights": {
      colors: ["#3b82f6", "#14b8a6", "#6366f1", "#0ea5e9"],
      pattern: "conic"
    }
  }

  const [activeTheme, setActiveTheme] = useState<string>("Cosmic Twilight");

  return (
    <div className="w-full min-h-screen text-white p-2">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 dark:from-blue-400 via-violet-600 dark:via-violet-400 to-pink-400">Animated Gradient Background</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">Create stunning, interactive gradient backgrounds for your UI with customizable colors, patterns, and effects.</p>
        </div>

        {/* Hero section */}
        <Card className="relative overflow-hidden border-0 shadow-2xl shadow-indigo-500/10 mb-16 bg-slate-950/50 backdrop-blur-sm">
          <div className="relative h-96 w-full">
            <div className="absolute inset-0">
              <AnimatedGradientBg
                colors={presetThemes[activeTheme].colors}
                speed={1}
                blur={60}
                pattern={presetThemes[activeTheme].pattern}
                patternIntensity={1}
                interactive={true}
                opacity={0.8}
                animate={true}
                position="absolute"
                size="full"
                zIndex={0}
              />
            </div>
            <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center">
              <h3 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">Beautiful Gradient Backgrounds</h3>
              <p className="text-lg text-white/90 text-center max-w-lg mb-6 drop-shadow">
                Enhance your UI with smooth, customizable animated gradients that respond to user interaction.
              </p>
            </div>
          </div>
        </Card>

        {/* Preset themes section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Preset Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(presetThemes).map(([name, config]) => (
              <Card 
                key={name}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeTheme === name ? "ring-2 ring-indigo-500 scale-105" : "hover:scale-[1.02]"
                } h-48 border-0`}
                onClick={() => setActiveTheme(name)}
              >
                <div className="absolute inset-0">
                  <AnimatedGradientBg
                    colors={config.colors}
                    blur={40}
                    pattern={config.pattern}
                    patternIntensity={1}
                    opacity={0.8}
                    position="absolute"
                    size="full"
                    zIndex={0}
                    animate={true}
                  />
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center p-4">
                  <h4 className="text-xl font-bold mb-2">{name}</h4>
                  <p className="text-sm opacity-80">{config.pattern.charAt(0).toUpperCase() + config.pattern.slice(1)} pattern</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pattern showcase */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Pattern Types</h2>
          <Tabs defaultValue="radial" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-6 bg-sl">
              <TabsTrigger value="radial">Radial</TabsTrigger>
              <TabsTrigger value="linear">Linear</TabsTrigger>
              <TabsTrigger value="conic">Conic</TabsTrigger>
              <TabsTrigger value="mesh">Mesh</TabsTrigger>
              <TabsTrigger value="noise">Noise</TabsTrigger>
              <TabsTrigger value="waves">Waves</TabsTrigger>
            </TabsList>
            
            {(["radial", "linear", "conic", "mesh", "noise", "waves"] as PatternType[]).map((patternType) => (
              <TabsContent key={patternType} value={patternType} className="mt-0">
                <Card className="relative overflow-hidden border-0 shadow-xl">
                  <div className="relative h-64 w-full">
                    <div className="absolute inset-0">
                      <AnimatedGradientBg
                        colors={presetThemes[activeTheme].colors}
                        blur={60}
                        pattern={patternType}
                        patternIntensity={1}
                        interactive={true}
                        opacity={0.8}
                        position="absolute"
                        size="full"
                        zIndex={0}
                        animate={true}
                      />
                    </div>
                    <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-center">
                      <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">
                        {patternType.charAt(0).toUpperCase() + patternType.slice(1)} Pattern
                      </h3>
                      <p className="text-white/90 max-w-md">
                        {patternType === "radial" && "Creates a smooth circular gradient that radiates from the center point outward."}
                        {patternType === "linear" && "Transitions colors along a straight line in a specified direction."}
                        {patternType === "conic" && "Sweeps colors around a center point like a color wheel."}
                        {patternType === "mesh" && "Creates multiple overlapping radial gradients for a complex, layered effect."}
                        {patternType === "noise" && "Applies a textured noise pattern over the gradient for added depth."}
                        {patternType === "waves" && "Creates flowing, wave-like patterns that add movement to the gradient."}
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}