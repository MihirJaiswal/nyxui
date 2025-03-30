import { DynamicRipple } from "@/nyxui/components/DynamicRipple"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplets, Waves, Sparkles } from "lucide-react"

export function DynamicRippleDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <DynamicRipple theme="blue" intensity={3} speed={3} className="p-6 h-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Water Ripple Effect</h3>
            </div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Interactive</Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Move your cursor over this card to create dynamic water ripple effects. Perfect for creating engaging UI
            elements.
          </p>
          <div className="flex justify-end mt-2">
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700">
              Explore Effect
            </Button>
          </div>
        </div>
      </DynamicRipple>

      {/* Purple Theme Card */}
      <DynamicRipple theme="purple" intensity={4} speed={2} className="p-6 h-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold">Cosmic Waves</h3>
            </div>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">High Intensity</Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            A more intense ripple effect with slower speed, creating a cosmic wave-like animation that reacts to your
            movements.
          </p>
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
            >
              Try It Out
            </Button>
          </div>
        </div>
      </DynamicRipple>

      {/* Green Theme Card */}
      <DynamicRipple theme="green" intensity={2} speed={4} rounded="xl" className="p-6 h-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">Nature Pulse</h3>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Fast</Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            A subtle but fast ripple effect that mimics the gentle pulse of nature. Lower intensity with higher speed.
          </p>
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              Experience
            </Button>
          </div>
        </div>
      </DynamicRipple>

      {/* Amber Theme Card */}
      <DynamicRipple theme="amber" intensity={5} speed={5} rounded="full" className="p-6 h-full">
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="flex flex-col items-center gap-2">
            <Droplets className="w-8 h-8 text-amber-500" />
            <h3 className="text-lg font-semibold">Maximum Energy</h3>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Extreme</Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            The most intense and fastest ripple effect, creating an energetic and dynamic interaction experience.
          </p>
          <div className="mt-2">
            <Button
              variant="outline"
              className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
            >
              Feel The Energy
            </Button>
          </div>
        </div>
      </DynamicRipple>
    </div>
  )
}

