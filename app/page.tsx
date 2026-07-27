import { ComponentsDemo } from "@/components/home/bento/ComponentsDemo";
import Hero from "@/components/home/hero/Hero";
import ContainCard from "@/components/home/cards/contain-card";
import AnimatedComponentsShowcase from "@/components/home/feature/Feature";
import SupportSection from "@/components/home/support/Support";
import { NewsletterSection } from "@/components/home/newsletter/newsletter-section";
import Social from "@/components/home/social/social";
import Navbar from "@/components/global/header/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen overflow-hidden">
        <Hero />
        <ComponentsDemo />
        <AnimatedComponentsShowcase />
        <ContainCard />
        <Social />
        <SupportSection />
        <NewsletterSection />
      </div>
    </>
  );
}
