"use client";
import type * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedLogoProps = React.SVGProps<SVGSVGElement> & {
  strokeWidth?: number;
  durationMs?: number;
  threshold?: number;
  triggerOnce?: boolean;
  revealAfterAnimation?: boolean;
  fadeMs?: number;
  rootMargin?: string;
};

const logoPaths = [
  "M776.253 530.177c.396 24.966.177 49.478 1.324 73.927.875 18.647.642 37.291 1.212 55.931.686 22.47-.416 45.029-8.762 66.283-13.082 33.313-36.196 55.29-72.822 59.75-20.832 2.537-40.735-2.159-59.333-11.924-24.036-12.62-43.904-30.62-63.211-49.313-22.737-22.014-45.52-43.982-68.128-66.129-23.086-22.616-45.914-45.496-68.99-68.122-11.416-11.193-23.312-21.898-34.658-33.159-7.418-7.364-12.839-15.978-14.691-26.667-1.468-8.47-.152-16.25 4.234-23.415 11.412-18.64 34.516-25.45 55.136-16.7 11.33 4.807 20.134 12.992 28.74 21.296 18.942 18.274 37.588 36.857 56.262 55.407a57277 57277 0 0 1 104.098 103.654c8.762 8.748 18.149 16.654 28.685 23.19 5.476 3.396 11.46 5.316 17.746 6.271 5.689.864 12.28-3.05 15.467-9.091 4.709-8.925 5.713-18.785 5.972-28.56.716-26.993-.822-53.958-1.699-80.932-.368-11.308.235-22.66-.419-33.945-1.589-27.426-1.056-54.906-2.617-82.335-1.01-17.762-1.6-35.566-1.233-53.385.27-13.14-.392-26.265-2.521-39.254-2.122-12.943-12.635-17.084-23.16-9.165-12.456 9.371-22.404 21.35-33.261 32.379-7.14 7.253-14.188 14.544-23.97 18.416-17.607 6.97-36.459-.486-43.49-17.963-3.726-9.264-3.33-18.847 1.43-27.91 7.749-14.756 18.539-27.261 29.917-39.207 14.997-15.744 31.24-30.014 51.192-39.385 21.964-10.316 44.626-13.427 67.833-5.097 20.002 7.18 32.368 22.354 39.679 41.71 5.064 13.41 6.82 27.593 8.292 41.828 1.457 14.105 1.377 28.233 1.942 42.357 1.493 37.268 2.68 74.538 3.007 111.836.02 2.316.502 4.629.797 7.423M403.82 498.31c-15.057 13.401-17.588 27.247-8.278 45.043 3.46 6.61 8.456 12.066 13.882 16.936 21.464 19.266 41.454 40.05 62.184 60.065 35.714 34.483 70.477 69.946 106.452 104.17 14.853 14.13 29.83 28.131 47.215 39.188 21.933 13.95 45.08 23.429 71.969 20.038 20.41-2.573 37.537-11.331 51.2-26.442 20.797-23 27.118-51.267 28.16-81.198.828-23.817-.766-47.619-1.368-71.409-.523-20.635-.413-41.285-1.25-61.93-1.043-25.765-1.215-51.575-2.234-77.36-1.333-33.753-.957-67.568-4.184-101.255-1.176-12.28-2.849-24.48-7.37-35.907-8.434-21.318-22.394-37.11-45.6-43.247-20.984-5.55-40.76-1.76-59.43 7.831-32.726 16.815-56.922 42.961-76.968 73.221-5.984 9.035-8.053 19.032-3.635 29.46 7.737 18.258 28.355 24.312 45.518 13.808 10.738-6.57 18.329-16.38 26.992-25.095 7.864-7.911 15.2-16.399 24.351-22.911 11.273-8.022 22.284-4.592 27.063 8.162 1.906 5.087 1.527 10.49 1.788 15.66.555 10.95.217 21.936.742 32.927.904 18.95.956 37.94 1.478 56.91.925 33.605 1.987 67.205 2.888 100.81.598 22.304 1.115 44.611 1.475 66.92.22 13.618.307 27.234-2.59 40.691-3.333 15.485-12.146 21.37-27.55 18.032-9.048-1.96-16.512-6.955-23.627-12.515-17.397-13.593-31.968-30.157-47.617-45.583-41.055-40.468-82.025-81.022-123.094-121.476-8.654-8.524-17.119-17.285-27.284-24.128-16.644-11.205-35.888-11.182-51.278.584",
  "M288.138 307.149c23.674-22.912 51.52-31.626 83.559-25.891 26.581 4.758 48.63 18.663 68.394 36.294 30.224 26.961 58.119 56.346 87.008 84.697 30.433 29.868 60.899 59.702 91.38 89.522 9.123 8.925 17.683 18.27 21.073 31.001 4.833 18.152-4.963 37.918-22.244 45.459-16.694 7.283-31.509 2.992-45.231-7.459-12.777-9.73-23.483-21.698-34.953-32.832a14870 14870 0 0 1-71.108-69.488c-21.024-20.684-41.775-41.646-62.894-62.232-10.134-9.878-19.834-20.236-30.84-29.198-4.72-3.844-9.919-7.1-16.083-7.41-10.215-.514-16.862 6.133-17.781 16.873-2.588 30.228-1.57 60.531-2.134 90.804-.85 45.65-1.063 91.298-.825 136.95.106 20.316.486 40.632.996 60.942.134 5.3 1.33 10.616 3.33 15.533 3.41 8.385 12.481 10.686 21.499 5.857 8.128-4.354 15.23-10.147 22.413-15.837 6.261-4.96 12.12-10.45 18.94-14.678 12.679-7.86 25.93-12.53 41.173-8.364 17.52 4.787 27.813 22.248 23.626 39.903-3.522 14.85-12.265 26.556-22.082 37.476-18.318 20.377-39.924 36.33-66.008 45.427-39.332 13.717-80.577 3.212-105.012-32.75-9.15-13.468-14-28.629-15.672-44.766-3.58-34.553-1.555-69.22-1.575-103.825-.021-38.137 1.092-76.28 2.054-114.41.328-12.993-.177-26.017.688-38.962 1.32-19.78.079-39.63 1.887-59.355 2.117-23.087 6.502-45.534 21.907-64.14 1.378-1.666 2.845-3.26 4.515-5.141m46.475 116.293c.002-10.5-.011-21 .011-31.499.015-6.974.8-13.886 2.193-20.704 1.927-9.432 10.972-15.338 20.47-13.962 7.784 1.128 14.015 5.032 19.693 10.074 19.073 16.94 36.558 35.523 54.862 53.257 37.694 36.52 74.719 73.732 112.29 110.38 11.536 11.25 22.343 23.397 36.214 32.087 14.905 9.337 31.496 8.39 44.76-3.172 11.217-9.778 15.82-21.952 11.814-36.67-3.185-11.704-11.09-20.434-19.358-28.662-17.24-17.156-34.893-33.898-52.23-50.959-34.912-34.359-69.675-68.87-104.605-103.212-16.758-16.475-33.726-32.662-54.715-43.994-25.662-13.854-52.193-19.813-80.571-9.828-22.806 8.025-40.041 22.44-50.548 44.732-8.448 17.924-10.716 37.006-11.393 56.288-1.402 39.944-2.211 79.91-3.051 119.872-.504 23.986-.288 47.977-.84 71.972-.741 32.148-.464 64.328-.134 96.49.187 18.279 3.535 36.009 12.278 52.415 18.243 34.233 54.643 52.559 94.218 43.264 35.022-8.224 62.022-28.995 84.219-56.588 6.846-8.512 12.38-17.756 14.918-28.541 3.3-14.029-4.313-28.597-17.482-34.506-14.274-6.403-27.349-2.954-39.996 4.22-10.632 6.032-19.427 14.585-29.085 21.957-6.481 4.948-12.923 9.997-20.935 12.39-10.178 3.04-17.837-1.038-20.914-11.201-1.986-6.561-2.83-13.408-2.982-20.131-.59-26.303-.812-52.617-.843-78.928-.062-51.96.525-103.916 1.742-156.841",
] as const;

// Unique-enough id so multiple instances on one page don't fight over the
// same @keyframes names (harmless if they collide, but this keeps devtools
// tidy when several logos animate independently).
let instanceCounter = 0;

export default function AnimatedLogo({
  strokeWidth = 20,
  durationMs = 1600,
  threshold = 0.3,
  triggerOnce = true,
  revealAfterAnimation = false,
  fadeMs = 250,
  rootMargin = "0px 0px -10% 0px",
  ...props
}: AnimatedLogoProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Forces a restart (remount) only on genuine replays, never on the first
  // play — see comment near the effect below.
  const [playToken, setPlayToken] = useState(0);
  const wasAnimatingRef = useRef(false);
  const hasPlayedOnceRef = useRef(false);

  const instanceId = useMemo(() => `al-${++instanceCounter}`, []);

  useEffect(() => {
    const currentElement = svgRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!triggerOnce || !hasAnimated) {
            setShouldAnimate(true);
            if (triggerOnce) {
              setHasAnimated(true);
            }
          }
        } else if (!triggerOnce) {
          setShouldAnimate(false);
        }
      },
      { threshold, rootMargin },
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, triggerOnce, hasAnimated, rootMargin]);

  useEffect(() => {
    if (shouldAnimate && !wasAnimatingRef.current) {
      if (hasPlayedOnceRef.current) {
        setPlayToken((t) => t + 1);
      } else {
        hasPlayedOnceRef.current = true;
      }
    }
    wasAnimatingRef.current = shouldAnimate;
  }, [shouldAnimate]);

  // Timeline (per path, staggered by index * 80ms on top of these):
  //   0                 drawMs                              revealDelayMs
  //   |--- draw in ------|
  //                  |--- fill forms in ---|
  //                            |--- outline fades away ---|
  const drawMs = Math.max(800, Math.floor(durationMs * 0.65));
  const fillMs = Math.max(300, Math.floor(durationMs * 0.35));
  const fillOverlapMs = Math.floor(drawMs * 0.15);
  const fillStartMs = drawMs - fillOverlapMs;
  const strokeFadeStartMs = Math.floor(fillStartMs + fillMs * 0.5);
  const strokeFadeMs = Math.max(200, Math.floor(fillMs * 0.5));
  const revealDelayMs = Math.max(
    fillStartMs + fillMs,
    strokeFadeStartMs + strokeFadeMs,
  );

  const animationKey = playToken > 0 ? `play-${playToken}` : "static";

  useEffect(() => {
    if (shouldAnimate) {
      if (revealAfterAnimation) {
        setRevealed(false);
        const t = setTimeout(() => setRevealed(true), revealDelayMs);
        return () => clearTimeout(t);
      } else {
        setRevealed(true);
      }
    } else if (!triggerOnce) {
      setRevealed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shouldAnimate,
    playToken,
    revealDelayMs,
    triggerOnce,
    revealAfterAnimation,
  ]);

  const { style: styleProp, ...rest } = props as {
    style?: React.CSSProperties;
  };
  const mergedStyle: React.CSSProperties = {
    opacity: revealed ? 1 : 0,
    transition: `opacity ${fadeMs}ms ease`,
    ...(styleProp || {}),
  };

  const drawEase = "cubic-bezier(0.16, 1, 0.3, 1)";
  const fillEase = "cubic-bezier(0.42, 0, 0.58, 1)";

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="Layer_1"
      width="100%"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 1024 1024"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Animated logo"
      key={animationKey}
      style={mergedStyle}
      {...rest}
    >
      {/* Plain CSS @keyframes instead of SMIL <animate>: SMIL elements get
          silently stripped by a lot of SVG pipelines (SVGO, sanitizers,
          some bundlers), which made the fill-forming step never actually
          run anywhere. CSS keyframes on inline styles survive everywhere. */}
      <style>{`
        @keyframes ${instanceId}-draw {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes ${instanceId}-fill {
          from { fill-opacity: 0; }
          to { fill-opacity: 1; }
        }
        @keyframes ${instanceId}-strokefade {
          from { stroke-opacity: 1; }
          to { stroke-opacity: 0; }
        }
      `}</style>
      {/* Layer 1: stroke only. Draws in via stroke-dashoffset, then fades
          away on its own. Nothing else happens on this layer. */}
      <g fill="none" stroke="currentColor">
        {logoPaths.map((path, index) => {
          const beginMs = index * 80;
          const strokeStyle: React.CSSProperties | undefined = shouldAnimate
            ? {
                animation: [
                  `${instanceId}-draw ${drawMs}ms ${drawEase} ${beginMs}ms forwards`,
                  `${instanceId}-strokefade ${strokeFadeMs}ms ${fillEase} ${beginMs + strokeFadeStartMs}ms forwards`,
                ].join(", "),
              }
            : undefined;

          return (
            <path
              key={`stroke-${path}`}
              d={path}
              pathLength={1}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1"
              strokeDashoffset={shouldAnimate ? 1 : 0}
              strokeOpacity={shouldAnimate ? 1 : 0}
              style={strokeStyle}
            />
          );
        })}
      </g>

      {/* Layer 2: fill only, completely separate element from the stroke
          layer above. Its only job is to fade from transparent to solid —
          decoupling it like this means it can't get silently skipped by
          whatever was eating the fill-opacity animation before. */}
      <g fill="currentColor" stroke="none">
        {logoPaths.map((path, index) => {
          const beginMs = index * 80;
          const fillStyle: React.CSSProperties | undefined = shouldAnimate
            ? {
                animation: `${instanceId}-fill ${fillMs}ms ${fillEase} ${beginMs + fillStartMs}ms forwards`,
              }
            : undefined;

          return (
            <path
              key={`fill-${path}`}
              d={path}
              fillOpacity={0}
              style={fillStyle}
            />
          );
        })}
      </g>
    </svg>
  );
}
