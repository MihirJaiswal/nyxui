import { MorphingBlob } from "@/nyxui/components/MorphingBlob"
import { Sparkles, Zap, Atom, Brain, Code, Workflow } from "lucide-react"

export const MorphingBlobDemo = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      <div className="relative mb-8 md:mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Morphing Blob Components
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Interactive, customizable fluid elements that add dynamic motion to your interface
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 relative">
        <div className="rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800 transition-all hover:shadow-lg flex flex-col items-center">
          <h3 className="text-lg md:text-xl font-semibold mb-3 flex items-center">
            <Code className="mr-2 text-primary" size={20} />
            Basic Components
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Simple, lightweight blobs with various themes and complexities
          </p>
          
          <div className="flex flex-wrap justify-center gap-5 md:gap-6">
            <div className="group">
              <MorphingBlob theme="primary" size="sm" complexity={2}>
                <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
              </MorphingBlob>
              <p className="mt-2 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">Primary</p>
            </div>
            
            <div className="group">
              <MorphingBlob theme="secondary" size="sm" complexity={3}>
                <Zap className="h-5 w-5 md:h-6 md:w-6" />
              </MorphingBlob>
              <p className="mt-2 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">Secondary</p>
            </div>
            
            <div className="group">
              <MorphingBlob theme="accent" size="sm" complexity={4}>
                <Atom className="h-5 w-5 md:h-6 md:w-6" />
              </MorphingBlob>
              <p className="mt-2 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">Accent</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800 transition-all hover:shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-center flex items-center">
            <Workflow className="mr-2 text-secondary" size={20} />
            Advanced Options
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Enhanced blobs with custom complexity, speed and glow effects
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <MorphingBlob theme="success" size="md" complexity={5} speed={5} glowIntensity={4}>
              <div className="text-center">
                <Brain className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2" />
                <p className="text-xs md:text-sm font-medium">AI Powered</p>
              </div>
            </MorphingBlob>
            
            <MorphingBlob theme="danger" size="md" complexity={4} speed={2} pulse>
              <div className="text-center">
                <Atom className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2" />
                <p className="text-xs md:text-sm font-medium">Quantum</p>
              </div>
            </MorphingBlob>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-12 lg:mt-16 relative">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Feature Showcase</h3>  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="flex justify-center">
            <MorphingBlob 
              theme="warning" 
              size="lg" 
              complexity={3} 
              speed={3} 
              glowIntensity={5}
            >
              <div className="text-center max-w-[180px]">
                <h4 className="text-lg md:text-xl font-bold mb-2">Feature Highlight</h4>
                <p className="text-xs md:text-sm">Create engaging, dynamic UI elements that respond to user interaction</p>
              </div>
            </MorphingBlob>
          </div>
          
          <div className="flex justify-center">
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
              <div className="text-center max-w-[180px]">
                <h4 className="text-lg md:text-xl font-bold mb-2">Custom Colors</h4>
                <p className="text-xs md:text-sm">Define your own gradient color schemes to match your brand identity</p>
              </div>
            </MorphingBlob>
          </div>
          
          <div className="flex justify-center sm:col-span-2 lg:col-span-1">
            <MorphingBlob
              theme="custom"
              customColors={{
                from: "#8B5CF6",
                via: "#3B82F6",
                to: "#06B6D4",
              }}
              size="lg"
              complexity={5}
              speed={3}
              glowIntensity={4}
            >
              <div className="text-center max-w-[180px]">
                <h4 className="text-lg md:text-xl font-bold mb-2">Responsive Design</h4>
                <p className="text-xs md:text-sm">Blobs adapt seamlessly to different screen sizes and device types</p>
              </div>
            </MorphingBlob>
          </div>
        </div>
      </div>
    </div>
  )
}