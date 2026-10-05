"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export type ShiningCardProps = {
  /** Background image URL. */
  imageUrl: string;
  /** Maximum tilt in degrees (both axes). */
  tiltStrength?: number;
  /** Overall shine intensity (0–1). */
  shineStrength?: number;
  /** Tint of the glare highlight core. */
  shineColor?: string;
  /** Opacity of the dark scrim over the image (0–1). */
  imageOverlayOpacity?: number;
  /** Card width in px. */
  width?: number;
  /** CSS aspect ratio for the card (e.g. "9/13", "1/1", "3/4"). */
  aspectRatio?: string;
  /** Extra classes on the outer positioning wrapper. */
  className?: string;
  /** Extra classes on the tilted card face. */
  cardClassName?: string;
};

/** #rrggbb -> "r, g, b" */
function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return "212, 212, 216";
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export function ShiningCard({
  imageUrl,
  tiltStrength = 16,
  shineStrength = 0.6,
  shineColor = "#d4d4d8",
  imageOverlayOpacity = 0,
  width = 320,
  aspectRatio = "9/13",
  className,
  cardClassName,
}: ShiningCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tintRgb = hexToRgb(shineColor);

  const springy = { stiffness: 300, damping: 30 };
  const springp = { stiffness: 180, damping: 24 };

  const rotX = useSpring(useMotionValue(0), springy);
  const rotY = useSpring(useMotionValue(0), springy);
  const px = useSpring(useMotionValue(50), springp);
  const py = useSpring(useMotionValue(50), springp);
  const active = useSpring(useMotionValue(0), { stiffness: 200, damping: 28 });
  const hyp = useSpring(useMotionValue(0), springp);

  const transform = useMotionTemplate`rotateX(${rotX}deg) rotateY(${rotY}deg)`;

  // Glare: a soft highlight core that tracks the cursor. soft-light keeps
  // it from looking like a flashlight dot — it just lifts the lit area.
  const glareBg = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.6) 0%, rgba(${tintRgb},0.25) 25%, rgba(255,255,255,0) 55%)`;
  const glareOpacity = useTransform(
    () => active.get() * (0.5 + 0.3 * hyp.get()),
  );

  // Holographic sheen: a rainbow band shifting opposite the cursor, MASKED
  // to a spot around the cursor so colour appears only inside the glint —
  // a shine that happens to be iridescent, not a full-card recolour.
  const holoX = useTransform(px, [0, 100], [130, -30]);
  const holoY = useTransform(py, [0, 100], [130, -30]);
  const holoPos = useMotionTemplate`${holoX}% ${holoY}%`;
  const holoMask = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, #000 0%, rgba(0,0,0,0.6) 32%, transparent 60%)`;
  const holoOpacity = useTransform(
    () => shineStrength * active.get() * (0.65 + 0.55 * hyp.get()),
  );

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    px.set(rx * 100);
    py.set(ry * 100);
    rotY.set((rx - 0.5) * 2 * tiltStrength);
    rotX.set(-(ry - 0.5) * 2 * tiltStrength);
    hyp.set(Math.min(1, Math.hypot(rx - 0.5, ry - 0.5) / 0.707));
  };

  const onLeave = () => {
    active.set(0);
    hyp.set(0);
    px.set(50);
    py.set(50);
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <div
      style={{ perspective: "1500px" }}
      className={cn("flex items-center justify-center", className)}
    >
      <motion.div
        ref={ref}
        role="img"
        aria-label="Shining card"
        onMouseMove={onMouseMove}
        onMouseEnter={() => active.set(1)}
        onMouseLeave={onLeave}
        style={{
          transform,
          transformStyle: "preserve-3d",
          backgroundImage: `url(${imageUrl})`,
          width,
          aspectRatio,
        }}
        className={cn(
          "relative overflow-hidden bg-zinc-950 bg-cover bg-center will-change-transform shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
          cardClassName,
        )}
      >
        {imageOverlayOpacity > 0 && (
          <div
            className="pointer-events-none absolute inset-0 bg-black"
            style={{ opacity: imageOverlayOpacity }}
          />
        )}

        {/* iridescent glint — masked to a spot around the cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: holoOpacity,
            backgroundImage:
              "repeating-linear-gradient(115deg," +
              "rgba(255,119,115,0.55) 0%,rgba(255,237,95,0.55) 15%," +
              "rgba(168,255,95,0.55) 30%,rgba(131,255,247,0.55) 45%," +
              "rgba(120,148,255,0.55) 60%,rgba(216,117,255,0.55) 75%," +
              "rgba(255,119,115,0.55) 90%)",
            backgroundSize: "200% 200%",
            backgroundPosition: holoPos,
            mixBlendMode: "overlay",
            maskImage: holoMask,
            WebkitMaskImage: holoMask,
          }}
        />

        {/* soft glare highlight core */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: glareOpacity,
            backgroundImage: glareBg,
            mixBlendMode: "soft-light",
          }}
        />
      </motion.div>
    </div>
  );
}
