"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Layers,
  Save,
  Plus,
  Minus,
  RotateCcw,
  Copy,
  Trash2,
  Edit,
  Heart,
  Shuffle,
  Palette,
  ChevronDown,
  X,
  LayoutGrid,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Gradient {
  id: string
  name: string
  angle: number
  colors: string[]
  isFavorite?: boolean
}

interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
  fontFamily: string
  borderRadius: string
  description?: string
  gradient?: Gradient
}

interface GradientCustomizerProps {
  presetGradients: Gradient[]
  customGradients: Gradient[]
  setCustomGradients: React.Dispatch<React.SetStateAction<Gradient[]>>
  currentCustomTheme: Theme
  setCurrentCustomTheme: React.Dispatch<React.SetStateAction<Theme>>
  onGradientSelect?: (gradient: Gradient) => void
}

// Popular gradient collections
const trendingGradients: Gradient[] = [
  {
    id: "neon-cyberpunk",
    name: "Neon Cyberpunk",
    angle: 130,
    colors: ["#ff00cc", "#3333ff"],
  },
  {
    id: "sunset-vibes",
    name: "Sunset Vibes",
    angle: 45,
    colors: ["#ff7e5f", "#feb47b"],
  },
  {
    id: "northern-lights",
    name: "Northern Lights",
    angle: 200,
    colors: ["#4facfe", "#00f2fe"],
  },
  {
    id: "midnight-city",
    name: "Midnight City",
    angle: 90,
    colors: ["#232526", "#414345"],
  },
]

export const GradientCustomizer: React.FC<GradientCustomizerProps> = ({
  presetGradients,
  customGradients,
  setCustomGradients,
  currentCustomTheme,
  setCurrentCustomTheme,
  onGradientSelect,
}) => {
  const [isGradientDialogOpen, setIsGradientDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [gradientToDelete, setGradientToDelete] = useState<string | null>(null)
  const [currentGradient, setCurrentGradient] = useState<Gradient>({
    id: "custom-gradient-1",
    name: "Custom Gradient",
    angle: 45,
    colors: ["#0070f3", "#7928ca"],
  })
  const [favoriteGradients, setFavoriteGradients] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")
  const [filterText, setFilterText] = useState("")
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [originalGradient, setOriginalGradient] = useState<Gradient | null>(null)
  const [gradientView, setGradientView] = useState<"grid" | "list">("grid")
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)
  
  // Reference to dialog content for scroll management
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Restore scroll position after render
  useEffect(() => {
    if (dialogContentRef.current && scrollPosition > 0) {
      dialogContentRef.current.scrollTop = scrollPosition
    }
  }, [currentGradient, scrollPosition])

  // Generate random gradient
  const generateRandomGradient = () => {
    const randomColor = () => {
      const letters = "0123456789ABCDEF"
      let color = "#"
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    const numColors = Math.floor(Math.random() * 3) + 2 // 2-4 colors
    const colors = Array(numColors)
      .fill(0)
      .map(() => randomColor())
    const angle = Math.floor(Math.random() * 360)

    setCurrentGradient((prev) => ({
      ...prev,
      angle,
      colors,
      name: `Random Gradient ${Math.floor(Math.random() * 1000)}`,
    }))

    toast("Random gradient generated! Customize it to your liking.", {
      icon: <Shuffle className="h-4 w-4" />,
    })
  }
  
  // Toggle favorite status
  const toggleFavorite = (gradientId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()

    setFavoriteGradients((prev) => {
      if (prev.includes(gradientId)) {
        return prev.filter((id) => id !== gradientId)
      } else {
        return [...prev, gradientId]
      }
    })
  }

  // Edit existing gradient
  const editGradient = (gradient: Gradient, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()

    setOriginalGradient(gradient)
    setCurrentGradient({ ...gradient })
    setEditMode(true)
    setIsGradientDialogOpen(true)
  }

  // Delete gradient confirmation
  const confirmDeleteGradient = (gradientId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()

    setGradientToDelete(gradientId)
    setIsDeleteDialogOpen(true)
  }

  // Delete gradient
  const deleteGradient = () => {
    if (!gradientToDelete) return

    setCustomGradients((prev) => prev.filter((g) => g.id !== gradientToDelete))

    // If the current theme uses this gradient, remove it
    if (currentCustomTheme.gradient?.id === gradientToDelete) {
      setCurrentCustomTheme((prev) => ({
        ...prev,
        gradient: undefined,
      }))
    }

    setIsDeleteDialogOpen(false)
    setGradientToDelete(null)
    toast("Gradient deleted successfully")
  }

  // Generate Tailwind gradient class based on angle and number of colors.
  const generateGradientClass = (gradient: Gradient) => {
    // Map angles to Tailwind gradient direction classes
    const angleToDirectionMap: { [key: number]: string } = {
      0: "bg-gradient-to-r",
      45: "bg-gradient-to-br",
      90: "bg-gradient-to-b",
      135: "bg-gradient-to-bl",
      180: "bg-gradient-to-l",
      225: "bg-gradient-to-tl",
      270: "bg-gradient-to-t",
      315: "bg-gradient-to-tr",
    }

    // Find the closest predefined direction
    const closestDirection = Object.keys(angleToDirectionMap)
      .map(Number)
      .reduce((prev, curr) => (Math.abs(curr - gradient.angle) < Math.abs(prev - gradient.angle) ? curr : prev))

    const baseDirection = angleToDirectionMap[closestDirection] || "bg-gradient-to-r"

    // Handle color classes based on number of colors
    if (gradient.colors.length === 2) {
      return `${baseDirection} from-[${gradient.colors[0]}] to-[${gradient.colors[1]}]`
    } else if (gradient.colors.length === 3) {
      return `${baseDirection} from-[${gradient.colors[0]}] via-[${gradient.colors[1]}] to-[${gradient.colors[2]}]`
    } else {
      // For 4-5 colors, calculate mid-point dynamically
      const midIndex = Math.floor(gradient.colors.length / 2)
      return (
        `${baseDirection} ` +
        gradient.colors
          .map((color, index) => {
            if (index === 0) return `from-[${color}]`
            if (index === midIndex) return `via-[${color}]`
            if (index === gradient.colors.length - 1) return `to-[${color}]`
            return `via-[${color}]`
          })
          .join(" ")
      )
    }
  }

  // Generate CSS gradient
  const generateCSSGradient = (gradient: Gradient) => {
    return `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(", ")})`
  }

  // Filter gradients based on search and active tab
  const getFilteredGradients = () => {
    const allGradients = [...presetGradients, ...customGradients, ...trendingGradients]
      .filter(
        (gradient, index, self) =>
          // Remove duplicates based on id
          index === self.findIndex((g) => g.id === gradient.id),
      )
      .map((gradient) => ({
        ...gradient,
        isFavorite: favoriteGradients.includes(gradient.id),
      }))

    let filtered = allGradients

    // Filter by tab
    if (activeTab === "favorites") {
      filtered = filtered.filter((g) => favoriteGradients.includes(g.id))
    } else if (activeTab === "custom") {
      filtered = filtered.filter((g) => customGradients.some((cg) => cg.id === g.id))
    } else if (activeTab === "trending") {
      filtered = filtered.filter((g) => trendingGradients.some((tg) => tg.id === g.id))
    }

    // Filter by search text
    if (filterText) {
      const searchLower = filterText.toLowerCase()
      filtered = filtered.filter(
        (g) =>
          g.name.toLowerCase().includes(searchLower) || g.colors.some((c) => c.toLowerCase().includes(searchLower)),
      )
    }

    return filtered
  }

  // Update angle with scroll position preservation
  const updateAngle = (newAngle: number) => {
    // Save current scroll position first
    if (dialogContentRef.current) {
      setScrollPosition(dialogContentRef.current.scrollTop)
    }
    
    // Then update the angle
    setCurrentGradient((prev) => ({
      ...prev,
      angle: newAngle,
    }))
  }

  // Angle Selector Component with improved visualization
  const AngleSelector = () => {
    const anglePresets = [
      { angle: 0, label: "Right", icon: "right" },
      { angle: 45, label: "Bottom Right", icon: "bottom-right" },
      { angle: 90, label: "Bottom", icon: "bottom" },
      { angle: 135, label: "Bottom Left", icon: "bottom-left" },
      { angle: 180, label: "Left", icon: "left" },
      { angle: 225, label: "Top Left", icon: "top-left" },
      { angle: 270, label: "Top", icon: "top" },
      { angle: 315, label: "Top Right", icon: "top-right" },
    ]

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Gradient Direction</Label>
          <span className="text-sm text-muted-foreground">{currentGradient.angle}°</span>
        </div>

        <div className="relative h-32 w-full rounded-lg overflow-hidden border mb-4">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: generateCSSGradient(currentGradient),
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-20 h-20">
              <div
                className="absolute w-1 h-16 bg-white/70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md"
                style={{
                  transform: `translate(-50%, -50%) rotate(${currentGradient.angle}deg)`,
                  transformOrigin: "center",
                }}
              >
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <Slider
            value={[currentGradient.angle]}
            min={0}
            max={360}
            step={1}
            onValueChange={(values) => updateAngle(values[0])}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {anglePresets.map((preset) => (
            <Button
              key={preset.angle}
              variant={currentGradient.angle === preset.angle ? "default" : "outline"}
              onClick={() => updateAngle(preset.angle)}
              className="flex flex-col items-center justify-center h-16 p-1 gap-1"
              size="sm"
            >
              <div className="w-8 h-8 rounded-full relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(${preset.angle}deg, ${currentGradient.colors.join(", ")})`,
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white/70 rounded-full shadow-sm"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${preset.angle}deg)`,
                    transformOrigin: "center",
                  }}
                />
              </div>
              <span className="text-xs">{preset.label}</span>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  // Render gradient preview with improved visualization
  const renderGradientPreview = (gradient?: Gradient, expanded = false) => {
    if (!gradient) return null

    const gradientClass = generateGradientClass(gradient)
    const cssGradient = generateCSSGradient(gradient)

    return (
      <div className={cn("space-y-3", expanded && "pb-4")}>
        <div
          className={cn("w-full rounded-lg shadow-md transition-all overflow-hidden", expanded ? "h-60" : "h-24")}
          style={{
            backgroundImage: cssGradient,
          }}
        />

        {expanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Tailwind CSS</Label>
              <div
                className="p-3 bg-muted/50 rounded-md text-xs font-mono break-words select-all cursor-copy relative group"
                onClick={() => {
                  navigator.clipboard.writeText(gradientClass)
                  toast("Copied Tailwind class!")
                }}
              >
                {gradientClass}
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy Tailwind class</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">CSS</Label>
              <div
                className="p-3 bg-muted/50 rounded-md text-xs font-mono break-words select-all cursor-copy relative group"
                onClick={() => {
                  navigator.clipboard.writeText(`background-image: ${cssGradient};`)
                  toast("Copied CSS!")
                }}
              >
                background-image: {cssGradient};
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy CSS</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render gradient card
  const renderGradientCard = (gradient: Gradient & { isFavorite?: boolean }) => {
    const gradientClass = generateGradientClass(gradient)
    const isCustom = customGradients.some((g) => g.id === gradient.id)
  
    // For both grid and list views, we update the theme immediately:
    const handleClick = () => {
      if (onGradientSelect) {
        onGradientSelect(gradient)
      } else {
        setCurrentCustomTheme((prevTheme) => ({
          ...prevTheme,
          gradient: { ...gradient },
        }))
      }
      toast(`Gradient "${gradient.name}" applied`)
    }
  
    if (gradientView === "list") {
      return (
        <div
          key={gradient.id}
          className="cursor-pointer overflow-hidden transition-all hover:shadow-md border rounded-lg flex items-stretch"
          onClick={handleClick}
        >
          <div
            className="w-16 h-auto"
            style={{
              backgroundImage: generateCSSGradient(gradient),
            }}
          />
          <div className="p-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">{gradient.name}</h3>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => toggleFavorite(gradient.id, e)}
                        className="h-7 w-7"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            gradient.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground",
                          )}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {gradient.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
  
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} className="h-7 w-7">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(gradientClass)
                        toast(`Copied "${gradient.name}" gradient class`)
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Tailwind
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(`background-image: ${generateCSSGradient(gradient)};`)
                        toast(`Copied "${gradient.name}" CSS`)
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy CSS
                    </DropdownMenuItem>
                    {isCustom && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => editGradient(gradient, e)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => confirmDeleteGradient(gradient.id, e)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
  
            {renderGradientPreview(gradient)}
  
            <div className="flex gap-2 mt-2">
              {gradient.colors.map((color, i) => (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="h-6 w-6 rounded-full border cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(color)
                          toast(`Copied color: ${color}`)
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{color}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
              <span className="text-xs text-muted-foreground ml-auto flex items-center">{gradient.angle}°</span>
            </div>
          </div>
        </div>
      )
    } else {
      // Grid view – similar modification:
      return (
        <Card
          key={gradient.id}
          className="cursor-pointer overflow-hidden transition-all hover:shadow-md group"
          onClick={handleClick}
        >
          <div
            className="h-2 w-full"
            style={{
              backgroundImage: generateCSSGradient(gradient),
            }}
          />
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{gradient.name}</h3>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => toggleFavorite(gradient.id, e)}
                        className="h-7 w-7"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            gradient.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground",
                          )}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {gradient.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
  
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} className="h-7 w-7">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(gradientClass)
                        toast(`Copied "${gradient.name}" gradient class`)
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Tailwind
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(`background-image: ${generateCSSGradient(gradient)};`)
                        toast(`Copied "${gradient.name}" CSS`)
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy CSS
                    </DropdownMenuItem>
                    {isCustom && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => editGradient(gradient, e)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => confirmDeleteGradient(gradient.id, e)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
  
            {renderGradientPreview(gradient)}
  
            <div className="flex gap-2 mt-2">
              {gradient.colors.map((color, i) => (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="h-6 w-6 rounded-full border cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(color)
                          toast(`Copied color: ${color}`)
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{color}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
              <span className="text-xs text-muted-foreground ml-auto flex items-center">{gradient.angle}°</span>
            </div>
          </CardContent>
        </Card>
      )
    }
  }
  // Color Stops Editor
  const ColorStopsEditor = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Gradient Colors</h3>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (currentGradient.colors.length > 2) {
                        setCurrentGradient((prev) => ({
                          ...prev,
                          colors: prev.colors.slice(0, -1),
                        }))
                      }
                    }}
                    disabled={currentGradient.colors.length <= 2}
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove color</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (currentGradient.colors.length < 5) {
                        // Add a color that's a mix of the last two colors
                        const colors = currentGradient.colors
                        const lastColor = colors[colors.length - 1]

                        setCurrentGradient((prev) => ({
                          ...prev,
                          colors: [...prev.colors, lastColor],
                        }))
                      }
                    }}
                    disabled={currentGradient.colors.length >= 5}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add color</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      // Reverse color order
                      setCurrentGradient((prev) => ({
                        ...prev,
                        colors: [...prev.colors].reverse(),
                      }))
                      toast("Colors reversed")
                    }}
                    className="h-8 w-8"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reverse colors</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={generateRandomGradient} className="h-8 w-8">
                    <Shuffle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Random colors</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="relative w-full h-8 rounded-md overflow-hidden mb-4">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: generateCSSGradient(currentGradient),
            }}
          />
        </div>

        <div className="space-y-3">
          {currentGradient.colors.map((color, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...currentGradient.colors]
                    newColors[index] = e.target.value
                    setCurrentGradient((prev) => ({
                      ...prev,
                      colors: newColors,
                    }))
                  }}
                  className="w-12 h-10 p-1 border rounded-md cursor-pointer"
                />
              </div>

              <div className="flex-1">
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...currentGradient.colors]
                    newColors[index] = e.target.value
                    setCurrentGradient((prev) => ({
                      ...prev,
                      colors: newColors,
                    }))
                  }}
                  className="h-10"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (currentGradient.colors.length <= 2) return

                  const newColors = [...currentGradient.colors]
                  newColors.splice(index, 1)
                  setCurrentGradient((prev) => ({
                    ...prev,
                    colors: newColors,
                  }))
                }}
                disabled={currentGradient.colors.length <= 2}
                className="h-8 w-8 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Advanced Options
  const AdvancedOptions = () => {
    return (
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", showAdvancedOptions && "transform rotate-180")}
            />
            <h3
              className="text-sm font-medium cursor-pointer"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            >
              Advanced Options
            </h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
            {showAdvancedOptions ? "Hide" : "Show"}
          </Button>
        </div>

        {showAdvancedOptions && (
          <div className="space-y-4 pt-2 pl-6 border-l-2 border-muted">
            <div className="flex items-center justify-between">
              <Label htmlFor="expand-preview" className="text-sm">
                Expanded Preview
              </Label>
              <Switch id="expand-preview" checked={isPreviewExpanded} onCheckedChange={setIsPreviewExpanded} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">CSS Output Format</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className={cn("text-xs justify-start", true && "border-primary")}>
                  <code className="mr-2">linear-gradient()</code>
                  Standard
                </Button>
                <Button variant="outline" size="sm" className="text-xs justify-start" disabled>
                  <code className="mr-2">conic-gradient()</code>
                  Conic
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Export Options</Label>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    const cssCode = `background-image: ${generateCSSGradient(currentGradient)};`
                    navigator.clipboard.writeText(cssCode)
                    toast("CSS copied to clipboard")
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy CSS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    const tailwindClass = generateGradientClass(currentGradient)
                    navigator.clipboard.writeText(tailwindClass)
                    toast("Tailwind class copied to clipboard")
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Tailwind Class
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const filteredGradients = getFilteredGradients()

  return (
    <TabsContent value="gradients" className="space-y-6 pt-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setIsGradientDialogOpen(true)} className="flex-shrink-0">
            <Layers className="mr-2 h-4 w-4" /> Create Gradient
          </Button>
          <Button variant="outline" onClick={generateRandomGradient} className="flex-shrink-0">
            <Shuffle className="mr-2 h-4 w-4" /> Random Gradient
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search gradients..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full md:w-auto"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setGradientView(gradientView === "grid" ? "list" : "grid")}
                >
                  {gradientView === "grid" ? <Layers className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to {gradientView === "grid" ? "list" : "grid"} view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Gradients</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Gradient Grid */}
      {filteredGradients.length > 0 ? (
        <div className={cn(gradientView === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3")}>
          {filteredGradients.map(renderGradientCard)}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No gradients found</h3>
          <p className="text-muted-foreground mb-6">
            {activeTab === "favorites"
              ? "You haven't added any gradients to your favorites yet."
              : "Try adjusting your search or create a new gradient."}
          </p>
          <Button onClick={() => setIsGradientDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Gradient
          </Button>
        </div>
      )}

      {/* Gradient Creation Dialog */}
      <Dialog
        open={isGradientDialogOpen}
        onOpenChange={(open) => {
          setIsGradientDialogOpen(open)
          if (!open && editMode) {
            setEditMode(false)
            setOriginalGradient(null)
            setCurrentGradient({
              id: `custom-gradient-${customGradients.length + 1}`,
              name: "Custom Gradient",
              angle: 45,
              colors: ["#0070f3", "#7928ca"],
            })
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{editMode ? "Edit Gradient" : "Create New Gradient"}</DialogTitle>
            <DialogDescription>
              Customize your gradient colors, angle, and preview the result in real-time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Name Input */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Gradient Name</Label>
              <Input
                type="text"
                value={currentGradient.name}
                onChange={(e) => {
                  setCurrentGradient((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }}
                placeholder="Enter a descriptive name"
              />
            </div>

            {/* Gradient Preview */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Preview</Label>
              {renderGradientPreview(currentGradient, isPreviewExpanded)}
            </div>

            {/* Color Management */}
            <ColorStopsEditor />

            {/* Angle Selector */}
            <AngleSelector />

            {/* Advanced Options */}
            <AdvancedOptions />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            {editMode && (
              <Button
                variant="outline"
                onClick={() => {
                  if (originalGradient) {
                    setCurrentGradient({ ...originalGradient })
                  }
                }}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset Changes
              </Button>
            )}

            <Button
              onClick={() => {
                if (!currentGradient.name.trim()) {
                  toast("Please enter a gradient name")
                  return
                }

                if (editMode && originalGradient) {
                  // Update existing gradient
                  setCustomGradients((prev) => prev.map((g) => (g.id === originalGradient.id ? currentGradient : g)))

                  // Update current theme if it uses this gradient
                  if (currentCustomTheme.gradient?.id === originalGradient.id) {
                    setCurrentCustomTheme((prevTheme) => ({
                      ...prevTheme,
                      gradient: { ...currentGradient },
                    }))
                  }

                  toast("Gradient updated successfully!")
                } else {
                  // Create new gradient
                  const newGradient: Gradient = {
                    ...currentGradient,
                    id: `custom-gradient-${customGradients.length + 1}`,
                  }

                  setCustomGradients((prev) => [...prev, newGradient])

                  setCurrentCustomTheme((prevTheme) => ({
                    ...prevTheme,
                    gradient: { ...newGradient },
                  }))

                  toast("Gradient created successfully!")
                }

                setIsGradientDialogOpen(false)
                setEditMode(false)
                setOriginalGradient(null)

                // Reset current gradient for next creation
                setCurrentGradient({
                  id: `custom-gradient-${customGradients.length + 2}`,
                  name: "Custom Gradient",
                  angle: 45,
                  colors: ["#0070f3", "#7928ca"],
                })
              }}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              <Save className="mr-2 h-4 w-4" />
              {editMode ? "Update Gradient" : "Save Gradient"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete Gradient</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this gradient? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteGradient} className="w-full sm:w-auto">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabsContent>
  )
}

