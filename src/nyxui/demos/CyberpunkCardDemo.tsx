import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Cpu, Zap, Shield } from "lucide-react"

export const CyberpunkCardDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-3 rounded-xl">
      <CyberpunkCard theme="neon-blue" borderStyle="solid" className="h-full">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold tracking-tight">NEURAL INTERFACE</h3>
            <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">ONLINE</Badge>
          </div>
          <p className="text-sm text-blue-100/70">Advanced cybernetic enhancement for neural processing</p>
          <div className="flex items-center gap-2 mt-2">
            <Cpu className="w-4 h-4 text-blue-300" />
            <div className="h-1.5 bg-blue-900/50 rounded-full w-full">
              <div className="h-1.5 bg-blue-400 rounded-full w-3/4"></div>
            </div>
            <span className="text-xs font-medium text-blue-300">75%</span>
          </div>
          <Button className="mt-2 bg-blue-500/20 text-blue-100 hover:bg-blue-500/40 w-full justify-between">
            ACTIVATE <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CyberpunkCard>

      {/* Neon Pink Card */}
      <CyberpunkCard theme="neon-pink" borderStyle="glitch" className="h-full">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold tracking-tight">COMBAT SYSTEM</h3>
            <Badge className="bg-pink-500/20 text-pink-300 hover:bg-pink-500/30">ARMED</Badge>
          </div>
          <p className="text-sm text-pink-100/70">Military-grade tactical enhancement module</p>
          <div className="flex items-center gap-2 mt-2">
            <Zap className="w-4 h-4 text-pink-300" />
            <div className="h-1.5 bg-pink-900/50 rounded-full w-full">
              <div className="h-1.5 bg-pink-400 rounded-full w-4/5"></div>
            </div>
            <span className="text-xs font-medium text-pink-300">80%</span>
          </div>
          <Button className="mt-2 bg-pink-500/20 text-pink-100 hover:bg-pink-500/40 w-full justify-between">
            ENGAGE <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CyberpunkCard>

      {/* Neon Green Card */}
      <CyberpunkCard theme="neon-green" borderStyle="corners" className="h-full">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold tracking-tight">STEALTH SYSTEM</h3>
            <Badge className="bg-green-500/20 text-green-300 hover:bg-green-500/30">ACTIVE</Badge>
          </div>
          <p className="text-sm text-green-100/70">Optical camouflage and sound dampening technology</p>
          <div className="flex items-center gap-2 mt-2">
            <Shield className="w-4 h-4 text-green-300" />
            <div className="h-1.5 bg-green-900/50 rounded-full w-full">
              <div className="h-1.5 bg-green-400 rounded-full w-3/5"></div>
            </div>
            <span className="text-xs font-medium text-green-300">60%</span>
          </div>
          <Button className="mt-2 bg-green-500/20 text-green-100 hover:bg-green-500/40 w-full justify-between">
            CLOAK <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CyberpunkCard>

      {/* Neon Purple Card */}
      <CyberpunkCard theme="neon-purple" borderStyle="dashed" className="h-full">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold tracking-tight">HACKING SUITE</h3>
            <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">READY</Badge>
          </div>
          <p className="text-sm text-purple-100/70">Advanced intrusion and security bypass tools</p>
          <div className="flex items-center gap-2 mt-2">
            <Cpu className="w-4 h-4 text-purple-300" />
            <div className="h-1.5 bg-purple-900/50 rounded-full w-full">
              <div className="h-1.5 bg-purple-400 rounded-full w-9/10"></div>
            </div>
            <span className="text-xs font-medium text-purple-300">90%</span>
          </div>
          <Button className="mt-2 bg-purple-500/20 text-purple-100 hover:bg-purple-500/40 w-full justify-between">
            BREACH <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CyberpunkCard>
    </div>
  )
}

