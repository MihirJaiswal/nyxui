"use client";
import { GlassContainer } from "@/registry/ui/apple-glass-effect";
import LampHeading from "@/registry/ui/lamp-heading";
import { Blocks, Code, LayoutTemplateIcon} from "lucide-react";
import React, { useState } from "react";

const GlassmorphismCards = () => {
  const [isHovered, setIsHovered] = useState(false);
   
  const cards = [
    {
      text: "Templates",
      rotation: -15,
      icon: <LayoutTemplateIcon size={24} />,
    },
    {
      text: "Code",
      rotation: 5,
      icon: <Code size={24} />,
    },
    {
      text: "Components",
      rotation: 25,
      icon: <Blocks size={24} />,
    },
  ];

  return (
    <div className="relative w-full h-full">
      <div 
        className="flex flex-col items-center justify-center relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-center items-center">
          {cards.map((card, index) => (
            <GlassContainer
              key={index}
              className="w-44 h-52 rounded-3xl flex items-center justify-center transition-all duration-500 ease-in-out"
              hover={false}
              border={true}
              variant="thin"
              opacity={0.3}
              blur={15}
              style={{
                margin: isHovered ? "0 10px" : (index === 0 ? "0 -45px" : "0 -45px"),
                transform: isHovered ? "rotate(0deg)" : `rotate(${card.rotation}deg)`,
                transitionProperty: "transform, margin",
                transitionDuration: "500ms",
                transitionTimingFunction: "ease-in-out",
              }}
            >
              {/* Now you have full control over the layout */}
              <div className="relative z-40 flex flex-col items-center justify-center gap-4 w-full h-full">
                {/* Icon */}
                <div className="text-white text-4xl flex items-center justify-center">
                  {card.icon}
                </div>
                
                {/* Text */}
                <div className="flex items-center justify-center">
                  <span className="text-white text-sm font-medium text-center">
                    {card.text}
                  </span>
                </div>
              </div>
            </GlassContainer>
          ))}
        </div>
        
        <div className="text-center mt-12 w-full flex flex-col items-center justify-center gap-3">
          <LampHeading
            text="Build Innovative"
            gradientColors={{ from: "#6e15ad", to: "#d413ad" }}
            direction="above"
            lineHeight={3}
            glowIntensity={0.7}
            className="text-2xl font-bold text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismCards;