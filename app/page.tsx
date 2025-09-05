import { ComponentsDemo } from "../components/home/bento/ComponentsDemo";
import Hero from "@/components/home/hero/Hero";
import ContainCard from "@/components/home/cards/contain-card";
import AnimatedComponentsShowcase from "@/components/home/feature/Feature";
import Header from "@/components/global/Header";
import SupportSection from "@/components/home/support/Support";
import { NewsletterSection } from "@/components/home/newsletter/newsletter-section";
import Social from "@/components/home/social/social";
export default function Home() {
  return (
    <>
    <Header/>
    <div className="min-h-screen overflow-hidden">
        <Hero />
        <ComponentsDemo />
        <AnimatedComponentsShowcase/>
        <ContainCard/>
        <Social/>
        <SupportSection/>
        <NewsletterSection/>
    </div>
    </>
  );
}
