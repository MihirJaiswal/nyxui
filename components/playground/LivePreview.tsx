"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Eye, RefreshCw, Code, Copy, Monitor, Smartphone, Tablet, Check } from "lucide-react"
import type { ComponentDefinition, ComponentConfig } from "./types"
import { useState, useEffect } from "react"
import { getHighlighter } from "shiki"
import { componentRegistry } from "./registry"
import parse from 'html-react-parser'

// Named imports for components
import { CyberpunkCard } from "@/registry/ui/cyberpunk-card"
import { AnimatedCodeBlock } from "@/registry/ui/animated-code-block"
import LampHeading from "@/registry/ui/lamp-heading"
import { MorphingBlob } from "@/registry/ui/morphing-blob"
import { GitHubRepoCard } from "@/registry/ui/github-repo-card"
import { GlowCard } from "@/registry/ui/glow-card"
import { MusicPlayer } from "@/registry/ui/music-player"
import { AnimatedGrainyBg } from "@/registry/ui/animated-grainy-bg"
import InteractiveKeyboard from "@/registry/ui/keyboard"
import ThreeDLayeredCard from "@/registry/ui/3d-layered-card"
import WaterRippleEffect from "@/registry/ui/water-ripple-effect"
import { Cursor } from "@/registry/ui/custom-cursor"
import { GlassContainer } from "@/registry/ui/apple-glass-effect"
import { GlitchButton } from "@/registry/ui/glitch-button"
import BubbleBackground from "@/registry/ui/bubble-background"
import { AnimateText } from "@/registry/ui/animated-text"
import { DynamicRipple } from "@/registry/ui/dynamic-ripple"
import { LiquidMetalButton } from "@/registry/ui/liquid-metal-button"
import InteractiveTerminal from "@/registry/ui/terminal"
import { MatrixCodeRain } from "@/registry/ui/matrix-code-rain"
import { ImageScanner } from "@/registry/ui/image-scanner"

interface LivePreviewProps {
  componentKey: string
  config: ComponentConfig
  component: ComponentDefinition
  showCode: boolean
  onToggleCode: () => void
  onCopyCode: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentType = React.ComponentType<any>

const componentMap: Record<string, ComponentType> = {
  "cyberpunk-card": CyberpunkCard,
  "animated-code-block": AnimatedCodeBlock,
  "keyboard": InteractiveKeyboard,
  "3d-layered-card": ThreeDLayeredCard,
  "lamp-heading": LampHeading,
  "morphing-blob": MorphingBlob,
  "github-repo-card": GitHubRepoCard,
  "glow-card": GlowCard,
  "music-player": MusicPlayer,
  "animated-grainy-bg": AnimatedGrainyBg,
  "water-ripple-effect": WaterRippleEffect,
  "custom-cursor": Cursor,
  "apple-glass-effect": GlassContainer,
  "glitch-button": GlitchButton,
  "bubble-background": BubbleBackground,
  "animated-text": AnimateText,
  "dynamic-ripple": DynamicRipple,
  "liquid-metal-button": LiquidMetalButton,
  "terminal": InteractiveTerminal,
  "matrix-code-rain": MatrixCodeRain,
  "image-scanner": ImageScanner,
}


// Helper function to convert JSX string to React elements
const parseJSXString = (jsxString: string) => {
  try {
    // Convert className to class for HTML parsing
    const htmlString = jsxString
      .replace(/className=/g, 'class=')
      .replace(/\{/g, '')
      .replace(/\}/g, '')
    
    return parse(htmlString)
  } catch (error) {
    console.error('Error parsing JSX string:', error)
    // Fallback to simple text content
    return jsxString.replace(/<[^>]*>/g, '')
  }
}

const LivePreview = ({ componentKey, config, component, showCode, onToggleCode, onCopyCode }: LivePreviewProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [componentKey_, setComponentKey_] = useState<string>(componentKey)
  const [copied, setCopied] = useState<boolean>(false)

  // Code highlighting
  useEffect(() => {
    const generateCode = () => {
      const propsString = Object.entries(config)
        .filter(([key]) => key !== "children")
        .map(([key, value]) => {
          if (typeof value === "string") {
            return `  ${key}="${value}"`
          } else if (typeof value === "boolean") {
            return `  ${key}={${value}}`
          } else {
            return `  ${key}={${JSON.stringify(value)}}`
          }
        })
        .join("\n")

      const children = config.children || ""

      if (children) {
        return `<${component.component}${propsString ? `\n${propsString}` : ""}>\n  ${children}\n</${component.component}>`
      } else {
        return `<${component.component}${propsString ? `\n${propsString}\n` : " "}/>`
      }
    }

    const highlightCode = async () => {
      if (!showCode) return

      try {
        const highlighter = await getHighlighter({
          themes: ["github-dark"],
          langs: ["tsx"],
        })

        const code = generateCode()
        const highlighted = highlighter.codeToHtml(code, {
          lang: "tsx",
          themes: {
            light: "github-dark",
            dark: "github-dark",
          },
        })
        setHighlightedCode(highlighted)
      } catch (error) {
        console.error("Failed to highlight code:", error)
        const code = generateCode()
        setHighlightedCode(
          `<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto"><code>${code}</code></pre>`,
        )
      }
    }

    highlightCode()
  }, [componentKey, config, component, showCode])

  // Handle copy functionality with feedback
  const handleCopyCode = async () => {
    try {
      await onCopyCode()
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) 
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  // Handle component refresh
  const handleRefreshComponent = () => {
    setComponentKey_(`${componentKey}-${Date.now()}`)
  }

  const renderComponent = () => {
    try {
      const props = { ...config }
      const registryEntry = componentRegistry[componentKey]

      if (!registryEntry) {
        return (
          <div className="flex flex-col items-center justify-center min-h-64 bg-yellow-50 border-2 border-yellow-200 rounded-sm p-8">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center">
                <span className="text-yellow-700 text-2xl">❓</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-yellow-800 font-bold text-xl">Component Not Found</h3>
                <p className="text-yellow-700">
                  Component <code className="bg-yellow-100 px-2 py-1 rounded font-mono text-sm">{componentKey}</code> is
                  not registered
                </p>
              </div>
            </div>
          </div>
        )
      }

      const ComponentToRender = componentMap[componentKey]

      if (!ComponentToRender) {
        return (
          <div className="flex flex-col items-center justify-center min-h-64 bg-orange-50 border-2 border-orange-200 rounded-sm p-8">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-orange-700 text-2xl">⚠️</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-orange-800 font-bold text-xl">Component Import Missing</h3>
                <p className="text-orange-700">
                  Component <strong>{registryEntry.name}</strong> is in registry but not imported in componentMap
                </p>
              </div>
            </div>
          </div>
        )
      }

      const { children, ...otherProps } = props

      let childrenContent = null
      if (children && typeof children === "string") {
        childrenContent = parseJSXString(children)
      } else {
        childrenContent = children
      }

      return (
        <ComponentToRender key={componentKey_} {...otherProps}>
          {childrenContent}
        </ComponentToRender>
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`Error rendering component ${componentKey}:`, error)

      return (
        <div className="flex flex-col items-center justify-center min-h-64 bg-red-50 border-2 border-red-200 rounded-sm p-8">
          <div className="text-center space-y-4 max-w-lg">
            <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center">
              <span className="text-red-700 text-2xl">🚨</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-red-800 font-bold text-xl">Component Error</h3>
              <p className="text-red-700">
                Failed to render <strong>{componentRegistry[componentKey]?.name || componentKey}</strong>
              </p>
            </div>
            <div className="bg-red-100 border border-red-200 rounded-sm p-4 text-left">
              <p className="font-medium text-red-800 mb-2">Error Details:</p>
              <code className="block bg-red-200 px-2 py-1 rounded text-xs text-red-800 break-all">{errorMessage}</code>
            </div>
          </div>
        </div>
      )
    }
  }

  const registryEntry = componentRegistry[componentKey]
  const isComponentAvailable = !!registryEntry

  const getViewportStyles = () => {
    switch (viewportSize) {
      case "mobile":
        return { width: "375px", minHeight: "550px" }
      case "tablet":
        return { width: "768px", minHeight: "550px" }
      case "desktop":
      default:
        return { width: "100%", minHeight: "550px" }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-lg">Live Preview</h4>
          </div>
          <div>
            <div className="flex items-center gap-2 mt-1">
              {isComponentAvailable ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Component loaded" />
                  <span className="text-xs text-green-600 font-medium">{registryEntry.name}</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Component not found" />
                  <span className="text-xs text-yellow-600">Not Found</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Viewport Size Controls */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-sm p-1">
            <button
              onClick={() => setViewportSize("desktop")}
              className={`p-2 rounded-md transition-colors ${
                viewportSize === "desktop" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              title="Desktop view"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportSize("tablet")}
              className={`p-2 rounded-md transition-colors ${
                viewportSize === "tablet" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              title="Tablet view"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportSize("mobile")}
              className={`p-2 rounded-md transition-colors ${
                viewportSize === "mobile" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              title="Mobile view"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onToggleCode}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-all duration-200 ${
              showCode
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground hover:shadow-sm"
            }`}
          >
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">{showCode ? "Hide Code" : "Show Code"}</span>
          </button>

          <button
            onClick={handleRefreshComponent}
            className="p-2 rounded-sm bg-muted hover:bg-muted/80 transition-all duration-200 hover:shadow-sm"
            title="Refresh component"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code view */}
      {showCode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 dark:bg-black rounded-sm border border-border overflow-hidden shadow-sm"
          style={{
            scrollbarWidth: 'none',
          }}
        >
          <div className="flex items-center justify-between p-4 border-b border-border bg-background">
            <h5 className="font-medium text-sm flex items-center gap-2">
              <Code className="w-4 h-4" />
              Generated Code
              {isComponentAvailable && <span className="text-xs text-muted-foreground">({registryEntry.name})</span>}
            </h5>
            <button
              onClick={handleCopyCode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm border ${
                copied 
                  ? "bg-green-50 hover:bg-green-100 text-green-700 border-green-200" 
                  : "bg-background hover:bg-muted"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="p-4"
          >
            <div className="rounded-md overflow-auto max-h-96" 
           style={{
            scrollbarWidth: 'none',
          }}
           dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </div>
        </motion.div>
      )}

      {/* Preview */}
      {!showCode && (
        <motion.div
          key={`${componentKey}-${JSON.stringify(config)}-${Date.now()}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="bg-white dark:bg-black flex items-center justify-center border rounded-sm shadow-lg overflow-auto">
            <div
              className="transition-all duration-300 h-full flex items-center justify-center p-6 mx-auto"
              style={getViewportStyles()}
            >
              <div className="w-full h-full flex items-center justify-center [&>*]:max-w-full [&>*]:max-h-full">
                <div 
                  className="component-preview-wrapper relative flex items-center justify-center" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    minHeight: componentKey === 'matrix-code-rain' ? '400px' : 'auto' 
                  }}
                >
                  {renderComponent()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default LivePreview