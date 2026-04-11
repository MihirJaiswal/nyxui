---
name: add-component
description: Use when adding new UI components to the Nyx UI registry
metadata:
  short-description: Add new UI components to registry
---

# Add Component Skill

Use this skill when creating new UI components for the Nyx UI registry system.

## When To Apply

Apply this skill when users ask to:
- Create a new UI component
- Add a component to the registry
- Build a variant of an existing component
- Convert a standalone component to registry-compatible format

## Core Workflow

1. **Analyze Requirements**
   - Identify component category (ui, effect, animation, etc.)
   - Check if similar component exists in `registry/default/ui/`
   - Determine required Radix UI primitives
   - Plan animation approach (Framer Motion vs CSS)

2. **Create Component Files**
   - Create directory: `registry/default/ui/[component-name]/`
   - Write main component with TypeScript types
   - Use cva for variants, `cn()` for class merging
   - Add JSDoc comments for complex props

3. **Create Demo Component**
   - Create demo in `registry/default/demo/[component-name]-demo.tsx`
   - Showcase all variants and common use cases
   - Include copy-paste ready code

4. **Write registry.json**
   - Add metadata: name, title, description, type
   - List all files with proper types
   - Declare dependencies and registryDependencies
   - Follow existing registry.json patterns

5. **Register Component**
   - Add export to `registry/default/index.ts` if needed
   - Run `pnpm registry:build` to validate
   - Fix any build errors

6. **Test & Validate**
   - Import works: `import { Component } from "@/registry/default/ui/component"`
   - Visual check in dev server
   - TypeScript passes: `pnpm typecheck`

## References To Load On Demand

- Registry schema details: Read `references/registry-schema.md`
- Existing component examples: Browse `registry/default/ui/`
- Tailwind v4 patterns: Read `references/tailwind-v4-guide.md`
- Animation patterns: Read `references/animation-patterns.md`

## Quick Tips

- **Naming**: Use kebab-case for filenames, PascalCase for component names
- **Variants**: Always export `variants` from cva for consumer flexibility
- **Composition**: Use `React.forwardRef` for components that wrap DOM elements
- **Icons**: Import from `lucide-react`; avoid custom SVG when possible
- **Colors**: Use semantic colors (`primary`, `muted`, `accent`) not hardcoded values

## Troubleshooting

| Error | Solution |
|-------|----------|
| `Module not found` in demo | Check `registry.json` file paths are correct |
| `cva` variants not working | Ensure variant keys match prop names exactly |
| TypeScript errors on props | Verify interface extends correct HTML attributes |
| Registry build fails | Validate JSON syntax in `registry.json` |
| Styles not applying | Confirm `cn()` utility imported from `@/lib/utils` |

## Example: Complete Component Setup

```typescript
// registry/default/ui/my-button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

```json
// registry/default/ui/my-button/registry.json
{
  "name": "my-button",
  "type": "registry:ui",
  "title": "My Button",
  "description": "A customizable button component with variants",
  "files": [
    {
      "path": "ui/my-button.tsx",
      "type": "registry:ui"
    },
    {
      "path": "demo/my-button-demo.tsx",
      "type": "registry:demo"
    }
  ],
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "registryDependencies": []
}
```
