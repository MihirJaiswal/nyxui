---
name: new-component
description: Add a new component to the nyxui library. Creates the registry source file, demo, registry entries, MDX docs, and Data.tsx showcase metadata, then rebuilds the registry. Use whenever the user wants to add, register, or publish a new component to nyxui.
---

# Adding a New Component to nyxui

Package manager: **pnpm**. Branch from `main` with a `feature/<name>` branch per project convention.

## Naming

- `name` = kebab-case slug used everywhere: `registry/ui/<name>.tsx`, `registry/example/<name>-demo.tsx`, `content/docs/components/<name>.mdx`, registry entry names, `Data.tsx` key, and URL `/components/<name>`.
- Pick tag(s) intentionally — they drive the sidebar category via `getComponentCategory()` in `lib/links.ts`. Priority order: `Buttons` → `3D` → `Card` → `Typography` → `Tools/Mock` → `Media/Image` → `Background` → `Animation/Effects` → default `Interactive`.

## Files to create/update

### 1. `registry/ui/<name>.tsx` — source component

- TypeScript, explicit props interface, named export(s).
- Use `cn()` from `@/lib/utils`.
- Follow patterns from an existing similar component (read one first).
- Styling rule (project-wide): for elevated surfaces NEVER pair `border-*`/`ring-*` with `shadow-*` — use `smooth-shadow-ring-{size}` (see memory: smooth-shadow-ring convention).

### 2. `registry/example/<name>-demo.tsx` — demo

- Add `"use client"` if it uses hooks/event handlers.
- Import via `@/registry/ui/<name>`.
- Export a named component.

### 3. `registry/registry-ui.ts` — add entry

```ts
{
  name: "<name>",
  type: "registry:ui",
  title: "<Display Title>",
  description: "...",
  dependencies: ["motion"], // only if actually needed
  files: [
    {
      path: "registry/ui/<name>.tsx",
      type: "registry:ui",
      target: "components/ui/<name>.tsx",
    },
  ],
},
```

### 4. `registry/registry-examples.ts` — add demo entry

```ts
{
  name: "<name>-demo",
  type: "registry:example",
  title: "<Display Title> Demo",
  description: "Example showing a <Display Title>.",
  registryDependencies: ["https://nyxui.com/r/<name>.json"],
  files: [
    {
      path: "registry/example/<name>-demo.tsx",
      type: "registry:example",
      target: "components/<name>-demo.tsx",
    },
  ],
},
```

### 5. `registry/Data.tsx` — showcase/sidebar metadata

Add under `componentsData.components` (entries are keyed by slug, sorted alphabetically at render):

```ts
"<name>": {
  title: "<Display Title>",
  tags: ["<Category>"],
  description: "...",
  image: "/assets/images/showcase/components/<name>.avif",
  isNew: true,
  imageClassName: "object-cover scale-101", // optional, card art cropping
  heroImage: "/assets/images/landing-page/hero/<name>.avif",
},
```

If showcase images don't exist yet, reuse a placeholder-only path is NOT safe — either provide the images in `public/assets/images/...` or omit `image`/`heroImage` until available. Ask the user if unsure.

### 6. `content/docs/components/<name>.mdx` — docs page

Frontmatter:

```yaml
---
title: <Display Title>
date: 2025-MM-DD
description: ...
published: true
tags: ["<Category>"]
---
```

Body order:

1. `<ComponentPreview name="<name>-demo" />`
2. `## Installation` — `<Tabs defaultValue="cli">` with CLI tab (`npx shadcn@latest add "https://nyxui.com/r/<name>.json"`) and Manual tab (`<Steps>` with `<ComponentSource name="<name>" />` and "Update the import paths" step)
3. `## Usage` — minimal code snippet
4. `## Props` — table: `| Prop | Type | Default | Description |`

Available MDX components: `ComponentPreview`, `ComponentSource`, `Tabs/TabsList/TabsTrigger/TabsContent`, `Steps/Step`.

## Build & verify

Run in order:

1. `pnpm registry:build` — regenerates `__registry__/index.tsx`, `registry.json`, `public/registry.json`, `public/r/*.json` (auto-generated files: never hand-edit)
2. `pnpm build:docs`
3. `pnpm typecheck`
   Then verify routes: `/components/<name>`, `/preview/<name>-demo`, `/components` gallery grid.

## Do NOT touch

- `components/` folder (marketing site only, not the library)
- `__registry__/index.tsx`, `registry.json`, `public/r/*.json` (generated)
- Routing/sidebar files — everything is dynamic off MDX + registry + Data.tsx

## Notes

- If the user provides adaptation-ready component code, edit it lightly (imports → `@/lib/utils`, type it, keep the API) rather than rewriting.
- Re-read this file when the component includes new npm deps (add to `dependencies`), CSS keyframes/theme vars (use `cssVars`/`css` on the UI entry, see `bubble-background` in `registry/registry-ui.ts`), or multiple demos (`<name>-demo1.tsx`, etc., one entry each).
