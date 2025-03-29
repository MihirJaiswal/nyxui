"use client"
import type React from "react"
import { useState } from "react"
import { Sun, Moon, Check, ChevronDown, ChevronUp, Palette, Layers, Type, Square, LayoutGrid } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface Theme {
  id?: string
  name?: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
  fontFamily?: string
  borderRadius?: string
  description?: string
  gradient?: {
    id?: string
    name?: string
    angle: number
    colors: string[]
  }
}

export const ThemePreview = ({
  colors = {
    primary: "#0070f3",
    secondary: "#7928ca",
    accent: "#ff4081",
    background: "#ffffff",
    foreground: "#000000"
  },
  fontFamily = "system-ui, sans-serif",
  borderRadius = "0.375rem",
  gradient = {
    name: "Default Gradient",
    angle: 45,
    colors: ["#0070f3", "#7928ca"]
  }
}: {
  colors?: Theme["colors"]
  fontFamily?: string
  borderRadius?: string
  gradient?: Theme["gradient"]
}) => {
  const [darkMode, setDarkMode] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    typography: true,
    buttons: true,
    cards: true,
    forms: true,
    badges: true,
    gradients: true,
  })
  const [activeTab, setActiveTab] = useState("preview")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Copy color to clipboard
  const copyColorToClipboard = (color: string, name: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    toast(`Copied ${name} color: ${color}`)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  // Generate CSS variables for the theme
  const previewStyle = {
    "--preview-primary": colors.primary,
    "--preview-secondary": colors.secondary,
    "--preview-accent": colors.accent,
    "--preview-background": darkMode ? "#121212" : colors.background,
    "--preview-foreground": darkMode ? "#ffffff" : colors.foreground,
    "--preview-muted": darkMode ? "#2a2a2a" : "#f5f5f5",
    "--preview-muted-foreground": darkMode ? "#a1a1a1" : "#6f6f6f",
    "--preview-card": darkMode ? "#1e1e1e" : "#ffffff",
    "--preview-card-foreground": darkMode ? "#ffffff" : colors.foreground,
    "--preview-border": darkMode ? "#333333" : "#e2e2e2",
    "--preview-input": darkMode ? "#2a2a2a" : "#ffffff",
    "--preview-ring": `${colors.primary}40`,
    "--preview-font": fontFamily,
    "--preview-radius": borderRadius,
  } as React.CSSProperties;

  // Generate CSS gradient if available
  const generateCSSGradient = (gradient?: Theme["gradient"]): string | undefined => {
    if (!gradient) return undefined
    return `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')})`
  }

  // Color palette component
  const ColorPalette = () => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
      {Object.entries(colors).map(([name, color]) => (
        <TooltipProvider key={name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex flex-col items-center space-y-2 cursor-pointer group"
                onClick={() => copyColorToClipboard(color, name)}
              >
                <div
                  className="w-16 h-16 rounded-md border transition-all group-hover:scale-105 relative"
                  style={{ backgroundColor: color }}
                >
                  {copiedColor === color && (
                    <div className="absolute inset-0 bg-black/30 rounded-md flex items-center justify-center">
                      <Check className="text-white h-6 w-6" />
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium capitalize">{name}</p>
                  <p className="text-xs text-muted-foreground">{color}</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )

  // Section header component
  const SectionHeader = ({
    title,
    icon,
    section,
  }: { title: string; icon: React.ReactNode; section: keyof typeof expandedSections }) => (
    <div
      className="flex items-center justify-between cursor-pointer py-2 border-b mb-4"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-medium" style={{ fontFamily: "var(--preview-font)" }}>
          {title}
        </h3>
      </div>
      {expandedSections[section] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </div>
  )

  return (
    <div >
      <div className="rounded-lg border shadow-sm overflow-hidden transition-all" style={previewStyle}>
        <div className="bg-[var(--preview-card)] p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2
            className="text-xl font-semibold"
            style={{ fontFamily: "var(--preview-font)", color: "var(--preview-card-foreground)" }}
          >
            Theme Preview
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[240px]">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-gray-500" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} id="dark-mode" className="border-gray-400" />
              <Moon className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
        <div
          className="bg-[var(--preview-background)] p-6 min-h-[600px]"
          style={{ color: "var(--preview-foreground)" }}
        >
          <Tabs value={activeTab}>
            <TabsContent value="preview" className="space-y-8 mt-0">
              {/* Gradient Section (if available) */}
              {gradient && (
                <div className="space-y-4">
                  <SectionHeader title="Gradient" icon={<Palette className="h-5 w-5" />} section="gradients" />
                  
                  {expandedSections.gradients && (
                    <div className="space-y-4 pl-2">
                      <div className="space-y-2">
                        <div 
                          className="h-24 w-full rounded-lg shadow-md"
                          style={{ backgroundImage: generateCSSGradient(gradient) ?? '' }}
                        />
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium" style={{ fontFamily: "var(--preview-font)" }}>
                              {gradient.name}
                            </h4>
                            <p className="text-xs text-[var(--preview-muted-foreground)]">
                              {gradient.angle}° angle with {gradient.colors.length} colors
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {gradient.colors.map((color, i) => (
                              <div 
                                key={i} 
                                className="h-6 w-6 rounded-full border cursor-pointer" 
                                style={{ backgroundColor: color }}
                                onClick={() => copyColorToClipboard(color, `Gradient Color ${i+1}`)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                          className="rounded-lg border p-4"
                          style={{
                            borderColor: "var(--preview-border)",
                            backgroundColor: "var(--preview-card)",
                            color: "var(--preview-card-foreground)",
                            borderRadius: "var(--preview-radius)",
                            fontFamily: "var(--preview-font)",
                          }}
                        >
                          <h4 className="text-lg font-bold mb-2">Card with Gradient</h4>
                          <div 
                            className="h-16 w-full rounded-md mb-3"
                            style={{ backgroundImage: generateCSSGradient(gradient) ?? '' }}
                          />
                          <p className="text-sm" style={{ color: "var(--preview-muted-foreground)" }}>
                            Gradients can be applied to various UI elements for visual interest.
                          </p>
                        </div>
                        
                        <div 
                          className="rounded-lg border overflow-hidden"
                          style={{
                            borderColor: "var(--preview-border)",
                            backgroundColor: "var(--preview-card)",
                            color: "var(--preview-card-foreground)",
                            borderRadius: "var(--preview-radius)",
                            fontFamily: "var(--preview-font)",
                          }}
                        >
                          <div 
                            className="h-12 w-full"
                            style={{ backgroundImage: generateCSSGradient(gradient) ?? '' }}
                          />
                          <div className="p-4">
                            <h4 className="text-lg font-bold mb-2">Gradient Header</h4>
                            <p className="text-sm" style={{ color: "var(--preview-muted-foreground)" }}>
                              Gradients work well as section dividers and headers in your UI.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button
                          className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
                          style={{
                            backgroundImage: generateCSSGradient(gradient) ?? '',
                            color: "#ffffff",
                            borderRadius: "var(--preview-radius)",
                            fontFamily: "var(--preview-font)",
                          }}
                        >
                          Gradient Button
                        </button>
                        
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                          style={{
                            backgroundImage: generateCSSGradient(gradient) ?? '',
                            color: "#ffffff",
                            borderRadius: "9999px",
                            fontFamily: "var(--preview-font)",
                          }}
                        >
                          Gradient Badge
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Typography Section */}
              <div className="space-y-4">
                <SectionHeader title="Typography" icon={<Type className="h-5 w-5" />} section="typography" />
                {expandedSections.typography && (
                  <div className="space-y-4 pl-2">
                    <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "var(--preview-font)" }}>
                      Heading 1
                    </h1>
                    <h2 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--preview-font)" }}>
                      Heading 2
                    </h2>
                    <h3 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "var(--preview-font)" }}>
                      Heading 3
                    </h3>
                    <h4 className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--preview-font)" }}>
                      Heading 4
                    </h4>
                    <p className="leading-7" style={{ fontFamily: "var(--preview-font)" }}>
                      This is a paragraph with some <strong>bold text</strong> and some <em>italic text</em>. The quick
                      brown fox jumps over the lazy dog.
                    </p>
                    <p
                      className="text-sm text-[var(--preview-muted-foreground)]"
                      style={{ fontFamily: "var(--preview-font)" }}
                    >
                      This is small muted text often used for captions or secondary information.
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <a
                        href="#"
                        className="font-medium underline underline-offset-4 hover:opacity-80"
                        style={{ color: "var(--preview-primary)", fontFamily: "var(--preview-font)" }}
                      >
                        Text Link
                      </a>
                      <code
                        className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
                        style={{
                          backgroundColor: "var(--preview-muted)",
                          fontFamily: "monospace",
                        }}
                      >
                        console.log("Hello World")
                      </code>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons Section */}
              <div className="space-y-4">
                <SectionHeader title="Buttons" icon={<Square className="h-5 w-5" />} section="buttons" />
                {expandedSections.buttons && (
                  <div className="space-y-6 pl-2">
                    <div className="flex flex-wrap gap-4">
                      <button
                        className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
                        style={{
                          backgroundColor: "var(--preview-primary)",
                          color: "#ffffff",
                          borderRadius: "var(--preview-radius)",
                          fontFamily: "var(--preview-font)",
                        }}
                      >
                        Primary
                      </button>
                      <button
                        className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
                        style={{
                          backgroundColor: "var(--preview-secondary)",
                          color: "#ffffff",
                          borderRadius: "var(--preview-radius)",
                          fontFamily: "var(--preview-font)",
                        }}
                      >
                        Secondary
                      </button>
                      <button
                        className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
                        style={{
                          backgroundColor: "var(--preview-accent)",
                          color: "#ffffff",
                          borderRadius: "var(--preview-radius)",
                          fontFamily: "var(--preview-font)",
                        }}
                      >
                        Accent
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button
                        className="inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
                        style={{
                          borderColor: "var(--preview-primary)",
                          color: "var(--preview-primary)",
                          backgroundColor: "transparent",
                          borderRadius: "var(--preview-radius)",
                          fontFamily: "var(--preview-font)",
                        }}
                      >
                        Outline
                      </button>
                      <button
                        className="inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
                        style={{
                          borderColor: "var(--preview-border)",
                          color: "var(--preview-foreground)",
                          backgroundColor: "transparent",
                          borderRadius: "var(--preview-radius)",
                          fontFamily: "var(--preview-font)",
                        }}
                      >
                        Ghost
                      </button>
                      <button
                        className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)] opacity-50"
                        style={{
                          backgroundColor: "var(--preview-primary)",
                          color: "#ffffff",
                          borderRadius: "var(--preview-radius)",
                          fontFamily: "var(--preview-font)",
                        }}
                        disabled
                      >
                        Disabled
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
                        style={{
                          backgroundColor: "var(--preview-primary)",
                          color: "#ffffff",
                          borderRadius: "var(--preview-radius)",
                        }}
                      >
                        <Palette className="h-4 w-4" />
                      </button>
                      <button
                        className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
                        style={{
                          backgroundColor: "var(--preview-primary)",
                          color: "#ffffff",
                          borderRadius: "var(--preview-radius)",
                          fontFamily: "var(--preview-font)",
                        }}
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        Small
                      </button>
                      <button
                        className="inline-flex h-11 items-center justify-center rounded-md px-5 text-base font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)]"
                        style={{
                          backgroundColor: "var(--preview-primary)",
                          color: "#ffffff",
                          borderRadius: "var(--preview-radius)",
                          fontFamily: "var(--preview-font)",
                        }}
                      >
                        <Palette className="h-5 w-5 mr-2" />
                        Large
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cards Section */}
              <div className="space-y-4">
                <SectionHeader title="Cards" icon={<LayoutGrid className="h-5 w-5" />} section="cards" />
                {expandedSections.cards && (
                  <div className="grid md:grid-cols-2 gap-6 pl-2">
                    <div
                      className="rounded-lg border p-4"
                      style={{
                        borderColor: "var(--preview-border)",
                        backgroundColor: "var(--preview-card)",
                        color: "var(--preview-card-foreground)",
                        borderRadius: "var(--preview-radius)",
                        fontFamily: "var(--preview-font)",
                      }}
                    >
                      <h4 className="text-lg font-bold mb-2">Simple Card</h4>
                      <p className="text-sm" style={{ color: "var(--preview-muted-foreground)" }}>
                        This is a simple card with some content. Cards can be used to group related information.
                      </p>
                      <div className="mt-4">
                        <button
                          className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1"
                          style={{
                            backgroundColor: "var(--preview-primary)",
                            color: "#ffffff",
                            borderRadius: "var(--preview-radius)",
                            fontFamily: "var(--preview-font)",
                          }}
                        >
                          Action
                        </button>
                      </div>
                    </div>

                    <div
                      className="rounded-lg border overflow-hidden"
                      style={{
                        borderColor: "var(--preview-border)",
                        backgroundColor: "var(--preview-card)",
                        color: "var(--preview-card-foreground)",
                        borderRadius: "var(--preview-radius)",
                        fontFamily: "var(--preview-font)",
                      }}
                    >
                      <div className="p-4 border-b" style={{ borderColor: "var(--preview-border)" }}>
                        <h4 className="text-lg font-bold">Card with Header</h4>
                      </div>
                      <div className="p-4">
                        <p className="text-sm" style={{ color: "var(--preview-muted-foreground)" }}>
                          This card has a header, content area, and footer section for more structured content.
                        </p>
                      </div>
                      <div
                        className="p-4 border-t bg-[var(--preview-muted)]"
                        style={{ borderColor: "var(--preview-border)" }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs" style={{ color: "var(--preview-muted-foreground)" }}>
                            Updated 2 hours ago
                          </span>
                          <button
                            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1"
                            style={{
                              backgroundColor: "var(--preview-primary)",
                              color: "#ffffff",
                              borderRadius: "var(--preview-radius)",
                              fontFamily: "var(--preview-font)",
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Elements Section */}
              <div className="space-y-4">
                <SectionHeader title="Form Elements" icon={<Layers className="h-5 w-5" />} section="forms" />
                {expandedSections.forms && (
                  <div className="space-y-6 pl-2">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          style={{ fontFamily: "var(--preview-font)" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="flex h-10 w-full rounded-md border border-[var(--preview-border)] bg-[var(--preview-input)] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--preview-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          style={{
                            borderRadius: "var(--preview-radius)",
                            fontFamily: "var(--preview-font)",
                            color: "var(--preview-foreground)",
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          style={{ fontFamily: "var(--preview-font)" }}
                        >
                          Select Option
                        </label>
                        <select
                          className="flex h-10 w-full rounded-md border border-[var(--preview-border)] bg-[var(--preview-input)] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          style={{
                            borderRadius: "var(--preview-radius)",
                            fontFamily: "var(--preview-font)",
                            color: "var(--preview-foreground)",
                          }}
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        style={{ fontFamily: "var(--preview-font)" }}
                      >
                        Message
                      </label>
                      <textarea
                        placeholder="Type your message here"
                        className="flex min-h-[80px] w-full rounded-md border border-[var(--preview-border)] bg-[var(--preview-input)] px-3 py-2 text-sm ring-offset-background placeholder:text-[var(--preview-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--preview-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        style={{
                          borderRadius: "var(--preview-radius)",
                          fontFamily: "var(--preview-font)",
                          color: "var(--preview-foreground)",
                        }}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border border-[var(--preview-border)] bg-[var(--preview-input)]"
                        style={{
                          borderRadius: "var(--preview-radius)",
                          accentColor: "var(--preview-primary)",
                        }}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        style={{ fontFamily: "var(--preview-font)" }}
                      >
                        Accept terms and conditions
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Badges Section */}
              <div className="space-y-4">
                <SectionHeader title="Badges" icon={<Palette className="h-5 w-5" />} section="badges" />
                {expandedSections.badges && (
                  <div className="flex flex-wrap gap-3 pl-2">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--preview-primary)",
                        color: "#ffffff",
                        borderRadius: "9999px",
                        fontFamily: "var(--preview-font)",
                      }}
                    >
                      Primary
                    </span>
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--preview-secondary)",
                        color: "#ffffff",
                        borderRadius: "9999px",
                        fontFamily: "var(--preview-font)",
                      }}
                    >
                      Secondary
                    </span>
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--preview-accent)",
                        color: "#ffffff",
                        borderRadius: "9999px",
                        fontFamily: "var(--preview-font)",
                      }}
                    >
                      Accent
                    </span>
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        borderColor: "var(--preview-border)",
                        color: "var(--preview-foreground)",
                        backgroundColor: "transparent",
                        borderRadius: "9999px",
                        fontFamily: "var(--preview-font)",
                      }}
                    >
                      Outline
                    </span>
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--preview-muted)",
                        color: "var(--preview-muted-foreground)",
                        borderRadius: "9999px",
                        fontFamily: "var(--preview-font)",
                      }}
                    >
                      Muted
                    </span>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="colors" className="mt-0">
              <div className="space-y-6">
                <h3 className="text-lg font-medium" style={{ fontFamily: "var(--preview-font)" }}>
                  Color Palette
                </h3>
                <ColorPalette />
                {gradient && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium" style={{ fontFamily: "var(--preview-font)" }}>
                      Gradient
                    </h3>
                    <div className="space-y-3">
                      <div 
                        className="h-16 w-full rounded-md shadow-md"
                        style={{ backgroundImage: generateCSSGradient(gradient) ?? '' }}
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{gradient.name}</p>
                          <p className="text-xs text-muted-foreground">{gradient.angle}° angle</p>
                        </div>
                        <div className="flex gap-2">
                          {gradient.colors.map((color, i) => (
                            <div 
                              key={i} 
                              className="h-6 w-6 rounded-full border cursor-pointer" 
                              style={{ backgroundColor: color }}
                              onClick={() => copyColorToClipboard(color, `Gradient Color ${i+1}`)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-lg font-medium" style={{ fontFamily: "var(--preview-font)" }}>
                    Font Family
                  </h3>
                  <div className="p-3 rounded-md bg-[var(--preview-muted)]" style={{ fontFamily: "var(--preview-font)" }}>
                    <p className="text-sm font-medium">{fontFamily}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium" style={{ fontFamily: "var(--preview-font)" }}>
                    Border Radius
                  </h3>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 bg-[var(--preview-primary)]"
                      style={{ borderRadius: "var(--preview-radius)" }}
                    />
                    <div className="text-sm">
                      <p className="font-medium">{borderRadius}</p>
                      <p className="text-[var(--preview-muted-foreground)]">Applied to all components</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}