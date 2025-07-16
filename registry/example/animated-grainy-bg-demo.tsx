import { AnimatedGrainyBg } from "../ui/animated-grainy-bg";


export const AnimatedGradientBgDemo = () => {
  return (
    <div className="h-[300px] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <AnimatedGrainyBg
          position="absolute"
          animationType="waves"
          grainIntensity={100}
          grainType="film"
          grainSize={120}
          size="full"
          darkMode 
          zIndex={0}
          colors={["#1b078c", "#a3079e", "#c20673", "#06d4b8"]}
        />
      </div>
      <div className="relative z-10 items-center justify-center flex -mt-12">
          <h1>
            <span className="text-white text-2xl font-bold tracking-tight uppercase leading-snug">
              Animated grainy background
            </span>
          </h1>
        </div>
    </div>
  );
};
