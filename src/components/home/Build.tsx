"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Marquee } from "@/nuvyxui/components/Marquee"; 
import { componentsData } from "@/nuvyxui/Data"; 

interface ComponentData {
  title: string;
  description: string;
  image: string;
}
interface Components {
  [key: string]: ComponentData;
}

interface CardInfo {
  id: string;
  imageSrc: string;
  title: string;
  uniqueKey?: string;
}

export const Build = () => {
  const textHighlightRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const textElement = textHighlightRef.current;
    if (!textElement) return;
    let pulseAnimationId: number;
    let pulseStartTime: number;

    const pulseAnimation = (timestamp: number) => {
      if (!pulseStartTime) pulseStartTime = timestamp;
      const elapsed = timestamp - pulseStartTime;
      const intensity = Math.sin(elapsed * 0.002) * 0.2 + 0.8;
      textElement.style.textShadow = `0 0 ${Math.round(
        intensity * 10
      )}px rgba(59, 130, 246, ${intensity * 0.6})`;

      pulseAnimationId = requestAnimationFrame(pulseAnimation);
    };
    pulseAnimationId = requestAnimationFrame(pulseAnimation);

    return () => {
      cancelAnimationFrame(pulseAnimationId);
    };
  }, []);

  const cardData: CardInfo[] = Object.entries(componentsData.components as Components).map(([id, component]) => ({
    id,
    imageSrc: component.image,
    title: component.title
  }));

  const renderCard = (cardInfo: CardInfo) => {
    return (
     <div
      key={cardInfo.uniqueKey || cardInfo.id}
      onClick={(e) => e.stopPropagation()}
      className="select-none"
     >
       <Card
        className="border-gray-800 dark:border-gray-800 bg-black backdrop-blur-sm transform transition-all shadow-sm dark:shadow-none w-80 pointer-events-auto"
      >
        <div className="relative bg-black flex items-center justify-center rounded-lg overflow-hidden transition duration-200">
          <Image
            src={cardInfo.imageSrc}
            alt={cardInfo.title || "Component showcase"}
            width={1024}
            height={650}
            quality={100}
            decoding="async"
            className="transition duration-300 blur-0"
            loading="lazy"
            draggable={false}
          />
        </div>
      </Card>
     </div>
    );
  };

  const marqueeCards = [...cardData, ...cardData].map((card, index) => ({
    ...card,
    uniqueKey: `${card.id}-${index}`,
  }));

  return (
    <div className="relative w-full overflow-hidden text-gray-900 dark:text-white mb-12">
      <div className="mx-auto max-w-7xl px-4 pb-10 md:py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center pt-4 mb-6">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight text-center">Showcase</h1>
            <p className="mx-auto text-balance text-center text-lg font-medium tracking-tight text-foreground/80">Explore our collection of unique and innovative components</p>
          </div>
          <div className="relative lg:col-span-6 h-full">
            <div className="relative h-full w-full overflow-hidden rounded-lg flex items-center">
              <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-blue-400/50 dark:bg-blue-500/40"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${
                        5 + Math.random() * 10
                      }s linear infinite`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  ></div>
                ))}
              </div>
              <div className="w-full py-8 relative z-20" style={{ cursor: 'grab' }}>
                <Marquee 
                  direction="horizontal" 
                  speed={30} 
                  speedOnHover={1}
                  gap={24}
                  fadeEdges={true}
                  fadeWidth={100}
                  className="w-full"
                  draggable={false}
                  pauseOnTap={false}
                >
                  {marqueeCards.map((card) => (
                    <div
                      key={card.uniqueKey}
                      className={isLoaded ? "" : "opacity-0"}
                    >
                      {renderCard(card)}
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
        .w-full.py-8.relative.z-20 {
          cursor: grab !important;
        }
        .w-full.py-8.relative.z-20:active {
          cursor: grabbing !important;
        }
      `}</style>
    </div>
  );
};