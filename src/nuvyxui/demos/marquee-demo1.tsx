import React from "react";
import { Marquee } from "../components/marque";
import Image from "next/image";

export default function MarqueeDemo1() {
  return (
    <div className="flex h-[400px] space-x-4">
      <Marquee direction="vertical">
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/Vector.png"
          alt="avenger logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/batman.png"
          alt="batman logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/blackpanther.png"
          alt="black panther logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/captainamerica.png"
          alt="captain america logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/daredevil.png"
          alt="daredevil logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/deadpool.png"
          alt="deadpool logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
      </Marquee>
      <Marquee direction="vertical" reverse>
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/flash.png"
          alt="flash logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/greenlantern.png"
          alt="green lantern logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/ironman.png"
          alt="ironman logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/superman3.png"
          alt="superman logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/drstrange.png"
          alt="dr strange logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
        <Image
          src="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/icons/shield.png"
          alt="shield logo"
          width={120}
          height={120}
          quality={100}
          loading="lazy"
          className="aspect-square w-[120px] rounded-full"
        />
      </Marquee>
    </div>
  );
}
