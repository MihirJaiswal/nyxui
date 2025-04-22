"use client"

import { useState, useEffect } from "react"
import { BentoGrid } from "@/nuvyxui/components/BentoGrid"
import {
  ChevronRight,
  ArrowUp,
  Users,
  Clock,
  Server,
  Activity,
  DollarSign,
  TrendingUp,
  Calendar,
  BarChart3,
  Globe,
  Zap,
  Eye,
} from "lucide-react"

const generateRevenueData = () => {
  return [
    { name: "Jan", value: 65, amount: "$12,450" },
    { name: "Feb", value: 59, amount: "$11,200" },
    { name: "Mar", value: 78, amount: "$14,800" },
    { name: "Apr", value: 72, amount: "$13,950" },
    { name: "May", value: 85, amount: "$16,300" },
    { name: "Jun", value: 96, amount: "$18,420" },
  ]
}

export const BentoGridDemo = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const revenueData = generateRevenueData()

  return (
    <div>
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoGrid
            title={
              <div className="flex flex-wrap items-center justify-items-start gap-2">
                <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30">
                  <BarChart3 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <span>Monthly Revenue</span>
              </div>
            }
            description={
              <div className="flex flex-wrap items-center gap-2">
                <ArrowUp className="w-4 h-4 text-emerald-500" />
                <span className="font-medium text-emerald-500">12% increase</span>
                <span className="text-gray-500">from previous month</span>
              </div>
            }
            component={
              <div className="h-full w-full p-4 flex flex-col">
                <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                  <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full text-xs font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>Growing</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                    <DollarSign className="w-6 h-6 text-rose-500" />
                    <span>18,420</span>
                  </div>
                </div>

                <div className="flex w-full h-32 items-end justify-between gap-1 mt-auto">
                  {revenueData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center group">
                      <div className="relative">
                        <div
                          className="w-12 bg-gradient-to-t from-rose-600 to-rose-400 dark:from-rose-500 dark:to-rose-300 rounded-t-md transition-all duration-300 group-hover:from-rose-500 group-hover:to-rose-300 shadow-lg"
                          style={{
                            height: `${item.value}%`,
                            transform: `scaleY(${index === revenueData.length - 1 ? "1" : "0.85"})`,
                            opacity: `${index === revenueData.length - 1 ? "1" : "0.85"}`,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                            {item.amount}
                          </div>
                        </div>
                        <div className="text-xs mt-2 text-gray-500 font-medium">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Last 6 months</span>
                  </div>
                  <button className="text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium flex items-center gap-1 transition-colors">
                    <span>Full report</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            }
            className="md:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
          />

          <BentoGrid
            title={
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                  <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <span>User Engagement</span>
              </div>
            }
            description="Daily activity patterns across user segments"
            component={
              <div className="relative h-full w-full bg-gradient-to-br from-violet-600 to-indigo-700 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex flex-col p-6">
                  <div className="flex justify-between items-center text-white mb-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      <span className="font-semibold">Active Users</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-sm font-medium">847 online now</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-indigo-300" />
                      <span>Mobile</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-purple-300" />
                      <span>Desktop</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-300" />
                      <span>Tablet</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 w-full flex-1">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dayIndex) => (
                      <div key={`day-${dayIndex}`} className="flex flex-col gap-1">
                        <div className="text-xs text-white/70 text-center mb-1 font-medium">{day}</div>
                        {Array(24)
                          .fill(0)
                          .map((_, hour) => {
                            let intensity = 0
                            if (hour >= 8 && hour <= 11) {
                              intensity = Math.random() * 0.3 + 0.6
                            } else if (hour >= 14 && hour <= 17) {
                              intensity = Math.random() * 0.3 + 0.7
                            } else if (hour >= 19 && hour <= 22) {
                              intensity = Math.random() * 0.4 + 0.5
                            } else {
                              intensity = Math.random() * 0.3
                            }

                            if (dayIndex >= 5) {
                              if (hour >= 10 && hour <= 18) {
                                intensity = Math.random() * 0.4 + 0.4
                              } else {
                                intensity = Math.random() * 0.3
                              }
                            }

                            const deviceType = Math.random()
                            let bgColor = "bg-indigo-300"
                            if (deviceType > 0.6) {
                              bgColor = "bg-purple-300"
                            } else if (deviceType > 0.3) {
                              bgColor = "bg-blue-300"
                            }

                            return (
                              <div
                                key={`day-${dayIndex}-hour-${hour}`}
                                className={`h-1.5 w-full rounded-full ${bgColor} transition-all duration-300 hover:opacity-100`}
                                style={{
                                  opacity: intensity,
                                  transform: `scaleY(${intensity > 0.7 ? 1.2 : 1})`,
                                }}
                              />
                            )
                          })}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between w-full mt-6 text-white">
                    <div className="flex flex-col bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      <span className="text-2xl font-bold">3,842</span>
                      <span className="text-xs opacity-80">Weekly active users</span>
                    </div>
                    <div className="flex flex-col items-end bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold">47.3%</span>
                        <ArrowUp className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-xs opacity-80">User growth rate</span>
                    </div>
                  </div>
                </div>
              </div>
            }
            className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
            fade={["bottom"]}
            dark
          />

          <BentoGrid
            title={
              <div className="flex flex-wrap items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>Real-time Data</span>
              </div>
            }
            description="Live updates from connected devices"
            component={
              <div className="h-full w-full bg-white dark:bg-zinc-950 flex items-center justify-center p-6 rounded-lg">
                <div className="w-full space-y-6">
                  {[
                    {
                      name: "Production API",
                      value: 97,
                      color: "bg-emerald-500",
                      shadow: "shadow-emerald-200 dark:shadow-emerald-900/20",
                    },
                    {
                      name: "Staging Server",
                      value: 82,
                      color: "bg-blue-500",
                      shadow: "shadow-blue-200 dark:shadow-blue-900/20",
                    },
                    {
                      name: "Development",
                      value: 45,
                      color: "bg-amber-500",
                      shadow: "shadow-amber-200 dark:shadow-amber-900/20",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${item.color}`}></div>
                          {item.name}
                        </span>
                        <span
                          className={`font-bold ${item.value > 90 ? "text-emerald-500" : item.value > 70 ? "text-blue-500" : "text-amber-500"}`}
                        >
                          {item.value}%
                        </span>
                      </div>
                      <div className="h-3 w-full bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner">
                        <div
                          className={`h-full ${item.color} rounded-full shadow-lg ${item.shadow}`}
                          style={{
                            width: `${item.value}%`,
                            animation: `pulse 2s infinite ${i * 0.2}s`,
                            transition: "width 1s ease-in-out",
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Last updated: {currentTime}</span>
                    </div>
                    <button className="text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium flex items-center gap-1 transition-colors">
                      <span>Refresh</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            }
            className="md:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
          />

          <BentoGrid
            title={
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                  <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <span>Performance Metrics</span>
              </div>
            }
            description="Server response times and key indicators"
            component={
              <div className="h-full w-full flex items-center justify-center p-6 bg-white dark:bg-zinc-950 rounded-lg">
                <div className="grid grid-cols-2 gap-8 w-full">
                  <div className="flex flex-col items-center">
                    <div className="relative w-36 h-36">
                      <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(203, 213, 225, 0.4)"
                          strokeWidth="10"
                          className="dark:stroke-gray-700"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient1)"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset="8.5"
                          strokeLinecap="round"
                          className="drop-shadow-lg"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="283"
                            to="8.5"
                            dur="1.5s"
                            fill="freeze"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1"
                          />
                        </circle>
                        <defs>
                          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#0ea5e9" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-gray-800 dark:text-white">97%</span>
                        <span className="text-sm text-gray-500">Uptime</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                      <Server className="w-4 h-4" />
                      <span>Last 30 days</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-36 h-36">
                      <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(203, 213, 225, 0.4)"
                          strokeWidth="10"
                          className="dark:stroke-gray-700"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient2)"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset="113.2"
                          strokeLinecap="round"
                          className="drop-shadow-lg"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="283"
                            to="113.2"
                            dur="1.5s"
                            fill="freeze"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1"
                          />
                        </circle>
                        <defs>
                          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-gray-800 dark:text-white">42ms</span>
                        <span className="text-sm text-gray-500">Response</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                      <Activity className="w-4 h-4" />
                      <span>Global average</span>
                    </div>
                  </div>
                </div>
              </div>
            }
            className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}