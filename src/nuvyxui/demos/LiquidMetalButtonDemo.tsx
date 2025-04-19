import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
import {
  Download,
  ArrowRight,
  Zap,
  ShoppingCart,
  CreditCard,
  Heart,
} from "lucide-react";

export function LiquidMetalButtonDemo() {
  return (
    <div className="space-y-8 md:space-y-12 p-4 md:p-8">
      <div className="text-center space-y-4 md:space-y-6">
        <h2 className="text-xl md:text-2xl font-bold">Liquid Metal Buttons</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-lg mx-auto px-2">
          Interactive buttons with realistic metal effects and fluid animations
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 pt-2 md:pt-4">
          <LiquidMetalButton
            variant="mercury"
            theme="gold"
            size="lg"
            intensity={5}
            rounded="lg"
            shadow="xl"
          >
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Purchase Now</span>
            </div>
          </LiquidMetalButton>
          <LiquidMetalButton
            variant="ripple"
            theme="mercury"
            size="lg"
            intensity={4}
            rounded="lg"
            shadow="xl"
          >
            <div className="flex items-center">
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Get Started</span>
            </div>
          </LiquidMetalButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-8">
        <div className="bg-gray-100 dark:bg-zinc-950 border p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-base md:text-lg font-semibold border-b pb-2 mb-3 md:mb-4">
            Premium Finishes
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-8">
            <LiquidMetalButton
              variant="default"
              theme="gold"
              size="md"
              rounded="md"
              textured={true}
            >
              <div className="flex items-center">
                <Heart className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="text-sm md:text-base">Gold</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton
              variant="default"
              theme="silver"
              size="md"
              rounded="md"
              textured={true}
            >
              <div className="flex items-center">
                <Zap className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="text-sm md:text-base">Silver</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton
              variant="default"
              theme="copper"
              size="md"
              rounded="md"
              textured={true}
            >
              <div className="flex items-center">
                <Heart className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="text-sm md:text-base">Copper</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton
              variant="default"
              theme="steel"
              size="md"
              rounded="md"
              textured={true}
            >
              <div className="flex items-center">
                <Zap className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="text-sm md:text-base">Steel</span>
              </div>
            </LiquidMetalButton>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-zinc-950 border p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-base md:text-lg font-semibold border-b pb-2 mb-3 md:mb-4">
            Liquid Effects
          </h3>
          <div className="grid grid-cols-1 gap-4 md:gap-8">
            <LiquidMetalButton
              variant="mercury"
              theme="mercury"
              size="md"
              intensity={5}
              rounded="full"
            >
              <div className="flex items-center justify-center">
                <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                <span className="text-sm md:text-base">Flow Effect</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton
              variant="ripple"
              theme="steel"
              size="md"
              intensity={4}
              rounded="md"
            >
              <div className="flex items-center justify-center">
                <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                <span className="text-sm md:text-base">Ripple Wave Effect</span>
              </div>
            </LiquidMetalButton>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-zinc-950 border p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-base md:text-lg font-semibold border-b pb-2 mb-3 md:mb-4">
            Style Variations
          </h3>
          <div className="grid grid-cols-2 md:flex flex-wrap gap-2 md:gap-5 justify-center">
            <LiquidMetalButton variant="default" theme="obsidian" size="sm">
              <div className="flex items-center">
                <span className="text-xs md:text-sm">Default</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="outline" theme="gold" size="sm">
              <div className="flex items-center">
                <span className="text-xs md:text-sm">Outline</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="ghost" theme="silver" size="sm">
              <div className="flex items-center">
                <span className="text-xs md:text-sm">Ghost</span>
              </div>
            </LiquidMetalButton>
            <LiquidMetalButton variant="gradient" theme="sapphire" size="sm">
              <div className="flex items-center">
                <span className="text-xs md:text-sm">Gradient</span>
              </div>
            </LiquidMetalButton>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900 p-4 md:p-6 rounded-lg shadow border">
        <div className="text-center space-y-2 md:space-y-3 mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-bold">Premium Collection</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-xs md:text-sm px-2">
            Our most interactive buttons with full liquid metal effects
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6">
          <LiquidMetalButton
            variant="mercury"
            theme="gold"
            size="md"
            intensity={5}
            shadow="lg"
            rounded="lg"
            textured={true}
          >
            <div className="flex items-center">
              <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Gold Premium</span>
            </div>
          </LiquidMetalButton>
          <LiquidMetalButton
            variant="ripple"
            theme="steel"
            size="md"
            intensity={5}
            shadow="lg"
            rounded="lg"
            textured={true}
          >
            <div className="flex items-center">
              <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Steel Elite</span>
            </div>
          </LiquidMetalButton>
          <LiquidMetalButton
            variant="mercury"
            theme="mercury"
            size="md"
            intensity={5}
            shadow="lg"
            rounded="lg"
            textured={true}
          >
            <div className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base">Mercury Pro</span>
            </div>
          </LiquidMetalButton>
        </div>
      </div>
    </div>
  );
}
