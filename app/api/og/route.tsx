import { ImageResponse } from "next/og";
import { componentsData } from "@/registry/Data";
import { allDocs } from "content-collections";

/**
 * OG image generator for component / block / template pages.
 *
 * Why a route handler and not Next's `opengraph-image.tsx` file convention:
 * all three detail routes use a catch-all `[...slug]` segment, and in
 * Next 15.3.8 placing `opengraph-image.tsx` inside a catch-all makes
 * Next's URL validator throw "Catch-all must be the last part of the
 * URL." during route tree build — the whole dev server fails to start.
 * Serving the image from a flat `/api/og?type=…&slug=…` endpoint keeps
 * one shared implementation and sidesteps the limitation entirely.
 *
 * The homepage still uses `app/opengraph-image.tsx` — it isn't inside a
 * catch-all, so the file convention works fine there.
 *
 * Usage:
 *   /api/og?type=components&slug=liquid-metal-button
 *   /api/og?type=blocks&slug=hero-section-01
 *   /api/og?type=templates&slug=minimalist-portfolio
 *
 * `generateMetadata` in each detail page sets `openGraph.images` and
 * `twitter.images` to this URL.
 */

// Node runtime (not edge) because `allDocs` pulls every compiled MDX body
// into the function bundle just so we can read a title + description — the
// edge bundle crosses the 1 MB Hobby-plan cap. Node has a 50 MB cap and
// `next/og` runs the same there. Cold start is a hair slower, but the
// result is cached by Vercel's CDN after the first hit per OG URL.
export const runtime = "nodejs";

type Type = "components" | "blocks" | "templates";

type Resolved = { title: string; description: string; section: string };

async function resolve(type: Type, slug: string): Promise<Resolved | null> {
  if (type === "components") {
    const doc = allDocs.find(
      (d) => d.slugAsParams === `components/${slug}` || d.slugAsParams === slug,
    );
    if (!doc) return null;
    return {
      title: doc.title,
      description:
        doc.description ??
        "React component built with Tailwind CSS, TypeScript, and Framer Motion.",
      section: "Components",
    };
  }
  if (type === "blocks") {
    const block = componentsData.blocks[slug];
    if (!block) return null;
    return {
      title: block.title,
      description:
        block.description ??
        "React block built with Tailwind CSS, TypeScript, and Framer Motion.",
      section: "Blocks",
    };
  }
  if (type === "templates") {
    const doc = allDocs.find((d) => d.slugAsParams === `templates/${slug}`);
    if (!doc) return null;
    return {
      title: doc.title,
      description:
        doc.description ??
        "React template built with Tailwind CSS, TypeScript, and Framer Motion.",
      section: "Templates",
    };
  }
  return null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as Type | null;
  const slug = searchParams.get("slug");

  if (
    !slug ||
    (type !== "components" && type !== "blocks" && type !== "templates")
  ) {
    return new Response("missing or invalid type / slug", { status: 400 });
  }

  const resolved = await resolve(type, slug);
  const title = resolved?.title ?? "Nyx UI";
  const description =
    resolved?.description ??
    "React component library with animated, Tailwind-styled components for Next.js.";
  const section = resolved?.section ?? "Nyx UI";

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
          backgroundColor: "#050506",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 85% 15%, rgba(232, 111, 50, 0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 10% 90%, rgba(232, 111, 50, 0.15) 0%, transparent 55%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "white",
        }}
      >
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
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.4)",
              marginLeft: 8,
              marginTop: 4,
            }}
          >
            {`/ ${section}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 20 ? 84 : 108,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 920,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              display: "block",
              overflow: "hidden",
            }}
          >
            {description.length > 180
              ? description.slice(0, 177) + "…"
              : description}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
