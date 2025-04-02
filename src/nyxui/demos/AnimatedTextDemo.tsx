"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { AnimateText } from "@/nyxui/components/AnimatedText"

export const AnimationTextDemo = () => {
  const [key, setKey] = useState(0)
  
  const refreshAnimations = () => {
    setKey(prevKey => prevKey + 1)
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="flex justify-center mb-8">
            <button 
              onClick={refreshAnimations}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Replay Animations
            </button>
          </div>
          
          <div className="flex flex-col py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4" key={`cascade-${key}`}>
                <p className="text-sm font-semibold">Cascade</p>
                <div>
                  <AnimateText text="Cascade Animation" type="cascade" />
                </div>
              </div>

              <div className="border rounded-lg p-4" key={`flicker-${key}`}>
                <p className="text-sm font-semibold">Flicker</p>
                <div>
                  <AnimateText text="Flicker Animation" type="flicker" />
                </div>
              </div>
              
              <div className="border rounded-lg p-4" key={`blink-${key}`}>
                <p className="text-sm font-semibold">Blink</p>
                <div>
                  <AnimateText text="Blink Animation" type="blink" custom={1} />
                </div>
              </div>

              <div className="border rounded-lg p-4" key={`expand-${key}`}>
                <p className="text-sm font-semibold">Expand</p>
                <div>
                  <AnimateText text="Expand Animation" type="expand" />
                </div>
              </div>

              <div className="border rounded-lg p-4" key={`rise-${key}`}>
                <p className="text-sm font-semibold">Rise</p>
                <div>
                  <AnimateText text="Rise Animation" type="rise" />
                </div>
              </div>

              <div className="border rounded-lg p-4" key={`glide-${key}`}>
                <p className="text-sm font-semibold">Glide</p>
                <div>
                  <AnimateText text="Glide Animation" type="glide" custom={1} />
                </div>
              </div>

              <div className="border rounded-lg p-4" key={`elastic-${key}`}>
                <p className="text-sm font-semibold">Elastic</p>
                <div>
                  <AnimateText text="Elastic Animation" type="elastic" custom={1} />
                </div>
              </div>

              <div className="border rounded-lg p-4" key={`float-${key}`}>
                <p className="text-sm font-semibold">Float</p>
                <div>
                  <AnimateText text="Float Animation" type="float" custom={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}