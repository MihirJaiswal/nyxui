import { MorphingButton } from "@/nuvyxui/components/MorphingButton";
import { ArrowRight, Heart, Plus } from "lucide-react";

export const MorphingButtonDemo = () => {
  return (
    <div className="space-y-4 p-3">
      <div className="flex gap-5 flex-wrap">
        <MorphingButton 
          variant="expand"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 hover:shadow-lg rounded-lg"
        >
          Expand Button
        </MorphingButton>

        <MorphingButton
          variant="collapse"
          icon={<ArrowRight />}
          iconPosition="right"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 rounded-lg"
        >
          Collapse Button
        </MorphingButton>

        <MorphingButton
          variant="rotate"
          icon={<Plus />}
          iconPosition="left"
          className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 rounded-lg"
        >
          Rotate Button
        </MorphingButton>

        <MorphingButton 
          variant="pulse"
          iconPosition="only"
          className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0 rounded-full w-12"
        >
          <Heart/>
        </MorphingButton>
        <MorphingButton 
          variant="liquid" 
          size="lg"
          className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 shadow-md"
        >
          Liquid Button
        </MorphingButton>
        
        <MorphingButton 
          variant="bounce"
          className="bg-gradient-to-r from-lime-400 to-green-500 text-white border-0 rounded-lg"
        >
          Bounce Button
        </MorphingButton>
    
      </div>
    </div>
  );
};