'use client'
import React, { useState } from "react";
import { MajesticCard } from "@/nyxui/components/MajesticCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, Layers, Star, CloudLightning, 
  Zap, Shield, Globe, LineChart, 
  Moon, Smartphone, MessageCircle,
  Sun,
  Waves,
  HeartPulse,
  MoreVertical,
  Heart,
  Share2,
  MountainSnowIcon
} from "lucide-react";

// Define the types for theme and variant
type MajesticCardTheme = 'light' | 'dark' | 'glass' | 'gradient' | 'neon' | 'cosmic' | 'custom';
type MajesticCardVariant = 'tilt' | 'float' | 'magnetic' | 'layered' | 'morph' | 'breathe' | 'glow' | 'wave';

export function MajesticCardDemo() {
  const [activeTab, setActiveTab] = useState("showcase");

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl text-center font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Majestic Cards
        </h2>
        <p className="text-gray-600 text-center dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
          Explore the versatility and visual effects of our interactive cards
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 sm:mb-8">
          <TabsList className="flex flex-wrap justify-center gap-1 sm:gap-2 w-full mx-auto mb-6 sm:mb-8 bg-none dark:text-white text-black overflow-x-auto">
            <TabsTrigger value="showcase" className="text-xs sm:text-sm">Showcase</TabsTrigger>
            <TabsTrigger value="themes" className="text-xs sm:text-sm">Themes</TabsTrigger>
            <TabsTrigger value="variants" className="text-xs sm:text-sm">Variants</TabsTrigger>
            <TabsTrigger value="interactive" className="text-xs sm:text-sm">Interactive</TabsTrigger>
          </TabsList>

          <TabsContent value="showcase" className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <MajesticCard 
                variant="breathe" 
                theme="cosmic" 
                intensity={3} 
                shadow 
                shadowType="glow" 
                border 
                rounded="xl"
                hoverEffect
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <Badge className="bg-violet-800 text-violet-100 hover:bg-violet-700 text-xs">Premium</Badge>
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Pro Plan</h3>
                  <div className="flex items-end gap-1 mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-white">$49</span>
                    <span className="text-gray-300 mb-1 text-sm">/ month</span>
                  </div>
                  <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                    {["All components", "All templates", "Early access", "Requested component"].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-200">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-violet-400 mr-1 sm:mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-xs sm:text-sm">
                    Get Started
                  </Button>
                </div>
              </MajesticCard>

              <MajesticCard 
                variant="tilt" 
                theme="glass" 
                intensity={4} 
                shadow 
                shadowSize="lg" 
                rounded="lg"
                blurBackground
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                      <h3 className="font-semibold text-sm sm:text-base">Analytics Dashboard</h3>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Live</Badge>
                  </div>
                  <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Revenue</span>
                      <span className="text-xs sm:text-sm font-medium">$12,546</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                      <div className="bg-green-500 h-1.5 sm:h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Users</span>
                      <span className="text-xs sm:text-sm font-medium">2,845</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                      <div className="bg-blue-500 h-1.5 sm:h-2 rounded-full" style={{ width: "64%" }}></div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                    View Full Report
                  </Button>
                </div>
              </MajesticCard>

              <MajesticCard 
                variant="float" 
                floatPattern="complex" 
                theme="neon" 
                intensity={4} 
                shadow 
                shadowType="glow" 
                rounded="xl"
                className="sm:col-span-2 lg:col-span-1"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white">Weather</h3>
                    <Badge className="bg-indigo-900 text-indigo-100 text-xs">Now</Badge>
                  </div>
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <CloudLightning className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-300" />
                  </div>
                  <div className="text-center mb-3 sm:mb-4">
                    <div className="text-3xl sm:text-4xl font-bold text-white">23°</div>
                    <div className="text-indigo-300 text-xs sm:text-sm">Thunderstorm in Indore</div>
                  </div>
                  <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center text-xs text-indigo-200">
                    <div>
                      <div>Mon</div>
                      <div className="font-medium">21°</div>
                    </div>
                    <div>
                      <div>Tue</div>
                      <div className="font-medium">24°</div>
                    </div>
                    <div>
                      <div>Wed</div>
                      <div className="font-medium">22°</div>
                    </div>
                    <div>
                      <div>Thu</div>
                      <div className="font-medium">25°</div>
                    </div>
                  </div>
                </div>
              </MajesticCard>
            </div>
          </TabsContent>

          <TabsContent value="themes" className="mt-4 sm:mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {[
                { name: "Light", theme: "light", icon: <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" /> },
                { name: "Dark", theme: "dark", icon: <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" /> },
                { name: "Glass", theme: "glass", icon: <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" /> },
                { name: "Gradient", theme: "gradient", icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" /> },
                { name: "Neon", theme: "neon", icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-300" /> },
                { name: "Cosmic", theme: "cosmic", icon: <Star className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" /> }
              ].map((item, i) => (
                <MajesticCard 
                  key={i} 
                  variant="tilt" 
                  theme={item.theme as MajesticCardTheme} 
                  intensity={3} 
                  shadow 
                  rounded="lg"
                  className="aspect-square"
                >
                  <div className="p-3 sm:p-5 flex flex-col items-center justify-center h-full">
                    <div className="mb-2 sm:mb-4 p-2 sm:p-3 rounded-full bg-opacity-20 bg-white dark:bg-gray-800">
                      {item.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-medium">{item.name}</h3>
                    <p className="text-xs text-center mt-1 sm:mt-2 text-gray-500 dark:text-gray-400">
                      {item.theme} theme
                    </p>
                  </div>
                </MajesticCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="variants" className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[
                { name: "Tilt", variant: "tilt", desc: "3D tilt effect on hover" },
                { name: "Float", variant: "float", desc: "Constant floating animation" },
                { name: "Magnetic", variant: "magnetic", desc: "Follows cursor with pull effect" },
                { name: "Layered", variant: "layered", desc: "Multiple layers with parallax" },
                { name: "Morph", variant: "morph", desc: "Shape morphing on hover" },
                { name: "Breathe", variant: "breathe", desc: "Pulsating animation effect" },
                { name: "Glow", variant: "glow", desc: "Interactive glow follows cursor" },
                { name: "Wave", variant: "wave", desc: "Wave-like motion effects" }
              ].map((item, i) => (
                <MajesticCard 
                  key={i} 
                  variant={item.variant as MajesticCardVariant} 
                  theme={i % 2 === 0 ? "light" : "dark"} 
                  intensity={3} 
                  shadow 
                  rounded="lg"
                  layerCount={3}
                  layerSeparation={3}
                  className="h-32 sm:h-40"
                >
                  <div className="p-3 sm:p-5">
                    <h3 className="text-base sm:text-lg font-medium mb-1">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </MajesticCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interactive" className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 gap-6 sm:gap-10">
              <MajesticCard 
                variant="layered" 
                theme="dark" 
                intensity={5} 
                shadow 
                shadowType="glow" 
                rounded="xl" 
                layerCount={5}
                layerSeparation={5}
                className="w-full p-4 sm:p-6 md:p-8 min-h-64 sm:min-h-80"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                      3D Layered Effect
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Move your cursor to explore the depth
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      { icon: <MountainSnowIcon />, title: "Background", layer: "0.4", color: "bg-amber-100 text-amber-800" },
                      { icon: <Globe />, title: "Middle", layer: "0.7", color: "bg-blue-100 text-blue-800" },
                      { icon: <Star />, title: "Foreground", layer: "1", color: "bg-violet-100 text-violet-800" }
                    ].map((item, i) => (
                      <div key={i} data-layer={item.layer} className="flex flex-col items-center transition-transform duration-300 ease-out p-3 sm:p-4 rounded-lg shadow-md bg-white dark:bg-zinc-900 border">
                        <div className={`mb-2 sm:mb-3 p-2 sm:p-3 rounded-full ${item.color}`}>
                          {item.icon}
                        </div>
                        <h4 className="text-sm sm:text-base font-medium text-gray-800 dark:text-white">{item.title}</h4>
                        <p className="text-xs text-center mt-1 sm:mt-2 text-gray-500 dark:text-gray-100">
                          Layer {item.layer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </MajesticCard>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <MajesticCard 
                  variant="morph" 
                  theme="custom" 
                  intensity={2} 
                  shadow 
                  shadowSize="lg" 
                  rounded="lg"
                  hoverEffect
                  confettiEffect
                  className="bg-blue-100 dark:bg-zinc-900"
                >
                  <div className="p-4 sm:p-5 text-center">
                    <div className="mb-3 mx-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-indigo-100 rounded-full">
                      <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Morphing Shape</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                      Hover to see the shape transform with confetti
                    </p>
                    <Button size="sm" className="w-full text-xs sm:text-sm">Try Me!</Button>
                  </div>
                </MajesticCard>

                <MajesticCard 
                  variant="wave" 
                  theme="neon" 
                  intensity={4} 
                  shadow 
                  shadowType="glow" 
                  rounded="lg"
                  hoverEffect
                >
                  <div className="p-4 sm:p-5 text-center">
                    <div className="mb-3 mx-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-blue-900 rounded-full">
                      <Waves className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-white">Wave Motion</h3>
                    <p className="text-xs sm:text-sm text-blue-300 mb-3 sm:mb-4">
                      Experience fluid wave animations on hover
                    </p>
                    <Button size="sm" variant="outline" className="w-full border-blue-500 text-blue-300 hover:bg-blue-900 text-xs sm:text-sm">
                      Interact
                    </Button>
                  </div>
                </MajesticCard>

                <MajesticCard 
                  variant="breathe" 
                  theme="cosmic" 
                  intensity={3} 
                  shadow 
                  rounded="lg"
                  hoverEffect
                >
                  <div className="p-4 sm:p-5 text-center">
                    <div className="mb-3 mx-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-purple-900 rounded-full">
                      <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-white">Breathing Effect</h3>
                    <p className="text-xs sm:text-sm text-purple-300 mb-3 sm:mb-4">
                      Subtle pulsating animation like breathing
                    </p>
                    <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs sm:text-sm">
                      Experience
                    </Button>
                  </div>
                </MajesticCard>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 my-6 sm:my-8">Practical Applications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <MajesticCard 
            variant="float" 
            theme="glass" 
            intensity={3} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
            blurBackground
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">NyxUI Mobile</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">UI Component Library</p>
                </div>
              </div>
              <div className="relative h-32 sm:h-40 mb-3 sm:mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-16 h-28 sm:w-20 sm:h-36 bg-white dark:bg-zinc-700 rounded-xl shadow-lg relative overflow-hidden border-2 sm:border-4 border-gray-300 dark:border-gray-600">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-zinc-800"></div>
                    <div className="flex-grow p-1">
                      <div className="w-full h-1.5 sm:h-2 bg-blue-200 dark:bg-blue-900 rounded mb-0.5 sm:mb-1"></div>
                      <div className="w-3/4 h-1.5 sm:h-2 bg-blue-200 dark:bg-blue-900 rounded mb-0.5 sm:mb-1"></div>
                      <div className="w-1/2 h-1.5 sm:h-2 bg-blue-200 dark:bg-blue-900 rounded mb-1 sm:mb-2"></div>
                      <div className="w-full h-6 sm:h-8 bg-purple-200 dark:bg-purple-900 rounded mb-0.5 sm:mb-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xs sm:text-sm">
                Download App
              </Button>
            </div>
          </MajesticCard>

          <MajesticCard
            variant="tilt" 
            theme="light" 
            intensity={2} 
            shadow  
            rounded="lg"
            border
            borderStyle="solid"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-zinc-700 rounded-full mr-2 sm:mr-3">
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Sarah Johnson</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Product Designer</p>
                </div>
              </div>
              <div className="mb-3 sm:mb-4">
                <div className="flex mb-1 sm:mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" fill="#facc15" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  &quot;The Nyx UI is a great way to increase the UI of your website.&quot;
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                Verified Purchase - March 15, 2025
              </p>
            </div>
          </MajesticCard>

          <MajesticCard
            variant="breathe" 
            theme="dark" 
            intensity={2} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mr-2 sm:mr-3 flex items-center justify-center">
                    <HeartPulse className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-white">Social Connect</h3>
                    <p className="text-xs text-gray-400">5 minutes ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 hover:text-white hover:bg-gray-800">
                  <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
                Just launched our new design system with interactive cards! 🚀 Check out these amazing hover effects.
              </p>
              <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 hover:text-pink-500">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>72</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>14</span>
                  </button>
                </div>
                <button className="hover:text-green-500">
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </MajesticCard>
        </div>
      </div>
    </div>
  );
}