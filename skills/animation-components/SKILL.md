---
name: animation-components
description: Use when creating animated components with Framer Motion, GSAP, or Three.js
metadata:
  short-description: Build animated and 3D components
---

# Animation Components Skill

Use this skill when creating animated UI components, 3D scenes, or motion effects using Framer Motion, GSAP, or React Three Fiber.

## When To Apply

Apply this skill when users ask to:
- Create animated entrance/exit components
- Add hover/gesture interactions
- Build 3D scenes or particle effects
- Implement scroll-triggered animations
- Create loading/skeleton states with motion

## Core Workflow

1. **Choose Animation Library**
   - **Framer Motion**: Layout animations, gestures, AnimatePresence — most common
   - **GSAP**: Complex timelines, ScrollTrigger, precise control
   - **Three.js/R3F**: 3D scenes, WebGL effects, particle systems
   - **CSS**: Simple transitions, prefers-reduced-motion baseline

2. **Implement Animation Pattern**
   - Wrap component in `motion` element or `AnimatePresence`
   - Define `initial`, `animate`, `exit` states
   - Add `transition` with easing and duration
   - Include `useReducedMotion` check

3. **Optimize Performance**
   - Use `layout` prop sparingly — it's expensive
   - Prefer `transform` and `opacity` animations
   - Lazy load heavy 3D components
   - Use `will-change` hint when appropriate

4. **Test Accessibility**
   - Verify reduced motion fallback
   - Check focus states work during animations
   - Ensure animations don't trap keyboard users

5. **Document Usage**
   - Include animation timing in JSDoc
   - Document customization props (delay, duration, etc.)
   - Show example with controlled state

## Animation Libraries

| Library | Use Case | Import Pattern |
|---------|----------|----------------|
| Framer Motion | Most animations | `import { motion, AnimatePresence } from "framer-motion"` |
| Motion (new) | Modern Framer Motion | `import * as motion from "motion/react-client"` |
| GSAP | Complex timelines | `import gsap from "gsap"`; use `useGSAP` hook |
| R3F | 3D scenes | `import { Canvas } from "@react-three/fiber"` |
| Drei | R3F helpers | `import { OrbitControls } from "@react-three/drei"` |

## References To Load On Demand

- Framer Motion patterns: Read `references/framer-patterns.md`
- 3D component setup: Read `references/r3f-setup.md`
- Performance guide: Read `references/animation-perf.md`
- Easing reference: Read `references/easing-curves.md`

## Quick Tips

- **Stagger children**: Use `staggerChildren` in parent `transition` for sequential reveals
- **Spring physics**: Use `type: "spring"` for natural-feeling motion
- **Layout animations**: Add `layout` prop only when position/size changes
- **Exit animations**: Must wrap in `AnimatePresence mode="wait"` for exit to fire
- **Scroll animations**: Use `whileInView` for viewport-triggered animations

## Troubleshooting

| Error | Solution |
|-------|----------|
| Animation not firing | Check `AnimatePresence` wraps conditional renders |
| Janky animation | Reduce to `transform`/`opacity` only; check layout thrashing |
| 3D scene blank | Verify `<Canvas>` has defined `style={{ width, height }}` |
| SSR mismatch | Add `'use client'` directive; lazy load with `dynamic()` |
| Exit animation skipped | Use `mode="wait"` on `AnimatePresence` |

## Examples

### Framer Motion Entrance

```typescript
'use client';

import { motion, useReducedMotion } from "framer-motion";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
}

export function FadeUp({ children, delay = 0 }: FadeUpProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing
      }}
    >
      {children}
    </motion.div>
  );
}
```

### Hover Scale Effect

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="px-4 py-2 bg-primary rounded-md"
>
  Click me
</motion.button>
```

### Staggered List

```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.li key={i.id} variants={item}>{i.name}</motion.li>
  ))}
</motion.ul>
```

### 3D Scene Component

```typescript
'use client';

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import dynamic from "next/dynamic";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#6366f1" />
      </Sphere>
      <OrbitControls />
    </>
  );
}

// Lazy load for performance
export const LazyScene = dynamic(() => Promise.resolve(Scene), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-muted animate-pulse" />
});
```

### AnimatePresence for Exit

```typescript
'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function ToggleContent() {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            Content here
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```
