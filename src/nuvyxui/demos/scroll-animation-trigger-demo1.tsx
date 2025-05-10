import React from "react";
import { ScrollAnimationTrigger } from "../components/scroll-animation-trigger";
import { Palette } from "lucide-react";

export default function ScrollAnimationTriggerDemo1() {
  return (
    <div className="max-w-md mx-auto">
      <ScrollAnimationTrigger
        effect="color"
        className="p-3 sm:p-4 md:p-6"
        fromColor="#2b13c2"
        toColor="#f002cc"
      >
        <div
          className="bg-white dark:bg-zinc-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full overflow-hidden relative group"
          style={{
            background:
              "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(43, 19, 194, 0.1))",
          }}
        >
          <div className="absolute inset-0 opacity-5">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-pink-100 dark:border-pink-900/50 relative z-10 group-hover:shadow-pink-200 dark:group-hover:shadow-pink-900/30 transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-indigo-600/20 dark:from-pink-500/10 dark:to-indigo-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Palette className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 relative z-10" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start">
              Color Change
            </h3>
          </div>

          <p className="text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
            Watch the text transform through vibrant colors as you scroll
            through this section, creating a playful and engaging visual
            experience tied to your scroll position.
          </p>

          <div className="relative z-10 mt-4 sm:mt-6 p-2 sm:p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-indigo-500"></span>
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-violet-500"></span>
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-fuchsia-500"></span>
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink-500"></span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #2b13c2, #a855f7, #ec4899)",
                  width: "60%",
                }}
              />
            </div>
          </div>
        </div>
      </ScrollAnimationTrigger>
    </div>
  );
}
