"use client"
import { useState } from "react"
import { ThreeDCard } from "@/nyxui/components/3DCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, User, Bell, Settings } from "lucide-react"
import Image from "next/image"

export function ThreeDCardDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto  flex flex-col p-6">
        <h2 className="text-2xl text-center font-bold mb-4">3D Card</h2>
        <div className="mb-8 ">
          <Card className="flex items-center justify-center p-8 bg-gray-100 dark:bg-zinc-900">
            <CardContent className="p-0 flex flex-col items-center gap-8">
              <ThreeDCard
                depth={50}
                perspective={1000}
                rotationIntensity={15}
                glareIntensity={0.2}
                shadowIntensity={0.8}
                hoverScale={1.05}
                borderRadius={16}
                backgroundColor="#ffffff"
                clickable={true}
                width={300}
                height={200}
                layers={[
                  {
                    content: <div className="absolute top-6 right-6 w-12 h-12 bg-blue-500 rounded-full opacity-50" />,
                    depth: 40,
                  },
                  {
                    content: (
                      <div className="absolute bottom-6 left-6 w-16 h-16 bg-purple-500 rounded-full opacity-30" />
                    ),
                    depth: 30,
                  },
                ]}
              >
                <div className="w-full h-full p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg text-black font-bold">Premium Card</h3>
                      <p className="text-sm text-gray-500">Interactive 3D effect</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                      <CreditCard size={16} />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="text-sm text-gray-500 mb-1">Card Number</div>
                    <div className="font-mon text-black">**** **** **** 4242</div>
                  </div>
                </div>
              </ThreeDCard>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Example 1 */}
            <Card className="p-6 bg-gray-100 dark:bg-zinc-900">
              <h4 className="text-lg font-medium text-center">Profile Card</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center px-2">
                A user profile card with moderate depth and subtle rotation. Perfect for team directories and user dashboards.
              </p>
              <div className="flex justify-center">
                <ThreeDCard
                  depth={40}
                  rotationIntensity={10}
                  glareIntensity={0.3}
                  borderRadius={16}
                  width={250}
                  height={180}
                  backgroundColor="zinc-900"
                >
                  <div className="w-full h-full p-4 flex flex-col items-center justify-center">
                    <div className="rounded-full mb-3 flex items-center justify-center text-white">
                      <Image
                        src="https://raw.githubusercontent.com/MihirJaiswal/digibazaar-frontend/refs/heads/main/public/mihir.jpg"
                        alt="User"
                        width={200}
                        height={200}
                        quality={100}
                        loading="lazy"
                        className="rounded-full h-12 w-auto"
                      />
                    </div>
                    <h5 className="font-bold text-black dark:text-white">Mihir Jaiswal</h5>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                    <div className="mt-3 flex gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                      <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                    </div>
                  </div>
                </ThreeDCard>
              </div>
            </Card>

            {/* Example 2 */}
            <Card className="p-6 bg-gray-100 dark:bg-zinc-900">
              <h4 className="text-lg font-medium text-center">Notification Card</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-venter px-2">
                An alert card with lower depth for a more subtle effect. Ideal for notifications, alerts, and system messages.
              </p>
              <div className="flex justify-center">
                <ThreeDCard
                  depth={30}
                  rotationIntensity={12}
                  backgroundColor="#f8fafc"
                  borderRadius={12}
                  width={250}
                  height={180}
                >
                  <div className="w-full h-full p-4 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
                        <Bell size={16} />
                      </div>
                      <div>
                        <h5 className="font-bold text-red-500">New Alert</h5>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your subscription will expire in 3 days. Renew now to avoid service interruption.
                    </p>
                    <Button size="sm" className="mt-auto">
                      Renew Now
                    </Button>
                  </div>
                </ThreeDCard>
              </div>
            </Card>
          </div>
        </div>
      </div>
  )
}