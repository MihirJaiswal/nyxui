import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton"
import { Download, ArrowRight, Zap, ShoppingCart, CreditCard, Heart } from "lucide-react"

export function LiquidMetalButtonDemo() {
  return (
    <div className="space-y-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-950 rounded-xl">
      {/* Hero section with flagship buttons */}
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
            <div className="flex items-center"><CreditCard className="mr-2 h-5 w-5" /><span>Purchase Now</span></div>
          </LiquidMetalButton>

          <LiquidMetalButton
            variant="ripple"
            theme="mercury"
            size="xl"
            intensity={4}
            rounded="lg"
            shadow="xl"
          >
            <div className="flex items-center"><ArrowRight className="ml-2 h-5 w-5" /><span>Get Started</span></div>
          </LiquidMetalButton>
        </div>
      </div>

      {/* Showcase important variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {/* Premium metal themes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Premium Finishes</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <LiquidMetalButton
                variant="default"
                theme="gold"
                size="lg"
                rounded="md"
                textured={true}
                className="w-full"
              >
                <div className="flex items-center"><Heart className="mr-2 h-4 w-4" /><span>Gold</span></div>
              </LiquidMetalButton>
              
              <LiquidMetalButton
                variant="default"
                theme="silver"
                size="lg"
                rounded="md"
                textured={true}
                className="w-full"
              >
                <div className="flex items-center"><Zap className="mr-2 h-4 w-4" /><span>Silver</span></div>
              </LiquidMetalButton>
            </div>
            
            <div className="space-y-3">
              <LiquidMetalButton
                variant="default"
                theme="copper"
                size="lg"
                rounded="md"
                textured={true}
                className="w-full"
              >
                <div className="flex items-center"><Heart className="mr-2 h-4 w-4" /><span>Copper</span></div>
              </LiquidMetalButton>
              
              <LiquidMetalButton
                variant="default"
                theme="steel"
                size="lg"
                rounded="md"
                textured={true}
                className="w-full"
              >
                <div className="flex items-center"><Zap className="mr-2 h-4 w-4" /><span>Steel</span></div>
              </LiquidMetalButton>
            </div>
          </div>
        </div>

        {/* Interactive liquid effects */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Liquid Effects</h3>
          <div className="grid grid-cols-1 gap-4">
            <LiquidMetalButton
              variant="mercury"
              theme="mercury"
              size="lg"
              intensity={5}
              rounded="full"
              className="w-full"
            >
              <div className="flex items-center"><Download className="mr-2 h-5 w-5" /><span>Mercury Flow Effect</span></div>
            </LiquidMetalButton>
            
            <LiquidMetalButton
              variant="ripple"
              theme="steel"
              size="lg"
              intensity={4}
              rounded="md"
              className="w-full"
            >
              <div className="flex items-center"><ShoppingCart className="mr-2 h-5 w-5" /><span>Ripple Wave Effect</span></div>
            </LiquidMetalButton>
          </div>
        </div>
        
        {/* Button styles */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Style Variations</h3>
          <div className="flex flex-wrap gap-3">
            <LiquidMetalButton variant="default" theme="obsidian" size="md">
              <div className="flex items-center"><span>Default</span></div>
            </LiquidMetalButton>

            <LiquidMetalButton variant="outline" theme="gold" size="md">
              <div className="flex items-center"><span>Outline</span></div>
            </LiquidMetalButton>

            <LiquidMetalButton variant="ghost" theme="silver" size="md">
              <div className="flex items-center"><span>Ghost</span></div>
            </LiquidMetalButton>
            
            <LiquidMetalButton variant="gradient" theme="sapphire" size="md">
              <div className="flex items-center"><span>Gradient</span></div>
            </LiquidMetalButton>
          </div>
        </div>
        
        {/* Size and shape */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Sizes & Shapes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <LiquidMetalButton variant="default" theme="emerald" size="sm" rounded="sm">
              <div className="flex items-center"><span>Small</span></div>
            </LiquidMetalButton>

            <LiquidMetalButton variant="default" theme="ruby" size="md" rounded="md">
              <div className="flex items-center"><span>Medium</span></div>
            </LiquidMetalButton>

            <LiquidMetalButton variant="default" theme="sapphire" size="lg" rounded="lg">
              <div className="flex items-center"><span>Large</span></div>
            </LiquidMetalButton>

            <LiquidMetalButton variant="default" theme="obsidian" size="xl" rounded="full">
              <div className="flex items-center"><span>XL</span></div>
            </LiquidMetalButton>
          </div>
        </div>
      </div>
      
      {/* Premium showcase */}
      <div className="pt-6">
        <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 p-6 rounded-lg">
          <div className="text-center space-y-3 mb-6">
            <h3 className="text-xl font-bold">Premium Collection</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
              Our most interactive buttons with full liquid metal effects
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <LiquidMetalButton
              variant="mercury"
              theme="gold" 
              size="lg"
              intensity={5}
              shadow="lg"
              rounded="lg"
              textured={true}
            >
              <div className="flex items-center"><Heart className="mr-2 h-5 w-5" /><span>Gold Premium</span></div>
            </LiquidMetalButton>
            
            <LiquidMetalButton
              variant="ripple"
              theme="steel"
              size="lg" 
              intensity={5}
              shadow="lg"
              rounded="lg"
              textured={true}
            >
              <div className="flex items-center"><Zap className="mr-2 h-5 w-5" /><span>Steel Elite</span></div>
            </LiquidMetalButton>
            
            <LiquidMetalButton
              variant="mercury"
              theme="mercury"
              size="lg"
              intensity={5}
              shadow="lg"
              rounded="lg"
              textured={true}
            >
              <div className="flex items-center"><ShoppingCart className="mr-2 h-5 w-5" /><span>Mercury Pro</span></div>
            </LiquidMetalButton>
          </div>
        </div>
      </div>
    </div>
  )
}