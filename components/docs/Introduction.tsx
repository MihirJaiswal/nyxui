import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronUp } from "lucide-react";
import img from "../../public/docs/docs-cover.png";

export default function IntroductionPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-1 py-6">
      {/* Hero */}
      <section className="mb-16">
        <p className="mb-3 text-sm font-medium tracking-wide text-[#FF4F11] uppercase">
          Introduction
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-5">
          What is Nyx UI?
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          A collection of reusable components, templates, and blocks designed
          for seamless integration into your web projects. Built with a creative
          touch and meticulous attention to detail.
        </p>
      </section>

      {/* Cover image */}
      <div className="relative mb-16 overflow-hidden rounded-xl border border-border/60">
        <Image
          src={img}
          alt="Nyx UI Components Preview"
          width={1200}
          height={630}
          loading="lazy"
          placeholder="blur"
          quality={100}
          className="w-full"
        />
      </div>

      {/* Philosophy */}
      <section className="mb-16" id="philosophy">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          What Drives Us
        </h2>
        <div className="space-y-4">
          <p className="leading-relaxed text-muted-foreground">
            We believe the web should be a masterpiece of creativity and
            beauty—a space where inspiring design sparks innovation. Every
            element we create has the potential to captivate, turning routine
            interactions into delightful experiences.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Nyx UI exemplifies this belief by offering reusable React components
            that are both highly functional and visually appealing. Our
            dedication to quality design ensures that every component is sturdy,
            refined, and dependable.
          </p>
          <div className="flex items-center gap-3 pt-4">
            <div className="h-px w-12 bg-[#FF4F11]" />
            <p className="text-sm font-medium">Design with purpose</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>
        <Accordion
          className="flex w-full flex-col divide-y divide-border"
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <AccordionItem value="getting-started" className="py-2">
            <AccordionTrigger className="w-full text-left text-foreground">
              <div className="flex items-center justify-between">
                <div>How user-friendly is it?</div>
                <ChevronUp className="h-4 w-4 text-foreground transition-transform duration-200 group-data-expanded:-rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Every component is self-contained and developed using
                contemporary React techniques, ensuring a smooth implementation
                into your projects.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="advanced-usage" className="py-2">
            <AccordionTrigger className="w-full text-left text-foreground">
              <div className="flex items-center justify-between">
                <div>Who can benefit from Nyx UI?</div>
                <ChevronUp className="h-4 w-4 text-foreground transition-transform duration-200 group-data-expanded:-rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Web developers and designers of any proficiency who want to
                create interactive and creative UI elements.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="community-and-support" className="py-2">
            <AccordionTrigger className="w-full text-left text-foreground">
              <div className="flex items-center justify-between">
                <div>Can I personalize it?</div>
                <ChevronUp className="h-4 w-4 text-foreground transition-transform duration-200 group-data-expanded:-rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Each component is designed with customization at its core,
                allowing you to effortlessly adjust colors, dimensions, and
                behaviors to align with your brand and unique needs.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
