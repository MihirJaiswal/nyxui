export interface ComponentDefinition {
  name: string
  component: string
  props: Record<string, ComponentProp>
}

export interface ComponentRegistry {
  [key: string]: ComponentDefinition
}

export interface ComponentConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface PlaygroundProps {
  componentKey: string
  config: ComponentConfig
  component: ComponentDefinition
}

export interface ComponentProp {
  type: "string" | "number" | "boolean" | "select" | "color" | "object" | "textarea" | "multiselect"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: any
  label: string
  description?: string
  category?: string
  min?: number
  max?: number
  step?: number
  options?: Array<string | number | boolean>
  conditional?: {
    property: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  }
  validation?: {
    required?: boolean
    pattern?: RegExp
    minLength?: number
    maxLength?: number
  }
  placeholder?: string
  helpText?: string
}
