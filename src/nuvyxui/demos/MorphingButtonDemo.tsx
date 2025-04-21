import React from "react";
import { MorphingButton } from "@/nuvyxui/components/MorphingButton";
import { ActivitySquareIcon, ArrowRight, Droplet, Heart, Plus } from "lucide-react";

export const MorphingButtonDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full bg-black p-4">
      <div className="flex justify-center items-center h-48 border border-gray-800 rounded-lg">
        <MorphingButton 
          variant="expand"
          icon={<ArrowRight />}
          iconPosition="right"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 hover:shadow-lg rounded-lg"
        >
          Expand 
        </MorphingButton>
      </div>
      
      <div className="flex justify-center items-center h-48 border border-gray-800 rounded-lg">
        <MorphingButton
          variant="collapse"
          icon={<ArrowRight />}
          iconPosition="left"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 rounded-lg"
        >
          Collapse
        </MorphingButton>
      </div>
      
      <div className="flex justify-center items-center h-48 border border-gray-800 rounded-lg">
        <MorphingButton
          variant="rotate"
          icon={<Plus />}
          iconPosition="left"
          className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 rounded-lg"
        >
          Rotate
        </MorphingButton>
      </div>
      
      <div className="flex justify-center items-center h-48 border border-gray-800 rounded-lg">
        <MorphingButton 
          variant="pulse"
          iconPosition="only"
          className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0 rounded-full w-12"
        >
          <Heart/>
        </MorphingButton>
      </div>
      
      <div className="flex justify-center items-center h-48 border border-gray-800 rounded-lg">
        <MorphingButton 
          variant="liquid" 
          size="lg"
          icon={<Droplet />}
          iconPosition="right"
          className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 shadow-md"
        >
          Liquid 
        </MorphingButton>
      </div>
      
      <div className="flex justify-center items-center h-48 border border-gray-800 rounded-lg">
        <MorphingButton 
          variant="bounce"
          icon={<ActivitySquareIcon />}
          iconPosition="right"
          className="bg-gradient-to-r from-lime-400 to-green-500 text-white border-0 rounded-lg"
        >
          Bounce 
        </MorphingButton>
      </div>
    </div>
  );
}