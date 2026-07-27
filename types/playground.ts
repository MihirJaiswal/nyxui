import type React from "react";

export type ComponentPropValue =
  | string
  | number
  | boolean
  | null
  | ComponentPropValue[]
  | { [key: string]: ComponentPropValue };

export interface ComponentDefinition {
  name: string;
  slug?: string;
  component: string;
  importPath?: string;
  importType?: "named" | "default";
  dependencies?: string[];
  registryDependencies?: string[];
  loadComponent?: () => Promise<{ default: PlaygroundComponent }>;
  props: Record<string, ComponentProp>;
}

export interface ComponentRegistry {
  [key: string]: ComponentDefinition;
}

export interface ComponentConfig {
  [key: string]: ComponentPropValue;
}

export type PlaygroundComponent = React.ComponentType<
  Record<string, unknown> & {
    children?: React.ReactNode;
  }
>;

export interface PlaygroundProps {
  componentKey: string;
  config: ComponentConfig;
  component: ComponentDefinition;
}

export interface ComponentProp {
  type:
    | "string"
    | "number"
    | "boolean"
    | "select"
    | "color"
    | "object"
    | "textarea"
    | "multiselect";
  default: ComponentPropValue;
  label: string;
  description?: string;
  category?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<string | number | boolean>;
  colorFormat?: "css" | "rgb-triplet";
  conditional?: {
    property: string;
    value: ComponentPropValue;
  };
  validation?: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  };
  placeholder?: string;
  helpText?: string;
}
