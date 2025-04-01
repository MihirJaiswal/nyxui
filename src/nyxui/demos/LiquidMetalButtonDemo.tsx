import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton"
import { Download, ArrowRight, Zap, ShoppingCart, CreditCard, Heart } from "lucide-react"

export function LiquidMetalButtonDemo() {
  return (
    <div className="space-y-12 p-8">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Liquid Metal Buttons</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Interactive buttons with realistic metal effects and fluid animations
        </p>
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          <LiquidMetalButton
            variant="mercury"
            theme="gold"
            size="xl"
            intensity={5}
            rounded="lg"
            shadow="xl"
          >
            <div className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              <span>Purchase Now</span>
            </div>
          </LiquidMetalButton>
          <LiquidMetalButton
            variant="ripple"
            theme="mercury"
            size="xl"
            intensity={4}
            rounded="lg"
            shadow="xl"
          >
            <div className="flex items-center">
              <ArrowRight className="ml-2 h-5 w-5" />
              <span>Get Started</span>
            </div>
          </LiquidMetalButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-gray-100 dark:bg-zinc-950 border p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Premium Finishes</h3>
          <div className="grid grid-cols-2 gap-8">
            <LiquidMetalButton variant="default" theme="gold" size="lg" rounded="md" textured={true}>
              <div className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                <span>Gold</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="default" theme="silver" size="lg" rounded="md" textured={true}>
              <div className="flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                <span>Silver</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="default" theme="copper" size="lg" rounded="md" textured={true}>
              <div className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                <span>Copper</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="default" theme="steel" size="lg" rounded="md" textured={true}>
              <div className="flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                <span>Steel</span>
              </div>
            </LiquidMetalButton>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-zinc-950 border p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Liquid Effects</h3>
          <div className="grid grid-cols-1 gap-8">
            <LiquidMetalButton variant="mercury" theme="mercury" size="lg" intensity={5} rounded="full">
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center">
                <Download className="mr-2 h-5 w-5 hidden md:block" />
                <span>Flow Effect</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="ripple" theme="steel" size="lg" intensity={4} rounded="md">
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center">
                <ShoppingCart className="mr-2 h-5 w-5 hidden md:block" />
                <span>Ripple Wave Effect</span>
              </div>
            </LiquidMetalButton>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-zinc-950 border p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Style Variations</h3>
          <div className="flex flex-wrap gap-5">
            <LiquidMetalButton variant="default" theme="obsidian" size="md">
              <div className="flex items-center">
                <span>Default</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="outline" theme="gold" size="md">
              <div className="flex items-center">
                <span>Outline</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="ghost" theme="silver" size="md">
              <div className="flex items-center">
                <span>Ghost</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="gradient" theme="sapphire" size="md">
              <div className="flex items-center">
                <span>Gradient</span>
              </div>
            </LiquidMetalButton>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900 p-6 rounded-lg shadow border">
        <div className="text-center space-y-3 mb-6">
          <h3 className="text-xl font-bold">Premium Collection</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
            Our most interactive buttons with full liquid metal effects
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <LiquidMetalButton variant="mercury" theme="gold" size="lg" intensity={5} shadow="lg" rounded="lg" textured={true}>
            <div className="flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              <span>Gold Premium</span>
            </div>
          </LiquidMetalButton>
          <LiquidMetalButton variant="ripple" theme="steel" size="lg" intensity={5} shadow="lg" rounded="lg" textured={true}>
            <div className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              <span>Steel Elite</span>
            </div>
          </LiquidMetalButton>
          <LiquidMetalButton variant="mercury" theme="mercury" size="lg" intensity={5} shadow="lg" rounded="lg" textured={true}>
            <div className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              <span>Mercury Pro</span>
            </div>
          </LiquidMetalButton>
        </div>
      </div>
    </div>
  )
}
