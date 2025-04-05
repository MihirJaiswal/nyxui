import React from "react"
import { BentoGrid } from "@/nyxui/components/BentoGrid"
import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg"
import { AnimatedCodeBlock } from "@/nyxui/components/AnimatedCodeBlock"
import { ChevronRight, Sparkles, Zap } from "lucide-react"
import { MatrixCodeRain } from "../components/MatrixCodeRain"
import { DynamicRipple } from "../components/DynamicRipple"
import { MajesticCard } from "../components/MajesticCard"
import { MorphingBlob } from "@/nyxui/components/MorphingBlob"
import Image from "next/image"
import Link from "next/link"
import InteractiveTerminal from "../components/Terminal"

export const BentoDemo = () => {
  return (
    <div className="container max-w-7xl mx-auto px-6">
      <h2 className="mb-2 text-center text-3xl md:text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        Component Demos
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center md:text-lg tracking-tight text-gray-700 dark:text-gray-300 mb-12">
        Here are some of the components that you can use to build your landing pages.
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BentoGrid
          dark={true}
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-zinc-200/50 dark:border-zinc-800/50"
          title="Animated Gradient Background"
          description="Customizable gradient backgrounds with mesh pattern. Interactive and visually striking."
          component={
            <div className="relative w-full h-full overflow-hidden">
              <AnimatedGradientBg
                colors={["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"]}
                pattern="mesh"
                blur={25}
                speed={1.5}
                opacity={0.8}
                position="absolute"
                size="full"
                zIndex={0}
                animate={true}
                interactive={true}
                patternIntensity={1.8}
                className="bg-gradient-to-b from-white/10 to-50% dark:from-gray-950/20 dark:from-[-25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
                <Sparkles className="mb-4 h-16 w-16 drop-shadow-lg animate-pulse text-white/90" />
                <span className="text-lg md:text-2xl text-center font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                  ANIMATED GRADIENT
                </span>
                <p className="mt-2 text-sm text-white/80 text-center max-w-xs">
                  Interactive and visually striking animated gradient background
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-purple-500/20 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-blue-500/20 blur-xl"></div>
            </div>
          }
        />
        <BentoGrid
          title="Dynamic Ripple Effect"
          description="Circular color transitions with interactive hover effects and smooth animations."
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-zinc-200 dark:border-zinc-800"
          component={
            <DynamicRipple
              theme="purple"
              intensity={4}
              speed={3}
              reactToCursor={true}
              autoAnimate={true}
              rounded="xl"
              gradientOverlay={true}
              className="w-full h-full min-h-[300px] p-6 flex items-center justify-center"
            >
              <div className="text-center">
                <Zap className="h-10 w-10 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Ripple Effect</h3>
                <p className="text-sm opacity-70">Move your cursor to create dynamic ripples</p>
              </div>
            </DynamicRipple>
          }
        />
        <BentoGrid
          className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl border"
          title="Animated Code Typing"
          height="h-88"
          description="Auto code blocks with customizable themes."
          component={
            <div className="w-full h-full flex items-center justify-center px-4 py-6 overflow-hidden !important">
              <AnimatedCodeBlock
                code={`import { useState } from 'react';
      
const useToggle = (init = false) => {
  const [state, set] = useState(init);
  return [state, () => set(!state)];
};
`}
                language="jsx"
                theme="nyx"
                typingSpeed={25}
                autoPlay={true}
                title="React Component"
                showLineNumbers={true}
                highlightLines={[2, 4, 13]}
              />
            </div>
          }
        />
        <BentoGrid
          className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl border border-zinc-200 dark:border-zinc-800 h-[500px]"
          dark={true}
          height="h-96"
          enableDescription={true}
          description="Copy and paste commands to activate the terminal."
          component={
            <div className="p-4">
              <InteractiveTerminal
                bgColor="bg-zinc-900"
                textColor="text-purple-400"
                command="npm install"
                commandMessage="Try running:"
                processingSteps={[
                  "Initializing package manager...",
                  "Resolving dependencies...",
                  "Fetching packages...",
                  "Installing modules..."
                ]}
                finalMessage="✅ Packages installed successfully!"
                stepDelay={800}
                promptSymbol="$"
                inputPlaceholder="Type your command here..."
                outputHeight="h-64"
              />
            </div>
          }
        />
        <BentoGrid
          title="Matrix Code Rain"
          description="Digital rain effect inspired by The Matrix, creating a mesmerizing cyberpunk atmosphere."
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-zinc-200 dark:border-zinc-800"
          component={
            <div className="w-full h-full relative min-h-[300px]">
              <MatrixCodeRain
                color="#00ff00"
                charset="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%@!"
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
          className="rounded-2xl flex items-center justify-center overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border"
          component={
            <div>
              <MajesticCard
                variant="magnetic"
                intensity={4}
                rounded="xl"
                shadow={true}
                shadowSize="xl"
                shadowType="glow"
                border={true}
                borderStyle="glow"
                hoverEffect={true}
                speed="normal"
                className="w-full border border-purple-300 dark:border-zinc-300 h-full p-3 flex flex-col items-center justify-center bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 dark:bg-gray-950 dark:border-gray-950 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950"
              >
                <div className="flex flex-col items-center text-center space-y-4 w-full max-w-md mx-auto py-4">
                  <div className="relative my-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full blur-md opacity-70 scale-110 animate-pulse"></div>
                    <Image
                      src="https://raw.githubusercontent.com/MihirJaiswal/digibazaar-frontend/refs/heads/main/public/mihir.jpg"
                      width={400}
                      height={400}
                      alt="Profile"
                      loading="lazy"
                      quality={100}
                      className="relative w-24 h-24 rounded-full object-cover border-2 border-purple-400"
                    />
                    <div className="absolute bottom-0 right-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full p-2 transform translate-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-300 dark:to-pink-300 bg-clip-text text-transparent">
                      Mihir Jaiswal
                    </h3>
                    <p className="text-purple-500 dark:text-purple-300 font-medium">Software Engineer</p>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    <div className="bg-purple-400/50 hover:bg-purple-100 border border-purple-400 dark:bg-purple-800 dark:hover:bg-purple-700 transition-colors p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-700 dark:text-purple-300"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </div>
                    <div className="bg-purple-400/50 hover:bg-purple-100 border border-purple-400 dark:bg-purple-800 dark:hover:bg-purple-700 transition-colors p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-700 dark:text-purple-300"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </div>
                    <div className="bg-purple-400/50 hover:bg-purple-100 border border-purple-400 dark:bg-purple-800 dark:hover:bg-purple-700 transition-colors p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-700 dark:text-purple-300"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="dark:text-purple-100/80 text-purple-800 text-sm max-w-xs px-4">
                  Once you go Tailwind, there is no going back 😆
                  </p>
                  <Link href="https://www.linkedin.com/in/mihir-jaiswal-322898287/">
                    <button className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-300 hover:to-pink-300 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                      Connect
                    </button>
                  </Link>
                </div>
              </MajesticCard>
            </div>
          }
        />
        <BentoGrid
          dark={true}
          className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl border border-zinc-800"
          title="Morphing Blob"
          height="h-88"
          description="Modern morphing blob with animated effects."
          component={
            <div className="py-6 flex items-center justify-center relative">
              <MorphingBlob
                theme="secondary"
                size="lg"
                pulse
                glowIntensity={4}
                effect3D={true}
              >
                <div className="text-center flex flex-col items-center justify-center p-6">
                  <Image
                    src="/logo.png"
                    alt="Profile"
                    width={200}
                    height={200}
                    quality={100}
                    loading="lazy"
                    className="rounded-full w-12 h-12"
                  />
                  <h4 className="text-xl font-bold mb-2">NyXUI</h4>
                  <p className="text-sm opacity-90 max-w-[180px]">
                    Build awesome UI.
                  </p>
                </div>
              </MorphingBlob>
            </div>
          }
        />
      </div>
      <div className="flex items-center justify-center my-16">
        <button className="flex items-center gap-2 bg-white py-2.5 px-6 rounded-lg shadow-md text-gray-800 font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-lg hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
          All Components 
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}
