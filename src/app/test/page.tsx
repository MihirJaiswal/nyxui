'use client'

import { GradientButton } from "@/nyxui/components/GradientButton";
import MorphingButton from "@/nyxui/components/MorphingButton";

const page = () => {
    return (
        <div className="min-h-screen">
            <GradientButton theme="custom" size="lg" variant="pulse" customGradient="bg-gradient-to-r  from-amber-500 via-orange-600 to-pink-500"  >
                chicken
            </GradientButton>
            <MorphingButton variant="liquid" color="custom" className="bg-red-500 w-96 " >
                paneer
            </MorphingButton>
        </div>
    )
}

export default page;