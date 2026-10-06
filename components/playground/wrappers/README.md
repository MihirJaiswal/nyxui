# Playground wrappers

Components whose natural runtime behaviour doesn't match the playground's
"interactive preview, replay on prop change" model get a wrapper here. The
original component in `registry/ui/` keeps its honest API; the playground
registry imports from this directory instead.

## When to use a wrapper (vs. an opt-in prop)

Reach for a wrapper when the mismatch is **playground-shaped** rather than a
real axis of behaviour that consumers of the library want to pick between.
If both behaviours are legitimately useful to a real app (hero vs. mid-page
reveal, say), add a prop to the component. If the mismatch exists only
because the playground renders inside a Suspense boundary, scrolls weirdly,
or can't pass JSX in a serialised config, that's a wrapper.

## Convention

- One file per wrapped component, named after the component slug:
  `animated-text.tsx`, `logo-cycle.tsx`.
- Default export is a drop-in that accepts the same props as the real
  component.
- Reuse anything you can from the real component (variants, types, inner
  parts). Export it from `registry/ui/` as a named export rather than
  copying it inline here — one source of truth beats drift.
- Leave a short comment at the top of each wrapper explaining the specific
  mismatch and why a prop didn't fit.

## Wiring up the playground

In `components/playground/registry.ts`, point the loader at the wrapper:

```ts
"animated-text": () => import("@/components/playground/wrappers/animated-text"),
```

The component config (name, props, defaults) stays in the same file as
usual — the wrapper only replaces what gets rendered, not how it's
configured.
