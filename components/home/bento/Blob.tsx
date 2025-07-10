import LampHeading from "@/registry/ui/lamp-heading";
import { MorphingBlob } from "@/registry/ui/morphing-blob";
import React from "react";

const Blob = () => {
  return (
    <div className="w-full h-full max-w-full max-h-full overflow-hidden relative"> 
     
      <div className="flex flex-col items-center justify-center group h-full">
        <MorphingBlob theme="cosmic">
        </MorphingBlob>
        <div className="absolute -z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-66 bg-radial from-black via-purple-[#4e1674]/5 to-[rgb(53,13,58)] rounded-full blur-xl  shadow-[0_0_50px_rgba(96,165,250,0.4)]" />
        
        <div className="text-center z-1 w-full flex flex-col items-center justify-center gap-3 -mt-4">
          <LampHeading
            text="Bulid Innovative"
            gradientColors={{ from: "#6e15ad", to: "#d413ad" }}
            direction="above"
            lineHeight={5}
            glowIntensity={0.4}
            className="text-2xl font-bold text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Blob;