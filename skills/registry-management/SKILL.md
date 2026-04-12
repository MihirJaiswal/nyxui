---
name: registry-management
description: Use when modifying the registry build system, adding categories, or managing registry metadata
metadata:
  short-description: Manage registry build and structure
---

# Registry Management Skill

Use this skill when working with the Nyx UI registry build system, modifying registry categories, or updating component metadata.

## When To Apply

Apply this skill when users ask to:

- Modify the registry build process
- Add new component categories
- Update registry schema
- Bulk update component metadata
- Fix registry build errors
- Understand registry architecture

## Core Workflow

1. **Understand Registry Architecture**

   - Source files live in `registry/default/`
   - Build script: `scripts/build-registry.mts`
   - Output: Static registry JSON consumed by the app
   - Schema defined in `registry/schema.ts`

2. **Modify Registry Structure**

   - Categories map to subdirectories under `registry/default/`
   - Each component has its own directory with files + `registry.json`
   - Update `build-registry.mts` if adding new file patterns

3. **Update Build Script** (if needed)

   - Script located at `scripts/build-registry.mts`
   - Written in TypeScript; run with `tsx`
   - Outputs processed registry to `public/r/` or similar

4. **Validate Changes**

   - Run `pnpm registry:build` — must complete without errors
   - Check generated output structure
   - Verify component imports work in dev server

5. **Test End-to-End**
   - Create test component with full metadata
   - Verify it appears in component browser
   - Check installation/copy commands work

## Registry Types

| Type                | Purpose                 | Location                     |
| ------------------- | ----------------------- | ---------------------------- |
| `registry:ui`       | Reusable UI components  | `registry/default/ui/`       |
| `registry:demo`     | Example/demo components | `registry/default/demo/`     |
| `registry:template` | Page templates          | `registry/default/template/` |
| `registry:example`  | Usage examples          | Within component dirs        |

## References To Load On Demand

- Build script internals: Read `scripts/build-registry.mts`
- Type definitions: Read `registry/schema.ts`
- Category organization: Read `references/category-guide.md`

## Quick Tips

- **Dependencies**: Use package names like `framer-motion`, not imports like `motion/react`
- **Registry deps**: Reference other registry items by name (e.g., `"button"`)
- **File paths**: Relative to `registry/default/` directory
- **Build cache**: Delete `.next/` if registry changes not reflecting

## Troubleshooting

| Error                         | Solution                                                      |
| ----------------------------- | ------------------------------------------------------------- |
| `Cannot find module` in build | Check TypeScript path aliases in `tsconfig.json`              |
| Missing component in UI       | Verify `registry.json` has correct `type` field               |
| Dependencies not installing   | Ensure deps listed in both `package.json` AND `registry.json` |
| Schema validation fails       | Check `registry.json` against `registry/schema.ts`            |

## Registry.json Schema

```json
{
  "$schema": "https://nyxui.com/schema.json",
  "name": "component-name",
  "type": "registry:ui",
  "title": "Display Title",
  "description": "Brief description of the component",
  "author": "Your Name (optional)",
  "files": [
    {
      "path": "ui/component.tsx",
      "type": "registry:ui",
      "target": "" // optional: where to install
    }
  ],
  "dependencies": ["framer-motion"],
  "devDependencies": [],
  "registryDependencies": ["button", "card"],
  "meta": {
    "tags": ["animation", "interactive"]
  }
}
```
