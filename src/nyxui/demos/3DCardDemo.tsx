"use client"
import { useState } from "react"
import { ThreeDCard } from "@/nyxui/components/3DCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, User, Bell, Settings } from "lucide-react"

export function ThreeDCardDemo() {
  return (
    <div className="w-full flex flex-col gap-8 p-6">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">3D Card</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Interactive cards with 3D perspective effects. Responds to mouse movement with realistic lighting and depth.
        </p>

        <div className="mb-8">
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
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The 3D Card component can be used in various UI contexts. Hover over the examples below to see the 3D effect in action.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Example 1 */}
            <Card className="p-6 bg-gray-100 dark:bg-zinc-900">
              <h4 className="text-lg font-medium mb-4">Profile Card</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
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
                >
                  <div className="w-full h-full p-4 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center text-white">
                      <User size={24} />
                    </div>
                    <h5 className="font-bold">John Doe</h5>
                    <p className="text-sm text-gray-500">Product Designer</p>
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
              <h4 className="text-lg font-medium mb-4">Notification Card</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
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
                        <h5 className="font-bold">New Alert</h5>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    <p className="text-sm">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Example 3 */}
            <Card className="p-6 bg-gray-100 dark:bg-zinc-900">
              <h4 className="text-lg font-medium mb-4">Settings Card</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A dark-themed settings card with higher depth for a pronounced effect. Works well for preference panels and configuration interfaces.
              </p>
              <div className="flex justify-center">
                <ThreeDCard
                  depth={50}
                  rotationIntensity={15}
                  backgroundColor="#1e293b"
                  borderRadius={20}
                  width={250}
                  height={180}
                  glareColor="rgba(255, 255, 255, 0.6)"
                >
                  <div className="w-full h-full p-4 flex flex-col text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Settings size={16} />
                      </div>
                      <div>
                        <h5 className="font-bold">Settings</h5>
                        <p className="text-xs text-gray-300">System preferences</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Dark Mode</span>
                        <div className="w-8 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Notifications</span>
                        <div className="w-8 h-4 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </ThreeDCard>
              </div>
            </Card>

            {/* Example 4 - Premium Card */}
            <Card className="p-6 bg-gray-100 dark:bg-zinc-900">
              <h4 className="text-lg font-medium mb-4">Credit Card</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A premium credit card display with multiple depth layers and light glare. Perfect for financial interfaces and payment methods.
              </p>
              <div className="flex justify-center">
                <ThreeDCard
                  depth={45}
                  rotationIntensity={12}
                  glareIntensity={0.25}
                  borderRadius={16}
                  width={250}
                  height={180}
                  backgroundColor="#f0f9ff"
                  layers={[
                    {
                      content: <div className="absolute top-4 right-4 w-10 h-10 bg-blue-500 rounded-full opacity-50" />,
                      depth: 35,
                    },
                  ]}
                >
                  <div className="w-full h-full p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-bold">Platinum</h5>
                        <p className="text-xs text-gray-500">Premium Account</p>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                        <CreditCard size={14} />
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="text-xs text-gray-500 mb-1">Card Number</div>
                      <div className="font-mono text-sm">**** **** **** 5678</div>
                    </div>
                  </div>
                </ThreeDCard>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}