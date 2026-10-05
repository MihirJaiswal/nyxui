import { execFile } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { promisify } from "util";
import { format } from "prettier";
import { rimraf } from "rimraf";
import {
  registryItemSchema,
  registrySchema,
  type Registry,
} from "shadcn/registry";
import { z } from "zod";

import { examples } from "@/registry/registry-examples";
import { pro } from "@/registry/registry-pro";
import { proExamples } from "@/registry/registry-pro-examples";
import { lib } from "@/registry/registry-lib";
import { ui } from "@/registry/registry-ui";

type RegistryItem = Registry["items"][number];
type RegistryFile = NonNullable<RegistryItem["files"]>[number];
type RegistryFileMap = Map<string, RegistryFile>;

const execFileAsync = promisify(execFile);
const DEPRECATED_ITEMS = new Set(["toast"]);
const VERBOSE = process.env.REGISTRY_VERBOSE === "true";

function log(message: string, ...args: unknown[]): void {
  if (VERBOSE) {
    console.log(message, ...args);
  }
}

function info(message: string, ...args: unknown[]): void {
  console.log(message, ...args);
}

function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, "/");
}

function normalizeRegistryFile(file: RegistryFile): RegistryFile {
  const normalizedFile = {
    ...file,
    path: normalizePath(file.path),
    ...(file.target ? { target: normalizePath(file.target) } : {}),
  } satisfies RegistryFile;

  return normalizedFile;
}

function normalizeRegistryItem(item: RegistryItem): RegistryItem {
  return {
    ...item,
    files: item.files?.map(normalizeRegistryFile),
  };
}

function mergeFiles(files: RegistryFile[] | undefined): RegistryFile[] {
  const normalizedFiles: RegistryFileMap = new Map();

  for (const file of files ?? []) {
    const normalizedFile = normalizeRegistryFile(file);
    const existingFile = normalizedFiles.get(normalizedFile.path);

    if (
      !existingFile ||
      (normalizedFile.content &&
        (!existingFile.content || existingFile.target === ""))
    ) {
      normalizedFiles.set(normalizedFile.path, normalizedFile);
    }
  }

  return Array.from(normalizedFiles.values());
}

function deduplicateItemFiles(item: RegistryItem): RegistryItem {
  return {
    ...item,
    files: mergeFiles(item.files),
  };
}

function deduplicateRegistryItems(items: Registry["items"]): Registry["items"] {
  const uniqueItemsByName = new Map<string, RegistryItem>();

  for (const item of items) {
    const dedupedItem = deduplicateItemFiles(item);
    const existingItem = uniqueItemsByName.get(item.name);

    if (!existingItem) {
      uniqueItemsByName.set(item.name, dedupedItem);
      continue;
    }

    uniqueItemsByName.set(item.name, {
      ...existingItem,
      ...dedupedItem,
      files: mergeFiles([
        ...(existingItem.files ?? []),
        ...(dedupedItem.files ?? []),
      ]),
    });
  }

  return Array.from(uniqueItemsByName.values());
}

const proItems = [...pro, ...proExamples].map((item) => ({
  ...item,
  meta: { ...(item.meta ?? {}), pro: true },
}));
const proItemNames = new Set(proItems.map((item) => item.name));

function createRegistry(): Registry {
  const items = [
    {
      name: "index",
      type: "registry:style",
      dependencies: [
        "tw-animate-css",
        "class-variance-authority",
        "lucide-react",
      ],
      registryDependencies: ["utils"],
      cssVars: {},
      files: [],
    },
    ...ui,
    ...examples,
    ...lib,
    ...proItems,
  ].filter((item) => !DEPRECATED_ITEMS.has(item.name));

  const normalizedItems = deduplicateRegistryItems(
    z.array(registryItemSchema).parse(items).map(normalizeRegistryItem),
  );

  return registrySchema.parse({
    name: "shadcn/ui",
    homepage: "https://ui.shadcn.com",
    items: normalizedItems,
  });
}

/**
 * The public registry: identical to the full registry minus pro items.
 * This is what gets written to public/registry.json and public/r/.
 */
function createPublicRegistry(fullRegistry: Registry): Registry {
  return registrySchema.parse({
    ...fullRegistry,
    items: fullRegistry.items.filter(
      (item) => !proItemNames.has(item.name) && item.meta?.pro !== true,
    ),
  });
}

const registry = createRegistry();
const publicRegistry = createPublicRegistry(registry);

async function formatGeneratedFile(
  filePath: string,
  content: string,
): Promise<string> {
  return format(content, { filepath: filePath });
}

async function writeJson(filePath: string, data: unknown): Promise<void> {
  const json = `${JSON.stringify(data, null, 2)}\n`;
  await fs.writeFile(filePath, await formatGeneratedFile(filePath, json));
}

function getRegistryComponentImport(item: RegistryItem): string | null {
  const componentPath = item.files?.[0]?.path;
  return componentPath
    ? `@/${normalizePath(componentPath).replace(/\.(tsx|ts)$/, "")}`
    : null;
}

/**
 * Build a registry index module.
 *
 * Called twice: once with every item for `__registry__/index.tsx` (used by
 * this private repo), and once with only the free items for
 * `__registry__/index.public.tsx`. The public mirror ships the latter as its
 * `__registry__/index.tsx` — without it the mirror would carry lazy-import
 * specifiers pointing into the pro registry tree, which is excluded from the
 * mirror, and the public build would fail to resolve them.
 */
async function buildRegistryIndex(
  items: Registry["items"],
  outRelPath: string,
): Promise<void> {
  log(`Building registry index -> ${outRelPath}`);

  let index = `// This file is autogenerated by scripts/build-registry.mts
// Do not edit this file directly.
import * as React from "react"

type RegistryComponent = React.ComponentType<Record<string, never>>
type RegistryModule = Record<string, unknown>
type RegistryEntry = {
  name: string
  description: string
  type: string
  registryDependencies?: string[]
  files: Array<{ path: string; type: string }>
  component: React.LazyExoticComponent<RegistryComponent> | null
  meta?: Record<string, unknown>
}

function isRegistryComponent(value: unknown): value is RegistryComponent {
  return typeof value === "function" || (typeof value === "object" && value !== null)
}

function pickRegistryComponent(mod: RegistryModule, fallbackName: string): RegistryComponent {
  const exportName = Object.keys(mod).find((key) => isRegistryComponent(mod[key]))
  const candidate = mod.default ?? mod[exportName ?? fallbackName]

  if (isRegistryComponent(candidate)) {
    return candidate
  }

  return function MissingRegistryComponent() {
    return null
  }
}

export const Index: Record<string, RegistryEntry> = {`;

  for (const item of items) {
    if (!item.files || item.files.length === 0) {
      log(`Skipping "${item.name}" because it has no files`);
      continue;
    }

    const componentPath = getRegistryComponentImport(item);

    index += `
  "${item.name}": {
    name: "${item.name}",
    description: ${JSON.stringify(item.description ?? "")},
    type: "${item.type}",
    registryDependencies: ${JSON.stringify(item.registryDependencies)},
    files: [${item.files
      .map((file) => {
        const filePath = normalizePath(file.path);
        return `{
      path: "${filePath}",
      type: "${file.type}",
    }`;
      })
      .join(", ")}],
    component: ${
      componentPath
        ? `React.lazy(async () => {
      const mod = await import("${componentPath}") as RegistryModule
      return { default: pickRegistryComponent(mod, "${item.name}") }
    })`
        : "null"
    },
    meta: ${JSON.stringify(item.meta)},
  },`;
  }

  index += `
}`;

  const outPath = path.join(process.cwd(), outRelPath);
  await rimraf(outPath);
  await fs.writeFile(outPath, await formatGeneratedFile(outPath, index));
}

async function buildRegistryJsonFile(): Promise<void> {
  log("Writing root registry files");

  const rootJson = path.join(process.cwd(), "registry.json");
  const publicJson = path.join(process.cwd(), "public/registry.json");

  await Promise.all([rimraf(rootJson), rimraf(publicJson)]);
  await Promise.all([
    writeJson(rootJson, registry),
    // public registry never contains pro items
    writeJson(publicJson, publicRegistry),
  ]);
}

/**
 * Safety pass: delete any pro JSONs from public/r/ in case the shadcn
 * CLI wrote them there (it builds everything in registry.json root file).
 * Pro source is never shipped as JSON — it is served per-request by
 * /api/pro/source/[name] to entitled customers.
 */
async function stripProFromPublicR(): Promise<void> {
  const publicRDir = path.join(process.cwd(), "public/r");
  const files = await fs.readdir(publicRDir);
  const removed: string[] = [];

  for (const file of files) {
    if (!file.endsWith(".json") || file === "registry.json") continue;
    const name = file.replace(/\.json$/, "");
    if (proItemNames.has(name)) {
      await rimraf(path.join(publicRDir, file));
      removed.push(file);
    }
  }

  // verify registry.json listing has no pro entries
  const publicRJson = path.join(publicRDir, "registry.json");
  const listing = registrySchema.parse(JSON.parse(await fs.readFile(publicRJson, "utf8")));
  const leaked = listing.items.filter((item) => proItemNames.has(item.name));
  if (leaked.length > 0) {
    throw new Error(
      `PRO ITEMS LEAKED into public/r/registry.json: ${leaked.map((i) => i.name).join(", ")}`,
    );
  }

  if (removed.length > 0) {
    info(`Stripped ${removed.length} pro JSON(s) from public/r/`);
  }
}

async function buildShadcnRegistry(): Promise<void> {
  const shadcnBin = path.join(
    process.cwd(),
    "node_modules",
    ".bin",
    process.platform === "win32" ? "shadcn.cmd" : "shadcn",
  );
  const args = ["shadcn", "registry:build"];

  if (VERBOSE) {
    args.push("--verbose");
  }

  try {
    const { stdout, stderr } = await execFileAsync(shadcnBin, args.slice(1), {
      maxBuffer: 1024 * 1024 * 20,
    });

    log(stdout);
    log(stderr);
  } catch (error) {
    console.error("shadcn registry build failed:", error);
    throw error;
  }
}

async function repairGeneratedRegistryJson(): Promise<void> {
  const publicRJson = path.join(process.cwd(), "public/r/registry.json");
  const publicRDir = path.join(process.cwd(), "public/r");
  const publicJson = path.join(process.cwd(), "public/registry.json");

  const registryJsonContent = await fs.readFile(publicRJson, "utf8");
  const generatedRegistry = registrySchema.parse(
    JSON.parse(registryJsonContent),
  );
  // strip pro items from the public listing
  const publicItems = generatedRegistry.items.filter(
    (item) => !proItemNames.has(item.name) && item.meta?.pro !== true,
  );
  const dedupedItems = deduplicateRegistryItems(publicItems);
  const repairedRegistry = registrySchema.parse({
    ...generatedRegistry,
    items: dedupedItems,
  });

  await Promise.all([
    writeJson(publicRJson, repairedRegistry),
    writeJson(publicJson, repairedRegistry),
  ]);

  const files = await fs.readdir(publicRDir);

  await Promise.all(
    files
      .filter((file) => file.endsWith(".json") && file !== "registry.json")
      .map(async (file) => {
        const componentPath = path.join(publicRDir, file);
        const componentContent = await fs.readFile(componentPath, "utf8");
        const componentData = registryItemSchema.parse(
          JSON.parse(componentContent),
        );
        const fixedComponent = deduplicateItemFiles(componentData);

        await writeJson(componentPath, fixedComponent);
      }),
  );
}

(async () => {
  try {
    info(`Building ${registry.items.length} registry items`);
    await buildRegistryIndex(registry.items, "__registry__/index.tsx");
    await buildRegistryIndex(
      publicRegistry.items,
      "__registry__/index.public.tsx",
    );
    await buildRegistryJsonFile();
    await buildShadcnRegistry();
    await repairGeneratedRegistryJson();
    await stripProFromPublicR();
    info("Registry build complete");
  } catch (error) {
    console.error("Registry build failed:", error);
    process.exit(1);
  }
})();
