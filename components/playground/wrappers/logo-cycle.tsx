"use client";

/**
 * Playground wrapper for `LogoCycle`.
 *
 * Two gaps the real component doesn't bridge, both playground-specific:
 *
 *  1. **Width.** The real component's grid uses `minmax(0, 1fr)` columns,
 *     which collapse to 0 px when the parent is a shrink-to-fit flex box.
 *     Every real-world container is wider than its contents, so consumers
 *     never notice. The playground preview centres children with
 *     `items-center justify-center`, which IS shrink-to-fit, so we drop a
 *     width-giving wrapper around it here.
 *
 *  2. **Brand strings → icons.** The real component takes `top`/`bottom`
 *     as `ReactNode` and consumers pass JSX (e.g. `<SiReact />`). The
 *     playground props panel can only serialise JSON, so defaults come
 *     through as strings ("React", "Next"). We pre-resolve those to the
 *     matching `react-icons/si` component before handing off; unknown
 *     strings pass through and the real component renders them as text.
 */

import type { ReactNode } from "react";
import {
  SiAnthropic,
  SiCss3,
  SiFigma,
  SiFramer,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLinear,
  SiNextdotjs,
  SiNotion,
  SiOpenai,
  SiPrisma,
  SiReact,
  SiSketch,
  SiSlack,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { LogoCycle, type LogoCyclePair } from "@/registry/ui/logo-cycle";

const BRAND_ICONS: Record<string, React.ComponentType> = {
  React: SiReact,
  Next: SiNextdotjs,
  Vercel: SiVercel,
  TS: SiTypescript,
  Tailwind: SiTailwindcss,
  CSS: SiCss3,
  HTML: SiHtml5,
  JS: SiJavascript,
  Figma: SiFigma,
  Framer: SiFramer,
  GitHub: SiGithub,
  Linear: SiLinear,
  Notion: SiNotion,
  Slack: SiSlack,
  Stripe: SiStripe,
  Supabase: SiSupabase,
  Prisma: SiPrisma,
  Sketch: SiSketch,
  OpenAI: SiOpenai,
  Anthropic: SiAnthropic,
};

function resolveBrand(name: string): React.ComponentType | null {
  const trimmed = name.trim();
  if (BRAND_ICONS[trimmed]) return BRAND_ICONS[trimmed];
  const lower = trimmed.toLowerCase();
  for (const key of Object.keys(BRAND_ICONS)) {
    if (key.toLowerCase() === lower) return BRAND_ICONS[key];
  }
  return null;
}

function resolveNode(node: ReactNode): ReactNode {
  if (typeof node !== "string") return node;
  const Icon = resolveBrand(node);
  return Icon ? <Icon /> : node;
}

interface PlaygroundLogoCycleProps {
  pairs?: LogoCyclePair[];
  columns?: number;
  duration?: number;
  iconSize?: number;
  className?: string;
}

export default function LogoCyclePlayground({
  pairs = [],
  ...rest
}: PlaygroundLogoCycleProps) {
  const resolvedPairs: LogoCyclePair[] = pairs.map((p) => ({
    top: resolveNode(p.top),
    bottom: resolveNode(p.bottom),
  }));

  return (
    // Width-giving wrapper so the `minmax(0, 1fr)` columns inside have
    // something to divide. See file-level comment for the rationale.
    <div className="w-full">
      <LogoCycle pairs={resolvedPairs} {...rest} />
    </div>
  );
}
