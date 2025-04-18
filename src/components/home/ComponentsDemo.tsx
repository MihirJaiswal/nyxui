import React from "react";
import { BentoGrid } from "@/nuvyxui/components/BentoGrid";
import { AnimatedGradientBg } from "@/nuvyxui/components/AnimatedGradientBg";
import { ChevronRight, Code, Shield, Sparkles } from "lucide-react";
import { MatrixCodeRain } from "@/nuvyxui/components/MatrixCodeRain";
import { DynamicRipple } from "@/nuvyxui/components/DynamicRipple";
import Link from "next/link";
import InteractiveTerminal from "@/nuvyxui/components/Terminal";
import { Rbutton } from "../ui/Rbutton";
import InteractiveKeyboard from "@/nuvyxui/components/Keyboard";
import { ImageScanner } from "@/nuvyxui/components/ImageScanner";
import LampHeading from "@/nuvyxui/components/LampHeading";
import { Particles } from "../ui/particles";
import { CyberpunkCard } from "@/nuvyxui/components/CyberpunkCard";
import { TwitterCard } from "./TweetCard";

export const ComponentsDemo = () => {
  return (
    <div className="container max-w-7xl mx-auto px-6">
      <h2 className="text-3xl sm:text-5xl text-center lg:text-5xl font-extrabold tracking-tight leading-tight">
        Component Demos
      </h2>
      <h3 className="mx-auto mb-8 mt-2 text-balance text-center text-base md:text-lg font-medium tracking-tight text-foreground/80">
        These are a few components that you can easily plug into your next project.
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <BentoGrid
  className="lg:col-span-2 hover:scale-[1.01] overflow-hidden shadow-2xl transition-all duration-300 border border-zinc-800 h-[550px] rounded-xl"
  enableDescription={false}
  enableTitle={false}
  height="h-full"
  dark
  component={
    <div className="rounded-xl overflow-hidden relative w-full h-full bg-gradient-to-br from-zinc-900 to-black">
      <div className="w-full h-76 overflow-hidden overscroll-none bg-zinc-800 rounded-t-lg shadow-lg">
  <div className="bg-zinc-900 p-1 rounded-t-lg flex items-center justify-between border-b border-zinc-700">
    <div className="flex space-x-2 ml-2">
      <div className="w-2 h-2 rounded-full bg-red-500"></div>
      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
      <div className="w-2 h-2 rounded-full bg-green-500"></div>
    </div>
    <div className="text-xs text-zinc-400">Terminal</div>
    <div className="w-12"></div>
  </div>
  <div className="bg-black h-76 overflow-hidden overscroll-none">
    <InteractiveTerminal 
      bgColor="bg-black"
      textColor="text-green-400"
      autoMode={true}
      command="sudo hack -m"
      className="!overflow-hidden !overscroll-none !scrollbar-hide font-mono text-sm pb-2"
      commandMessage="Auto-executing:"
      outputHeight="h-72"
      icon={<Code className="mr-1 mt-1 text-green-500 w-4 h-4" />}
      processingSteps={[
        "Booting exploit frames...",
        "Scanning for Issues...",
        "Bypassing security...",
        "Unlocking files..."
      ]}
      finalMessage={`
⚠️  ACCESS GRANTED  ⚠️

[SYSTEM]: Mainframe compromised
[SYSTEM]: Security bypassed

Press ENTER to continue...
      `}
      promptSymbol="#"
      stepDelay={500}
    />
  </div>
</div>
      
          <div className="flex-grow bg-black relative w-full flex items-center justify-end lg:justify-start">
            <div className="transform scale-70 md:scale-80 origin-center lg:origin-top -mt-6 lg:mt-0">
              <InteractiveKeyboard
                layout="standard"
                showFunctionKeys={false}
                showNavigationCluster={false}
                activeKeys={["Enter"]}
                activeKeyGlowColor="#22c55e"
                activeKeyGlowIntensity={2}
                theme="cyberpunk"
                keyPressAnimationDuration={800}
                allowPhysicalKeyboard={true}
                perspective={800}
                rotateX={15}
              />
            </div>
              </div>
              <div className="absolute bottom-2 right-4">
                <div className="px-2 py-1 bg-zinc-800 rounded text-xs text-green-400 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  ONLINE
                </div>
              </div>
            </div>
          }
        />

<BentoGrid
          className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl border border-zinc-200 dark:border-zinc-800"
          height="h-full"
          enableDescription={false}
          enableTitle={false}
          component={
            <DynamicRipple
              theme="purple"
              intensity={5}
              speed={5}
              reactToCursor
              autoAnimate
              rounded="xl"
              className="w-full h-full min-h-[300px] p-6 flex items-center justify-center bg-white dark:bg-black"
            ><Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            color="#ffffff"
            refresh
          />
                <div className="relative flex flex-col items-center justify-center">
                             <ImageScanner 
                               image="/logo.png" 
                               scanType="line"
                               scanColor="purple"
                               repeating={true}
                               scanSpeed={3}
                               className="w-48 h-48 rounded-lg border-2 border-purple-200 dark:border-purple-900"
                             />
                             <div className="text-center mt-3 w-full flex flex-col items-center justify-center gap-3">
                              <LampHeading text="Nuvyx UI" gradientColors={{ from: "#6e15ad", to: "#d413ad"}} className="text-2xl font-bold" />
                              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                Collection of ready-to-use components.
                              </p>
                            <Link href="/components">
                            <Rbutton className="mt-2 bg-purple-500/20 flex items-center justify-center text-purple-100 dark:bg-purple-500/20 dark:text-purple-700 hover:bg-purple-500/40 w-full">
                              Check more<ChevronRight className="w-4 h-4 ml-2 " />
                            </Rbutton>
                            </Link>
                            </div>
                          </div>
            </DynamicRipple>
          }
        />

<BentoGrid
  className="rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border"
  height="h-full"
  enableDescription={false}
  enableTitle={false}
  component={
    <TwitterCard/>
  }
/>
        <BentoGrid
          dark
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-zinc-200/50 dark:border-zinc-800/50 tracking-wider"
          title="Animated Gradient Background"
          description="Customizable gradient backgrounds with mesh pattern. Interactive and visually striking."
          component={
            <div className="relative w-full h-full overflow-hidden">
              <AnimatedGradientBg
                colors={["#a806ba", "#ec4899", "#8b5cf6", "#06b6d4"]}
                pattern="mesh"
                blur={25}
                speed={2}
                opacity={0.9}
                position="absolute"
                size="full"
                zIndex={0}
                animate
                interactive
                patternIntensity={2}
                className="bg-gradient-to-b from-white/10 to-50% dark:from-gray-950/20 dark:from-[-25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
                <Sparkles className="mb-4 h-10 w-10 drop-shadow-lg animate-pulse text-white/90" />
                <span className="text-lg md:text-3xl text-center font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                  ANIMATED GRADIENT
                </span>
                <p className="mt-2 text-sm text-white/80 text-center max-w-xs">
                  Interactive and visually striking animated gradient background
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-purple-500/20 blur-xl" />
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-blue-500/20 blur-xl" />
            </div>
          }
        />

        <BentoGrid
          title="Matrix Code Rain"
          description="Digital rain effect inspired by The Matrix, creating a mesmerizing cyberpunk atmosphere."
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="rounded-2xl lg:col-span-2 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-zinc-200 dark:border-zinc-800"
          component={
            <div className="w-full h-full relative min-h-[300px]">
              <MatrixCodeRain
                color="#00ff00"
                charset="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%@!nuvyxui"
                fontSize={14}
                fps={30}
                opacity={0.05}
                fullScreen={false}
                height="100%"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-green-400 font-mono text-2xl font-bold tracking-wider z-10 drop-shadow-lg bg-black p-4 border-2 border-green-400">
                  MATRIX
                </span>
              </div>
            </div>
          }
        />



<BentoGrid
          enableDescription={false}
          enableTitle={false}
          height="h-72"
          className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-black transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-zinc-200 dark:border-zinc-800"
          component={
            <div className="p-6 h-76 dark:bg-black">
              <CyberpunkCard theme="neon-purple" borderStyle="glitch" glowIntensity={4} className="h-56 bg-gradient-to-br from-black to-purple-900 dark:from-black dark:to-purple-900">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <h3 className="text-xl font-bold tracking-wider">UI ENGINE</h3>
          </div>
          <p className="text-sm opacity-80 mb-1">A fast, flexible, and accessible component system built for modern web apps.</p>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center p-1 bg-pink-600/20 rounded text-xs flex flex-col gap-1">
              <div className="font-bold">Per</div>
              <div>96%</div>
            </div>
            <div className="text-center p-1 bg-pink-600/20 rounded text-xs flex flex-col gap-1">
              <div className="font-bold">Flex</div>
              <div>87%</div>
            </div>
            <div className="text-center p-1 bg-pink-600/20 rounded text-xs flex flex-col gap-1">
              <div className="font-bold">Custom</div>
              <div>92%</div>
            </div>
          </div>
          <div className="text-right text-xs font-mono mt-2">
          STABILITY: PRODUCTION-READY
          </div>
        </div>
      </CyberpunkCard>
            </div>
          }
        />

      
      </div>

      <div className="flex items-center justify-center my-16">
        <Link href="/components" rel="noopener noreferrer">
          <Rbutton className="flex items-center gap-2 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
            All Components
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Rbutton>
        </Link>
      </div>
    </div>
  );
};
