import { MorphingBlob } from "@/nyxui/components/MorphingBlob"
import { Sparkles, Zap, Atom, Brain } from "lucide-react"

export function MorphingBlobDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold">Basic Morphing Blobs</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
          Hover and click to see different states
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <MorphingBlob theme="primary" size="sm" complexity={2}>
            <Sparkles className="h-6 w-6" />
          </MorphingBlob>

          <MorphingBlob theme="secondary" size="sm" complexity={3}>
            <Zap className="h-6 w-6" />
          </MorphingBlob>

          <MorphingBlob theme="accent" size="sm" complexity={4}>
            <Atom className="h-6 w-6" />
          </MorphingBlob>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold">Complex Morphing Blobs</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
          Different complexity and speed settings
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <MorphingBlob theme="success" size="md" complexity={5} speed={5} glowIntensity={4}>
            <div className="text-center">
              <Brain className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">AI Powered</p>
            </div>
          </MorphingBlob>

          <MorphingBlob theme="danger" size="md" complexity={4} speed={2} pulse>
            <div className="text-center">
              <Atom className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Quantum</p>
            </div>
          </MorphingBlob>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 col-span-1 md:col-span-2">
        <h3 className="text-lg font-semibold">Feature Showcase</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
          Morphing blobs can be used as interactive backgrounds or UI elements
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          <MorphingBlob theme="warning" size="lg" complexity={3} speed={3} glowIntensity={5}>
            <div className="text-center max-w-[180px]">
              <h4 className="text-xl font-bold mb-2">Feature Highlight</h4>
              <p className="text-sm">Use morphing blobs to create engaging, dynamic UI elements</p>
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
            <div className="text-center max-w-[180px]">
              <h4 className="text-xl font-bold mb-2">Custom Colors</h4>
              <p className="text-sm">Create your own color schemes with custom gradients</p>
            </div>
          </MorphingBlob>
        </div>
      </div>
    </div>
  )
}

