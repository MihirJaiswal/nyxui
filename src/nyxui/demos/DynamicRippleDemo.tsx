import { DynamicRipple } from "@/nyxui/components/DynamicRipple"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplets, Waves, Sparkles } from "lucide-react"

export function DynamicRippleDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">
      {/* Blue Theme Card */}
      <DynamicRipple theme="blue" intensity={3} speed={3} className="p-4 sm:p-6 h-full">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <h3 className="text-base sm:text-lg font-semibold">Water Ripple Effect</h3>
            </div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs sm:text-sm">Interactive</Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Move your cursor over this card to create dynamic water ripple effects. Perfect for creating engaging UI
            elements.
          </p>
          <div className="flex justify-end mt-1 sm:mt-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 text-xs sm:text-sm"
            >
              Explore Effect
            </Button>
          </div>
        </div>
      </DynamicRipple>

      {/* Purple Theme Card */}
      <DynamicRipple theme="purple" intensity={4} speed={2} className="p-4 sm:p-6 h-full">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <h3 className="text-base sm:text-lg font-semibold">Cosmic Waves</h3>
            </div>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs sm:text-sm">High Intensity</Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            A more intense ripple effect with slower speed, creating a cosmic wave-like animation that reacts to your
            movements.
          </p>
          <div className="flex justify-end mt-1 sm:mt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700 text-xs sm:text-sm"
            >
              Try It Out
            </Button>
          </div>
        </div>
      </DynamicRipple>

      {/* Green Theme Card */}
      <DynamicRipple theme="green" intensity={2} speed={4} rounded="xl" className="p-4 sm:p-6 h-full">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              <h3 className="text-base sm:text-lg font-semibold">Nature Pulse</h3>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs sm:text-sm">Fast</Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            A subtle but fast ripple effect that mimics the gentle pulse of nature. Lower intensity with higher speed.
          </p>
          <div className="flex justify-end mt-1 sm:mt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 text-xs sm:text-sm"
            >
              Experience
            </Button>
          </div>
        </div>
      </DynamicRipple>

      {/* Amber Theme Card */}
      <DynamicRipple theme="amber" intensity={5} speed={5} rounded="full" className="p-4 sm:p-6 h-full">
        <div className="flex flex-col gap-3 sm:gap-4 items-center text-center">
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
            <h3 className="text-base sm:text-lg font-semibold">Maximum Energy</h3>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs sm:text-sm">Extreme</Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            The most intense and fastest ripple effect, creating an energetic and dynamic interaction experience.
          </p>
          <div className="mt-1 sm:mt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 text-xs sm:text-sm"
            >
              Feel The Energy
            </Button>
          </div>
        </div>
      </DynamicRipple>
    </div>
  )
}