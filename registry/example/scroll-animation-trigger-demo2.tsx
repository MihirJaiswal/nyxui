import React from "react";
import { ScrollAnimationTrigger } from "../ui/scroll-animation-trigger";
import { RefreshCw } from "lucide-react";

export default function ScrollAnimationTriggerDemo2() {
  return (
    <div className="max-w-md mx-auto relative">
      <ScrollAnimationTrigger
        effect="rotate"
        className="p-3 sm:p-4 md:p-6"
        delay={0.3}
        fromRotation={-15}
        toRotation={0}
      >
        <div className="bg-background p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full border-t border-l border-amber-200 dark:border-amber-500 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/4 h-1/4 rounded-full bg-amber-300 dark:bg-amber-300 -mr-5 -mt-5 blur-xl sm:blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-1/5 h-1/5 rounded-full bg-amber-300 dark:bg-amber-300 -ml-3 -mb-3 blur-md sm:blur-xl"></div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-amber-100 dark:border-amber-900 relative z-10 group-hover:shadow-amber-200 dark:group-hover:shadow-amber-900/30 transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <RefreshCw className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-amber-500 dark:text-amber-400" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start text-amber-800 dark:text-amber-300">
              Rotation Effect
            </h3>
          </div>

          <p className="text-amber-700/80 dark:text-amber-300/90 text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
            This content spins into place as you scroll, adding a dynamic and
            playful element to the page that catches the eye.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/20 dark:bg-amber-500/10">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-amber-500 dark:bg-amber-400"></div>
            </div>
            <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/20 dark:bg-amber-500/10">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 dark:bg-amber-400"></div>
            </div>
            <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/20 dark:bg-amber-500/10">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-amber-500 dark:bg-amber-400"></div>
            </div>
          </div>
        </div>
      </ScrollAnimationTrigger>
    </div>
  );
}
