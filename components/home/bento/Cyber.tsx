import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CyberpunkCard } from '@/registry/ui/cyberpunk-card'
import { ChevronRight, Cpu, Shield, Zap } from 'lucide-react'
import React from 'react'

export default function Cyber() {
  return (
    <div className='h-72'>
      <div className='absolute -bottom-16 right-0'>
        <CyberpunkCard
          theme="neon-purple"
          colorShift
          borderStyle="circuit"
          backgroundEffect="circuit"
          className="h-full transition-transform duration-200"
        >
          <div className="flex flex-col gap-2 p-1 w-full max-w-xs sm:max-w-none sm:w-80">
            <div className="flex justify-between items-start">
              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                David
              </h3>
              <Badge className="bg-purple-500/20 text-purple-100 hover:bg-purple-500/30 text-xs">
                Edgerunner
              </Badge>
            </div>

            <div className="relative h-24 w-62 md:w-80 md:h-40 mx-auto z-20">
            <div className="w-full h-full bg-[url('/assets/images/cyberpunk-card/david.jpg')] bg-cover bg-center rounded-lg" />
          </div>

            <p className="text-xs text-gray-50 my-2 sm:my-3">
              Advanced cybernetic enhancement module for combat performance
            </p>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-100" />
                <div className="h-1 sm:h-1.5 bg-purple-800 rounded-full w-full">
                  <div className="h-full bg-gradient-to-r from-purple-200 to-purple-300 rounded-full w-3/4"></div>
                </div>
                <span className="text-xs font-medium text-purple-200">75%</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-purple-100" />
                <div className="h-1 sm:h-1.5 bg-purple-800 rounded-full w-full">
                  <div className="h-full bg-gradient-to-r from-purple-200 to-purple-300 rounded-full w-4/5"></div>
                </div>
                <span className="text-xs font-medium text-purple-200">80%</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-purple-100" />
                <div className="h-1 sm:h-1.5 bg-purple-800 rounded-full w-full">
                  <div className="h-full bg-gradient-to-r from-purple-200 to-purple-300 rounded-full w-5/6"></div>
                </div>
                <span className="text-xs font-medium text-purple-300">85%</span>
              </div>
            </div>

            <Button className="mt-1 bg-purple-500/20 text-purple-100 hover:bg-purple-500/40 w-full justify-between text-xs sm:text-sm py-1.5 sm:py-2">
              ENGAGE <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </CyberpunkCard>
      </div>
    </div>
  )
}