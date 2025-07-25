"use client"

import { useState } from "react"
import { ImageScanner } from "../ui/image-scanner"
import {
  Activity,
  Clock,
  MapPin,
  Shield,
  Maximize2,
  MoreVertical,
  Signal,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export const ImageScannerDemo1 = () => {
  const [selectedCamera, setSelectedCamera] = useState(0)
  const [alertLevel, setAlertLevel] = useState<"normal" | "warning" | "critical">("normal")
  const [scanTrigger, setScanTrigger] = useState(false)

  const cameras = [
    {
      id: 1,
      name: "Main Entrance",
      location: "Building A - Floor 1",
      image: "/assets/images/image-scanner/entrance.jpg",
      lastScan: "2 min ago",
      alertLevel: "normal" as const,
      fps: 30,
    },
    {
      id: 2,
      name: "Parking Garage",
      location: "Underground Level",
      image: "/assets/images/image-scanner/parking.png",
      lastScan: "1 min ago",
      alertLevel: "warning" as const,
      fps: 25,
    },
    {
      id: 3,
      name: "Server Room",
      location: "Building B - Floor 3",
      image: "/assets/images/image-scanner/serverroom.png",
      lastScan: "3 min ago",
      alertLevel: "critical" as const,
      fps: 30,
    },
    {
      id: 4,
      name: "Reception Area",
      location: "Building A - Floor 1",
      image: "/assets/images/image-scanner/reception.png",
      lastScan: "30 sec ago",
      alertLevel: "normal" as const,
      fps: 30,
    },
  ]

  const triggerManualScan = () => {
    setScanTrigger(prev => !prev)
  }

  const getScanColor = (level: "critical" | "warning" | "normal") => {
    switch (level) {
      case "critical": return "red"
      case "warning": return "amber"
      default: return "emerald"
    }
  }

  const getScanType = (cameraId: number) => {
    switch (cameraId) {
      case 1: return "matrix"
      case 2: return "radar"
      case 3: return "grid"
      case 4: return "pulse"
      default: return "default"
    }
  }

  const getBadgeVariant = (level: "critical" | "warning" | "normal") => {
    switch (level) {
      case "critical": return "destructive"
      case "warning": return "secondary"
      default: return "default"
    }
  }

  return (
    <div className="bg-white shadow-xl dark:bg-black/70 border md:scale-90 relative border-neutral-200 dark:border-neutral-700 rounded-sm p-3 sm:px-4 py-6 text-neutral-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-blue-600/20 rounded-sm sm:rounded-sm border border-blue-500/30">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl uppercase font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                Click on the image to scan
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mt-1 text-sm">
                <Signal className="w-4 h-4" />
                Scan images automatically
              </p>
            </div>
          </div>

          <Badge variant={getBadgeVariant(alertLevel)} className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold">
            {alertLevel.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Camera Feed */}
          <div className="xl:col-span-2">
            <Card className="bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 backdrop-blur-sm rounded-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white truncate">
                      {cameras[selectedCamera].name}
                    </CardTitle>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{cameras[selectedCamera].location}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs">
                      {cameras[selectedCamera].fps} FPS
                    </Badge>
                    <Button onClick={triggerManualScan} className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm" size="sm">
                      <Activity className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Manual Scan</span>
                    </Button>
                    <Button variant="outline" size="sm" className="border-neutral-300 dark:border-neutral-600 bg-transparent p-2">
                      <Maximize2 className="w-4 h-4 text-neutral-700 dark:text-white" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 overflow-hidden">
                <div className="apesct-square md:aspect-video md:h-78 md:w-auto bg-neutral-100 dark:bg-neutral-900 overflow-hidden border border-neutral-200 dark:border-neutral-700">
                  <ImageScanner
                    image={cameras[selectedCamera].image}
                    alt={`${cameras[selectedCamera].name} camera feed`}
                    autoScan
                    scanDelay={5}
                    scanSpeed={3}
                    scanColor={getScanColor(cameras[selectedCamera].alertLevel)}
                    scanType={getScanType(cameras[selectedCamera].id)}
                    scanIntensity="high"
                    loop
                    triggerScan={scanTrigger}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Camera List */}
          <div className="xl:col-span-1">
            <Card className="bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 backdrop-blur-sm rounded-sm">
              <CardContent className="px-3 sm:px-4">
                <div className="space-y-2 sm:space-y-4">
                  {cameras.map((camera, index) => (
                    <div
                      key={camera.id}
                      className={`p-3 sm:p-4.5 rounded-sm cursor-pointer transition-all border ${
                        selectedCamera === index
                          ? "bg-blue-50 dark:bg-blue-600/20 border-blue-200 dark:border-blue-500 shadow-sm dark:shadow-blue-500/20"
                          : "bg-white dark:bg-neutral-800/50 border-neutral-200 dark:border-zinc-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-500"
                      }`}
                      onClick={() => setSelectedCamera(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div
                            className={`w-3 h-3 rounded-full flex-shrink-0 ${
                              camera.alertLevel === "critical"
                                ? "bg-red-500 animate-pulse"
                                : camera.alertLevel === "warning"
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                            }`}
                          />
                          <p className="font-medium text-neutral-900 dark:text-white text-sm truncate">
                            {camera.name}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {camera.lastScan}
                        </span>
                        <Badge variant={getBadgeVariant(camera.alertLevel)} className="text-xs">
                          {camera.alertLevel}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}