"use client"
import { Heart } from "lucide-react"
import { BentoGrid } from "@/nuvyxui/components/BentoGrid"
import InteractiveTerminal  from "@/nuvyxui/components/Terminal"
import BubbleBackground from "../components/BubbleBackground"
import { CyberpunkCard } from "../components/CyberpunkCard"
import { GlitchButton } from "../components/GlitchButton"
import { MoonIcon } from "@radix-ui/react-icons"

export const BentoGridDemo = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="">
        <header className="mb-20 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Versatile Layout Component</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-zinc-900 dark:text-white tracking-tight">
            BentoGrid <span className="text-purple-500">Showcase</span>
          </h1>
        </header>

        {/* Advanced Layouts Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BentoGrid
               height="h-96"
                component={
                  <div className="overflow-hidden shadow-2xl transform transition-all hover:shadow-pink-500/50">
            <InteractiveTerminal
              bgColor="bg-gray-900"
              textColor="text-pink-400"
              command="npm run deploy-love"
              commandMessage="Copy and paste this command:"
              icon={<Heart className="mr-2 text-pink-500" />}
              processingSteps={[
                "Initializing love.exe...",
                "Loading heart modules...",
                "Compiling affection data...",
                "Optimizing cuddle algorithms...",
                "Deploying hugs and kisses...",
              ]}
              finalMessage={`
  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
  ❤️                                                        ❤️
  ❤️   Love successfully deployed! You are amazing and      ❤️
  ❤️   deserve all the happiness in the world. Keep         ❤️
  ❤️   spreading love and kindness wherever you go! ❤️      ❤️
  ❤️                                                        ❤️
  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
              `}
              stepDelay={1000}
            />
            
          </div>
                }
                className="rounded-2xl shadow-xl shadow-sky-500/5 hover:shadow-sky-500/10 transition-all duration-300"
              />
            </div>

            <BentoGrid
              title="AI-Powered Tools"
              description="Leverage machine learning to enhance your workflow"
              component={
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-950 to-black rounded-lg">
                  <GlitchButton>
                    <span className="text-white">Get Started</span>
                  </GlitchButton>
                </div>
              }
              className="rounded-2xl shadow-xl shadow-amber-500/5 hover:shadow-amber-500/10 transition-all duration-300"
              height="h-80"
            />

            <BentoGrid
              enableDescription={false}
              enableTitle={false}
              component={
                <CyberpunkCard>
                  <div className="flex flex-col items-center justify-center p-8 rounded-xl max-w-md mx-auto text-center">
                    <div className="p-4 rounded-full mb-6">
                      <MoonIcon className="w-16 h-16 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Modern UI</h3>
                    <p className="text-gray-300 mb-6 max-w-xs text-white">Elevate your user experience with our cutting-edge design system</p>
                    <div className="border-t border-indigo-700 pt-4 w-full">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white font-medium">Lets make web development fun</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-white">Nuvyx UI</span>
                    </div>
                  </div>
                </CyberpunkCard>
              }
              className="rounded-2xl shadow-xl shadow-green-500/5 hover:shadow-green-500/10 transition-all duration-300"
              height="h-80"
            />

            <div className="lg:col-span-2">
              <BentoGrid
                title="Background Bubbles"
                description="Add a touch of whimsy with floating bubbles"
                component={
                  <BubbleBackground/>
                }
                className="rounded-2xl shadow-xl shadow-purple-500/5 hover:shadow-purple-500/10 transition-all duration-300"
                height="h-80"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
