import React from "react";
import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import { Marquee } from "@/nyxui/components/Marquee";
import { MarqueeDemo } from "@/nyxui/demos/MarqueeDemo";
import fs from "fs";
import path from "path";
import Image from "next/image";

const componentPath = path.join(process.cwd(), "src/nyxui/components/Marquee.tsx");
const MarqueeSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/MarqueeDemo.tsx");
const MarqueeDemoSource = fs.readFileSync(demoPath, "utf8");

export const marqueeData: ComponentData = {
  name: "Marquee",
  description: "A customizable, interactive scrolling marquee component with various animation options, drag capabilities, and responsive design.",
  preview: <MarqueeDemo />,
  usage: MarqueeDemoSource,
  componentCode: MarqueeSource,
  dependencies: [ {
    name: "Framer Motion",
    description: "Production-ready motion library for React for creating animations and interactive UI elements.",
    install: {
      npm: "npm install framer-motion",
      pnpm: "pnpm add framer-motion",
      yarn: "yarn add framer-motion",
      bun: "bun add framer-motion",
    },
  },
  {
    name: "Utility Functions",
    description: "Utility functions for conditional class name merging.",
    install: {
      npm: "npm install clsx tailwind-merge",
      pnpm: "pnpm add clsx tailwind-merge",
      yarn: "yarn add clsx tailwind-merge",
      bun: "bun add clsx tailwind-merge",
    },
    setup: {
      description: "Create a utils.ts file with the cn utility function",
      file: "/lib/utils.ts",
      code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}`,
    },
  },],
  props: [
    {
      name: "Marquee",
      items: [
        {
          name: "children",
          type: "React.ReactNode",
          default: 'undefined',
          description: "Content to be displayed in the marquee",
        },
        {
          name: "gap",
          type: "number",
          default: '16',
          description: "Space between repeated content in pixels",
        },
        {
          name: "speed",
          type: "number",
          default: '100',
          description: "Animation speed (higher is faster)",
        },
        {
          name: "speedOnHover",
          type: "number",
          default: 'undefined',
          description: "Animation speed when hovered (higher is faster)",
        },
        {
          name: "direction",
          type: "string",
          default: 'horizontal',
          description: "Scrolling direction ('horizontal' or 'vertical')",
        },
        {
          name: "reverse",
          type: "boolean",
          default: "false",
          description: "Reverse the animation direction",
        },
        {
          name: "className",
          type: "string",
          default: 'undefined',
          description: "Additional CSS classes to apply",
        },
        {
          name: "fadeEdges",
          type: "boolean",
          default: "false",
          description: "Fade the edges of the marquee content",
        },
        {
          name: "fadeWidth",
          type: "number",
          default: '64',
          description: "Width of the edge fade in pixels",
        },
        {
          name: "pauseOnTap",
          type: "boolean",
          default: "true",
          description: "Pause animation when clicked",
        },
        {
          name: "draggable",
          type: "boolean",
          default: "true",
          description: "Allow dragging interaction with the marquee",
        },
      ],
    },
  ],
  category: "Display",
  examples: [
    {
      name: "Basic Horizontal Marquee",
      preview: (
        <div className='flex h-[400px] space-x-4'>
        <Marquee direction='vertical'>
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/Vector.png'
            alt='avenger logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/batman.png'
            alt='batman logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/blackpanther.png'
            alt='black panther logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/captainamerica.png'
            alt='captain america logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/daredevil.png'
            alt='daredevil logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/deadpool.png'
            alt='deadpool logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
        </Marquee>
        <Marquee direction='vertical' reverse>
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/flash.png'
            alt='flash logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/greenlantern.png'
            alt="green lantern logo"
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/ironman.png'
            alt="ironman logo"
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/superman3.png'
            alt='superman logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/drstrange.png'
            alt='dr strange logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/shield.png'
            alt='shield logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
        </Marquee>
      </div>
      ),
      filename: "BasicMarquee.tsx",
      code: `import { Marquee } from "@/nyxui/components/Marquee";

export function BasicMarquee() {
  return (
    <div className='flex h-[400px] space-x-4'>
        <Marquee direction='vertical'>
          <Image
            src='/logo.png'
            alt='avenger logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo2.png'
            alt='batman logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo3.png'
            alt='black panther logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo4.png'
            alt='captain america logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo5.png'
            alt='daredevil logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo6.png'
            alt='deadpool logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
        </Marquee>
        <Marquee direction='vertical' reverse>
          <Image
            src='/logo7.png'
            alt='flash logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo8.png'
            alt="green lantern logo"
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo9.png'
            alt="ironman logo"
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo10.png'
            alt='superman logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo11.png'
            alt='dr strange logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
          <Image
            src='/logo12.png'
            alt='shield logo'
            width={120}
            height={120}
            quality={100}
            loading='lazy'
            className='aspect-square w-[120px] rounded-full'
          />
        </Marquee>
      </div>
  );
}`,
    },
    {
      name: "reverse Marquee",
      preview: (
        <Marquee gap={50} reverse>
        <Image
        src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/DC.png'
        alt='DC logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto'
      />
      <Image
        src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/4942bd6567de80cfbc6d3f5ce8a5a6a156b0d2dc/public/bandai.svg'
        alt='Bandai logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto'
      />
      <Image
        src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/disney.png'
        alt='Disney logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto dark:bg-white p-2'
      />
      <Image
        src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/4942bd6567de80cfbc6d3f5ce8a5a6a156b0d2dc/public/warnerbros.svg'
        alt='Warner Bros logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto'
      />
      <Image
        src='https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/marvel.png'
        alt='Marvel logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto'
      />
    </Marquee>
      ),
      filename: "CustomGapMarquee.tsx",
      code: `import { Marquee } from "@/nyxui/components/Marquee";

export function CustomGapMarquee() {
  return (
    <Marquee gap={50} reverse>
        <Image
        src='/dclogo.png'
        alt='DC logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto'
      />
      <Image
        src='/bandailogo.png'
        alt='Bandai logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto'
      />
      <Image
        src='/disneylogo.png'
        alt='Disney logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto dark:bg-white p-2'
      />
      <Image
        src='/warnerbroslogo.png'
        alt='Warner Bros logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto'
      />
      <Image
        src='/marvellogo.png'
        alt='Marvel logo'
        width={120}
        height={120}
        quality={100}
        loading='lazy'
        className='h-[120px] w-auto'
      />
    </Marquee>
  );
}`,
    },
  ],
};