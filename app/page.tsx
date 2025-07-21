import { ComponentsDemo } from "../components/home/bento/ComponentsDemo";
import Hero from "@/components/home/hero/Hero";
import ContainCard from "@/components/home/cards/contain-card";
import AnimatedComponentsShowcase from "@/components/home/feature/Feature";
import FinalCTASection from "@/components/home/cta/Cta";
import Header from "@/components/global/Header";
export default function Home() {
  return (
    <>
    <Header/>
    <div className="min-h-screen overflow-hidden">
        <Hero />
        <ComponentsDemo />
        <AnimatedComponentsShowcase/>
        <ContainCard/>
        <FinalCTASection/>
    </div>
    </>
  );
}
