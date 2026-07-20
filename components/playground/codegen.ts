import type {
  ComponentConfig,
  ComponentDefinition,
  ComponentPropValue,
} from "./types";
import { registryItemUrl } from "@/lib/links";

export type CodeVariant = "jsx" | "full" | "install";

function isPrimitiveArray(value: ComponentPropValue[]): boolean {
  return value.every(
    (item) =>
      typeof item === "string" ||
      typeof item === "number" ||
      typeof item === "boolean",
  );
}

function formatPropValue(value: ComponentPropValue): string {
  if (typeof value === "string") {
    return `"${value.replace(/"/g, '\\"')}"`;
  }

  if (Array.isArray(value) && isPrimitiveArray(value)) {
    return `{${JSON.stringify(value)}}`;
  }

  return `{${JSON.stringify(value, null, 2)}}`;
}

export function expandDottedConfig(config: ComponentConfig): ComponentConfig {
  const expandedConfig: ComponentConfig = {};

  for (const [key, value] of Object.entries(config)) {
    if (!key.includes(".")) {
      expandedConfig[key] = value;
      continue;
    }

    const [parent, child] = key.split(".");
    const parentValue = expandedConfig[parent];
    const nextParentValue =
      parentValue &&
      typeof parentValue === "object" &&
      !Array.isArray(parentValue)
        ? { ...parentValue }
        : {};

    nextParentValue[child] = value;
    expandedConfig[parent] = nextParentValue;
  }

  return expandedConfig;
}

export function generateJsxCode(
  component: ComponentDefinition,
  config: ComponentConfig,
): string {
  const expandedConfig = expandDottedConfig(config);
  const propsString = Object.entries(expandedConfig)
    .filter(([key, value]) => key !== "children" && value !== undefined)
    .map(([key, value]) => `  ${key}=${formatPropValue(value)}`)
    .join("\n");

  const children = expandedConfig.children;

  if (typeof children === "string" && children.trim()) {
    return `<${component.component}${propsString ? `\n${propsString}` : ""}>\n  ${children}\n</${component.component}>`;
  }

  return `<${component.component}${propsString ? `\n${propsString}\n` : " "}/>`;
}

export function generateImportCode(component: ComponentDefinition): string {
  const importPath =
    component.importPath ??
    `@/components/ui/${component.slug ?? component.name}`;

  if (component.importType === "default") {
    return `import ${component.component} from "${importPath}";`;
  }

  return `import { ${component.component} } from "${importPath}";`;
}

export function generateInstallCode(component: ComponentDefinition): string {
  const registryCommand = `npx shadcn@latest add ${registryItemUrl(component.slug ?? component.name)}`;
  const dependencies = component.dependencies ?? [];

  if (dependencies.length === 0) {
    return registryCommand;
  }

  return `${registryCommand}\n\npnpm add ${dependencies.join(" ")}`;
}

export function generateFullCode(
  component: ComponentDefinition,
  config: ComponentConfig,
): string {
  return `${generateImportCode(component)}\n\nexport default function Example() {\n  return (\n    ${generateJsxCode(
    component,
    config,
  )
    .split("\n")
    .join("\n    ")}\n  );\n}`;
}

export function generatePlaygroundCode(
  component: ComponentDefinition,
  config: ComponentConfig,
  variant: CodeVariant,
): string {
  switch (variant) {
    case "full":
      return generateFullCode(component, config);
    case "install":
      return generateInstallCode(component);
    case "jsx":
    default:
      return generateJsxCode(component, config);
  }
}
