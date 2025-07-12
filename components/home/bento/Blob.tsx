import LampHeading from "@/registry/ui/lamp-heading";
import { MorphingBlob } from "@/registry/ui/morphing-blob";
import React from "react";

const Blob = () => {
  return (
    <div className="w-full h-full max-w-full max-h-full overflow-hidden relative"> 
      <div className="flex flex-col items-center justify-center group h-full">
        <MorphingBlob theme="cosmic" className="scale-95 ml-6">
        <div className="text-center p-6 z-2">
            {/* <MoonIcon className="h-10 w-10 mx-auto mb-3 mr-3 text-white" /> */}
          </div>
          
          <div className="absolute scale-95 -z-1 top-12 left-1/2 -ml-2  -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-gradient-to-b from-transparent via-purple-500/10 blur-xl to-[#5C0B63]/40  rounded-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-puls\e"/>
          <div className="absolute scale-95 -z-1 top-24 left-1/2 -ml-2  -translate-x-1/2 -translate-y-1/2 h-12 w-32 bg-purple-500/80 blur-2xl  rounded-b-full shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-puls\e"/>
        </MorphingBlob>
        <div className="text-center z-1 w-full flex flex-col items-center justify-center gap-3 -mt-4 pb-12">
          <LampHeading
            text="Bulid Innovative"
            gradientColors={{ from: "#6e15ad", to: "#d413ad" }}
            direction="below"
            lampHeight={50}
            lineHeight={3}
            glowIntensity={0.4}
            textSize="2xl"
            showLightRays
            className="font-bold text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Blob;