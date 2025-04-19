import { AnimatedGradientBg } from "../components/AnimatedGradientBg";


export const AnimatedGradientBgDemo = () => {
  const theme = {
    colors: ["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"],
    pattern: "radial" as const,
  };

  return (
    <div className="w-full h-[300px] text-white p-2">
      <div className="w-full max-w-6xl mx-auto">
        <div className="relative h-96 w-full">
          <AnimatedGradientBg
            colors={theme.colors}
            pattern={theme.pattern}
            speed={1}
            blur={60}
            intensity={1}
            opacity={0.8}
            animate
            position="absolute"
            size="full"
            zIndex={0}
          />
        </div>
      </div>
    </div>
  );
}
