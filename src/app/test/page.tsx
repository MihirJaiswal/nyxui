import { Button } from "@/components/ui/button";
import { GradientButton } from "@/nyxui/components/GradientButton";
import MorphingButton from "@/nyxui/components/MorphingButton";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <MorphingButton color="custom" className="bg-gradient-to-r from-purple-800 via-gray-800 to-fuchsia-800" >
            I love toy
        </MorphingButton>
    </div>
  )
}