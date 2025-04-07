'use client'

import { GradientButton } from "@/nyxui/components/GradientButton";
import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
import MorphingButton from "@/nyxui/components/MorphingButton";

const page = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-20 gap-4">
            <GradientButton theme="custom" size="lg" variant="pulse" customGradient="bg-gradient-to-r  from-amber-500 via-orange-600 to-pink-500"  >
                chicken
            </GradientButton>
            <MorphingButton variant="liquid" color="custom" className="bg-red-500 w-96 " >
                paneer
            </MorphingButton>
            <LiquidMetalButton variant="ripple" theme="custom" className="px-4 w-96 bg-red-800">
                boobs
            </LiquidMetalButton>
        </div>
    )
}

export default page;