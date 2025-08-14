"use client"

import { useState, useEffect, Suspense } from "react"
import { Play } from "lucide-react"
import ComponentSelector from "./ComponentSelector"
import PropertyEditor from "./PropertyEditor"
import LivePreview from "./LivePreview"
import type { ComponentConfig } from "./types"
import { useSearchParams } from "next/navigation"
import { componentRegistry } from "./registry"
import { Grid } from "./Grid"

const PlaygroundEmptyState = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-w-0">
      <div className="flex-1 p-4 lg:p-6 overflow-auto">
        <div className="h-full flex items-center justify-center">
          <Grid/>
        </div>
      </div>
    </div>
  )
}

// Extract the component that uses useSearchParams into a separate component
const PlaygroundContent = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("")
  const [componentConfig, setComponentConfig] = useState<ComponentConfig>({})
  const [showCode, setShowCode] = useState(false)
  const searchParams = useSearchParams()

  // Handle URL parameter for component selection
  useEffect(() => {
    const componentFromUrl = searchParams.get("component")
    if (componentFromUrl && componentRegistry[componentFromUrl]) {
      setSelectedComponent(componentFromUrl)
      const component = componentRegistry[componentFromUrl]
      if (component) {
        const defaultConfig: ComponentConfig = {}
        Object.entries(component.props).forEach(([key, prop]) => {
          defaultConfig[key] = prop.default
        })
        setComponentConfig(defaultConfig)
      }
    }
  }, [searchParams])

  const handleComponentSelect = (componentKey: string) => {
    setSelectedComponent(componentKey)
    const component = componentRegistry[componentKey]
    if (component) {
      const defaultConfig: ComponentConfig = {}
      Object.entries(component.props).forEach(([key, prop]) => {
        defaultConfig[key] = prop.default
      })
      setComponentConfig(defaultConfig)
    }
  }

  const handlePropertyChange = (property: string, value: string | number | boolean | object) => {
    setComponentConfig((prev) => ({
      ...prev,
      [property]: value,
    }))
  }

  const handleCopyCode = () => {
    const code = generateComponentCode(selectedComponent, componentConfig)
    navigator.clipboard.writeText(code)
  }

  const generateComponentCode = (componentKey: string, config: ComponentConfig) => {
    const component = componentRegistry[componentKey]
    if (!component) return ""

    const propsString = Object.entries(config)
      .filter(([key]) => key !== "children") // Handle children separately
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `  ${key}="${value}"`
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

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Controls */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 border-x border-border flex flex-col lg:max-w-none max-w-full">
          {/* Component Selector */}
          <div className="flex-shrink-0 border-b border-border">
            <ComponentSelector
              components={componentRegistry}
              selectedComponent={selectedComponent}
              onSelect={handleComponentSelect}
            />
          </div>

          {selectedComponent ? (
            <>
              {/* Scrollable Property Editor */}
              <div className="flex-1 overflow-hidden">
                <PropertyEditor
                  component={componentRegistry[selectedComponent]}
                  config={componentConfig}
                  onChange={handlePropertyChange}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-sm">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center">
                  <Play className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Select a Component</h3>
                <p className="text-md text-muted-foreground">Select a component from the sidebar to start experimenting with components</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Live Preview or Empty State */}
        {selectedComponent ? (
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div className="flex-1 p-4 lg:p-6 overflow-auto">
              <LivePreview
                componentKey={selectedComponent}
                config={componentConfig}
                component={componentRegistry[selectedComponent]}
                showCode={showCode}
                onToggleCode={() => setShowCode(!showCode)}
                onCopyCode={handleCopyCode}
              />
            </div>
          </div>
        ) : (
          <PlaygroundEmptyState />
        )}
      </div>
    </div>
  )
}

// Loading fallback component
const PlaygroundLoading = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 border-x border-border flex flex-col lg:max-w-none max-w-full">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading playground...</p>
            </div>
          </div>
        </div>
        <PlaygroundEmptyState />
      </div>
    </div>
  )
}

// Main component with Suspense boundary
const PlaygroundClient = () => {
  return (
    <Suspense fallback={<PlaygroundLoading />}>
      <PlaygroundContent />
    </Suspense>
  )
}

export default PlaygroundClient