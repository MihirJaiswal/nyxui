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

// Reads the last saved playground session from localStorage. Returns null
// on the server, when nothing's saved, or when the saved value is malformed.
export const readSavedConfig = (): {
  component: string;
  config: ComponentConfig;
} | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(PLAYGROUND_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.component === "string" &&
      parsed.config &&
      typeof parsed.config === "object"
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};
