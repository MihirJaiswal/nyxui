import Header from "@/components/global/Header";
import { Hero } from "@/components/home/Hero";
import Customize from "@/components/home/Customize";
import { Build } from "@/components/home/Build";
import { ComponentsDemo } from "@/components/home/ComponentsDemo";

export default function Home() {
  return (
    <>
    <Header />
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-center md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <Hero />
        <ComponentsDemo/>
        <Customize />
        <Build />
      </div>
    </>
  );
}