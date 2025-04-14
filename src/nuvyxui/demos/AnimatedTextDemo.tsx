"use client"
import { useState } from "react"
import { AnimateText } from "@/nuvyxui/components/AnimatedText"
import { RotateCcw } from "lucide-react"

export const AnimationTextDemo = () => {
  const [key, setKey] = useState(0)
  
  const refreshAnimations = () => {
    setKey(prevKey => prevKey + 1)
  }

  return (
    <>
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="flex justify-center my-4 sm:my-6 md:my-8">
            <button 
              onClick={refreshAnimations}
              className="px-3 py-2 sm:px-4 sm:py-2 flex items-center gap-2 text-sm sm:text-base bg-white text-black border border-gray-600 rounded shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300"
              aria-label="Replay all animations"
            >
             <span> Replay Animations</span>
             <RotateCcw size={16} className="text-gray-700" />
            </button>
          </div>
          
          <div className="flex flex-col py-2 sm:py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300" key={`cascade-${key}`}>
                <p className="text-xs sm:text-sm font-semibold mb-2">Cascade</p>
                <div className="overflow-hidden">
                  <AnimateText text="Cascade" type="cascade" />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300" key={`flicker-${key}`}>
                <p className="text-xs sm:text-sm font-semibold mb-2">Flicker</p>
                <div className="overflow-hidden">
                  <AnimateText text="Flicker" type="flicker" />
                </div>
              </div>
              
              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300" key={`blink-${key}`}>
                <p className="text-xs sm:text-sm font-semibold mb-2">Blink</p>
                <div className="overflow-hidden">
                  <AnimateText text="Blink" type="blink" custom={1} />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300" key={`expand-${key}`}>
                <p className="text-xs sm:text-sm font-semibold mb-2">Expand</p>
                <div className="overflow-hidden">
                  <AnimateText text="Expand" type="expand" />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300" key={`rise-${key}`}>
                <p className="text-xs sm:text-sm font-semibold mb-2">Rise</p>
                <div className="overflow-hidden">
                  <AnimateText text="Rise" type="rise" />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300" key={`glide-${key}`}>
                <p className="text-xs sm:text-sm font-semibold mb-2">Glide</p>
                <div className="overflow-hidden">
                  <AnimateText text="Glide" type="glide" custom={1} />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300" key={`elastic-${key}`}>
                <p className="text-xs sm:text-sm font-semibold mb-2">Elastic</p>
                <div className="overflow-hidden">
                  <AnimateText text="Elastic" type="elastic" custom={1} />
                </div>
              </div>

              <div className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300" key={`float-${key}`}>
                <p className="text-xs sm:text-sm font-semibold mb-2">Float</p>
                <div className="overflow-hidden">
                  <AnimateText text="Float" type="float" custom={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}