import Header from "@/components/global/Header";
import { Hero } from "@/components/home/Hero";
import { BentoDemo } from "@/nyxui/demos/BentoGridDemo";
import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg";
import Customize from "@/components/home/Customize";
import { Build } from "@/components/home/Build";
import { GlitchButtonDemo } from "@/nyxui/demos/GlitchButtonDemo";

export default function Home() {
  const darkColors = ["#7C3AED", "#DB2777", "#3B82F6", "#A78BFA"];
  return (
    <>
    <Header />
      <div className="relative w-full flex flex-col items-center">
        <AnimatedGradientBg
          pattern="mesh"
          blur={80}
          speed={0.5}
          opacity={0.5}
          position="fixed"
          zIndex={0}
          animate={true}
          size="full"
          patternIntensity={1.5}
          interactive={true}
          colors={darkColors}
        />
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="w-full max-w-screen-2xl md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <Hero />
            <BentoDemo />
            <Customize />
            <Build />
          </div>
        </div>
        </div>
        <GlitchButtonDemo/>
    </>
  );
}