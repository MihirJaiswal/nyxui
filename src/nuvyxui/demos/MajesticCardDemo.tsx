"use client";
import React, { useState } from "react";
import { MajesticCard } from "@/nuvyxui/components/MajesticCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Layers,
  Star,
  CloudLightning,
  Zap,
  Globe,
  LineChart,
  Smartphone,
  Waves,
  HeartPulse,
  MountainSnow,
  Cpu,
  ArrowRight,
  Check,
} from "lucide-react";

type MajesticCardVariant =
  | "tilt"
  | "float"
  | "magnetic"
  | "layered"
  | "morph"
  | "breathe"
  | "glow"
  | "wave";

export function MajesticCardDemo() {
  const [activeTab, setActiveTab] = useState("showcase");

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Majestic Cards
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Elevate your UI with stunning interactive cards that captivate users
            and enhance engagement
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8 sm:mb-10"
        >
          <TabsList className="flex justify-center w-full mx-auto mb-8 bg-gray-100/80 dark:bg-gray-800/50 p-1 rounded-full max-w-2xl">
            <TabsTrigger
              value="showcase"
              className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
            >
              Showcase
            </TabsTrigger>
            <TabsTrigger
              value="variants"
              className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
            >
              Variants
            </TabsTrigger>
            <TabsTrigger
              value="interactive"
              className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
            >
              Interactive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="showcase" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
              <MajesticCard
                variant="breathe"
                theme="cosmic"
                intensity={3}
                shadow
                shadowType="glow"
                border
                rounded="xl"
                hoverEffect
                className="w-full h-full"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <Badge className="bg-violet-800/90 text-violet-100 hover:bg-violet-700 text-sm px-3 py-1 rounded-full">
                      Premium
                    </Badge>
                    <Star className="h-6 w-6 text-amber-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Enterprise Plan
                  </h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold text-white">$99</span>
                    <span className="text-gray-300 mb-1 text-base">
                      / month
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {[
                      "All premium components",
                      "Priority support",
                      "Advanced analytics",
                      "Custom branding",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-200">
                        <Check className="h-5 w-5 text-violet-400 mr-3 flex-shrink-0" />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-base py-6 rounded-xl font-medium">
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
                rounded="xl"
                blurBackground
                className="border border-gray-200 dark:border-gray-800 backdrop-blur-xl w-full h-full"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <LineChart className="h-6 w-6 text-purple-500" />
                      <h3 className="font-semibold text-lg">Dashboard</h3>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 text-sm px-3 py-1 rounded-full">
                      Live
                    </Badge>
                  </div>
                  <div className="space-y-5 mb-6 flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-base text-gray-600 dark:text-gray-300">
                        Revenue
                      </span>
                      <span className="text-base font-medium">$24,892</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base text-gray-600 dark:text-gray-300">
                        Active Users
                      </span>
                      <span className="text-base font-medium">8,245</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-indigo-500 h-2.5 rounded-full"
                        style={{ width: "64%" }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base text-gray-600 dark:text-gray-300">
                        Conversion Rate
                      </span>
                      <span className="text-base font-medium">5.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-pink-500 h-2.5 rounded-full"
                        style={{ width: "52%" }}
                      ></div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-base py-6 rounded-xl border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2"
                  >
                    View Full Report
                    <ArrowRight className="h-4 w-4" />
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
                className="w-full h-full"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">
                      Weather Forecast
                    </h3>
                    <Badge className="bg-indigo-900/80 text-indigo-100 text-sm px-3 py-1 rounded-full">
                      Live
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center mb-6 flex-grow">
                    <CloudLightning className="w-24 h-24 text-indigo-300" />
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-white mb-2">
                      23°
                    </div>
                    <div className="text-indigo-300 text-base">
                      Thunderstorm in Indore
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 text-center text-sm text-indigo-200 bg-indigo-950/30 p-4 rounded-xl">
                    <div className="p-2">
                      <div className="mb-2">Mon</div>
                      <div className="font-medium text-lg">21°</div>
                    </div>
                    <div className="p-2">
                      <div className="mb-2">Tue</div>
                      <div className="font-medium text-lg">24°</div>
                    </div>
                    <div className="p-2">
                      <div className="mb-2">Wed</div>
                      <div className="font-medium text-lg">22°</div>
                    </div>
                    <div className="p-2">
                      <div className="mb-2">Thu</div>
                      <div className="font-medium text-lg">25°</div>
                    </div>
                  </div>
                </div>
              </MajesticCard>
            </div>
          </TabsContent>

          <TabsContent value="variants" className="mt-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Tilt",
                  variant: "tilt",
                  desc: "3D tilt effect on hover",
                  icon: <Cpu />,
                },
                {
                  name: "Float",
                  variant: "float",
                  desc: "Constant floating animation",
                  icon: <Waves />,
                },
                {
                  name: "Magnetic",
                  variant: "magnetic",
                  desc: "Follows cursor with pull effect",
                  icon: <Smartphone />,
                },
                {
                  name: "Layered",
                  variant: "layered",
                  desc: "Multiple layers with parallax",
                  icon: <Layers />,
                },
                {
                  name: "Morph",
                  variant: "morph",
                  desc: "Shape morphing on hover",
                  icon: <Sparkles />,
                },
                {
                  name: "Breathe",
                  variant: "breathe",
                  desc: "Pulsating animation effect",
                  icon: <HeartPulse />,
                },
                {
                  name: "Glow",
                  variant: "glow",
                  desc: "Interactive glow follows cursor",
                  icon: <Zap />,
                },
                {
                  name: "Wave",
                  variant: "wave",
                  desc: "Wave-like motion effects",
                  icon: <Waves />,
                },
              ].map((item, i) => (
                <MajesticCard
                  key={i}
                  variant={item.variant as MajesticCardVariant}
                  intensity={3}
                  shadow
                  rounded="xl"
                  layerCount={3}
                  layerSeparation={3}
                  className="h-48 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700"
                >
                  <div className="p-6 h-full flex flex-col items-center justify-center">
                    <div className="mb-3 p-3 rounded-full bg-opacity-20 bg-white dark:bg-gray-800 shadow-md">
                      {React.cloneElement(item.icon, {
                        className: "h-6 w-6 text-black dark:text-white",
                      })}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </MajesticCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interactive" className="mt-6">
            <div className="grid grid-cols-1 gap-10">
              <MajesticCard
                variant="layered"
                intensity={5}
                shadow
                shadowType="glow"
                rounded="xl"
                layerCount={5}
                layerSeparation={5}
                className="w-full p-8 bg-purple-100 dark:bg-zinc-900 border border-gray-300 dark:border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent mb-2">
                      3D Layered Effect
                    </h3>
                    <p className="text-sm text-gray-400">
                      Move your cursor to explore the depth and parallax effect
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      {
                        icon: <MountainSnow />,
                        title: "Background Layer",
                        layer: "0.4",
                        color: "bg-amber-100 text-amber-800 border-amber-200",
                      },
                      {
                        icon: <Globe />,
                        title: "Middle Layer",
                        layer: "0.7",
                        color: "bg-blue-100 text-blue-800 border-blue-200",
                      },
                      {
                        icon: <Star />,
                        title: "Foreground Layer",
                        layer: "1",
                        color:
                          "bg-violet-100 text-violet-800 border-violet-200",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        data-layer={item.layer}
                        className="flex flex-col items-center transition-transform duration-300 ease-out p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-900 border"
                      >
                        <div className={`mb-4 p-4 rounded-full ${item.color}`}>
                          {React.cloneElement(item.icon, {
                            className: "h-8 w-8",
                          })}
                        </div>
                        <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-300">
                          Depth: {item.layer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </MajesticCard>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <MajesticCard
                  variant="morph"
                  theme="custom"
                  intensity={2}
                  shadow
                  shadowSize="lg"
                  rounded="xl"
                  hoverEffect
                  confettiEffect
                  className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950 border border-teal-100 dark:border-teal-900"
                >
                  <div className="p-6 text-center h-full flex flex-col">
                    <div className="mb-4 mx-auto w-14 h-14 flex items-center justify-center bg-teal-100 dark:bg-teal-900 rounded-full shadow-md">
                      <Sparkles className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-teal-800 dark:text-teal-300">
                      Morphing Shape
                    </h3>
                    <p className="text-sm text-teal-600 dark:text-teal-400 mb-6 flex-grow">
                      Hover to see the shape transform with confetti celebration
                      effect
                    </p>
                    <Button
                      size="lg"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Try Me!
                    </Button>
                  </div>
                </MajesticCard>

                <MajesticCard
                  variant="wave"
                  theme="neon"
                  intensity={4}
                  shadow
                  shadowType="glow"
                  rounded="xl"
                  hoverEffect
                >
                  <div className="p-6 text-center h-full flex flex-col">
                    <div className="mb-4 mx-auto w-14 h-14 flex items-center justify-center bg-blue-900 rounded-full shadow-md">
                      <Waves className="h-6 w-6 text-blue-300" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-white">
                      Wave Motion
                    </h3>
                    <p className="text-sm text-blue-300 mb-6 flex-grow">
                      Experience fluid wave animations that respond to your
                      interactions
                    </p>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-blue-500 text-blue-300 hover:bg-blue-900"
                    >
                      Interact
                    </Button>
                  </div>
                </MajesticCard>

                <MajesticCard
                  variant="breathe"
                  theme="cosmic"
                  intensity={3}
                  shadow
                  rounded="xl"
                  hoverEffect
                >
                  <div className="p-6 text-center h-full flex flex-col">
                    <div className="mb-4 mx-auto w-14 h-14 flex items-center justify-center bg-purple-900 rounded-full shadow-md">
                      <HeartPulse className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-white">
                      Breathing Effect
                    </h3>
                    <p className="text-sm text-purple-300 mb-6 flex-grow">
                      Subtle pulsating animation that mimics natural breathing
                      rhythm
                    </p>
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Experience
                    </Button>
                  </div>
                </MajesticCard>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
