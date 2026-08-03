import { Terminal } from "lucide-react";
import { CyberpunkCard } from "@/registry/ui/cyberpunk-card";
import Image from "next/image";

export default function CyberpunkCardDemo1() {
  return (
    <div className="flex w-full justify-center py-4">
      <CyberpunkCard
        theme="custom"
        borderStyle="circuit"
        backgroundEffect="particles"
        glowIntensity={5}
        customColors={{
          primary: "#7A00DF",
          secondary: "#8C024E",
          accent: "#C08CEB",
        }}
        colorShift={true}
        lightTrail={true}
        className="w-full max-w-sm font-mono group/card !p-3.5"
      >
        <div className="space-y-4 sm:space-y-5">
          {/* Header */}
          <div className="relative overflow-hidden rounded-lg border border-purple-400/20 bg-purple-900/80 px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-purple-400/10 to-transparent" />
            <div className="relative flex items-center gap-3 sm:gap-4">
              <div className="rounded-lg border border-purple-400/20 bg-purple-800/50 p-2">
                <Terminal className="h-5 w-5 text-purple-200 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text font-bold tracking-widest text-transparent text-sm md:text-base">
                  NEURAL HACKING
                </h3>
                <div className="text-xs tracking-wider text-purple-300/80">
                  v2.7.3-BETA
                </div>
              </div>
            </div>
          </div>

          {/* System Integrity */}
          <div className="space-y-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold tracking-wider text-purple-200">
                SYSTEM INTEGRITY
              </span>
              <span className="text-sm font-mono text-purple-300">75.3%</span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full border border-purple-500/20 bg-purple-950/80">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
              <div
                className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300"
                style={{ width: "75.3%" }}
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-1 animate-pulse bg-white/80" />
              </div>
            </div>
          </div>

          {/* Terminal Window */}
          <div className="group/term relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600/10 to-cyan-600/10 blur-xl transition-all duration-300 group-hover/term:blur-2xl" />
            <div className="relative overflow-hidden rounded-xl border border-purple-400/20 bg-purple-950/60 p-3 backdrop-blur-sm sm:p-4">
              <div
                className="absolute inset-0 rounded-xl opacity-5"
                style={{
                  backgroundSize: "15px 15px",
                  backgroundImage:
                    "linear-gradient(to right, rgb(168, 85, 247) 1px, transparent 1px), linear-gradient(to bottom, rgb(168, 85, 247) 1px, transparent 1px)",
                }}
              />
              <div className="absolute left-4 top-2.5 flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </div>

              <div className="relative pt-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                  <Image
                    src="/assets/images/cyberpunk-card/img2.jpg"
                    alt="Neural Interface Display"
                    fill
                    className="grayscale transition-all duration-400 group-hover/card:grayscale-0 object-cover"
                    quality={100}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-purple-950/60 to-transparent" />
                </div>

                <div className="relative pt-3">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-purple-200">
                        <span className="tracking-wider">
                          CONNECTION STATUS:
                        </span>
                      </div>
                      <div className="flex w-full items-end justify-between gap-2">
                        <div className="flex items-center gap-3 rounded-lg border border-green-400/30 bg-gradient-to-r from-green-900/40 to-emerald-800/40 px-3 py-2">
                          <span className="text-xs font-bold tracking-wider text-green-300">
                            SECURED/ENCRYPTED
                          </span>
                        </div>
                        <div className="flex h-8 items-end gap-1">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 rounded-sm bg-gradient-to-t ${
                                i < 4
                                  ? "from-green-600 to-green-400"
                                  : i < 6
                                    ? "from-yellow-600 to-yellow-400"
                                    : "from-red-600 to-red-400"
                              } ${i < 9 ? "animate-pulse" : ""}`}
                              style={{ height: `${(i + 1) * 8}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CyberpunkCard>
    </div>
  );
}
