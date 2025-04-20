import { AnimatedGradientBg } from "../components/AnimatedGradientBg";

export const AnimatedGradientBgDemo = () => {
  return (
    <div className="h-[300px]">
    <div className="absolute inset-0">
      <AnimatedGradientBg
        pattern="radial"
        position="absolute"
        size="full"
        zIndex={0}
        colors={["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"]}
      />
    </div>
  </div>
  );
}
