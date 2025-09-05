"use client"
import type * as React from "react"
import { useEffect, useRef, useState } from "react"

type AnimatedLogoProps = React.SVGProps<SVGSVGElement> & {
  strokeWidth?: number
  durationMs?: number
  threshold?: number
  triggerOnce?: boolean 
  revealAfterAnimation?: boolean 
  fadeMs?: number 
  rootMargin?: string 
}

export default function AnimatedLogo({
  strokeWidth = 120,
  durationMs = 1600,
  threshold = 0.3,
  triggerOnce = true,
  revealAfterAnimation = false,
  fadeMs = 250,
  rootMargin = "0px 0px -10% 0px",
  ...props
}: AnimatedLogoProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!triggerOnce || !hasAnimated) {
            setShouldAnimate(true)
            if (triggerOnce) {
              setHasAnimated(true)
            }
          }
        } else if (!triggerOnce) {
          setShouldAnimate(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    if (svgRef.current) {
      observer.observe(svgRef.current)
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current)
      }
    }
  }, [threshold, triggerOnce, hasAnimated, rootMargin])

  // Split total duration into draw and fill phases
  const drawMs = Math.max(800, Math.floor(durationMs * 0.65))
  const fillMs = Math.max(300, Math.floor(durationMs * 0.35))
  const strokeFadeStartMs = Math.floor(drawMs + fillMs * 0.25)
  const strokeFadeMs = Math.max(200, Math.floor(fillMs * 0.4))

  const revealDelayMs = Math.max(drawMs + fillMs, strokeFadeStartMs + strokeFadeMs)

  // Convert ms to s strings for SMIL
  const toSec = (ms: number) => (ms / 1000).toFixed(3) + "s"

  // Create unique key to force re-render and restart animations
  const animationKey = shouldAnimate ? Date.now() : "static"

  useEffect(() => {
    if (shouldAnimate) {
      if (revealAfterAnimation) {
        setRevealed(false) // keep hidden until animation completes
        const t = setTimeout(() => setRevealed(true), revealDelayMs)
        return () => clearTimeout(t)
      } else {
        // show immediately so drawing is visible (snappier)
        setRevealed(true)
      }
    } else if (!triggerOnce) {
      setRevealed(false)
    }
  }, [shouldAnimate, revealDelayMs, triggerOnce, revealAfterAnimation])

  const { style: styleProp, ...rest } = props as { style?: React.CSSProperties }
  const mergedStyle: React.CSSProperties = {
    opacity: revealed ? 1 : 0,
    transition: `opacity ${fadeMs}ms ease`,
    ...(styleProp || {}),
  }

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      width="363.000000pt"
      height="347.000000pt"
      viewBox="0 0 363.000000 347.000000"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Animated logo"
      key={animationKey}
      style={mergedStyle}
      {...rest}
    >
      <g transform="translate(0.000000,347.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
        {/* Path 1 */}
        <path
          d="M203 3373 l-83 -4 0 -1629 c0 -897 -1 -1633 -2 -1637 -4 -10 470 -16 529 -8 l43 6 2 1285 3 1285 104 -143 c58 -79 256 -345 440 -592 l335 -449 35 43 c20 23 95 124 168 223 l132 181 -47 66 c-110 155 -507 700 -632 865 -74 99 -191 255 -260 348 l-124 167 -281 -2 c-154 -1 -317 -4 -362 -5z"
          pathLength={1}
          fillOpacity={0}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset={shouldAnimate ? 1 : 0}
          strokeOpacity={shouldAnimate ? 1 : 0}
        >
          {shouldAnimate && (
            <>
              <animate attributeName="stroke-dashoffset" from="1" to="0" dur={toSec(drawMs)} fill="freeze" />
              <animate
                attributeName="fill-opacity"
                begin={toSec(drawMs)}
                from="0"
                to="1"
                dur={toSec(fillMs)}
                fill="freeze"
              />
              <animate
                attributeName="stroke-opacity"
                begin={toSec(strokeFadeStartMs)}
                from="1"
                to="0"
                dur={toSec(strokeFadeMs)}
                fill="freeze"
              />
            </>
          )}
        </path>

        {/* Path 2 */}
        <path
          d="M2614 2623 c-79 -114 -701 -984 -891 -1248 -138 -192 -337 -466 -517 -710 -187 -256 -406 -561 -406 -568 0 -9 716 -9 758 -1 26 5 78 72 398 513 203 278 459 628 569 776 473 636 964 1313 965 1328 0 4 -182 7 -403 7 l-404 0 -69 -97z"
          pathLength={1}
          fillOpacity={0}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset={shouldAnimate ? 1 : 0}
          strokeOpacity={shouldAnimate ? 1 : 0}
        >
          {shouldAnimate && (
            <>
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                dur={toSec(drawMs)}
                begin="0.08s"
                fill="freeze"
              />
              <animate
                attributeName="fill-opacity"
                begin={toSec(drawMs)}
                from="0"
                to="1"
                dur={toSec(fillMs)}
                fill="freeze"
              />
              <animate
                attributeName="stroke-opacity"
                begin={toSec(strokeFadeStartMs)}
                from="1"
                to="0"
                dur={toSec(strokeFadeMs)}
                fill="freeze"
              />
            </>
          )}
        </path>

        {/* Path 3 */}
        <path
          d="M3289 2118 c-124 -167 -264 -358 -312 -424 l-88 -122 0 -363 c1 -332 -1 -362 -15 -344 -9 11 -68 93 -131 183 -64 89 -119 165 -123 167 -10 6 -350 -451 -349 -468 1 -20 483 -652 497 -651 6 1 176 2 377 3 l365 1 2 1158 c2 636 3 1158 2 1160 -1 1 -102 -134 -225 -300z"
          pathLength={1}
          fillOpacity={0}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset={shouldAnimate ? 1 : 0}
          strokeOpacity={shouldAnimate ? 1 : 0}
        >
          {shouldAnimate && (
            <>
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                dur={toSec(drawMs)}
                begin="0.16s"
                fill="freeze"
              />
              <animate
                attributeName="fill-opacity"
                begin={toSec(drawMs)}
                from="0"
                to="1"
                dur={toSec(fillMs)}
                fill="freeze"
              />
              <animate
                attributeName="stroke-opacity"
                begin={toSec(strokeFadeStartMs)}
                from="1"
                to="0"
                dur={toSec(strokeFadeMs)}
                fill="freeze"
              />
            </>
          )}
        </path>
      </g>
    </svg>
  )
}
