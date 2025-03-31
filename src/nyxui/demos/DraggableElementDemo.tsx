"use client"
import { useState } from "react"
import { DraggableElement } from "@/nyxui/components/DraggableElement"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CreditCard, 
  DollarSign, 
  Activity, 
  User, 
  Calendar, 
  RefreshCw,
  PieChart 
} from "lucide-react"
import { motion } from "framer-motion"

export function DraggableElementDemo() {
  const [resetTrigger, setResetTrigger] = useState(0);
  
  // Predefined positions for cards
  const positions = [
    { x: 50, y: 50 },
    { x: 380, y: 50 },
    { x: 50, y: 320 },
    { x: 380, y: 320 }
  ];
  
  // Reset positions of cards
  const resetPositions = () => {
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-bold">Interactive Dashboard Cards</h2>
        <Button 
          onClick={resetPositions} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>
      </motion.div>

      {/* Draggable playground */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-zinc-800 p-4 rounded-xl shadow-lg relative overflow-hidden"
        style={{ height: "500px" }}
      >
        {/* User Profile Card */}
        <DraggableElement
          key={`user-profile-${resetTrigger}`}
          dragConstraints="parent"
          dragElastic={0.3}
          dragMomentum={true}
          initialPosition={positions[0]}
        >
          <Card className="w-[280px] shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-blue-500" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Alex Morgan</p>
                  <p className="text-sm text-gray-500">Product Designer</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                  <p className="text-lg font-medium">28</p>
                  <p className="text-xs">Projects</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                  <p className="text-lg font-medium">142</p>
                  <p className="text-xs">Tasks</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                  <p className="text-lg font-medium">8</p>
                  <p className="text-xs">Teams</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DraggableElement>

        {/* Revenue Card */}
        <DraggableElement
          key={`revenue-${resetTrigger}`}
          dragConstraints="parent"
          dragElastic={0.3}
          dragMomentum={true}
          initialPosition={positions[1]}
        >
          <Card className="w-[280px] shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-green-500" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <p className="text-2xl font-bold">$24,780</p>
                <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full flex items-center">
                  <span>+12.5%</span>
                </div>
              </div>
              <div className="mt-4 h-[80px] flex items-end justify-between gap-1">
                {[40, 65, 35, 85, 55, 75, 30, 90].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm"
                    style={{ height: `${height}%` }} 
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Jan</span>
                <span>Apr</span>
                <span>Aug</span>
                <span>Dec</span>
              </div>
            </CardContent>
          </Card>
        </DraggableElement>

        {/* Payment Card */}
        <DraggableElement
          key={`payment-${resetTrigger}`}
          dragConstraints="parent"
          dragElastic={0.3}
          dragMomentum={true}
          initialPosition={positions[2]}
        >
          <Card className="w-[280px] shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5 text-purple-500" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                  <div>
                    <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 04/2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10">
                  <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
                  <div>
                    <p className="text-sm font-medium">•••• •••• •••• 8888</p>
                    <p className="text-xs text-gray-500">Expires 12/2026</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DraggableElement>

        {/* Analytics Card */}
        <DraggableElement
          key={`analytics-${resetTrigger}`}
          dragConstraints="parent"
          dragElastic={0.3}
          dragMomentum={true}
          initialPosition={positions[3]}
        >
          <Card className="w-[280px] shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="h-5 w-5 text-amber-500" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                  <p className="text-xs uppercase font-bold">Direct</p>
                  <p className="text-2xl font-bold">45%</p>
                </div>
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  <p className="text-xs uppercase font-bold">Social</p>
                  <p className="text-2xl font-bold">30%</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  <p className="text-xs uppercase font-bold">Referral</p>
                  <p className="text-2xl font-bold">15%</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  <p className="text-xs uppercase font-bold">Search</p>
                  <p className="text-2xl font-bold">10%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DraggableElement>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-center text-gray-500 mt-4"
      >
        Drag cards freely to arrange your dashboard. Click Reset to restore the original layout.
      </motion.p>
    </div>
  )
}