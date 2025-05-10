import { ScrollAnimationTrigger } from "@/nuvyxui/components/scroll-animation-trigger";
import {
  ArrowDown,
  Sparkles,
  Zap,
  Layers,
  ExternalLink,
  Wand2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ScrollAnimationTriggerDemo() {
  return (
    <div className="w-full overflow-hidden flex flex-col">
      <ScrollArea className="h-[80vh]">
        <div className="relative flex flex-col items-center pt-60 justify-center text-center px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  background: i % 2 === 0 ? "#9206cf" : "#ec4899",
                  width: `${Math.random() * 5 + 2}vw`,
                  height: `${Math.random() * 5 + 2}vw`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <ScrollAnimationTrigger
            effect="slide"
            direction="up"
            className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl pb-3 md:text-5xl lg:text-6xl font-extrabold mb-4 z-10 px-2">
              Scroll Down Here
            </h1>

            <p className="text-gray-600 z-10 dark:text-gray-300 mb-6 font-semibold max-w-md text-base sm:text-lg md:text-xl px-4 w-full">
              Scroll down to see the ScrollAnimationTrigger in action
            </p>

            <div className="mt-2 p-3 rounded-full bg-purple-500 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </ScrollAnimationTrigger>
        </div>

        <div className="relative h-12 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-12 text-white dark:text-gray-900"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-current"
            ></path>
          </svg>
        </div>

        <div className="py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-12">
              <ScrollAnimationTrigger
                effect="fade"
                className="p-3 sm:p-4 md:p-6"
                delay={1}
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-zinc-900 dark:to-zinc-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full border-t border-l border-blue-200/50 dark:border-blue-500/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full bg-blue-500/10 -mr-10 -mt-10 dark:bg-blue-500/5"></div>
                  <div className="absolute bottom-0 left-0 w-1/4 h-1/4 rounded-full bg-blue-500/10 -ml-5 -mb-5 dark:bg-blue-500/5"></div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/50 relative z-10 group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/30 transition-shadow duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 dark:from-blue-500/10 dark:to-blue-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-500 dark:text-blue-400 relative z-10" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start text-blue-800 dark:text-blue-300">
                      Fade In Effect
                    </h3>
                  </div>

                  <p className="text-blue-700/80 dark:text-blue-300/90 text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
                    This content gently fades into view as you scroll down the
                    page, creating a subtle and elegant appearance that draws
                    attention without being distracting.
                  </p>

                  <div className="flex justify-center sm:justify-end mt-4">
                    <button className="px-4 sm:px-5 py-2 rounded-full bg-blue-500 text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium hover:bg-blue-600 transition-colors duration-300 shadow-md">
                      Learn More
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </ScrollAnimationTrigger>

              <ScrollAnimationTrigger
                effect="scale"
                className="p-3 sm:p-4 md:p-6"
                delay={0.3}
                fromScale={0.7}
                toScale={1}
              >
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-zinc-900 dark:to-zinc-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full border-t border-l border-purple-200/50 dark:border-purple-500/20 relative overflow-hidden group">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-purple-500/20 dark:bg-purple-500/10"
                      style={{
                        width: `${4 + i * 3}vw`,
                        height: `${4 + i * 3}vw`,
                        top: 20 + i * 30 + "%",
                        right: -20 + i * 10 + "%",
                      }}
                    />
                  ))}

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/50 relative z-10 group-hover:shadow-purple-200 dark:group-hover:shadow-purple-900/30 transition-shadow duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 dark:from-purple-500/10 dark:to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Zap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-500 dark:text-purple-400 relative z-10" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start text-purple-800 dark:text-purple-300">
                      Scale Effect
                    </h3>
                  </div>

                  <p className="text-purple-700/80 dark:text-purple-300/90 text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
                    Watch as this content smoothly scales from small to full
                    size as you scroll, creating a dynamic entrance that
                    captures attention and adds visual depth.
                  </p>

                  <div className="w-full bg-purple-200/50 dark:bg-purple-900/30 h-1.5 rounded-full mt-4 sm:mt-6 overflow-hidden relative z-10">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full w-3/4" />
                  </div>

                  <div className="flex justify-between text-xs font-medium text-purple-700 dark:text-purple-300/70 mt-2 relative z-10">
                    <span>Scale Start</span>
                    <span>Scale Complete</span>
                  </div>
                </div>
              </ScrollAnimationTrigger>

              <ScrollAnimationTrigger
                effect="custom"
                delay={3}
                customProps={{
                  initial: { x: -100, y: 100, opacity: 0, rotate: -10 },
                  animate: { x: 0, y: 0, opacity: 1, rotate: 0 },
                  transition: { type: "spring", stiffness: 100, damping: 10 },
                }}
                className="p-3 sm:p-4 md:p-6"
              >
                <div className="p-0 rounded-2xl sm:rounded-3xl shadow-xl w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          'url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Cpath d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="rgba(255,255,255,0.1)" /%3E%3C/svg%3E\')',
                      }}
                    ></div>
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 relative z-10">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
                      <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg relative z-10 group-hover:bg-white/20 transition-colors duration-300">
                        <Wand2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white relative z-10" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start text-white">
                        Custom Animation
                      </h3>
                    </div>

                    <p className="text-white/90 text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
                      This demonstrates a custom animation path combining
                      multiple movements and rotations. Create your own unique
                      entrance effects with complete creative freedom.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 sm:mt-6">
                      <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                        <div className="text-xs sm:text-sm font-medium text-white/80 mb-1">
                          Movement
                        </div>
                        <div className="text-base sm:text-lg font-semibold text-white">
                          Diagonal Slide
                        </div>
                      </div>
                      <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                        <div className="text-xs sm:text-sm font-medium text-white/80 mb-1">
                          Rotation
                        </div>
                        <div className="text-base sm:text-lg font-semibold text-white">
                          -10° to 0°
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimationTrigger>
              <ScrollAnimationTrigger
                effect="slide"
                direction="up"
                className="p-3 sm:p-4 md:p-6"
                delay={0.5}
              >
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-zinc-900 dark:to-zinc-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full border-t border-l border-green-200/50 dark:border-green-500/20 relative overflow-hidden group">
                  <svg
                    className="absolute right-0 top-0 h-full opacity-30 dark:opacity-20"
                    viewBox="0 0 100 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 0C20 110.457 110.457 200 0 200"
                      stroke="#22C55E"
                      strokeWidth="2"
                    />
                    <path
                      d="M40 0C40 110.457 130.457 200 20 200"
                      stroke="#22C55E"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <path
                      d="M60 0C60 110.457 150.457 200 40 200"
                      stroke="#22C55E"
                      strokeWidth="2"
                      opacity="0.4"
                    />
                  </svg>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-green-100 dark:border-green-900/50 relative z-10 group-hover:shadow-green-200 dark:group-hover:shadow-green-900/30 transition-shadow duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 dark:from-green-500/10 dark:to-green-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Layers className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 dark:text-green-400 relative z-10" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start text-green-800 dark:text-green-300">
                      Slide Up Effect
                    </h3>
                  </div>

                  <p className="text-green-700/80 dark:text-green-300/90 text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
                    This content slides gracefully into view from below,
                    creating a smooth transition that guides the eye naturally
                    as you explore the page content.
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-4 relative z-10">
                    <span className="px-3 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      Smooth
                    </span>
                    <span className="px-3 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      Elegant
                    </span>
                    <span className="px-3 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      Natural
                    </span>
                  </div>
                </div>
              </ScrollAnimationTrigger>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default ScrollAnimationTriggerDemo;
