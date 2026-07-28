import { componentRegistry } from "@/components/playground/registry";
import { ComponentConfig } from "@/types/playground";

export const PLAYGROUND_STORAGE_KEY = "playground-config";

export const generateDefaultConfig = (
  componentKey: string,
): ComponentConfig => {
  const component = componentRegistry[componentKey];
  if (!component) return {};

  return Object.entries(component.props).reduce((config, [key, prop]) => {
    config[key] = prop.default;
    return config;
  }, {} as ComponentConfig);
};

export const encodeConfig = (config: ComponentConfig): string =>
  encodeURIComponent(JSON.stringify(config));

export const decodeConfig = (
  configParam: string | null,
): ComponentConfig | null => {
  if (!configParam) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(configParam)) as ComponentConfig;
  } catch {
    return null;
  }
};
