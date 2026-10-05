/**
 * Shared page container widths — one source of truth for the whole app.
 *
 * Almost every route is `wide`: no max-width cap, content spreads to the
 * viewport with a small side gutter. Two routes stay `narrow`: the landing
 * page (`/`) and `/design-engineering`.
 *
 * Anywhere you need to width a page shell (main container, footer, any
 * cross-page chrome) read from `CONTAINER` — don't hardcode `max-w-*`.
 * To flip a specific route between the two shapes, update `NARROW_ROUTES`
 * below; every consumer that reads `containerVariantFor(pathname)` picks
 * the change up automatically.
 */
export const CONTAINER = {
  /** Default — spreads to the viewport with a small side gutter. */
  wide: "mx-auto w-full max-w-none px-4 sm:px-6",
  /** Constrained shell — used by `/` and `/design-engineering`. */
  narrow: "mx-auto w-full max-w-295 px-6 sm:px-12",
} as const;

/** Inner chrome for navbar/footer — side padding only below lg on narrow
 * pages (the max-w-295 cap handles the gutter at lg+), same small padding
 * as the site-wide container on wide pages. */
export const INNER = {
  wide: "mx-auto w-full max-w-none px-4 sm:px-6",
  narrow: "mx-auto w-full max-w-295 px-4 sm:px-6 lg:px-0",
} as const;

export type ContainerVariant = keyof typeof CONTAINER;

/** Routes that use the narrow container. Everything else is wide. */
const NARROW_ROUTES = new Set<string>(["/", "/design-engineering", "/pro"]);

export function containerVariantFor(pathname: string): ContainerVariant {
  return NARROW_ROUTES.has(pathname) ? "narrow" : "wide";
}
