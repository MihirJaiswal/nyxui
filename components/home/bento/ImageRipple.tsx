import WaterRippleEffect from "@/registry/ui/water-ripple-effect";
import React from "react";

function Imageripple() {
  return (
    <div className=" flex items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <WaterRippleEffect
          imageSrc="/assets/images/landing-page/tailwind.jpg"
          rippleIntensity={0.2}
          hoverRippleMultiplier={5}
          height={250}
          width={450}
          className="!p-0"
        />
      </div>
    </div>
  );
}

export default Imageripple;
