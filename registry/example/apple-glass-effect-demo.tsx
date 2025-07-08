"use client";

import { useState } from "react";
import { GlassContainer } from "../ui/apple-glass-effect";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Search,
  Calendar,
  Sun,
  Wifi,
  Battery,
  Bluetooth,
  AirVent,
  Flashlight,
  Calculator,
  MessagesSquareIcon as Messages,
  Bell
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export const GlassExamples = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const volume = 75;

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
      <Image
            src="/assets/images/apple-glass-effect/img.jpg"
            alt="background image"
            height={2000}
            width={1000}
            priority
            className="h-full w-full object-cover absolute inset-0"
          />
        <motion.div
          className="h-full w-full"
          animate={{
            y: [-120, 30, -120],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/assets/images/apple-glass-effect/img.jpg"
            alt="background image"
            height={2000}
            width={1000}
            priority
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20" />
      </div>
      

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Row - Control Center Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Music Player Widget */}
          <GlassContainer
            blur={0}
            highlightOpacity={0}
            innerGlowOpacity={0}
            specularIntensity={0.5}
            className="lg:col-span-2 h-54"
          >
            <div className="w-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Image
                    src="/assets/images/apple-glass-effect/cover.jpeg"
                    alt="Music Cover"
                    width={64}
                    height={64}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    Now Playing
                  </h3>
                  <p className="text-white/80">Until I Found You</p>
                  <p className="text-white/60 text-sm">Stephen Sanchez</p>
                </div>
                <Heart className="w-6 h-6 text-white/60 hover:text-red-400 cursor-pointer transition-colors" />
              </div>

              <div className="flex items-center justify-center gap-6 mb-4">
                <SkipBack className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors" />
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>
                <SkipForward className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors" />
              </div>

              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-white/60" />
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-200"
                    style={{ width: `${volume}%` }}
                  />
                </div>
                <span className="text-xs text-white/60 w-8">{volume}%</span>
              </div>

              <div className="text-xs text-white/40 mt-3">
                Settings: Blur 0px • Highlight 0 • Glow 0 • Specular 0.5
              </div>
            </div>
          </GlassContainer>

          {/* Control Center Toggles */}
          <GlassContainer
            blur={20}
            highlightOpacity={0.3}
            innerGlowOpacity={0.2}
            specularIntensity={0.4}
            className="h-64"
          >
            <div className="w-full">
              <h3 className="text-lg font-semibold text-white mb-4">
                Control Center
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-500/30 rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-blue-500/40 transition-colors cursor-pointer">
                  <Wifi className="w-6 h-6 text-blue-300" />
                  <span className="text-xs text-white/80">Wi-Fi</span>
                </div>
                <div className="bg-blue-500/30 rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-blue-500/40 transition-colors cursor-pointer">
                  <Bluetooth className="w-6 h-6 text-blue-300" />
                  <span className="text-xs text-white/80">Bluetooth</span>
                </div>
                <div className="bg-white/20 rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-white/30 transition-colors cursor-pointer">
                  <AirVent className="w-6 h-6 text-white/80" />
                  <span className="text-xs text-white/80">AirDrop</span>
                </div>
                <div className="bg-yellow-500/30 rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-yellow-500/40 transition-colors cursor-pointer">
                  <Flashlight className="w-6 h-6 text-yellow-300" />
                  <span className="text-xs text-white/80">Flashlight</span>
                </div>
              </div>
              <div className="text-xs text-white/40 mt-3">
                Settings: Blur 20px • Highlight 0.3 • Glow 0.2 • Specular 0.4
              </div>
            </div>
          </GlassContainer>
        </div>

        {/* Middle Row - Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Weather Widget */}
          <GlassContainer
            blur={15}
            highlightOpacity={0.5}
            innerGlowOpacity={0.4}
            specularIntensity={0.6}
            className="h-40"
          >
            <div className="w-full text-center">
              <div className="flex items-center justify-center mb-2">
                <Sun className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">72°</h3>
              <p className="text-white/80 text-sm mb-1">Sunny</p>
              <p className="text-white/60 text-xs">San Francisco</p>
              <div className="text-xs text-white/40 mt-2">
                Blur 15px • Highlight 0.5
              </div>
            </div>
          </GlassContainer>

          {/* Calendar Widget */}
          <GlassContainer
            blur={3}
            highlightOpacity={0.2}
            innerGlowOpacity={0.1}
            specularIntensity={0.3}
            className="h-40"
          >
            <div className="w-full">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold text-white">Today</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-white/80">Team Meeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-white/80">Lunch Break</span>
                </div>
              </div>
              <div className="text-xs text-white/40 mt-2">
                Blur 3px • Highlight 0.2
              </div>
            </div>
          </GlassContainer>

          {/* Notification Panel */}
          <GlassContainer
            blur={5}
            highlightOpacity={0.6}
            innerGlowOpacity={0.5}
            specularIntensity={0.7}
            className="h-40"
          >
            <div className="w-full">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="w-6 h-6 text-white" />
                <h3 className="text-lg font-semibold text-white">
                  Notifications
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Messages className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/90">New message</p>
                    <p className="text-xs text-white/60">2 min ago</p>
                  </div>
                </div>
              </div>
              <div className="text-xs text-white/40 mt-2">
                Blur 5px • Highlight 0.6
              </div>
            </div>
          </GlassContainer>

          {/* Spotlight Search */}
          <GlassContainer
            blur={40}
            highlightOpacity={0.8}
            innerGlowOpacity={0.6}
            specularIntensity={0.8}
            className="h-40"
          >
            <div className="w-full">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-6 h-6 text-white/80" />
                <input
                  type="text"
                  placeholder="Spotlight Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 hover:bg-white/10 rounded-lg p-2 cursor-pointer transition-colors">
                  <Calculator className="w-5 h-5 text-white/80" />
                  <span className="text-sm text-white/80">Calculator</span>
                </div>
              </div>
              <div className="text-xs text-white/40 mt-2">
                Blur 10px • Highlight 0.8
              </div>
            </div>
          </GlassContainer>
        </div>

        {/* Dock */}
        <GlassContainer
          blur={0}
          highlightOpacity={0.3}
          innerGlowOpacity={0.2}
          specularIntensity={0.4}
          className="mx-auto max-w-[39rem] h-36 rounded-2xl"
        >
          <div className="w-full flex items-center justify-center">
            <div className="flex items-center gap-4">
              {[
                {
                  src: "/assets/images/apple-glass-effect/finder.webp",
                  alt: "finder",
                },
                {
                  src: "/assets/images/apple-glass-effect/map.webp",
                  alt: "maps",
                },
                {
                  src: "/assets/images/apple-glass-effect/safari.webp",
                  alt: "safari",
                },
                {
                  src: "/assets/images/apple-glass-effect/books.webp",
                  alt: "books",
                },
                {
                  src: "/assets/images/apple-glass-effect/messages.webp",
                  alt: "messages",
                },
              ].map((app, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 rounded-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg`}
                >
                  <Image
                    src={app.src}
                    alt={app.alt}
                    width={500}
                    height={500}
                    quality={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </GlassContainer>

        {/* Settings Info */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Dock Settings: Blur 0px • Highlight 0.3 • Glow 0.2 • Specular 0.4 •
            Border Radius 2.5rem
          </p>
        </div>

        {/* Menu Bar */}
        <GlassContainer
          blur={20}
          highlightOpacity={0.4}
          innerGlowOpacity={0.3}
          specularIntensity={0.5}
          className="fixed top-4 left-4 right-4 h-12 z-50 rounded-[1rem]"
        >
          <div className="w-full flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <span className="text-white/80 text-sm">Finder</span>
              <span className="text-white/80 text-sm">File</span>
              <span className="text-white/80 text-sm">Edit</span>
              <span className="text-white/80 text-sm">View</span>
            </div>
            <div className="flex items-center gap-4">
              <Wifi className="w-4 h-4 text-white/80" />
              <Battery className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">2:30 PM</span>
            </div>
          </div>
        </GlassContainer>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};
