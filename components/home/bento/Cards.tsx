"use client";
import LampHeading from "@/registry/ui/lamp-heading";
import { Code, Github, Twitter } from "lucide-react";
import React from "react";

const GlassmorphismCards = () => {
  const cards = [
    {
      text: "GitHub",
      rotation: -15,
      icon: <Github size={24} />,
    },
    {
      text: "Code",
      rotation: 5,
      icon: <Code size={24} />,
    },
    {
      text: "Twitter",
      rotation: 25,
      icon: <Twitter size={24} />,
    },
  ];

  return (
    <div className="relative w-full h-full"> 
      <div className="flex flex-col items-center justify-center group relative z-10">
        <div className="flex justify-center items-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className="glass-card w-44 h-52 flex justify-center items-center transition-all duration-500 ease-in-out rounded-lg border border-white/30 backdrop-blur-md"
              style={{
                // @ts-expect-error - Custom CSS property for rotation
                "--r": card.rotation,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                boxShadow: "0 25px 25px rgba(0, 0, 0, 0.25)",
                margin: index === 0 ? "0 -45px" : "0 -45px",
                transform: `rotate(${card.rotation}deg)`,
              }}
            >
              {/* Icon */}
              <div className="text-white text-4xl">{card.icon}</div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-white/5 rounded-b-lg flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {card.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .group:hover .glass-card {
            transform: rotate(0deg) !important;
            margin: 0 10px !important;
          }
          .glass-card svg {
            font-size: 2.5em;
            fill: #fff;
          }
        `}</style>
        
        <div className="text-center mt-12 w-full flex flex-col items-center justify-center gap-3">
          <LampHeading
            text="Bulid Innovative"
            gradientColors={{ from: "#6e15ad", to: "#d413ad" }}
            direction="above"
            lineHeight={3}
            glowIntensity={0.7}
            className="text-2xl font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismCards;