"use client"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import Text from "./Text"


export const Build = () => {
  const [priceRange, setPriceRange] = useState([300])
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

  const cardComponents = [
    <Card key="price" className="border-gray-800 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 backdrop-blur-sm transform transition-all hover:scale-105 shadow-sm dark:shadow-none">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Price Range</h3>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Drag sliders to set minimum and maximum price</p>
      <div className="mb-4 h-12">
        <Slider
          defaultValue={[300]}
          max={500}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
      </div>
      <div className="flex justify-between">
        <div className="rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-1 text-gray-900 dark:text-white">$0</div>
        <div className="rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-1 text-gray-900 dark:text-white">${priceRange[0]}</div>
        <div className="rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-1 text-gray-900 dark:text-white">$500</div>
      </div>
    </Card>,
    <Card key="payment" className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 backdrop-blur-sm transform transition-all hover:scale-105 shadow-sm dark:shadow-none">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-12 items-center justify-center rounded bg-red-500">
            <div className="h-4 w-4 rounded-full bg-yellow-500 opacity-80"></div>
          </div>
          <div>
            <p className="text-sm text-gray-900 dark:text-white">MasterCard ending in 6745</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Expires on 01/2023</p>
          </div>
        </div>
        <Badge className="bg-pink-600 text-white">Primary</Badge>
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-16 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-800">
            PayPal
          </div>
          <div>
            <p className="text-sm text-gray-900 dark:text-white">PayPal</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Select this option to pay with PayPal</p>
          </div>
        </div>
      </div>
    </Card>,
    <Card key="deploy" className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 backdrop-blur-sm transform transition-all hover:scale-105 shadow-sm dark:shadow-none">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Deploy Node.js app to Acme</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">By The Acme Team</p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Build and deploy a Node.js web application with the latest and most secure settings for
            modern applications.
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800">
          <div className="h-5 w-5 rounded-sm bg-gray-400"></div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Badge className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">Node.js</Badge>
        <Badge className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">TypeScript</Badge>
      </div>
    </Card>,
    <Card key="calendar" className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 backdrop-blur-sm transform transition-all hover:scale-105 shadow-sm dark:shadow-none">
      <div className="mb-4 flex justify-between">
        <div className="text-sm font-medium text-gray-900 dark:text-white">Nov</div>
        <div className="text-sm font-medium text-gray-900 dark:text-white">Dec</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
          <div key={i} className="text-gray-400 dark:text-gray-500">
            {day}
          </div>
        ))}
        {[...Array(30)].map((_, i) => {
          const isToday = i === 15
          return (
            <div key={i} className={`rounded-full p-1 ${isToday ? "bg-purple-600 text-white" : "text-gray-900 dark:text-white"}`}>
              {i + 1}
            </div>
          )
        })}
      </div>
    </Card>,
    <Card key="notification" className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 backdrop-blur-sm transform transition-all hover:scale-105 shadow-sm dark:shadow-none">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20">
          <Check className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">Payment Successful</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your payment has been processed successfully</p>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="sm" className="h-8 bg-white dark:bg-transparent border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">View Receipt</Button>
            <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white">Close</Button>
          </div>
        </div>
      </div>
    </Card>,
    <Card key="analytics" className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 backdrop-blur-sm transform transition-all hover:scale-105 shadow-sm dark:shadow-none">
      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Analytics Overview</h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col p-3 rounded-lg bg-gray-100/80 dark:bg-gray-800/50">
          <span className="text-xs text-gray-500 dark:text-gray-400">Users</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">24.8k</span>
          <span className="text-xs text-green-500">+12%</span>
        </div>
        <div className="flex flex-col p-3 rounded-lg bg-gray-100/80 dark:bg-gray-800/50">
          <span className="text-xs text-gray-500 dark:text-gray-400">Revenue</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">$48.5k</span>
          <span className="text-xs text-green-500">+8%</span>
        </div>
        <div className="flex flex-col p-3 rounded-lg bg-gray-100/80 dark:bg-gray-800/50">
          <span className="text-xs text-gray-500 dark:text-gray-400">Conversion</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">3.2%</span>
          <span className="text-xs text-red-500">-2%</span>
        </div>
      </div>
    </Card>,
    <Card key="visa" className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-6 backdrop-blur-sm transform transition-all hover:scale-105 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-12 items-center justify-center rounded bg-blue-600">
            <div className="text-xs font-bold text-white">VISA</div>
          </div>
          <div>
            <p className="text-sm text-gray-900 dark:text-white">Visa ending in 1234</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Expires on 05/2024</p>
          </div>
        </div>
      </div>
    </Card>
  ]
  const allCards = [...cardComponents, ...cardComponents, ...cardComponents]
  return (
    <div className="relative w-full overflow-hidden text-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 md:py-16 sm:px-6 lg:px-8">
        <div className="grid md:gap-12 lg:grid-cols-12">
          <div className="flex flex-col justify-center md:space-y-8 lg:col-span-5">
            <Text/>
          </div>
          <div className="relative lg:col-span-7 h-[700px] -z-1">
            <div className="absolute left-0 top-20 hidden lg:block">
             
            </div>
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 rounded-lg lg:border-t-2 border-purple-200 dark:border-purple-900 ">
                <div className="absolute top-0 left-0 h-full hidden lg:block w-0.5 bg-gradient-to-b from-purple-200 dark:from-purple-900 to-transparent"></div>
                <div className="absolute top-0 right-0 h-full hidden lg:block w-0.5 bg-gradient-to-b from-purple-200 dark:from-purple-900 to-transparent"></div>
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
                      {allCards.slice(0, allCards.length/2).map((card, index) => (
                        <div 
                          key={`left-${index}`} 
                          className="opacity-0 animate-fadeIn" 
                          style={{ 
                            animationDelay: `${index * 0.15}s`, 
                            animationFillMode: 'forwards',
                            animationDuration: '0.8s'
                          }}
                        >
                          {card}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-6 mt-12 md:mt-24">
                      {allCards.slice(allCards.length/2).map((card, index) => (
                        <div 
                          key={`right-${index}`} 
                          className="opacity-0 animate-fadeIn" 
                          style={{ 
                            animationDelay: `${(index + 4) * 0.15}s`, 
                            animationFillMode: 'forwards',
                            animationDuration: '0.8s'
                          }}
                        >
                          {card}
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