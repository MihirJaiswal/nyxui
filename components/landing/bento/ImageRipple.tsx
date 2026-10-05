import WaterRippleEffect from "@/registry/ui/water-ripple-effect";

function Imageripple() {
  return (
    <div className=" flex items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <WaterRippleEffect
          imageSrc="/assets/images/landing-page/img.avif"
          rippleIntensity={0}
          hoverRippleMultiplier={50}
          height={215}
          width={300}
          className="p-0!"
        />
      </div>
    </div>
  );
}

export default Imageripple;
