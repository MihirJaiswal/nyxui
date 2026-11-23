"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  /** Surface classes for the inner pill that sits on top of the metal rim. */
  surfaceClassName?: string;
  /** Thickness of the visible metal rim, in pixels. */
  rimWidth?: number;
  /** How many stripes of light fit across the metal. */
  repetition?: number;
  /** 0 is a hard edge between light and dark, 1 a smooth gradient. */
  softness?: number;
  /** How far red is pulled ahead of green: the warm side of the prism fringe. */
  shiftRed?: number;
  /** How far blue is pulled behind green: the cool side of the prism fringe. */
  shiftBlue?: number;
  /** Noise bending the stripes. 0 keeps them smooth arcs. */
  distortion?: number;
  /** Direction the stripes run and flow, in degrees. */
  angle?: number;
  /** How far zoomed in: higher shows a smaller window of the pattern, so broader bands. */
  scale?: number;
  /** Base flow speed. Hover and press scale this up. */
  speed?: number;
  /** Suppress the click ripple. */
  disableRipple?: boolean;
}

// Liquid metal, drawn on plain WebGL2: no libraries.
//
// Polished metal looks like metal because of what it reflects: broad bands of
// light and dark from the room around it, curving over its surface and sliding
// as it moves. So the shader draws a few diagonal stripes of light, bends them
// over a shallow dome so they curve the way reflections do, and slides them
// along. Each stripe isn't a plain gradient: it's a bright band, a thin dark
// line, a thin glint, then a long fade from dark back to bright, which is what
// makes it read as chrome rather than brushed steel. Red and blue read the
// stripes a little ahead and a little behind green, so every hard edge gets a
// warm fringe on one side and a cool one on the other, like light splitting
// at the edge of a polished surface.
//
// The look is modelled on Paper's Liquid Metal shader (paper.design); the code
// is written from scratch.

const VERTEX = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_repetition;
uniform float u_softness;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_distortion;
uniform float u_angle;
uniform float u_scale;

out vec4 fragColor;

// a small, smooth 2D noise, for the stripes' wobble
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i), f), dot(hash(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
    mix(dot(hash(i + vec2(0, 1)), f - vec2(0, 1)), dot(hash(i + vec2(1, 1)), f - vec2(1, 1)), u.x),
    u.y
  );
}

// One stripe of reflected light, for a position x from 0 to 1 across it. It
// starts with a hard step up from dark to bright: a thin bright band, then a
// thin dark line with a glint inside it, then bright again, fading slowly to
// dark across the rest of the stripe, ready for the next hard step. e is how
// soft each edge is.
float stripe(float x, float e) {
  const float LIGHT = 1.0;
  const float DARK = 0.0;
  const float BAND = 0.055;  // the thin bright band
  const float LINE = 0.075;  // the thin dark line after it
  float v = mix(DARK, LIGHT, smoothstep(0.0, 2.0 * e, x));     // the hard step up
  v = mix(v, DARK, smoothstep(BAND, BAND + 2.0 * e, x));        // the dark line
  v = mix(v, LIGHT, smoothstep(BAND + 0.25 * LINE, BAND + 0.25 * LINE + 2.0 * e, x)); // a glint in it
  v = mix(v, DARK, smoothstep(BAND + 0.35 * LINE, BAND + 0.35 * LINE + 2.0 * e, x));
  // bright again, then the long slow fade down to dark
  float start = BAND + LINE;
  float fade = mix(LIGHT, DARK, smoothstep(0.0, 1.0, (x - start) / (1.0 - start)));
  v = mix(v, fade, smoothstep(start, start + 2.0 * e, x));
  return v;
}

void main() {
  // centred, measured in heights, then zoomed in, with a small offset so the
  // window doesn't sit dead centre
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
  p = p / u_scale + vec2(0.1, -0.1);

  float t = 0.3 * u_time;

  // The stripes are arcs of big circles around a point off to one side, the
  // way reflections curve over a rounded surface: zoomed in this far, they
  // run long and shallow across the button, bowing gently.
  float a = radians(u_angle - 30.0);
  vec2 n = vec2(sin(a), cos(a));
  vec2 centre = -0.6 * n;
  float across = length(p - centre);
  float along = dot(p, vec2(n.y, -n.x));

  // how near the middle of the surface a point is: 1 there, less further out
  float dome = clamp(1.0 - pow(1.8 * length(p), 1.2), 0.0, 1.0);

  // a slow wobble of noise through them, so they never sit still
  float wobble = noise(p * 2.0 - t);
  float phase = across + (0.02 + 0.25 * u_distortion) * wobble;
  // spaced so a band and most of its fade span the button
  phase = phase * 1.05 * u_repetition - t;

  // the prism: red reads a touch ahead, blue a touch behind, a little more
  // away from the middle
  float spread = 0.5 + 0.3 * (1.0 - dome);
  float pr = phase + spread * u_shiftRed / 20.0;
  float pb = phase - 1.3 * spread * u_shiftBlue / 20.0;

  // edge softness, plus a pixel's worth so hard edges don't alias
  float e = u_softness / 22.0 + 0.001;
  float r = stripe(fract(pr), e + fwidth(pr));
  float g = stripe(fract(phase), e + fwidth(phase));
  float b = stripe(fract(pb), e + fwidth(pb));

  // white-blue highlights, and shadows with some blue in them, more toward one end,
  // so the mid-tones of the fade read lavender-grey rather than neutral
  vec3 light = vec3(0.98, 0.98, 1.0);
  vec3 dark = vec3(0.10, 0.10, 0.14 + 0.10 * smoothstep(-0.3, 0.2, along));
  vec3 col = vec3(mix(dark.r, light.r, r), mix(dark.g, light.g, g), mix(dark.b, light.b, b));
  fragColor = vec4(col, 1.0);
}
`;

type MetalUniforms = {
  repetition: number;
  softness: number;
  shiftRed: number;
  shiftBlue: number;
  distortion: number;
  angle: number;
  scale: number;
};

type MetalMount = {
  canvas: HTMLCanvasElement;
  setSpeed: (speed: number) => void;
  setUniforms: (u: MetalUniforms) => void;
  dispose: () => void;
};

/**
 * Fill `el` with a canvas running the shader. Returns null when WebGL2 isn't
 * available or the shader won't build, so the caller can fall back to CSS.
 */
function mountMetal(
  el: HTMLElement,
  settings: MetalUniforms,
  speed: number,
): MetalMount | null {
  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block";
  const gl = canvas.getContext("webgl2", {
    premultipliedAlpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  // One triangle that covers the whole canvas.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const pos = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const loc = (n: string) => gl.getUniformLocation(program, n);
  const u = {
    resolution: loc("u_resolution"),
    time: loc("u_time"),
    repetition: loc("u_repetition"),
    softness: loc("u_softness"),
    shiftRed: loc("u_shiftRed"),
    shiftBlue: loc("u_shiftBlue"),
    distortion: loc("u_distortion"),
    angle: loc("u_angle"),
    scale: loc("u_scale"),
  };
  const push = (s: MetalUniforms) => {
    gl.uniform1f(u.repetition, s.repetition);
    gl.uniform1f(u.softness, s.softness);
    gl.uniform1f(u.shiftRed, s.shiftRed);
    gl.uniform1f(u.shiftBlue, s.shiftBlue);
    gl.uniform1f(u.distortion, s.distortion);
    gl.uniform1f(u.angle, s.angle);
    gl.uniform1f(u.scale, s.scale);
  };
  push(settings);

  el.appendChild(canvas);
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(el.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(el.clientHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.resolution, canvas.width, canvas.height);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  // Stop drawing while scrolled out of view. A button is small, but a page
  // full of them should not hold the GPU awake for pixels nobody sees.
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
  });
  io.observe(el);

  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Start a little way in, so the first frame already has a band on show.
  let time = 2.8;
  let rate = speed;
  let last = performance.now();
  let raf = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (!visible) return;
    if (!still) time += dt * rate;
    gl.uniform1f(u.time, time);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  raf = requestAnimationFrame(frame);

  return {
    canvas,
    setSpeed: (v) => {
      rate = v;
    },
    setUniforms: push,
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      canvas.remove();
    },
  };
}

export function LiquidMetalButton({
  children,
  className,
  surfaceClassName,
  rimWidth = 2,
  repetition = 4,
  softness = 0.5,
  shiftRed = 0.3,
  shiftBlue = 0.3,
  distortion = 0,
  angle = 45,
  scale = 8,
  speed = 0.6,
  disableRipple = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...buttonProps
}: LiquidMetalButtonProps) {
  const mountRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const metalRef = useRef<MetalMount | null>(null);

  // Speed lives in a ref: the click handler restores it from a timeout that
  // would otherwise close over a stale hover value.
  const speedRef = useRef(speed);
  const hoveredRef = useRef(false);

  const [webglFailed, setWebglFailed] = useState(false);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const rippleId = useRef(0);

  const uniforms: MetalUniforms = {
    repetition,
    softness,
    shiftRed,
    shiftBlue,
    distortion,
    angle,
    scale,
  };
  const uniformsRef = useRef(uniforms);
  uniformsRef.current = uniforms;

  const setSpeed = useCallback((value: number) => {
    speedRef.current = value;
    metalRef.current?.setSpeed(value);
  }, []);

  useEffect(() => {
    setSpeed(hoveredRef.current ? speed * 1.7 : speed);
  }, [speed, setSpeed]);

  // The shader is built once; prop changes are pushed in as uniforms below.
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let metal: MetalMount | null = null;
    try {
      metal = mountMetal(el, uniformsRef.current, speedRef.current);
    } catch {
      metal = null;
    }
    if (!metal) {
      // No WebGL2 (old browser, blocked context, software rendering disabled).
      // The CSS fallback below still gives a metal rim.
      setWebglFailed(true);
      return;
    }
    metalRef.current = metal;

    const onContextLost = (event: Event) => {
      event.preventDefault();
      metal?.dispose();
      metalRef.current = null;
      setWebglFailed(true);
    };
    metal.canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      metal?.canvas.removeEventListener("webglcontextlost", onContextLost);
      metal?.dispose();
      metalRef.current = null;
    };
  }, []);

  useEffect(() => {
    metalRef.current?.setUniforms({
      repetition,
      softness,
      shiftRed,
      shiftBlue,
      distortion,
      angle,
      scale,
    });
  }, [repetition, softness, shiftRed, shiftBlue, distortion, angle, scale]);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      hoveredRef.current = true;
      setSpeed(speed * 1.7);
      onMouseEnter?.(event);
    },
    [speed, setSpeed, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      hoveredRef.current = false;
      setSpeed(speed);
      onMouseLeave?.(event);
    },
    [speed, setSpeed, onMouseLeave],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setSpeed(speed * 4);
      window.setTimeout(() => {
        setSpeed(hoveredRef.current ? speed * 1.7 : speed);
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
    [speed, setSpeed, disableRipple, onClick],
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
          className="relative block h-full w-full rounded-full [&>canvas]:rounded-full"
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
