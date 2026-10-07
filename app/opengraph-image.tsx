import { ImageResponse } from "next/og";

/**
 * Homepage Open Graph image.
 *
 * Next.js file-convention: this exports an image colocated with the route
 * and Next generates a `<meta property="og:image">` + `<meta
 * name="twitter:image">` pointing at it. Overrides whatever was passed to
 * `metadata.openGraph.images` for THIS route only (sub-pages fall back to
 * their own opengraph-image.tsx, or the metadata image if none).
 *
 * Rendered via Satori on the edge/node runtime at request time (or build
 * time if the page is static). No images or custom fonts loaded — keeps
 * the generator fast and dependency-free. Satoshi/Geist can't be used
 * without converting to ttf/otf and bundling, which isn't worth the
 * complexity for a 1200×630 crop that's compressed by every social
 * platform anyway.
 */

export const runtime = "edge";
export const alt = "Nyx UI — Animated React Component Library";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(ellipse 60% 50% at 85% 15%, rgba(232, 111, 50, 0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 10% 90%, rgba(232, 111, 50, 0.15) 0%, transparent 55%), #050506",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "white",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #e86f32 0%, #c73e1d 100%)",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            N
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "-0.01em",
            }}
          >
            Nyx UI
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              maxWidth: 920,
            }}
          >
            Animated React Component Library
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 820,
              letterSpacing: "-0.01em",
            }}
          >
            Open-source components built with Tailwind CSS, TypeScript, and
            Framer Motion.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
