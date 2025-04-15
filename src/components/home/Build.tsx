"use client"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import Text from "./Text"
import Image from "next/image"

interface CardInfo {
  id: string;
  imageSrc: string;
  uniqueKey?: string;
}

export const Build = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const textHighlightRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || !isLoaded) return

    let animationId: number
    let startTime: number

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      const scrollSpeed = 0.03
      const scrollPosition = elapsed * scrollSpeed
      
      const contentHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
      
      if (scrollContainer.scrollTop >= contentHeight - 20) {
        scrollContainer.scrollTop = 10
        startTime = timestamp
      } else {
        scrollContainer.scrollTop = scrollPosition % contentHeight
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isLoaded])

  useEffect(() => {
    const textElement = textHighlightRef.current
    if (!textElement) return

    let pulseAnimationId: number
    let pulseStartTime: number

    const pulseAnimation = (timestamp: number) => {
      if (!pulseStartTime) pulseStartTime = timestamp
      const elapsed = timestamp - pulseStartTime
      
      const intensity = Math.sin(elapsed * 0.002) * 0.2 + 0.8
      textElement.style.textShadow = `0 0 ${Math.round(intensity * 10)}px rgba(59, 130, 246, ${intensity * 0.6})`
      
      pulseAnimationId = requestAnimationFrame(pulseAnimation)
    }

    pulseAnimationId = requestAnimationFrame(pulseAnimation)

    return () => {
      cancelAnimationFrame(pulseAnimationId)
    }
  }, [])

  const cardData: CardInfo[] = [
    {
      id: "cyberpunk-card",
      imageSrc: "/assets/images/showcase/cyberpunk-card.png"
    },
    {
      id: "liquid-metal-button",
      imageSrc: "/assets/images/showcase/liquid-metal-button.png"
    },
    {
      id: "matrix-code-rain",
      imageSrc: "/assets/images/showcase/matrix-code-rain.png"
    },
    {
      id: "character-selector",
      imageSrc: "/assets/images/showcase/character-selector.png"
    },
    {
      id: "animated-code-block",
      imageSrc: "/assets/images/showcase/animated-code-block.png"
    },
    {
      id: "scroll-animation-trigger",
      imageSrc: "/assets/images/showcase/scroll-animation-trigger.png"
    },
    {
      id: "majestic-card",
      imageSrc: "/assets/images/showcase/majestic-card.png"
    }
  ]

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
    )
  }

  const generateCards = (repeat = 3): CardInfo[] => {
    const repeatedCards: CardInfo[] = []
    for (let i = 0; i < repeat; i++) {
      cardData.forEach(card => {
        repeatedCards.push({...card, uniqueKey: `${card.id}-${i}`})
      })
    }
    return repeatedCards
  }

  const allCards = generateCards()
  const halfLength = Math.ceil(allCards.length / 2)
  const leftColumnCards = allCards.slice(0, halfLength)
  const rightColumnCards = allCards.slice(halfLength)

  return (
    <div className="relative w-full overflow-hidden text-gray-900 dark:text-white md:pt-12">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16 sm:px-6 lg:px-8">
        <div className="grid md:gap-12 lg:grid-cols-12">
          <div className="flex flex-col justify-center md:space-y-8 lg:col-span-6 pt-4">
            <Text />
          </div>
          <div className="relative lg:col-span-6 h-[600px] -z-1">
            <div className="absolute left-0 top-20 hidden lg:block">
            </div>
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 rounded-lg lg:border-t border-gray-500 dark:border-gray-700">
                <div className="absolute top-0 left-0 h-full hidden lg:block w-[1px] bg-gradient-to-b from-gray-500 dark:from-gray-700 to-transparent"></div>
                <div className="absolute top-0 right-0 h-full hidden lg:block w-[1px] bg-gradient-to-b from-gray-500 dark:from-gray-700 to-transparent"></div>
              </div>
              <div
                ref={scrollRef}
                className="relative h-full overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
                }}
              >
                <div className="pt-24 pb-24">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-4">
                    <div className="space-y-6">
                      {leftColumnCards.map((card, index) => (
                        <div 
                          key={card.uniqueKey} 
                          className="opacity-0 animate-fadeIn" 
                          style={{ 
                            animationDelay: `${index * 0.15}s`, 
                            animationFillMode: 'forwards',
                            animationDuration: '0.8s'
                          }}
                        >
                          {renderCard(card)}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-6 mt-12 md:mt-24">
                      {rightColumnCards.map((card, index) => (
                        <div 
                          key={card.uniqueKey} 
                          className="opacity-0 animate-fadeIn" 
                          style={{ 
                            animationDelay: `${(index + 4) * 0.15}s`, 
                            animationFillMode: 'forwards',
                            animationDuration: '0.8s'
                          }}
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
                      animation: `float ${5 + Math.random() * 10}s linear infinite`,
                      animationDelay: `${Math.random() * 5}s`
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}