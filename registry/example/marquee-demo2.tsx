import React from "react";
import { Marquee } from "../ui/marquee";
import Image from "next/image";

export default function MarqueeDemo1() {
  return (
    <div className="max-w-4xl mx-auto w-full overflow-hidden"> 
      <Marquee gap={50} reverse className="flex max-w-4xl mx-auto w-full overflow-hidden">
      <Image
        src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/DC.png"
        alt="DC logo"
        width={120}
        height={120}
        quality={100}
        loading="lazy"
        className="h-[120px] w-auto"
      />
      <Image
        src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/4942bd6567de80cfbc6d3f5ce8a5a6a156b0d2dc/public/bandai.svg"
        alt="Bandai logo"
        width={120}
        height={120}
        quality={100}
        loading="lazy"
        className="h-[120px] w-auto"
      />
      <Image
        src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/disney.png"
        alt="Disney logo"
        width={120}
        height={120}
        quality={100}
        loading="lazy"
        className="h-[120px] w-auto dark:bg-white p-2"
      />
      <Image
        src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/4942bd6567de80cfbc6d3f5ce8a5a6a156b0d2dc/public/warnerbros.svg"
        alt="Warner Bros logo"
        width={120}
        height={120}
        quality={100}
        loading="lazy"
        className="h-[120px] w-auto"
      />
      <Image
        src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/marvel.png"
        alt="Marvel logo"
        width={120}
        height={120}
        quality={100}
        loading="lazy"
        className="h-[120px] w-auto"
      />
    </Marquee>
    </div>
  );
}
