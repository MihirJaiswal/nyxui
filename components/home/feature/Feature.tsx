import { Copy, Zap } from "lucide-react";
import MusicCardThemeCustomizer from "./Customize";
import { Safari } from "./Browser";
import { CustomPointer } from "./CustomPointer";

export default function AnimatedComponentsShowcase() {
  return (
    <div className="w-full pt-16 pb-24 overflow-hidden px-6 xl:px-22 xl:container mx-auto">

      <div className="relative z-10 xl:container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8 sm:py-12 lg:py-16 dark:bg-neutral-950 dark:text-white border border-neutral-200 dark:border-neutral-800">
        <div className="absolute -top-0.5 left-0 w-4 z-12 h-0.5 border-t border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 -left-0.5 w-0.5 z-12 h-4 border-l border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 right-0 w-4 z-12 h-0.5 border-t border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 -right-0.5 w-0.5 z-12 h-4 border-r border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>

        <div className="absolute -bottom-0.5 left-0 w-4 z-12 h-0.5 border-b border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 -left-0.5 w-0.5 z-12 h-4 border-l border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 right-0 w-4 z-12 h-0.5 border-b border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 -right-0.5 w-0.5 z-12 h-4 border-r border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        {/* Mobile and Tablet Layout (stacked) */}
        <div className="block lg:hidden space-y-12 sm:space-y-16">
          {/* Left Section - Copy/Paste Components */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm">
              <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Copy/Paste Components</span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Polished{" "}
                <span className="relative inline-block tracking-tight dark:tracking-normal md:tracking-tighter md:dark:tracking-tight">
                  <span className="relative z-0 border border-purple-500 dark:border-purple-900  bg-purple-200 dark:bg-purple-800/40">
                    &lt;Component/&gt;
                    <div className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                    <div className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -right-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                  </span>
                </span>{" "}
                <span className="block sm:inline">
                  for elegant UIs and clean layouts
                </span>
              </h1>
            </div>

            <div className="space-y-4 relative w-full overflow-hidden">
              <Safari className="w-full h-auto max-w-full">
                <CustomPointer />
              </Safari>
            </div>
          </div>

          {/* Separator for mobile/tablet */}
          <div className="w-full h-[0.5px] bg-neutral-200 dark:bg-neutral-800"></div>

          {/* Right Section - Development Speed */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Development Speed</span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="relative inline-block tracking-tight dark:tracking-normal md:tracking-tighter md:dark:tracking-tight">
                  <span className="relative z-0 border border-pink-500 dark:border-pink-900 bg-pink-200 dark:bg-pink-800/40">
                    Customize
                    <div className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-pink-600 dark:bg-pink-900 rounded-full"></div>
                    <div className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-pink-600 dark:bg-pink-900 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-pink-600 dark:bg-pink-900 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -right-[2px] w-1 h-1 bg-pink-600 dark:bg-pink-900 rounded-full"></div>
                  </span>
                </span>{" "}
                <span className="block sm:inline">
                  with ease. Launch with speed.
                </span>
              </h2>
            </div>

            <div className="w-full overflow-hidden">
              <MusicCardThemeCustomizer />
            </div>
          </div>
        </div>

        {/* Desktop Layout (side by side) - Fixed Structure */}
        <div className="lg:grid lg:grid-cols-2 gap-16 items-start relative hidden ">
          {/* Left Section - Copy/Paste Components */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <Copy className="w-3 h-3" />
              <span>Copy/Paste Components</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                Polished &lt;{" "}
                <span className="relative inline-block tracking-tight dark:tracking-normal md:tracking-tighter md:dark:tracking-tight">
                  <span
                    className="absolute inset-0 z-10 filter contrast-150"
                    style={{
                      backgroundImage:
                        "url('/assets/images/landing-page/bg7.gif')",
                      backgroundSize: "contain",
                      backgroundPosition: "left top",
                      backgroundRepeat: "repeat",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      filter: "contrast(200%) brightness(1.2) saturate(1.5)",
                    }}
                  >
                    Components
                  </span>
                  <span
                    className="relative z-0 text-transparent"
                    style={{
                      textShadow:
                        "-0.5px -0.5px 0 #efcdfa, 0.5px -0.5px 0 #efcdfa, -0.5px 0.5px 0 #efcdfa, 0.5px 0.5px 0 #efcdfa",
                    }}
                  >
                    Components
                  </span>
                </span>{" "}
                /&gt; for elegant UIs and clean layouts
              </h1>
            </div>
            <div className="space-y-4 relative">
              <Safari className="w-full h-auto max-w-full">
                <CustomPointer />
              </Safari>
            </div>
          </div>

          {/* Vertical Divider - Only visible on large screens */}

          {/* Right Section - Development Speed */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <Zap className="w-3 h-3" />
              <span>Development Speed</span>
            </div>
            <div className="space-y-5">
              <h2 className="text-4xl font-bold leading-tight">
                <span className="relative inline-block tracking-tight dark:tracking-normal md:tracking-tighter md:dark:tracking-tight">
                  <span className="relative z-0 bg-purple-200 border border-purple-600 dark:border-purple-900 dark:bg-purple-800/40">
                    Customize
                    <div className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                    <div className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -right-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                  </span>
                </span>{" "}
                with ease. Launch with speed.
              </h2>
            </div>
            <div className="mt-2">
              <MusicCardThemeCustomizer />
            </div>
          </div>
        </div>
        <div className="hidden lg:block h-full w-[0.5px] bg-neutral-200 dark:bg-neutral-800 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
}
