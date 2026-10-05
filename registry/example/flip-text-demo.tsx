"use client";

import { FlipText } from "@/registry/ui/flip-text";

export const FlipTextDemo = () => {
  return (
    <section className="grid place-content-start gap-3 px-8 py-12 bg-[#d4ff00] rounded-2xl w-full">
      <FlipText
        href="#"
        text="Twitter"
        className="text-4xl font-black uppercase text-foreground sm:text-5xl md:text-6xl"
      />
      <FlipText
        href="#"
        text="Linkedin"
        className="text-4xl font-black uppercase text-foreground sm:text-5xl md:text-6xl"
      />
      <FlipText
        href="#"
        text="Facebook"
        className="text-4xl font-black uppercase text-foreground sm:text-5xl md:text-6xl"
      />
      <FlipText
        href="#"
        text="Instagram"
        className="text-4xl font-black uppercase text-foreground sm:text-5xl md:text-6xl"
      />
    </section>
  );
};
