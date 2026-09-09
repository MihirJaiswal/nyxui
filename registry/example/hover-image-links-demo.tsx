"use client";

import {
  HoverImageLink,
  HoverImageLinks,
} from "@/registry/blocks/hover-image-links";

export const HoverImageLinksDemo = () => {
  return (
    <div className="w-full">
      <HoverImageLinks>
        <HoverImageLink
          heading="Seasonal"
          subheading="Simulcast titles airing right now"
          imgSrc="/assets/images/glow-card/darkrai.jpg"
          href="#seasonal"
        />
        <HoverImageLink
          heading="Studios"
          subheading="Browse by animation studio"
          imgSrc="/assets/images/glow-card/lunala.jpg"
          href="#studios"
        />
        <HoverImageLink
          heading="Movies"
          subheading="Feature-length films and festival picks"
          imgSrc="/assets/images/glow-card/suicune.jpg"
          href="#movies"
        />
        <HoverImageLink
          heading="Community"
          subheading="Top-ranked series voted by fans"
          imgSrc="/assets/images/glow-card/deoxys.jpg"
          href="#community"
        />
        <HoverImageLink
          heading="Watchlist"
          subheading="Everything you've queued up"
          imgSrc="/assets/images/apple-glass-effect/img.jpg"
          href="#watchlist"
        />
      </HoverImageLinks>
    </div>
  );
};
