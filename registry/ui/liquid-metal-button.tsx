"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface LiquidMetalColors {
  /** Shadow end of the metal ramp. */
  shadow?: string;
  /** Highlight end of the metal ramp. */
  highlight?: string;
  /** First dispersion hue, seen on one set of bands. */
  warm?: string;
  /** Second dispersion hue, seen on the bands between. */
  cool?: string;
}

interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Palette of the rim. Any omitted key keeps its default. */
  colors?: LiquidMetalColors;
  children?: React.ReactNode;
  className?: string;
  /** Surface classes for the inner pill that sits on top of the metal rim. */
  surfaceClassName?: string;
  /** Thickness of the visible metal rim, in pixels. */
  rimWidth?: number;
  /** Number of highlight lobes travelling around the rim. Higher is busier. */
  repetition?: number;
  /** Edge falloff between lobes. Low values give crisp chrome edges, high values a soft bevel. */
  softness?: number;
  /** Strength of the amber/blue dispersion across the lit rim, 0 to 1. 0 is plain steel. */
  chromaticShift?: number;
  /** How hard the colour bands are edged. 0 blends gold into blue smoothly; 1 gives crisp stripes. */
  banding?: number;
  /** Flow direction, in degrees. */
  angle?: number;
  /** Zoom of the lateral wash across the rim. */
  scale?: number;
  /** Base flow speed. Hover and press scale this up. */
  speed?: number;
  /** Suppress the click ripple. */
  disableRipple?: boolean;
}

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Polished chrome, not an oil slick. Real metal reflects a few broad light
// sources sweeping around the rim, so this uses low-frequency angular lobes
// rather than tight repeating stripes, and keeps the red/blue separation small
// enough to read as a dispersion fringe at the highlight edges.
const FRAGMENT_SHADER = `
  precision mediump float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform float u_repetition;
  uniform float u_softness;
  uniform float u_shift;
  uniform float u_banding;
  uniform vec3  u_dark;
  uniform vec3  u_light;
  uniform vec3  u_warm;
  uniform vec3  u_cool;
  uniform float u_angle;
  uniform float u_scale;

  varying vec2 vUv;

  float sheen(vec2 p, float t, float offset) {
    float a = atan(p.y, p.x);

    // Several highlights travelling around the ring. This is deliberately
    // segmented: each lobe boundary is a steep edge, and the steep edges are
    // what catch the dispersion colour below.
    float v = sin(a * u_repetition + t * 0.6);
    v += 0.55 * sin(a * (u_repetition + 1.0) - t * 0.45 + 1.7);
    v += 0.35 * sin(p.x * u_scale * 0.5 + t * 0.5);

    // Bias one side brighter, the way a horizontal surface picks up more sky
    // than ground.
    v += 0.5 * p.y;

    v = v * 0.42 + offset;

    float e = clamp(u_softness, 0.05, 1.0);
    return smoothstep(-e, e, v);
  }

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= u_resolution.x / max(u_resolution.y, 1.0);

    float a = radians(u_angle);
    p = mat2(cos(a), -sin(a), sin(a), cos(a)) * p;

    float t = u_time;

    // Neutral silver underneath. Colour is added back selectively below —
    // tinting every channel across the whole field is what turns this into an
    // oil slick, and removing colour altogether leaves a flat grey ring.
    float m = sheen(p, t, 0.0);

    // Deliberately short of white. A rim that peaks at 0.96 is already blown
    // out, so tinting it has nowhere to go and the colour washes away — that
    // is what made the previous build look faded.
    vec3 col = mix(u_dark, u_light, m);

    // Rotate the hue slowly around the ring so one arc glints amber while
    // another glints blue, instead of the whole rim sharing one cast.
    float ring = atan(p.y, p.x);
    // Three cycles around the ring, so several amber and blue zones coexist at
    // any instant. At lower frequencies the whole rim shares one hue and the
    // button slowly cycles gold -> blue -> gold instead of showing both.
    float hueRaw = 0.5 + 0.5 * sin(ring * 3.2 + t * 0.25);

    // A raw sine crosses from gold to blue gradually, which reads as a soft
    // wash. Squeezing the ramp into a narrow band turns each crossing into a
    // hard edge, so the rim reads as distinct stripes rather than a gradient.
    float bw = mix(0.5, 0.015, clamp(u_banding, 0.0, 1.0));
    float hue = smoothstep(0.5 - bw, 0.5 + bw, hueRaw);

    // Tint multiplicatively, not additively. Adding colour to metal that is
    // already near-white just clips every channel toward white, which killed
    // the warm glints entirely and left only the cool ones. Scaling pulls some
    // channels down as well as up, so the hue actually shifts at any
    // brightness.
    vec3 tint = mix(u_warm, u_cool, hue);

    // Tint the whole lit band, not just the steep edges. Masking by the local
    // gradient confined colour to hairline fringes and left the rest plain
    // white; masking by m instead keeps the shadows neutral while letting the
    // highlights carry broad amber and blue zones.
    // Ramp the colour in early rather than scaling it linearly with
    // brightness, so the stripes cover the mid-tones too instead of clinging
    // to the few brightest pixels. Shadows still stay neutral.
    col *= mix(vec3(1.0), tint, clamp(u_shift * smoothstep(0.12, 0.55, m), 0.0, 1.0));

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

const DEFAULT_COLORS: Required<LiquidMetalColors> = {
  shadow: "#0d0d0f",
  highlight: "#e0e0eb",
  warm: "#ffb347",
  cool: "#4d94ff",
};

function hexToRgb(hex: string): [number, number, number] {
  const raw = hex.trim().replace(/^#/, "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw.slice(0, 6);
  const n = Number.parseInt(full, 16);
  if (full.length !== 6 || Number.isNaN(n)) return [1, 1, 1];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/**
 * Turns a colour into a brightness-preserving multiplier.
 *
 * The dispersion tints scale the metal rather than being painted over it, so a
 * raw colour would darken or lighten the rim as well as shifting its hue.
 * Dividing by the colour's own luminance leaves only the hue, and `strength`
 * pulls that back toward neutral so a saturated input does not blow out.
 */
function toTintMultiplier(
  hex: string,
  strength = 0.75,
): [number, number, number] {
  const [r, g, b] = hexToRgb(hex);
  const luma = Math.max(0.2126 * r + 0.7152 * g + 0.0722 * b, 0.001);
  return [
    1 + (r / luma - 1) * strength,
    1 + (g / luma - 1) * strength,
    1 + (b / luma - 1) * strength,
  ];
}

export function LiquidMetalButton({
  children,
  className,
  surfaceClassName,
  colors,
  rimWidth = 2,
  repetition = 2,
  softness = 0.3,
  chromaticShift = 0.6,
  banding = 0.92,
  angle = 45,
  scale = 3,
  speed = 1.8,
  disableRipple = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...buttonProps
}: LiquidMetalButtonProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Speed lives in a ref as well as state: the rAF loop reads it every frame,
  // and the click handler restores it from a timeout that would otherwise
  // close over a stale hover value.
  const speedRef = useRef(speed);
  const hoveredRef = useRef(false);

  const [webglFailed, setWebglFailed] = useState(false);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const rippleId = useRef(0);

  // Uniform values change without needing to rebuild the scene.
  // Resolved once per colour change rather than per frame: hex parsing and
  // the luminance normalisation do not belong in the render loop.
  const palette = useMemo(() => {
    const c = { ...DEFAULT_COLORS, ...colors };
    return {
      dark: hexToRgb(c.shadow),
      light: hexToRgb(c.highlight),
      warm: toTintMultiplier(c.warm),
      cool: toTintMultiplier(c.cool),
    };
  }, [colors]);

  const settings = {
    repetition,
    softness,
    chromaticShift,
    banding,
    angle,
    scale,
    palette,
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      // No WebGL (old browser, blocked context, software rendering disabled).
      // The CSS fallback below still gives a metal rim.
      setWebglFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(
            mount.clientWidth || 1,
            mount.clientHeight || 1,
          ),
        },
        u_repetition: { value: repetition },
        u_softness: { value: softness },
        u_shift: { value: chromaticShift },
        u_banding: { value: banding },
        u_dark: { value: new THREE.Vector3(...palette.dark) },
        u_light: { value: new THREE.Vector3(...palette.light) },
        u_warm: { value: new THREE.Vector3(...palette.warm) },
        u_cool: { value: new THREE.Vector3(...palette.cool) },
        u_angle: { value: angle },
        u_scale: { value: scale },
      },
    });
    materialRef.current = material;
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      material.uniforms.u_resolution.value.set(w, h);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    // Stop drawing while scrolled out of view. A button is small, but a page
    // full of them should not hold the GPU awake for pixels nobody sees.
    let visible = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    visibility.observe(mount);

    let frame = 0;
    let last = performance.now();

    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);

      const delta = (now - last) / 1000;
      last = now;
      if (!visible) return;

      const s = settingsRef.current;
      material.uniforms.u_repetition.value = s.repetition;
      material.uniforms.u_softness.value = s.softness;
      material.uniforms.u_shift.value = s.chromaticShift;
      material.uniforms.u_banding.value = s.banding;
      material.uniforms.u_dark.value.set(...s.palette.dark);
      material.uniforms.u_light.value.set(...s.palette.light);
      material.uniforms.u_warm.value.set(...s.palette.warm);
      material.uniforms.u_cool.value.set(...s.palette.cool);
      material.uniforms.u_angle.value = s.angle;
      material.uniforms.u_scale.value = s.scale;

      if (!reduceMotion) {
        material.uniforms.u_time.value += delta * speedRef.current;
      }

      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      setWebglFailed(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      materialRef.current = null;
    };
    // Uniform-only props are pushed through settingsRef each frame, so the
    // scene is built once and never torn down for a prop tweak.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      hoveredRef.current = true;
      speedRef.current = speed * 1.7;
      onMouseEnter?.(event);
    },
    [speed, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      hoveredRef.current = false;
      speedRef.current = speed;
      onMouseLeave?.(event);
    },
    [speed, onMouseLeave],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      speedRef.current = speed * 4;
      window.setTimeout(() => {
        speedRef.current = hoveredRef.current ? speed * 1.7 : speed;
      }, 300);

      if (!disableRipple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const id = rippleId.current++;
        setRipples((prev) => [
          ...prev,
          { x: event.clientX - rect.left, y: event.clientY - rect.top, id },
        ]);
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }

      onClick?.(event);
    },
    [speed, disableRipple, onClick],
  );

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full",
        "px-6 py-3 text-sm font-medium outline-none transition-transform duration-150",
        "text-neutral-700 dark:text-neutral-300",
        "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950",
        "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        "shadow-lg shadow-black/20 dark:shadow-black/50",
        className,
      )}
      {...buttonProps}
    >
      {/* The metal itself. The inner surface below covers all but the rim. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full"
      >
        <span
          ref={mountRef}
          className="block h-full w-full rounded-full [&>canvas]:rounded-full"
        />
        {webglFailed && (
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(110deg,#2e2e33_0%,#d8d8e0_25%,#4a4a52_50%,#f2f2f7_70%,#2e2e33_100%)]" />
        )}
      </span>

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -z-10 rounded-full",
          "bg-gradient-to-b from-neutral-100 to-white",
          "dark:from-neutral-800 dark:to-black",
          surfaceClassName,
        )}
        style={{ inset: rimWidth }}
      />

      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden
          className="animate-liquid-metal-ripple pointer-events-none absolute z-20 h-5 w-5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_70%)]"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </button>
  );
}
