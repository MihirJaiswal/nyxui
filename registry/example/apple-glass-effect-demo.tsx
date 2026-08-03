"use client";
import { useState } from "react";
import { GlassContainer } from "@/registry/ui/apple-glass-effect";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Search,
  Wifi,
  Battery,
  Bluetooth,
  AirVent,
  Flashlight,
  Heart,
  Command,
} from "lucide-react";
import Image from "next/image";

export const GlassExamples = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const apps = [
    { src: "/assets/images/apple-glass-effect/finder.webp", alt: "Finder" },
    { src: "/assets/images/apple-glass-effect/map.webp", alt: "Maps" },
    { src: "/assets/images/apple-glass-effect/safari.webp", alt: "Safari" },
    { src: "/assets/images/apple-glass-effect/books.webp", alt: "Books" },
    { src: "/assets/images/apple-glass-effect/messages.webp", alt: "Messages" },
  ];

  return (
    <div className="relative w-full overflow-hidden px-4 py-6 sm:px-6 sm:py-8 2xl:px-10 2xl:py-10">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/apple-glass-effect/img.jpg"
          alt="background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/15 via-transparent to-fuchsia-600/15" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Menu Bar */}
        <GlassContainer
          blur={28}
          highlightOpacity={0.5}
          innerGlowOpacity={0.35}
          specularIntensity={0.5}
          hover={false}
          border={false}
          className="mb-6 w-full rounded-2xl p-0 font-normal"
        >
          <div className="flex h-11 items-center justify-between px-4">
            <div className="flex items-center gap-5 text-[13px] text-white/85">
              <span className="font-semibold"></span>
              <span className="hidden sm:inline">File</span>
              <span className="hidden sm:inline">Edit</span>
              <span className="hidden md:inline">View</span>
              <span className="hidden md:inline">Window</span>
              <span className="hidden md:inline">Help</span>
            </div>
            <div className="flex items-center gap-3.5 text-white/85">
              <Wifi className="h-4 w-4" />
              <Battery className="h-4 w-4" />
              <span className="text-[13px] tabular-nums">2:30 PM</span>
            </div>
          </div>
        </GlassContainer>

        {/* Hero row */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Music Player */}
          <GlassContainer
            blur={32}
            highlightOpacity={0.45}
            innerGlowOpacity={0.3}
            specularIntensity={0.6}
            border={false}
            hover={false}
            className="rounded-3xl p-6 font-normal lg:col-span-3"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/25">
                  <Image
                    src="/assets/images/apple-glass-effect/cover.jpeg"
                    alt="Music Cover"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    Now Playing
                  </p>
                  <h3 className="truncate text-xl font-semibold text-white">
                    Until I Found You
                  </h3>
                  <p className="truncate text-sm text-white/65">
                    Stephen Sanchez
                  </p>
                </div>
                <button
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-red-400"
                  aria-label="Like"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Progress */}
              <div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-1/3 rounded-full bg-white/90" />
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-white/45">
                  <span>1:12</span>
                  <span>-2:24</span>
                </div>
              </div>

              {/* Transport */}
              <div className="flex items-center justify-center gap-10">
                <button
                  className="text-white/70 transition-colors hover:text-white"
                  aria-label="Previous"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 shadow-lg ring-1 ring-white/20 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30 active:scale-95"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="ml-1 h-6 w-6 text-white" />
                  )}
                </button>
                <button
                  className="text-white/70 transition-colors hover:text-white"
                  aria-label="Next"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
            </div>
          </GlassContainer>

          {/* Control Center */}
          <GlassContainer
            blur={28}
            highlightOpacity={0.4}
            innerGlowOpacity={0.25}
            specularIntensity={0.5}
            border={false}
            hover={false}
            className="rounded-3xl p-5 font-normal lg:col-span-2"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Control Center
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2.5 rounded-2xl bg-blue-500/25 px-3.5 py-3 text-left transition-colors hover:bg-blue-500/35">
                  <Wifi className="h-5 w-5 shrink-0 text-blue-200" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-white">
                      Wi-Fi
                    </p>
                    <p className="truncate text-[10px] text-white/55">Home</p>
                  </div>
                </button>
                <button className="flex items-center gap-2.5 rounded-2xl bg-blue-500/25 px-3.5 py-3 text-left transition-colors hover:bg-blue-500/35">
                  <Bluetooth className="h-5 w-5 shrink-0 text-blue-200" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-white">
                      Bluetooth
                    </p>
                    <p className="truncate text-[10px] text-white/55">On</p>
                  </div>
                </button>
                <button className="flex items-center gap-2.5 rounded-2xl bg-white/12 px-3.5 py-3 text-left transition-colors hover:bg-white/20">
                  <AirVent className="h-5 w-5 shrink-0 text-white/80" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-white">
                      AirDrop
                    </p>
                    <p className="truncate text-[10px] text-white/55">
                      Everyone
                    </p>
                  </div>
                </button>
                <button className="flex items-center gap-2.5 rounded-2xl bg-yellow-500/25 px-3.5 py-3 text-left transition-colors hover:bg-yellow-500/35">
                  <Flashlight className="h-5 w-5 shrink-0 text-yellow-200" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-white">
                      Flashlight
                    </p>
                    <p className="truncate text-[10px] text-white/55">Off</p>
                  </div>
                </button>
              </div>
            </div>
          </GlassContainer>
        </div>

        {/* Spotlight + Dock row */}
        <div className="md:flex flex-col items-center gap-6 hidden">
          {/* Spotlight Search */}
          <GlassContainer
            blur={40}
            highlightOpacity={0.6}
            innerGlowOpacity={0.4}
            specularIntensity={0.7}
            border={false}
            hover={false}
            className="w-full max-w-xl rounded-2xl p-0 font-normal"
          >
            <div className="flex h-12 items-center gap-3 px-4">
              <Search className="h-4.5 w-4.5 shrink-0 text-white/60" />
              <input
                type="text"
                placeholder="Spotlight Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder-white/45 outline-none"
              />
              <kbd className="hidden items-center gap-0.5 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50 sm:flex">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </div>
          </GlassContainer>

          {/* Dock */}
          <GlassContainer
            blur={32}
            highlightOpacity={0.5}
            innerGlowOpacity={0.3}
            specularIntensity={0.5}
            border={false}
            hover={false}
            className="rounded-[2rem] p-0 px-4 font-normal"
          >
            <div className="flex h-24 items-center gap-3">
              {apps.map((app) => (
                <button
                  key={app.alt}
                  className="flex h-16 w-16 items-center justify-center transition-transform duration-300 hover:-translate-y-2.5 hover:scale-110 active:scale-95"
                  aria-label={app.alt}
                >
                  <Image
                    src={app.src}
                    alt={app.alt}
                    width={64}
                    height={64}
                    quality={100}
                    className="rounded-xl shadow-lg"
                  />
                </button>
              ))}
            </div>
          </GlassContainer>
        </div>
      </div>
    </div>
  );
};
