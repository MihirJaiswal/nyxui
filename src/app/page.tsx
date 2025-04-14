"use client"
import Header from "@/components/global/Header";
import { Hero } from "@/components/home/Hero";
import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg";
import Customize from "@/components/home/Customize";
import { Build } from "@/components/home/Build";
import { ComponentsDemo } from "@/components/home/ComponentsDemo";

export default function Home() {
  const darkColors = ["#7C3AED", "#DB2777", "#3B82F6", "#A78BFA"];
  return (
    <>
    <Header />
          <div className="w-full max-w-screen-2xl md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <Hero />
            <ComponentsDemo/>
            <Customize />
            <Build />
          </div>
    </>
  );
}