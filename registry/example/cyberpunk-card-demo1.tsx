import { Terminal, Zap, Shield, Activity, Database, Cpu } from "lucide-react"
import { CyberpunkCard } from "../ui/cyberpunk-card"
import Image from "next/image"

export default function CyberpunkCardDemo1() {
  return (
    <CyberpunkCard
    theme="custom"
      borderStyle="circuit"
      backgroundEffect="particles"
      glowIntensity={5}
      customColors= {{
        primary: '#7A00DF',
        secondary:'#8C024E',
        accent: '#C08CEB'
      }}
      colorShift={true}
      lightTrail={true}
      className="lg:scale-85 font-mono"
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="relative bg-gradient-to-r from-purple-900/90 via-purple-900/90 to-purple-900/90 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-purple-400/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent animate-pulse"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative p-2 bg-purple-800/50 rounded-lg border border-purple-400/30">
                <Terminal className="w-5 h-5 sm:w-7 sm:h-7 text-purple-200" />
                <div className="absolute -top-1 -right-1 flex">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></span>
                  <span className="absolute w-2 h-2 bg-purple-300 rounded-full"></span>
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200">
                  NEURAL HACKING SUITE
                </h3>
                <div className="text-xs text-purple-300/80 tracking-wider">v2.7.3-BETA</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="px-3 py-1.5 bg-gradient-to-r from-green-900/40 to-emerald-800/40 rounded-full text-xs border border-green-400/40 flex items-center gap-2 backdrop-blur-sm">
                <div className="relative">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                </div>
                <span className="text-green-300 font-bold tracking-wider">ONLINE</span>
              </div>
              <div className="text-xs text-purple-300/60">NODE: 0x7F3A</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-purple-200 tracking-wider">SYSTEM INTEGRITY</span>
              <span className="text-sm font-mono text-purple-300">75.3%</span>
            </div>
            <div className="relative w-full h-3 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 rounded-full overflow-hidden border border-purple-600/30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse"></div>
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300 rounded-full relative overflow-hidden"
                style={{ width: "75.3%" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/80 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs font-mono">
            <div className="text-center">
              <div className="text-purple-300/80">UPTIME</div>
              <div className="text-purple-100 font-bold">13:42:06</div>
            </div>
            <div className="text-center">
              <div className="text-purple-300/80">THREATS</div>
              <div className="text-red-400 font-bold animate-pulse">0 ACTIVE</div>
            </div>
            <div className="text-center">
              <div className="text-purple-300/80">BANDWIDTH</div>
              <div className="text-cyan-400 font-bold">847 MB/s</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-purple-950/80 to-purple-900/60 p-4 rounded-xl border border-purple-400/30 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-2 left-2 flex gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="absolute top-2 right-2 text-xs text-purple-300/60 font-mono">IMG_7F3A.dat</div>

              <div className="mt-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent rounded-lg"></div>
                <Image
                  src="/assets/images/cyberpunk-card/img2.jpg"
                  alt="Neural Interface Display"
                  width={400}
                  height={350}
                  className="object-cover rounded-lg border max-h-84 border-purple-500/30"
                  quality={100}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-lg"></div>
                <div className="absolute bottom-2 left-2 text-xs text-purple-200 font-mono">SCAN_COMPLETE</div>
              </div>
            </div>
          </div>

          {/* Enhanced Control Panel */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-900/90 to-purple-800/70 p-4 rounded-xl border border-purple-400/30 backdrop-blur-sm h-full">
              <div
                className="absolute inset-0 opacity-5 rounded-xl"
                style={{
                  backgroundSize: "15px 15px",
                  backgroundImage:
                    "linear-gradient(to right, rgb(168, 85, 247) 1px, transparent 1px), linear-gradient(to bottom, rgb(168, 85, 247) 1px, transparent 1px)",
                }}
              ></div>

              <div className="relative space-y-4">
                {/* Connection Status */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-purple-200">
                    <Shield className="w-4 h-4" />
                    <span className="tracking-wider">CONNECTION STATUS:</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-green-900/40 to-emerald-800/40 px-3 py-2 rounded-lg border border-green-400/30">
                    <div className="relative">
                      <Zap className="w-4 h-4 text-green-400 animate-pulse" />
                    </div>
                    <span className="text-green-300 font-bold tracking-wider">SECURED & ENCRYPTED</span>
                  </div>
                </div>

                {/* Target Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-purple-200">
                    <Database className="w-4 h-4" />
                    <span className="tracking-wider">PRIMARY TARGET:</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-900/40 to-orange-800/40 px-3 py-2 rounded-lg border border-red-400/30">
                    <div className="text-red-300 font-mono text-sm animate-pulse">{">>"} ARASAKA_MAINFRAME.db</div>
                    <div className="text-xs text-red-400/80 mt-1">SECURITY_LEVEL: MAXIMUM</div>
                  </div>
                </div>

                {/* Network Metrics */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-purple-200">
                    <Activity className="w-4 h-4" />
                    <span className="tracking-wider">NETWORK METRICS:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-purple-800/30 px-2 py-2 rounded border border-purple-500/30">
                      <div className="text-purple-300">LATENCY</div>
                      <div className="text-cyan-400 font-mono font-bold">127ms</div>
                    </div>
                    <div className="bg-purple-800/30 px-2 py-2 rounded border border-purple-500/30">
                      <div className="text-purple-300">STABILITY</div>
                      <div className="text-green-400 font-mono font-bold">99.7%</div>
                    </div>
                  </div>
                </div>

                {/* Signal Strength Visualization */}
                <div className="space-y-2">
                  <div className="text-xs text-purple-300 tracking-wider">SIGNAL STRENGTH:</div>
                  <div className="flex items-end gap-1 h-8">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 bg-gradient-to-t rounded-sm ${
                          i < 9
                            ? "from-green-600 to-green-400"
                            : i < 11
                              ? "from-yellow-600 to-yellow-400"
                              : "from-red-600 to-red-400"
                        } ${i < 9 ? "animate-pulse" : ""}`}
                        style={{ height: `${(i + 1) * 8}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer Status */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"></div>
          <div className="relative flex flex-wrap justify-between items-center text-xs font-mono pt-3 border-t border-purple-400/30">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-800/40 to-purple-700/40 rounded-full border border-purple-500/30">
                <Shield className="w-3 h-3 text-purple-400" />
                <span className="text-purple-200">ICE: 3/7</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-800/40 to-cyan-700/40 rounded-full border border-cyan-500/30">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span className="text-cyan-200">CPU: 42%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-800/40 to-pink-700/40 rounded-full border border-pink-500/30">
                <Activity className="w-3 h-3 text-pink-400" />
                <span className="text-pink-200">RAM: 67%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-bold tracking-wider animate-pulse">NEURAL_LINK_ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </CyberpunkCard>
  )
}
