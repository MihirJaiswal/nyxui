"use client"
import { useState } from "react"
import { 
  Check, 
  Eye, 
  EyeOff, 
  Download,
  Copy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { ThemePreview } from "./theme-preview"
import { ThemeCustomizer } from "./theme-customizer"
import { GradientCustomizer } from "./gradient-customizer"
import { cn } from "@/lib/utils"

// Interfaces
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

interface Gradient {
  id: string
  name: string
  angle: number
  colors: string[]
}

// Update preset themes to include a gradient for each theme.
const presetThemes: Theme[] = [
  {
    id: "classic-blue",
    name: "Classic Blue",
    colors: {
      primary: "#0070f3",
      secondary: "#7928ca",
      accent: "#ff4081",
      background: "#ffffff",
      foreground: "#000000"
    },
    fontFamily: "Inter, system-ui, sans-serif",
    borderRadius: "0.375rem",
    description: "A clean and professional blue-based theme",
    gradient: {
      id: "classic-blue-gradient",
      name: "Classic Blue Gradient",
      angle: 45,
      colors: ["#0070f3", "#7928ca"]
    }
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    colors: {
      primary: "#ff6b6b",
      secondary: "#feca57",
      accent: "#48dbfb",
      background: "#ffffff",
      foreground: "#2d3436"
    },
    fontFamily: "Poppins, system-ui, sans-serif",
    borderRadius: "0.5rem",
    description: "Warm and vibrant theme inspired by sunset colors",
    gradient: {
      id: "sunset-orange-gradient",
      name: "Sunset Orange Gradient",
      angle: 60,
      colors: ["#ff6b6b", "#feca57"]
    }
  },
  {
    id: "forest-green",
    name: "Forest Green",
    colors: {
      primary: "#2ecc71",
      secondary: "#27ae60",
      accent: "#e74c3c",
      background: "#f7fff4",
      foreground: "#2c3e50"
    },
    fontFamily: "Roboto, system-ui, sans-serif",
    borderRadius: "0.25rem",
    description: "Refreshing green theme with natural tones",
    gradient: {
      id: "forest-green-gradient",
      name: "Forest Green Gradient",
      angle: 90,
      colors: ["#2ecc71", "#27ae60"]
    }
  }
]

// Preset gradients (still available in the Gradients tab)
const presetGradients: Gradient[] = [
  {
    id: "sunset",
    name: "Sunset",
    angle: 45,
    colors: ["#ff6b6b", "#feca57"]
  },
  {
    id: "ocean",
    name: "Ocean",
    angle: 135,
    colors: ["#48dbfb", "#0984e3"]
  },
  {
    id: "forest",
    name: "Forest",
    angle: 90,
    colors: ["#2ecc71", "#27ae60"]
  },
  {
    id: "lavender",
    name: "Lavender",
    angle: 60,
    colors: ["#a29bfe", "#6c5ce7"]
  }
]

export const ThemeConfigurator = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(presetThemes[0])
  const [customThemes, setCustomThemes] = useState<Theme[]>([])
  const [customGradients, setCustomGradients] = useState<Gradient[]>([])
  const [currentCustomTheme, setCurrentCustomTheme] = useState<Theme>({
    id: "custom-1",
    name: "Custom Theme",
    colors: {
      primary: "#0070f3",
      secondary: "#7928ca",
      accent: "#f97316",
      background: "#ffffff",
      foreground: "#000000",
    },
    fontFamily: "system-ui, sans-serif",
    borderRadius: "0.375rem",
    description: ""
  })
  
  const [isCopied, setIsCopied] = useState(false)
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)
  const [isNewThemeDialogOpen, setIsNewThemeDialogOpen] = useState(false)
  const [newThemeName, setNewThemeName] = useState("")

  // Immediately update gradient when a user clicks a gradient option
  const updateGradient = (selectedGradient: Gradient) => {
    setCurrentCustomTheme(prev => ({ ...prev, gradient: selectedGradient }));
    setSelectedTheme(prev => ({ ...prev, gradient: selectedGradient }));
  }

  // Generate Tailwind configuration using the selected theme directly.
  const generateTailwindConfig = () => {
    const theme = isPreviewVisible ? selectedTheme : currentCustomTheme

    const gradientConfig = theme.gradient 
      ? `
      gradientColorStops: {
        ${theme.gradient.colors.map((color, index) => `'gradient-${index + 1}': '${color}'`).join(',\n        ')}
      },`
      : ''

    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "${theme.colors.primary}",
        secondary: "${theme.colors.secondary}",
        accent: "${theme.colors.accent}",
        background: "${theme.colors.background}",
        foreground: "${theme.colors.foreground}",
        ${gradientConfig}
      },
      fontFamily: {
        sans: [${theme.fontFamily.split(",").map(f => `"${f.trim()}"`).join(", ")}],
      },
      borderRadius: {
        DEFAULT: "${theme.borderRadius}",
      },
      backgroundImage: {
        ${theme.gradient 
          ? `'custom-gradient': 'linear-gradient(${theme.gradient.angle}deg, ${theme.gradient.colors.join(', ')})'`
          : ''}
      }
    },
  },
  plugins: [],
}`
  }

  const handleCopyConfig = async () => {
    const configString = generateTailwindConfig()
    try {
      await navigator.clipboard.writeText(configString)
      setIsCopied(true)
      toast("Copied! Tailwind configuration copied to clipboard.")
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      toast("Copy Failed, Unable to copy configuration.")
    }
  }

  // Download configuration as file
  const handleDownloadConfig = () => {
    const configString = generateTailwindConfig()
    const blob = new Blob([configString], { type: 'text/javascript' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'tailwind.config.js'
    link.click()
  }

  // Save custom theme
  const handleSaveCustomTheme = () => {
    if (!newThemeName.trim()) {
      toast("Please enter a theme name")
      return
    }

    const newTheme: Theme = {
      ...currentCustomTheme,
      id: `custom-${customThemes.length + 1}`,
      name: newThemeName,
      description: `A custom theme created by the user`
    }

    setCustomThemes(prev => [...prev, newTheme])
    setSelectedTheme(newTheme)
    setIsNewThemeDialogOpen(false)
    setNewThemeName("")

    toast(`Theme Saved: "${newThemeName}" has been added to your custom themes`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-6 lg:py-8">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Theme Configurator</h1>
                <p className="text-lg text-muted-foreground">
                  Customize and create unique themes for your application
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                      >
                        {isPreviewVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isPreviewVisible ? "Hide Preview" : "Show Preview"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <Tabs defaultValue="presets">
              <TabsList className="w-full">
                <TabsTrigger value="presets">Preset Themes</TabsTrigger>
                <TabsTrigger value="custom">Custom Themes</TabsTrigger>
                <TabsTrigger value="gradients">Gradients</TabsTrigger>
              </TabsList>
              
              {/* Preset Themes Tab */}
              <TabsContent value="presets" className="space-y-6 pt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {presetThemes.map((theme) => (
                    <Card
                      key={theme.id}
                      className={cn(
                        "cursor-pointer overflow-hidden transition-all hover:shadow-md group",
                        selectedTheme.id === theme.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedTheme(theme)}
                    >
                      <div
                        className="h-2 w-full bg-gradient-to-r"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
                        }}
                      />
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{theme.name}</h3>
                          {selectedTheme.id === theme.id && <Check className="size-4 text-primary" />}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {theme.description}
                        </div>
                        <div className="mt-4 flex gap-2">
                          {Object.values(theme.colors).map((color, i) => (
                            <div key={i} className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Custom Themes Tab */}
              <ThemeCustomizer 
                customThemes={customThemes}
                setCustomThemes={setCustomThemes}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
                currentCustomTheme={currentCustomTheme}
                setCurrentCustomTheme={setCurrentCustomTheme}
                isNewThemeDialogOpen={isNewThemeDialogOpen}
                setIsNewThemeDialogOpen={setIsNewThemeDialogOpen}
                newThemeName={newThemeName}
                setNewThemeName={setNewThemeName}
                handleSaveCustomTheme={handleSaveCustomTheme}
              />

              {/* Gradients Tab */}
              <GradientCustomizer 
                presetGradients={presetGradients}
                customGradients={customGradients}
                setCustomGradients={setCustomGradients}
                currentCustomTheme={currentCustomTheme}
                setCurrentCustomTheme={setCurrentCustomTheme}
                onGradientSelect={updateGradient} 
              />
            </Tabs>

            {isPreviewVisible && (
              <div className="space-y-4">
                <ThemePreview
                  colors={selectedTheme.colors} 
                  fontFamily={selectedTheme.fontFamily} 
                  borderRadius={selectedTheme.borderRadius} 
                  gradient={selectedTheme.gradient}
                />
              </div>
            )}

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Theme Configuration</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant={isCopied ? "default" : "outline"}
                    onClick={handleCopyConfig}
                  >
                    {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {isCopied ? "Copied" : "Copy Config"}
                  </Button>
                  <Button variant="outline" onClick={handleDownloadConfig}>
                    <Download className="mr-2 h-4 w-4" /> Download Config
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4 bg-muted/50">
                <pre className="text-sm overflow-x-auto"><code>{generateTailwindConfig()}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
