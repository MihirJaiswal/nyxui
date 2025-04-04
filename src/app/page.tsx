import Header from "@/components/global/Header";
import { Hero } from "@/components/home/Hero";
import { BentoDemo } from "@/nyxui/demos/BentoGridDemo";
import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg";
import Footer from "@/components/global/Footer";

export default function Home() {
  const darkColors = ["#7C3AED", "#DB2777", "#3B82F6", "#A78BFA"];


  return (
    <>
      <Header />
      <div className="relative z-10">
      <AnimatedGradientBg
        pattern="mesh"
        blur={80}
        speed={0.5}
        opacity={0.5}
        position="fixed"
        zIndex={-1}
        animate={true}
        size="full"
        patternIntensity={1.5}
        interactive={true}
        colors={darkColors}
      />
      <div className="relative z-10">
        
        <Hero />
        </div>
        <BentoDemo />
      </div>
      <Footer/>
    </>
  );
}