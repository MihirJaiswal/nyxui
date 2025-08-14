"use client"

import { motion } from "motion/react"
import type { ComponentDefinition, ComponentConfig, ComponentProp } from "./types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import CodeEditor from "./CodeEditor"

interface PropertyEditorProps {
  component: ComponentDefinition
  config: ComponentConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (property: string, value: any) => void
}

const PropertyEditor = ({ component, config, onChange }: PropertyEditorProps) => {
  const renderInput = (property: string, prop: ComponentProp) => {
    const value = config[property] ?? prop.default

    switch (prop.type) {
      case "string": {
        return (
          <Input
            type="text"
            value={String(value || "")}
            onChange={(e) => onChange(property, e.target.value)}
            placeholder={prop.placeholder || prop.label}
            className="h-10 border-border focus:border-primary transition-colors"
            style={{ 
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'  
            }}
          />
        )
      }

      case "textarea": {
        // Use CodeEditor for children prop, regular textarea for others
        if (property === "children") {
          return (
            <CodeEditor
              value={String(value || "")}
              onChange={(newValue) => onChange(property, newValue)}
              language="tsx"
              placeholder={prop.placeholder || `Enter ${prop.label.toLowerCase()}...`}
              className="min-h-[200px] w-full"
              style={{ 
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'  
              }}
            />
          )
        } else {
          return (
            <Textarea
              value={String(value || "")}
              onChange={(e) => onChange(property, e.target.value)}
              placeholder={prop.placeholder || `Enter ${prop.label.toLowerCase()}...`}
              className="min-h-[100px] border-border focus:border-primary resize-none transition-colors"
              rows={4}
              style={{
                overflowY: "auto",       
                scrollbarWidth: "thin",  
                scrollbarColor: "var(--border) transparent"
              }}
            />
          )
        }
      }

      case "number": {
        const numValue = Number(value) || 0
        return (
          <div className="space-y-3">
            <Input
              type="number"
              value={numValue.toString()}
              min={prop.min}
              max={prop.max}
              step={prop.step || 1}
              onChange={(e) => {
                const newValue = e.target.value === "" ? 0 : Number(e.target.value)
                onChange(property, newValue)
              }}
              className="h-10 border-border focus:border-primary transition-colors"
            />
            {prop.min !== undefined && prop.max !== undefined && (
              <div className="space-y-2">
                <Slider
                  value={[numValue]}
                  onValueChange={(values) => onChange(property, values[0])}
                  min={prop.min}
                  max={prop.max}
                  step={prop.step || 1}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground text-center font-mono rounded px-2 py-1">
                  {numValue}
                </div>
              </div>
            )}
          </div>
        )
      }

      case "boolean": {
        const boolValue = Boolean(value)
        return (
          <div className="flex items-center justify-between p-3 rounded-sm border border-border">
            <span className="text-sm font-medium">{boolValue ? "Enabled" : "Disabled"}</span>
            <Switch checked={boolValue} onCheckedChange={(checked) => onChange(property, checked)} />
          </div>
        )
      }

      case "select": {
        const selectValue = value ? String(value) : ""
        return (
          <Select 
            value={selectValue} 
            onValueChange={(newValue) => onChange(property, newValue)}
          >
            <SelectTrigger className="h-10 border-border focus:border-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {prop.options?.map((option) => (
                <SelectItem key={String(option)} value={String(option)}>
                  {String(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }

      case "color": {
        const colorValue = String(value || "#000000")
        return (
          <div className="flex items-center gap-3 p-3 rounded-sm border border-border">
            <input
              type="color"
              value={colorValue}
              onChange={(e) => onChange(property, e.target.value)}
              className="w-10 h-10 rounded-md border border-border cursor-pointer"
              style={{ 
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'  
              }}
            />
            <Input
              type="text"
              value={colorValue}
              onChange={(e) => onChange(property, e.target.value)}
              className="flex-1 h-10 font-mono text-sm border-border focus:border-primary"
              style={{ 
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'  
              }}
            />
          </div>
        )
      }

      case "object": {
        const objectValue = value && typeof value === "object" ? value : {}
        return (
          <CodeEditor
            value={JSON.stringify(objectValue, null, 2)}
            onChange={(newValue) => {
              try {
                const parsed = JSON.parse(newValue)
                onChange(property, parsed)
              } catch {
                // Invalid JSON, don't update
                console.warn("Invalid JSON input, not updating value")
              }
            }}
            language="json"
            className="min-h-[140px] w-full"
          />
        )
      }

      default: {
        return (
          <Input
            type="text"
            value={String(value || "")}
            onChange={(e) => onChange(property, e.target.value)}
            className="h-10 border-border focus:border-primary transition-colors"
          />
        )
      }
    }
  }

  // Group properties by category
  const groupedProps = Object.entries(component.props).reduce(
    (acc, [key, prop]) => {
      const category = prop.category || "General"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push([key, prop])
      return acc
    },
    {} as Record<string, Array<[string, ComponentProp]>>,
  )

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {Object.entries(groupedProps).map(([category, props]) => (
          <div key={category} className="space-y-4">
            <div className="sticky top-0 backdrop-blur-sm z-10 pb-2">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider border-b border-border/50 pb-2">
                {category}
              </h4>
            </div>
            <div className="space-y-4">
              {props.map(([property, prop], index) => (
                <motion.div
                  key={`${category}-${property}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="space-y-3 p-4 rounded-sm border border-border/50"
                >
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-foreground">{prop.label}</Label>
                  </div>
                  {renderInput(property, prop)}
                  {prop.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed p-2 rounded border-l-2 border-primary/30">
                      {prop.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyEditor