"use client"

import { useState, useEffect, Suspense, useRef, startTransition } from "react"
import { Play } from "lucide-react"
import ComponentSelector from "./ComponentSelector"
import PropertyEditor from "./PropertyEditor"
import LivePreview from "./LivePreview"
import type { ComponentConfig } from "./types"
import { useSearchParams, useRouter } from "next/navigation"
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
const PlaygroundContent = ({ initialComponent }: { initialComponent?: string }) => {
  // Initialize config properly from the start
  const getInitialConfig = (componentKey?: string): ComponentConfig => {
    if (!componentKey || !componentRegistry[componentKey]) return {}
    const component = componentRegistry[componentKey]
    const config: ComponentConfig = {}
    Object.entries(component.props).forEach(([key, prop]) => {
      config[key] = prop.default
    })
    return config
  }

  const [selectedComponent, setSelectedComponent] = useState<string>(initialComponent || "")
  const [componentConfig, setComponentConfig] = useState<ComponentConfig>(() => getInitialConfig(initialComponent))
  const [showCode, setShowCode] = useState(false)
  const isManualSelectionRef = useRef(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Handle initial component or URL parameter for component selection
  useEffect(() => {
    // Skip if this was a manual selection (already handled)
    if (isManualSelectionRef.current) {
      isManualSelectionRef.current = false
      return
    }

    const componentFromUrl = searchParams.get("component") || initialComponent
    if (componentFromUrl && componentRegistry[componentFromUrl] && componentFromUrl !== selectedComponent) {
      const component = componentRegistry[componentFromUrl]
      if (component) {
        const defaultConfig: ComponentConfig = {}
        Object.entries(component.props).forEach(([key, prop]) => {
          defaultConfig[key] = prop.default
        })
        setComponentConfig(defaultConfig)
        setSelectedComponent(componentFromUrl)
      }
    }
  }, [searchParams, initialComponent])

  const handleComponentSelect = (componentKey: string) => {
    // Prevent update if already selected
    if (componentKey === selectedComponent) return

    // Mark as manual selection to skip useEffect
    isManualSelectionRef.current = true

    // Update state first to avoid flickering
    const component = componentRegistry[componentKey]
    if (component) {
      const defaultConfig: ComponentConfig = {}
      Object.entries(component.props).forEach(([key, prop]) => {
        defaultConfig[key] = prop.default
      })
      setComponentConfig(defaultConfig)
      setSelectedComponent(componentKey)

      // Update URL in a transition to make it non-blocking
      startTransition(() => {
        router.replace(`/playground/${componentKey}`, { scroll: false })
      })
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
    <div className="h-full flex flex-col bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar - Controls */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 border-b lg:border-b-0 lg:border border-border/60 flex flex-col max-h-[40vh] lg:max-h-none overflow-hidden">
          {/* Component Selector */}
          <div className="flex-shrink-0">
            <ComponentSelector
              components={componentRegistry}
              selectedComponent={selectedComponent}
              onSelect={handleComponentSelect}
            />
          </div>

          {selectedComponent ? (
            <>
              {/* Scrollable Property Editor */}
              <div className="flex-1 overflow-auto">
                <PropertyEditor
                  component={componentRegistry[selectedComponent]}
                  config={componentConfig}
                  onChange={handlePropertyChange}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">Select a Component</h3>
                <p className="text-sm lg:text-md text-muted-foreground">Select a component from the sidebar to start experimenting with components</p>
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
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border flex flex-col max-h-[40vh] lg:max-h-none">
          <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm lg:text-base text-muted-foreground">Loading playground...</p>
            </div>
          </div>
        </div>
        <PlaygroundEmptyState />
      </div>
    </div>
  )
}

// Main component with Suspense boundary
const PlaygroundClient = ({ initialComponent }: { initialComponent?: string }) => {
  return (
    <Suspense fallback={<PlaygroundLoading />}>
      <PlaygroundContent initialComponent={initialComponent} />
    </Suspense>
  )
}

export default PlaygroundClient