"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import Text from "./Text";
import Image from "next/image";

interface CardInfo {
  id: string;
  imageSrc: string;
  uniqueKey?: string;
}

export const Build = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const textHighlightRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !isLoaded) return;

    let animationId: number;
    let startTime: number;

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const scrollSpeed = 0.03;
      const scrollPosition = elapsed * scrollSpeed;

      if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight / 3;
        startTime = timestamp - scrollContainer.scrollHeight / 3 / scrollSpeed;
      } else {
        scrollContainer.scrollTop =
          scrollPosition % scrollContainer.scrollHeight;
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isLoaded]);

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

  const cardData: CardInfo[] = [
    {
      id: "cyberpunk-card",
      imageSrc: "/assets/images/showcase/cyberpunk-card.png",
    },
    {
      id: "liquid-metal-button",
      imageSrc: "/assets/images/showcase/liquid-metal-button.png",
    },
    {
      id: "matrix-code-rain",
      imageSrc: "/assets/images/showcase/matrix-code-rain.png",
    },
    {
      id: "character-selector",
      imageSrc: "/assets/images/showcase/character-selector.png",
    },
    {
      id: "animated-code-block",
      imageSrc: "/assets/images/showcase/animated-code-block.png",
    },
    {
      id: "scroll-animation-trigger",
      imageSrc: "/assets/images/showcase/scroll-animation-trigger.png",
    },
    {
      id: "majestic-card",
      imageSrc: "/assets/images/showcase/majestic-card.png",
    },
  ];

  const renderCard = (cardInfo: CardInfo) => {
    return (
      <Card
        key={cardInfo.uniqueKey || cardInfo.id}
        className="border-gray-800 dark:border-gray-800 bg-black backdrop-blur-sm transform transition-all hover:scale-105 shadow-sm dark:shadow-none"
      >
        <div className="relative dark:border bg-black flex items-center justify-center rounded-lg dark:border-white/[0.1] overflow-hidden transition duration-200 hover:scale-105">
          <Image
            src={cardInfo.imageSrc}
            alt="img"
            width={1024}
            height={650}
            quality={100}
            decoding="async"
            className="transition duration-300 blur-0 rounded-md group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Card>
    );
  };

  const generateCards = (repeat = 3): CardInfo[][] => {
    const columns: CardInfo[][] = [[], [], []];
    for (let i = 0; i < repeat; i++) {
      for (let j = 0; j < cardData.length; j++) {
        const card = cardData[j];
        const columnIndex = j % 3;
        columns[columnIndex].push({
          ...card,
          uniqueKey: `${card.id}-${i}-${columnIndex}`,
        });
      }
    }

    return columns;
  };

  const columnsData = generateCards(9);

  return (
    <div className="relative w-full overflow-hidden text-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 md:py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center pt-4">
            <Text />
          </div>
          <div className="relative lg:col-span-6 h-[700px] -z-1">
            <div className="absolute left-0 top-20 hidden lg:block"></div>
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <div
                ref={scrollRef}
                className="relative h-full overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                }}
              >
                <div className="pt-24 pb-24">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-4">
                    <div className="space-y-6">
                      {columnsData[0].map((card) => (
                        <div
                          key={card.uniqueKey}
                          className={isLoaded ? "" : "opacity-0"}
                        >
                          {renderCard(card)}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6 mt-16 md:mt-24">
                      {columnsData[1].map((card) => (
                        <div
                          key={card.uniqueKey}
                          className={isLoaded ? "" : "opacity-0"}
                        >
                          {renderCard(card)}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6 mt-32 md:mt-36">
                      {columnsData[2].map((card) => (
                        <div
                          key={card.uniqueKey}
                          className={isLoaded ? "" : "opacity-0"}
                        >
                          {renderCard(card)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white dark:from-[#09090B] via-white/90 dark:via-[#09090B]/90 to-transparent z-10"></div>
              <div className="absolute inset-0 z-0 opacity-50">
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
      `}</style>
    </div>
  );
};
