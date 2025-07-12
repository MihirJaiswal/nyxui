"use client"

import { useState, useEffect } from "react"
import { ImageScanner } from "../ui/image-scanner"
import {
  Activity,
  Clock,
  Eye,
  EyeOff,
  MapPin,
  Shield,
  Maximize2,
  MoreVertical,
  Signal,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Type definitions
interface ScanResult {
  id: string
  type: "object" | "anomaly" | "data" | "threat"
  confidence: number
  position: { x: number; y: number }
  label: string
}

// Main Security Dashboard Component
export const ImageScannerDemo = () => {
  const [selectedCamera, setSelectedCamera] = useState(0)
  const [alertLevel, setAlertLevel] = useState<"normal" | "warning" | "critical">("normal")
  const [scanTrigger, setScanTrigger] = useState(false)
  const [activeThreats, setActiveThreats] = useState(0)
  const [totalAlerts, setTotalAlerts] = useState(0)
  

  const cameras = [
    {
      id: 1,
      name: "Main Entrance",
      location: "Building A - Floor 1",
      image: "/assets/images/image-scanner/entrance.jpg",
      status: "active",
      lastScan: "2 min ago",
      alertLevel: "normal" as const,
      resolution: "4K",
      fps: 30,
    },
    {
      id: 2,
      name: "Parking Garage",
      location: "Underground Level",
      image: "/assets/images/image-scanner/parking.png",
      status: "active",
      lastScan: "1 min ago",
      alertLevel: "warning" as const,
      resolution: "1080p",
      fps: 25,
    },
    {
      id: 3,
      name: "Server Room",
      location: "Building B - Floor 3",
      image: "/assets/images/image-scanner/serverroom.png",
      status: "active",
      lastScan: "3 min ago",
      alertLevel: "critical" as const,
      resolution: "4K",
      fps: 30,
    },
    {
      id: 4,
      name: "Reception Area",
      location: "Building A - Floor 1",
      image: "/assets/images/image-scanner/reception.png",
      status: "active",
      lastScan: "30 sec ago",
      alertLevel: "normal" as const,
      resolution: "1080p",
      fps: 30,
    },
  ]

  const handleScanComplete = (results?: ScanResult[]) => {
    if (!results) return
    
    const threats = results.filter((r: ScanResult) => r.type === "threat").length
    const anomalies = results.filter((r: ScanResult) => r.type === "anomaly").length

    setActiveThreats((prev: number) => prev + threats)
    setTotalAlerts((prev: number) => prev + results.length)

    if (threats > 0) {
      setAlertLevel("critical")
    } else if (anomalies > 0) {
      setAlertLevel("warning")
    }
  }

  const triggerManualScan = () => {
    setScanTrigger((prev: boolean) => !prev)
  }

  const getScanColor = (level: "critical" | "warning" | "normal"): "red" | "amber" | "emerald" => {
    switch (level) {
      case "critical":
        return "red"
      case "warning":
        return "amber"
      default:
        return "emerald"
    }
  }

  const getScanType = (cameraId: number): "default" | "radar" | "grid" | "pulse" => {
    switch (cameraId) {
      case 1:
        return "default"
      case 2:
        return "radar"
      case 3:
        return "grid"
      case 4:
        return "pulse"
      default:
        return "default"
    }
  }

  const getAlertBadgeVariant = (level: "critical" | "warning" | "normal"): "destructive" | "secondary" | "default" => {
    switch (level) {
      case "critical":
        return "destructive"
      case "warning":
        return "secondary"
      default:
        return "default"
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalAlerts((prev: number) => prev + Math.floor(Math.random() * 2))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white shadow-xl shadow-gray-600/50 dark:bg-black border md:scale-90 relative border-gray-200 dark:border-gray-800 rounded-xl p-3 sm:p-4 lg:p-6 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-blue-600/20 rounded-lg sm:rounded-xl border border-blue-500/30">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl uppercase font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Click on the image to scan
              </h1>
              <p className="text-gray-500 dark:text-slate-400 flex items-center gap-2 mt-1 text-sm">
                <Signal className="w-4 h-4" />
                Scan images automatically
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Badge variant={getAlertBadgeVariant(alertLevel)} className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold">
              {alertLevel.toUpperCase()}
            </Badge>
            <Button
              variant='default'
              className="flex items-center gap-2 text-sm  bg-emerald-600 hover:bg-emerald-700 border-emerald-500"
              size="sm"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Auto Scan</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Camera Feed */}
          <div className="xl:col-span-2">
            <Card className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                      {cameras[selectedCamera].name}
                    </CardTitle>
                    <p className="text-gray-500 dark:text-slate-400 text-sm flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{cameras[selectedCamera].location}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 text-xs">
                      {cameras[selectedCamera].fps} FPS
                    </Badge>
                    <Button onClick={triggerManualScan} className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm" size="sm">
                      <Activity className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Manual Scan</span>
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-slate-600 bg-transparent p-2">
                      <Maximize2 className="w-4 h-4 text-gray-700 dark:text-white" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 overflow-hidden">
                <div className="apesct-square md:aspect-video md:h-78 md:w-auto bg-gray-100 dark:bg-slate-900 overflow-hidden border border-gray-200 dark:border-slate-700">
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
                    onScanComplete={handleScanComplete}
                    triggerScan={scanTrigger}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Camera List */}
          <div className="xl:col-span-1">
            <Card className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
              <CardContent className="px-3 sm:px-4">
                <div className="space-y-2 sm:space-y-4">
                  {cameras.map((camera, index) => (
                    <div
                      key={camera.id}
                      className={`p-3 sm:p-4.5  rounded-lg cursor-pointer transition-all border ${
                        selectedCamera === index
                          ? "bg-blue-50 dark:bg-blue-600/20 border-blue-200 dark:border-blue-500 shadow-sm dark:shadow-blue-500/20"
                          : "bg-white dark:bg-slate-800/50 border-gray-200 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-500"
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
                          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                            {camera.name}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {camera.lastScan}
                        </span>
                        <Badge
                          variant={
                            camera.alertLevel === "critical"
                              ? "destructive"
                              : camera.alertLevel === "warning"
                                ? "secondary"
                                : "default"
                          }
                          className="text-xs"
                        >
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