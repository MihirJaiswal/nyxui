import { MorphingBlob } from "@/nyxui/components/MorphingBlob"
import { Sparkles, Zap, Atom, Brain } from "lucide-react"

export const MorphingBlobDemo = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-black rounded-xl">
      {/* Basic Morphing Blobs Section */}
      <div className="flex flex-col items-center gap-2 sm:gap-4">
        <h3 className="text-base sm:text-lg font-semibold text-center">Basic Morphing Blobs</h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mb-2 sm:mb-4 px-2">
          Hover and click to see different states
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          <MorphingBlob theme="primary" size="sm" complexity={2}>
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </MorphingBlob>
          
          <MorphingBlob theme="secondary" size="sm" complexity={3}>
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </MorphingBlob>
          
          <MorphingBlob theme="accent" size="sm" complexity={4}>
            <Atom className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </MorphingBlob>
        </div>
      </div>
      
      {/* Complex Morphing Blobs Section */}
      <div className="flex flex-col items-center gap-2 sm:gap-4 mt-6 lg:mt-0">
        <h3 className="text-base sm:text-lg font-semibold text-center">Complex Morphing Blobs</h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mb-2 sm:mb-4 px-2">
          Different complexity and speed settings
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
          <MorphingBlob theme="success" size="md" complexity={5} speed={5} glowIntensity={4}>
            <div className="text-center">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm font-medium">AI Powered</p>
            </div>
          </MorphingBlob>
          
          <MorphingBlob theme="danger" size="md" complexity={4} speed={2} pulse>
            <div className="text-center">
              <Atom className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm font-medium">Quantum</p>
            </div>
          </MorphingBlob>
        </div>
      </div>
      
      {/* Feature Showcase Section - Full Width */}
      <div className="flex flex-col items-center gap-2 sm:gap-4 mt-6 col-span-1 lg:col-span-2">
        <h3 className="text-base sm:text-lg font-semibold text-center">Feature Showcase</h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mb-2 sm:mb-4 px-2">
          Morphing blobs can be used as interactive backgrounds or UI elements
        </p>
        
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 md:gap-8">
          <MorphingBlob theme="warning" size="lg" complexity={3} speed={3} glowIntensity={5}>
            <div className="text-center max-w-[140px] sm:max-w-[160px] md:max-w-[180px]">
              <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Feature Highlight</h4>
              <p className="text-xs sm:text-sm">Use morphing blobs to create engaging, dynamic UI elements</p>
            </div>
          </MorphingBlob>
          
          <MorphingBlob
            theme="custom"
            customColors={{
              from: "#FF6B6B",
              via: "#FFD166",
              to: "#06D6A0",
            }}
            size="lg"
            complexity={4}
            speed={4}
          >
            <div className="text-center max-w-[140px] sm:max-w-[160px] md:max-w-[180px]">
              <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Custom Colors</h4>
              <p className="text-xs sm:text-sm">Create your own color schemes with custom gradients</p>
            </div>
          </MorphingBlob>
        </div>
      </div>
    </div>
  )
}