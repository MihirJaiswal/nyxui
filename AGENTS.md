# Nyx UI — Project Rules & Standards

Nyx UI is a modern React component library for Next.js, featuring animated UI components, 3D effects, and a customizable registry system. Built with TypeScript, Tailwind CSS v4, Framer Motion, and Radix UI primitives.

## Key Principles

- **Animation-first design**: Components should leverage Motion for smooth interactions
- **Dark mode by default**: All components render in dark mode; light mode is secondary
- **Registry-driven architecture**: Components live in `registry/` and are built via `build-registry.mts`
- **Zero `any` types**: Strict TypeScript with explicit type definitions
- **Accessibility built-in**: Use Radix UI primitives for keyboard navigation and ARIA support

## Before Writing Code

1. **Check the registry structure**: Components belong in `registry/[category]/[name]/` with `registry.json` metadata
2. **Review existing components**: Follow established patterns in `registry/default/`
3. **Verify dependencies**: Check if Radix UI primitive exists before building from scratch
4. **Run typecheck**: Ensure `pnpm typecheck` passes before committing

## Rules

### Component Architecture

- **Location**: New components go in `registry/default/ui/` or appropriate category subdirectory
- **Structure**: Each component needs:
  - Main component file(s) (`.tsx`)
  - `registry.json` with metadata, dependencies, and installation info
  - Demo/example component in `registry/default/demo/`
- **Exports**: Use named exports; barrel export from `registry/default/index.ts`
- **Props**: Define explicit interfaces with JSDoc comments for complex props

### Animation & Motion

- ✅ **Good**: Use `framer-motion` for entrance animations, hover effects, and gestures
- ✅ **Good**: Leverage `motion` library (newer Framer Motion) for layout animations
- ✅ **Good**: Use `@react-three/fiber` + `@react-three/drei` for 3D components
- ❌ **Bad**: Inline CSS animations when Framer Motion handles it better
- ❌ **Bad**: Heavy 3D scenes without `Suspense` boundaries and loading states
- ❌ **Bad**: Animations that don't respect `prefers-reduced-motion`

### Styling (Tailwind v4)

- ✅ **Good**: Use `class-variance-authority` (cva) for component variants
- ✅ **Good**: Utility composition with `cn()` helper from `lib/utils.ts`
- ✅ **Good**: CSS variables for theming (define in `globals.css`)
- ❌ **Bad**: Arbitrary values like `w-[100px]`; extend Tailwind config instead
- ❌ **Bad**: Direct color values; use `bg-primary`, `text-muted-foreground`
- ❌ **Bad**: `@apply` directives; use utility classes directly

### TypeScript

- ✅ **Good**: Explicit return types on exported functions
- ✅ **Good**: Generic components with proper constraint types
- ✅ **Good**: Discriminated unions for variant props
- ❌ **Bad**: `any` type — use `unknown` with type guards if needed
- ❌ **Bad**: Implicit `any` from untyped dependencies; add `@types/` or declare module
- ❌ **Bad**: Enums; use const objects with `as const` instead

### Registry Management

- **Adding component**: Create files → add `registry.json` → run `pnpm registry:build`
- **Dependencies**: Declare in `registry.json` under `dependencies` and `devDependencies`
- **File paths**: Reference source files relative to `registry/default/`
- **Categories**: Use `ui`, `demo`, `template`, `example` as appropriate

### Performance

- Lazy load heavy components (3D scenes, complex animations) with `dynamic` import
- Use `will-change` sparingly on animated elements
- Optimize images with `next/image` and `plaiceholder` for blur placeholders
- Keep bundle size in check — registry enables tree-shaking

### Content & Documentation

- Content uses `content-collections` for MDX processing
- Docs live in `content/` directory
- Code blocks use `rehype-pretty-code` with Shiki syntax highlighting

## Common Tasks

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Next.js dev server on localhost:3000 |
| `pnpm registry:build` | Build component registry from source files |
| `pnpm typecheck` | Run TypeScript compiler — **required before commits** |
| `pnpm lint` | Run ESLint on source files |
| `pnpm format` | Run Prettier on all files |
| `pnpm build:docs` | Build content collections for documentation |

## Examples

### Good vs Bad: Component Definition

```typescript
// ✅ Good: Explicit types, cva variants, proper JSDoc
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
      },
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Disables button and shows loading state */
  isLoading?: boolean;
}

// ❌ Bad: Inline styles, implicit any, no variant system
export const Button = ({ variant, size, ...props }) => (
  <button style={{ padding: size === 'sm' ? '8px' : '16px' }} {...props} />
);
```

### Good vs Bad: Animation Pattern

```typescript
// ✅ Good: Framer Motion with reduced motion support
import { motion, useReducedMotion } from "framer-motion";

export function FadeIn({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ❌ Bad: CSS animation without accessibility consideration
export function FadeInCSS({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>; // No reduced motion check
}
```

### Good vs Bad: Registry Entry

```json
// ✅ Good: Complete registry.json with all metadata
{
  "name": "animated-card",
  "type": "registry:ui",
  "title": "Animated Card",
  "description": "Card component with hover lift and glow effects",
  "files": [
    {
      "path": "ui/animated-card.tsx",
      "type": "registry:ui"
    },
    {
      "path": "demo/animated-card-demo.tsx",
      "type": "registry:demo"
    }
  ],
  "dependencies": ["framer-motion", "@radix-ui/react-slot"],
  "registryDependencies": ["button"]
}

// ❌ Bad: Incomplete metadata, missing demo
{
  "name": "card",
  "files": ["card.tsx"]
}
```

---

## File Structure Reminders

```
registry/
├── default/
│   ├── ui/           # Core UI components
│   ├── demo/         # Demo/example components
│   ├── lib/          # Utilities (cn, etc.)
│   └── hooks/        # Custom hooks
├── build-registry.mts  # Registry build script
└── schema.ts         # Registry type definitions

content/              # Documentation MDX files
app/                  # Next.js app router
components/           # Site-specific components (marketing, etc.)
```
