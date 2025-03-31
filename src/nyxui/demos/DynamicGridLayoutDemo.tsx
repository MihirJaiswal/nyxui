"use client"

import { useState, useEffect } from "react"
import { DynamicGridLayout, type GridItem } from "@/nyxui/components/DynamicGridLayout"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, LineChart, PieChart, Users, ShoppingCart, 
  CreditCard, TrendingUp, Calendar, Activity, 
  ArrowUpRight, Package, EyeOff, Eye, Zap,
  Sparkles, RefreshCcw, Boxes
} from "lucide-react"

export function DynamicGridLayoutDemo() {
  const [activeTab, setActiveTab] = useState("analytics")
  const [isCompact, setIsCompact] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  // Simulated refresh effect
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  // Analytics Dashboard Items
  const analyticsItems: GridItem[] = [
    {
      id: "revenue-overview",
      size: "featured",
      priority: 10,
      content: (
        <Card className="h-full overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                Monthly
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-4xl font-bold">$86,409</p>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>12.5% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 h-[140px] flex items-end justify-between">
              {[40, 65, 35, 85, 50, 70, 45, 90, 60, 75, 55, 80].map((height, i) => (
                <div key={i} className="w-6 group relative">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    ${height * 120}
                  </div>
                  <div 
                    className="bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t opacity-90 hover:opacity-100 transition-all hover:scale-105"
                    style={{ height: `${height * 1.2}px` }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
            <span>Jan</span>
            <span>Dec</span>
          </CardFooter>
        </Card>
      ),
    },
    {
      id: "active-users",
      size: "medium",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12,863</p>
            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="h-3 w-3" />
              <span>7.4% from last week</span>
            </div>
            <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-3/4 rounded-full"/>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "orders",
      size: "medium",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,567</p>
            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="h-3 w-3" />
              <span>12.3% from last week</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                Processed: 1,248
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800">
                Pending: 319
              </Badge>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "sales-trend",
      size: "wide",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <LineChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Sales Trend
              </CardTitle>
              <div className="flex text-xs gap-2">
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
                  This Week
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                  Last Week
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-[120px] flex items-end justify-between">
              {[30, 60, 40, 70, 50, 80, 60, 90, 70, 100, 80].map((height, i) => (
                <div key={i} className="w-6 group relative">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    ${height * 50}
                  </div>
                  <div 
                    className="bg-gradient-to-t from-amber-500 to-orange-400 rounded-t opacity-90 hover:opacity-100 transition-all hover:scale-105"
                    style={{ height: `${height}px` }}
                  />
                </div>
              ))}
              <div className="absolute bottom-0 w-full h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "revenue",
      size: "small",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-red-600 dark:text-red-400" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$24,345</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Daily average</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "calendar",
      size: "small",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-medium">March 31, 2025</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monday</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "traffic-sources",
      size: "tall",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <PieChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-40 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full h-32 w-32 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full h-24 w-24 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full h-16 w-16 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-violet-300 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full h-8 w-8 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span>Direct</span>
                </div>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Social</span>
                </div>
                <span className="font-medium">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  <span>Referral</span>
                </div>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Organic</span>
                </div>
                <span className="font-medium">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "conversion",
      size: "medium",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BarChart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.8%</p>
            <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="h-3 w-3" />
              <span>0.6% from last month</span>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mobile</p>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-1/2" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Desktop</p>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]

  // E-commerce Dashboard Items
  const ecommerceItems: GridItem[] = [
    {
      id: "top-products",
      size: "featured",
      priority: 10,
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Top Products</CardTitle>
              <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800">
                This Week
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Wireless Earbuds Pro", sales: 1245, percentage: 90 },
                { name: "Smart Watch Series X", sales: 982, percentage: 75 },
                { name: "Fitness Tracker Band", sales: 879, percentage: 65 },
                { name: "Bluetooth Speaker", sales: 654, percentage: 50 },
                { name: "Laptop Stand", sales: 523, percentage: 40 }
              ].map((product, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{product.sales} sales</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full" 
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "recent-sales",
      size: "wide",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { customer: "John Doe", product: "Wireless Earbuds Pro", amount: "$129.99", time: "2 hours ago" },
                { customer: "Jane Smith", product: "Smart Watch Series X", amount: "$299.99", time: "4 hours ago" },
                { customer: "Alex Johnson", product: "Fitness Tracker Band", amount: "$89.99", time: "6 hours ago" },
              ].map((sale, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="font-medium">{sale.customer}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{sale.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{sale.amount}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{sale.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "inventory",
      size: "medium",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Package className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              Inventory Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold">3,562</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total items in stock</p>
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-full">
                <Boxes className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Stock level</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Healthy</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "shipping",
      size: "medium",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              Shipping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-2xl font-bold">243</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Packages in transit</p>
              </div>
              <div>
                <p className="text-2xl font-bold">128</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Delivered today</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Processing</span>
                <span className="text-sm">34</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Shipped</span>
                <span className="text-sm">98</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Out for delivery</span>
                <span className="text-sm">111</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "customer-satisfaction",
      size: "small",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              Customer Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">92%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Based on 1,245 reviews</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "active-cart",
      size: "small",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-red-600 dark:text-red-400" />
              Active Carts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">87</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">$5,234 potential revenue</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "revenue-breakdown",
      size: "tall",
      content: (
        <Card className="h-full border-none shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              {[
                { category: "Electronics", amount: "$45,678", percentage: 65 },
                { category: "Clothing", amount: "$21,345", percentage: 30 },
                { category: "Home & Garden", amount: "$12,567", percentage: 18 },
                { category: "Sports", amount: "$8,901", percentage: 12 },
                { category: "Beauty", amount: "$6,543", percentage: 9 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.category}</span>
                    <span>{item.amount}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]

  // Set the grid items based on the active tab
  const activeItems = activeTab === "analytics" ? analyticsItems : ecommerceItems

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6 bg-white dark:bg-gray-950 rounded-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Dynamic Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Responsive grid layout with dynamic morphing elements. Resize the window to see the magic happen.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={() => setIsCompact(!isCompact)}
          >
            {isCompact ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {isCompact ? "Expand" : "Compact"}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleRefresh}
          >
            <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="ecommerce" className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            E-commerce
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-0">
          <div className="relative">
            {isRefreshing && (
              <div className="absolute inset-0 bg-white/50 dark:bg-black/50 z-10 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg">
                  <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
                  <span>Refreshing data...</span>
                </div>
              </div>
            )}
            <DynamicGridLayout
              items={activeItems}
              className="w-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="ecommerce" className="mt-0">
          <div className="relative">
            {isRefreshing && (
              <div className="absolute inset-0 bg-white/50 dark:bg-black/50 z-10 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg">
                  <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
                  <span>Refreshing data...</span>
                </div>
              </div>
            )}
            <DynamicGridLayout
              items={activeItems}
              className="w-full"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}