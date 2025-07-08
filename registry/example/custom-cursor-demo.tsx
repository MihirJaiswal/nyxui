"use client"

import { useState } from "react"
import {
  MousePointer2,
  Square,
  Circle,
  Type,
  ImageIcon,
  Hand,
  Minus,
  Plus,
  Share,
  Play,
  ChevronDown,
  ChevronRight,
  Eye,
  Search,
  Layers,
  Palette,
  LucideComponent,
  Zap,
  Menu,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Cursor } from "../ui/custom-cursor"
import Image from "next/image"

export default function CustomCursorDemo() {
  const [selectedTool, setSelectedTool] = useState("pointer")
  const [selectedLayer, setSelectedLayer] = useState("button")
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  
  // State for all input values
  const [cornerRadius, setCornerRadius] = useState("8")
  const [opacity, setOpacity] = useState("100%")
  const [fontSize, setFontSize] = useState("16")
  const [fontWeight, setFontWeight] = useState("500")
  const [width, setWidth] = useState("192")
  const [height, setHeight] = useState("48")
  const [xPosition, setXPosition] = useState("91")
  const [yPosition, setYPosition] = useState("680")

  const tools = [
    { id: "pointer", icon: MousePointer2, label: "Move" },
    { id: "hand", icon: Hand, label: "Hand" },
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "ellipse", icon: Circle, label: "Ellipse" },
    { id: "text", icon: Type, label: "Text" },
    { id: "image", icon: ImageIcon, label: "Image" },
  ]

  // Custom SVG icons for different tools
  const getToolCursor = (toolId: string) => {
    const toolCursors = {
      pointer: {
        svg: <MousePointer2 className="w-4 h-4" />,
        name: "Select",
        color: "blue",
      },
      hand: {
        svg: <Hand className="w-4 h-4" />,
        name: "Pan",
        color: "green",
      },
      rectangle: {
        svg: <Square className="w-4 h-4" />,
        name: "Rectangle",
        color: "purple",
      },
      ellipse: {
        svg: <Circle className="w-4 h-4" />,
        name: "Ellipse",
        color: "pink",
      },
      text: {
        svg: <Type className="w-4 h-4" />,
        name: "Text",
        color: "yellow",
      },
      image: {
        svg: <ImageIcon className="w-4 h-4" />,
        name: "Image",
        color: "indigo",
      },
    }
    return toolCursors[toolId as keyof typeof toolCursors] || toolCursors.pointer
  }

  const LayersPanel = () => (
    <div className="p-3 border-b border-[#3c3c3c]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">Layers</span>
        <Button variant="ghost" size="sm" className="w-6 h-6 p-0 text-gray-400 hover:text-white">
          <Search className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-1">
        <Cursor name="Layer" cursorColor="sky">
          <div className="flex items-center gap-2 p-1 rounded hover:bg-[#2c2c2c] cursor-pointer">
            <ChevronDown className="w-3 h-3 text-gray-400" />
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="text-sm flex-1">Home Screen</span>
            <Eye className="w-3 h-3 text-gray-400" />
          </div>
        </Cursor>

        <div className="ml-4 space-y-1">
          <Cursor name="Header" cursorColor="purple">
            <div className="flex items-center gap-2 p-1 rounded hover:bg-[#2c2c2c] cursor-pointer">
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Square className="w-4 h-4 text-purple-400" />
              <span className="text-sm flex-1">Header</span>
              <Eye className="w-3 h-3 text-gray-400" />
            </div>
          </Cursor>

          <Cursor name="Button" cursorColor="green">
            <div
              className={`flex items-center gap-2 p-1 rounded cursor-pointer ${
                selectedLayer === "button" ? "bg-blue-600" : "hover:bg-[#2c2c2c]"
              }`}
              onClick={() => setSelectedLayer("button")}
            >
              <div className="w-3 h-3" />
              <Square className="w-4 h-4 text-green-400" />
              <span className="text-sm flex-1">Button</span>
              <Eye className="w-3 h-3 text-gray-400" />
            </div>
          </Cursor>

          <Cursor name="Text" cursorColor="yellow">
            <div className="flex items-center gap-2 p-1 rounded hover:bg-[#2c2c2c] cursor-pointer">
              <div className="w-3 h-3" />
              <Type className="w-4 h-4 text-orange-400" />
              <span className="text-sm flex-1">Welcome Text</span>
              <Eye className="w-3 h-3 text-gray-400" />
            </div>
          </Cursor>
        </div>
      </div>
    </div>
  )

  const AssetsPanel = () => (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">Assets</span>
        <Button variant="ghost" size="sm" className="w-6 h-6 p-0 text-gray-400 hover:text-white">
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Cursor name="Component" cursorColor="blue">
          <div className="aspect-square bg-[#2c2c2c] rounded border border-[#3c3c3c] flex items-center justify-center cursor-pointer hover:bg-[#3c3c3c]">
            <LucideComponent className="w-6 h-6 text-gray-400" />
          </div>
        </Cursor>
        <Cursor name="Colors" cursorColor="pink">
          <div className="aspect-square bg-[#2c2c2c] rounded border border-[#3c3c3c] flex items-center justify-center cursor-pointer hover:bg-[#3c3c3c]">
            <Palette className="w-6 h-6 text-gray-400" />
          </div>
        </Cursor>
      </div>
    </div>
  )

  const PropertiesPanel = () => (
    <div className="p-3 space-y-4">
      {/* Design Properties */}
      <div>
        <h3 className="text-sm font-medium mb-3">Design</h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Fill</label>
            <Cursor name="Color Picker" cursorColor="blue">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-6 h-6 bg-blue-600 rounded border border-[#3c3c3c]"></div>
                <span className="text-sm">#3B82F6</span>
              </div>
            </Cursor>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Corner Radius</label>
            <Cursor name="Input" cursorColor="sky">
              <Input 
                value={cornerRadius} 
                onChange={(e) => setCornerRadius(e.target.value)}
                className="bg-[#2c2c2c] border-[#3c3c3c] text-white h-8" 
              />
            </Cursor>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Opacity</label>
            <Cursor name="Input" cursorColor="sky">
              <Input 
                value={opacity} 
                onChange={(e) => setOpacity(e.target.value)}
                className="bg-[#2c2c2c] border-[#3c3c3c] text-white h-8" 
              />
            </Cursor>
          </div>
        </div>
      </div>

      <Separator className="bg-[#3c3c3c]" />

      {/* Text Properties */}
      <div>
        <h3 className="text-sm font-medium mb-3">Text</h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Font</label>
            <Cursor name="Font Selector" cursorColor="purple">
              <div className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">Inter</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </Cursor>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Size</label>
              <Cursor name="Font Size" cursorColor="sky">
                <Input 
                  value={fontSize} 
                  onChange={(e) => setFontSize(e.target.value)}
                  className="bg-[#2c2c2c] border-[#3c3c3c] text-white h-8" 
                />
              </Cursor>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Weight</label>
              <Cursor name="Font Weight" cursorColor="sky">
                <Input 
                  value={fontWeight} 
                  onChange={(e) => setFontWeight(e.target.value)}
                  className="bg-[#2c2c2c] border-[#3c3c3c] text-white h-8" 
                />
              </Cursor>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-[#3c3c3c]" />

      {/* Layout Properties */}
      <div>
        <h3 className="text-sm font-medium mb-3">Layout</h3>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">W</label>
              <Cursor name="Width" cursorColor="sky">
                <Input 
                  value={width} 
                  onChange={(e) => setWidth(e.target.value)}
                  className="bg-[#2c2c2c] border-[#3c3c3c] text-white h-8" 
                />
              </Cursor>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">H</label>
              <Cursor name="Height" cursorColor="sky">
                <Input 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)}
                  className="bg-[#2c2c2c] border-[#3c3c3c] text-white h-8" 
                />
              </Cursor>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">X</label>
              <Cursor name="X Position" cursorColor="sky">
                <Input 
                  value={xPosition} 
                  onChange={(e) => setXPosition(e.target.value)}
                  className="bg-[#2c2c2c] border-[#3c3c3c] text-white h-8" 
                />
              </Cursor>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Y</label>
              <Cursor name="Y Position" cursorColor="sky">
                <Input 
                  value={yPosition} 
                  onChange={(e) => setYPosition(e.target.value)}
                  className="bg-[#2c2c2c] border-[#3c3c3c] text-white h-8" 
                />
              </Cursor>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const currentToolCursor = getToolCursor(selectedTool)

  return (
    <div className="w-full bg-[#2c2c2c] text-white flex flex-col relative">
        <div className="bg-[#2c2c2c] border-b border-[#3c3c3c] px-2 sm:px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile menu buttons */}
            <div className="flex items-center gap-1 lg:hidden">
              <Sheet open={leftSidebarOpen} onOpenChange={setLeftSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-400 hover:text-white">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-[#1e1e1e] border-[#3c3c3c] p-0">
                  <div className="flex flex-col h-full">
                    <LayersPanel />
                    <AssetsPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center gap-2">
              <Image
              src='/assets/images/custom-cursor/figma.png'
              alt='Figma'
              height={24}
              width={24}
              className='w-6 h-6'
              />
              <span className="text-sm font-medium hidden sm:block">Figma</span>
            </div>

            <Separator orientation="vertical" className="h-4 bg-[#3c3c3c] hidden sm:block" />

            <Cursor name="File Menu" cursorColor="purple">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm hidden sm:block">Mobile App Design</span>
                <span className="text-sm sm:hidden">Design</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </Cursor>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <Cursor name="Present" cursorColor="green">
              <Button variant="ghost" size="sm" className="text-white hover:bg-[#3c3c3c] hidden sm:flex">
                <Play className="w-4 h-4 mr-2" />
                Present
              </Button>
            </Cursor>
            <Cursor name="Present" cursorColor="green">
              <Button variant="ghost" size="sm" className="text-white hover:bg-[#3c3c3c] sm:hidden">
                <Play className="w-4 h-4" />
              </Button>
            </Cursor>

            <Cursor name="Share" cursorColor="blue" className="hidden sm:block">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Share className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </Cursor>

            {/* Mobile properties menu */}
            <div className="lg:hidden">
              <Sheet open={rightSidebarOpen} onOpenChange={setRightSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-400 hover:text-white">
                    <Settings className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 bg-[#1e1e1e] border-[#3c3c3c] p-0">
                  <PropertiesPanel />
                </SheetContent>
              </Sheet>
            </div>

            <Cursor name="Mihir" cursorColor="pink">
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage src="/assets/images/landing-page/mihir.webp" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
            </Cursor>
          </div>
        </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="bg-[#2c2c2c] border-r border-[#3c3c3c] p-1 sm:p-2 flex flex-col gap-1">
          {tools.map((tool) => (
            <Cursor key={tool.id} name={tool.label} cursorColor="purple">
              <Button
                variant="ghost"
                size="sm"
                className={`w-8 h-8 sm:w-10 sm:h-10 p-0 ${
                  selectedTool === tool.id
                    ? "bg-[#3c3c3c] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#3c3c3c]"
                }`}
                onClick={() => setSelectedTool(tool.id)}
              >
                <tool.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </Cursor>
          ))}
        </div>

        {/* Left Sidebar - Hidden on mobile/tablet */}
        <div className="w-64 bg-[#1e1e1e] border-r border-[#3c3c3c] hidden lg:flex flex-col">
          <LayersPanel />
          <AssetsPanel />
        </div>

        {/* Main Canvas */}
        <Cursor
          name={currentToolCursor.name}
          cursorColor={currentToolCursor.color}
          customSVG={currentToolCursor.svg}
          className="flex-1 bg-[#1a1a1a] relative overflow-hidden"
        >
          {/* Canvas Controls */}
          <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-[#2c2c2c] border border-[#3c3c3c] rounded-lg px-2 sm:px-3 py-1 flex items-center gap-2">
              <Cursor name="Zoom Out" cursorColor="sky">
                <Button variant="ghost" size="sm" className="w-5 h-5 sm:w-6 sm:h-6 p-0 text-gray-400 hover:text-white">
                  <Minus className="w-3 h-3" />
                </Button>
              </Cursor>
              <span className="text-xs text-gray-400">100%</span>
              <Cursor name="Zoom In" cursorColor="sky">
                <Button variant="ghost" size="sm" className="w-5 h-5 sm:w-6 sm:h-6 p-0 text-gray-400 hover:text-white">
                  <Plus className="w-3 h-3" />
                </Button>
              </Cursor>
            </div>
          </div>

          {/* Canvas Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden">
            <div
              className="bg-white rounded-lg shadow-2xl max-w-full max-h-full"
              style={{
                width: "min(375px, 90vw)",
                height: "min(812px, 90vh)",
                aspectRatio: "375/812",
              }}
            >
              {/* Phone Screen Content */}
              <div className="p-4 sm:p-6 h-full flex flex-col overflow-hidden">
                <div className="text-center mb-4 sm:mb-8">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
                  <p className="text-sm sm:text-base text-gray-600">Get started with your new app</p>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <Image src="/logo.png" alt="Placeholder" width={200} height={200} className="rounded-full" />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div
                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-blue-600 text-white rounded-lg text-center font-medium cursor-pointer text-sm sm:text-base ${
                      selectedLayer === "button" ? "ring-2 ring-blue-400 ring-offset-2" : ""
                    }`}
                    onClick={() => setSelectedLayer("button")}
                  >
                    Get Started
                  </div>
                  <button className="w-full py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 text-gray-700 rounded-lg text-center font-medium text-sm sm:text-base">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Cursor>

        {/* Right Sidebar - Hidden on mobile/tablet */}
        <div className="w-64 bg-[#1e1e1e] border-l border-[#3c3c3c] hidden lg:block">
          <PropertiesPanel />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <Cursor name="Status" cursorColor="sky">
        <div className="bg-[#2c2c2c] border-t border-[#3c3c3c] px-2 sm:px-4 py-2 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2 sm:gap-4">
            <span>Ready</span>
            <Badge variant="secondary" className="bg-[#3c3c3c] text-gray-300 hidden sm:inline-flex">
              Auto Layout
            </Badge>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline">100%</span>
            <span>1 selected</span>
          </div>
        </div>
      </Cursor>
    </div>
  )
}