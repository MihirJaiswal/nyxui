import Link from "next/link";
import React from "react";
import { ArrowRight, Blocks, ChevronRight } from "lucide-react";
import TechStack from "./Tech";
import { Badge } from "../../ui/badge";
import SocialProof from "./Social-proof";
import { Rbutton } from "../../ui/Rbutton";
import GlassMusicPlayer from "./GlassMusicPlayer";
import { Scanner } from "./Scanner";
import { Matrix } from "./Matrix";
import { AnimatedCodeBlockDemo } from "./CodeBlock";
import { componentsData } from "@/registry/Data";

function Hero() {
  // Calculate counts dynamically from imported data
  const componentCount = Object.keys(componentsData.components || {}).length;
  const templateCount = Object.keys(componentsData.templates || {}).length;
  const blockCount = componentsData.blocks
    ? Object.keys(componentsData.blocks).length
    : 0;
  const hasBlocks = blockCount > 0;

  return (
    <section className="relative px-6 xl:px-22 py-12 sm:py-16 md:py-20 lg:py-28 flex flex-col xl:flex-row xl:container mx-auto">
      <div className="w-full xl:flex-1 xl:container xl:mx-auto z-10">
        <div className="xl:max-w-5xl relative mt-6 sm:mt-8 lg:mt-12">
          {/* Announcement Badge */}
          <Link
            href="/components/apple-glass-effect"
            rel="noopener noreferrer"
            className="z-12"
          >
            <Badge className="z-12 mb-4 sm:mb-6 group cursor-pointer inline-flex items-center text-black dark:text-white gap-2 rounded-full border border-gray-300 px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-semibold dark:border-gray-600 bg-background">
              <div className="border-r border-zinc-500 pr-2">
                <Blocks className="h-3 w-3 sm:h-4 sm:w-4 group-hover:fill-purple-400 dark:group-hover:fill-purple-700 group-hover:rotate-12" />
              </div>
              New! <span className="hidden sm:inline">Glow Card</span>
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:ml-4 transform transition-all duration-200" />
            </Badge>
          </Link>

          {/* Massive Typography */}
          <h1 className="mb-6 sm:mb-8 text-[2.6rem] sm:text-7xl lg:text-[4.5rem] font-black leading-[1.1] md:leading-[0.95] tracking-tighter relative z-1">
            <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-950 dark:from-zinc-100 dark:to-white">
              Next
            </span>
            <br />
            <span className="tracking-tight dark:tracking-normal md:tracking-tighter md:dark:tracking-tight">
              <span
                className="absolute inset0 z-10"
                style={{
                  backgroundImage: "url('/assets/bg.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "repeat",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {" "}
                Generation
              </span>
              <span className="relative z-0 generationShadow">Generation</span>
            </span>

            <br />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-950 dark:from-zinc-100 dark:to-white">
              UI Components
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
                .
              </span>
            </span>
          </h1>

          {/* Description */}
          <div className="mb-6 max-w-2xl">
            <p className="text-base sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-200 leading-relaxed relative z-1">
              Easily plug in the latest trending components and build stunning
              websites without stressing over design consistency or animations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="relative z-12 mt-6 sm:mt-8 lg:mt-10 xl:mt-6 flex w-full flex-col justify-start xl:justify-s space-y-2.5 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href="/components" rel="noopener noreferrer">
              <div>
                <Rbutton className="relative rounded-md bg-neutral-900 dark:bg-white dark:text-black no-underline flex space-x-2 group cursor-pointer hover:shadow-2xl hover:shadow-zinc-800/50 hover:bg-neutral-800 dark:hover:bg-neutral-100 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 ease-out shadow-zinc-900 p-px font-semibold text-white px-4 py-2 h-12 w-full items-center justify-center text-center text-sm sm:w-52">
                  <span className="transition-all duration-200 group-hover:tracking-wide">
                    Browse Components
                  </span>
                  <ChevronRight
                    className="h-4 w-4 ml-1 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110 align-middle relative"
                    style={{ top: "1px" }}
                  />
                </Rbutton>
              </div>
            </Link>

            <Link href="/docs" rel="noopener noreferrer">
              <button className="flex h-12 w-full items-center justify-center rounded-lg border border-transparent bg-white text-sm text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-all duration-300 ease-out hover:shadow-[0px_8px_25px_-5px_rgba(0,0,0,0.15),0px_4px_6px_-2px_rgba(0,0,0,0.05)] hover:bg-neutral-50 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-neutral-200 sm:w-52 dark:border-neutral-600 dark:bg-black dark:text-white dark:hover:bg-neutral-900 dark:hover:border-neutral-500 dark:hover:shadow-[0px_8px_25px_-5px_rgba(255,255,255,0.1),0px_4px_6px_-2px_rgba(255,255,255,0.05)]">
                <span className="transition-all duration-200 hover:tracking-wide">
                  Documentation
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom section - responsive layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between xl:justify-start mt-14 xl:gap-12 sm:mt-16 lg:mt-18 z-1 xl:scale-95 xl:-ml-8">
          <div className="mb-10 lg:mb-0">
            <p className="text-neutral-700 dark:text-neutral-400 text-sm sm:text-[14.5px] mb-4 text-center lg:text-left">
              Trusted by many developers
            </p>
            <SocialProof />
          </div>

          {/* TechStack - Show on lg and above, hide on xl with custom classes */}
          <div className="hidden lg:block xl:hidden">
            <TechStack />
          </div>
          <div className="hidden xl:block xl:-12">
            <TechStack />
          </div>

          {/* Navigation menu - responsive with dynamic data */}
          <div className="flex flex-wrap mt-12 lg:mt-0 gap-4 sm:gap-x-6 text-neutral-950 dark:text-gray-50 font-mono relative z-12 justify-center lg:justify-start">
            <Link
              href="/components"
              className="flex items-center space-x-3 group hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-base sm:text-lg">
                {componentCount.toString().padStart(2, "0")}/components
              </span>
              <ArrowRight className="h-4 w-4 group-hover:ml-4 transform transition-all duration-200" />
            </Link>
            <Link
              href="/templates"
              className="flex items-center group space-x-3 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-base sm:text-lg">
                {templateCount.toString().padStart(2, "0")}/templates
              </span>
              <ArrowRight className="h-4 w-4 group-hover:ml-4 transform transition-all duration-200" />
            </Link>
            {hasBlocks && (
              <Link
                href="/blocks"
                className="flex items-center group space-x-3 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg">
                  {blockCount.toString().padStart(2, "0")}/blocks
                </span>
                <ArrowRight className="h-4 w-4 group-hover:ml-4 transform transition-all duration-200" />
              </Link>
            )}
          </div>
        </div>

        {/* Organic Flowing Gradient - responsive */}
        <div className="absolute -top-32 left-56 md:top-0 md:right-0 md:left-auto w-[300px] h-[300px] sm:w-[500px] sm:h-[400px] lg:w-[680px] lg:h-[600px] opacity-20 dark:opacity-60">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-purple-500 to-pink-500 rounded-full blur-3xl transform rotate-12 scale-150" />
          <div className="absolute top-10 right-10 sm:top-16 sm:right-16 lg:top-20 lg:right-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-full blur-2xl opacity-70" />
        </div>
      </div>


      {/* Right side components - XL screens and above (second version behavior) */}
      {/* For screens >= 1442px - Show all components */}
      <div className="hidden 2xl:block  relative z-12">
        <div className="absolute -top-12 right-158 w-full h-full">
          <Scanner />
        </div>
        <div className="absolute top-40 right-148 w-full h-full z-20">
          <Matrix />
        </div>
        <div className="absolute -top-6 right-74 w-full h-full z-24">
          <GlassMusicPlayer />
        </div>
        <div className="absolute top-60 right-76 w-full h-full z-10">
          <AnimatedCodeBlockDemo />
        </div>
        <div className="absolute bottom-[9.85rem] right-68 w-84 h-2 border-t border-dashed border-neutral-500/40 dark:border-gray-200/35 z-28"></div>
        <div className="absolute top-56 right-150 w-2 h-64 border-l border-dashed border-neutral-500/40 dark:border-gray-200/35 z-28"></div>
        <div className="absolute bottom-[10.2rem] right-[37.55rem] w-2 h-3 border-l-3 border-neutral-500/40 dark:border-white/60 z-28"></div>
        <div className="absolute bottom-[9.88rem] right-[37.3rem] w-3 h-2 border-t-3 border-neutral-500/40 dark:border-white/60 z-28"></div>
      </div>


      <div className="hidden xl:block 2xl:hidden relative z-12">
        <div className="absolute -top-8 right-116 w-full h-full">
          <Scanner />
        </div>
        <div className="absolute top-48 right-110 w-full h-full z-20">
          <Matrix />
        </div>
        <div className="absolute top-12 right-64 w-full h-full z-12">
          <GlassMusicPlayer />
        </div>
      </div>

      <div className="hidden  min-[1200px]:block min-[1280px]:hidden z-12">
        <div className="absolute top-28 -right-160 w-full h-full">
          <Scanner />
        </div>
        <div className="absolute top-84 -right-172 w-full h-full z-20">
          <Matrix />
        </div>
        <div className="absolute top-52 -right-112 w-full h-full z-12">
          <AnimatedCodeBlockDemo/>
        </div>
      </div>

      <div className="hidden min-[1025px]:grid min-[1200px]:hidden absolute top-16 right-4 z-12  grid-cols-1 scale-80 gap-8">
        <div>
          <Scanner />
        </div>
        <div>
          <Matrix />
        </div>
      </div>
    </section>
  );
}

export default Hero;