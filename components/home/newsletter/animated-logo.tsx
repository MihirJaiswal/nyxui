"use client";
import type * as React from "react";
import { useEffect, useId, useRef, useState } from "react";

type AnimatedLogoProps = React.SVGProps<SVGSVGElement> & {
  fillStartRatio?: number;
  strokeClassName?: string;
  strokeFadeDurationMs?: number;
  strokeColor?: string;
  strokeOnly?: boolean;
  strokeWidth?: number;
  durationMs?: number;
  threshold?: number;
  triggerOnce?: boolean;
  revealAfterAnimation?: boolean;
  fadeMs?: number;
  rootMargin?: string;
  weight?: number;
};

const logoPaths = [
  "M776.252686,530.177124 C776.649048,555.142517 776.430054,579.655212 777.577209,604.103760 C778.452209,622.750793 778.218689,641.395264 778.788513,660.035034 C779.475342,682.504822 778.373230,705.064026 770.026672,726.318298 C756.944519,759.631470 733.831116,781.608582 697.204895,786.068115 C676.373230,788.604553 656.469849,783.909058 637.872131,774.144287 C613.835510,761.523743 593.967773,743.524597 574.660706,724.831238 C551.923706,702.816833 529.140320,680.849365 506.533325,658.702026 C483.447388,636.085571 460.619293,613.205933 437.542603,590.579956 C426.126892,579.387329 414.230743,568.682495 402.885468,557.420959 C395.467072,550.057312 390.046356,541.442871 388.193634,530.753662 C386.725525,522.283447 388.041687,514.504089 392.427979,507.339417 C403.839722,488.699249 426.944427,481.889099 447.563873,490.638580 C458.894073,495.446381 467.698425,503.631042 476.304810,511.934540 C495.246124,530.209290 513.891907,548.791809 532.566162,567.341553 C567.307068,601.851013 602.011719,636.397156 636.663940,670.995544 C645.425781,679.743835 654.812500,687.650024 665.348999,694.185669 C670.824890,697.582336 676.809448,699.502441 683.094543,700.456970 C688.783875,701.320984 695.374268,697.407837 698.561951,691.365845 C703.270813,682.440796 704.275391,672.581299 704.534485,662.806946 C705.250122,635.813477 703.712402,608.847717 702.835144,581.874329 C702.467346,570.565735 703.069763,559.213623 702.415955,547.928589 C700.826965,520.503235 701.360413,493.023468 699.799500,465.594482 C698.788574,447.831940 698.198120,430.027679 698.565674,412.208649 C698.836670,399.069214 698.174500,385.943542 696.044800,372.954926 C693.922668,360.012054 683.409851,355.870575 672.885010,363.789551 C660.429443,373.161224 650.481262,385.139801 639.623657,396.169006 C632.483826,403.421814 625.436279,410.712677 615.654236,414.584686 C598.046814,421.554199 579.195312,414.099152 572.164612,396.621704 C568.438110,387.358032 568.833984,377.774780 573.593079,368.712372 C581.342529,353.955780 592.132751,341.450989 603.511414,329.505219 C618.507874,313.761475 634.751404,299.491119 654.703003,290.120056 C676.667480,279.803558 699.329285,276.693085 722.535583,285.023285 C742.537964,292.203430 754.903992,307.376526 762.214783,326.733368 C767.279175,340.142456 769.035339,354.326141 770.506531,368.561188 C771.964233,382.666290 771.883545,396.793701 772.449158,410.917847 C773.941650,448.186157 775.128662,485.456451 775.455933,522.753906 C775.476196,525.070312 775.957825,527.382690 776.252686,530.177124 z",
  "M288.138123,307.148560 C311.812347,284.237061 339.658905,275.522522 371.696747,281.257660 C398.278351,286.016052 420.326447,299.920776 440.091003,317.551544 C470.315491,344.513031 498.210022,373.897919 527.098572,402.249268 C557.531860,432.116791 587.998047,461.950989 618.478394,491.770538 C627.601624,500.695984 636.161743,510.040222 639.552002,522.772278 C644.385437,540.924011 634.589233,560.690308 617.307983,568.230530 C600.614197,575.514404 585.799316,571.223389 572.076599,560.772461 C559.299988,551.042053 548.593811,539.073792 537.124390,527.939880 C513.344849,504.856201 489.640900,481.693878 466.016235,458.451721 C444.992126,437.768036 424.240997,416.805695 403.121918,396.220215 C392.988129,386.342499 383.287720,375.984283 372.282715,367.022156 C367.562439,363.178131 362.363220,359.922882 356.199066,359.612274 C345.984131,359.097534 339.337128,365.744934 338.417633,376.485413 C335.829834,406.712524 336.847748,437.016205 336.284332,467.289093 C335.434723,512.939087 335.221313,558.586853 335.459076,604.238647 C335.564911,624.554626 335.944672,644.871399 336.455444,665.181458 C336.588684,670.480103 337.785797,675.797119 339.785522,680.714111 C343.195709,689.099121 352.266449,691.400208 361.283539,686.570679 C369.411774,682.217285 376.514618,676.424133 383.696960,670.734192 C389.958160,665.773987 395.817108,660.283569 402.637115,656.055969 C415.315857,648.196716 428.567474,643.526794 443.809998,647.691895 C461.329498,652.479065 471.622589,669.939941 467.435669,687.594604 C463.913574,702.445862 455.171326,714.150940 445.353851,725.071411 C427.035797,745.447510 405.429688,761.401062 379.345886,770.497803 C340.014252,784.214661 298.768921,773.709900 274.334137,737.747742 C265.183350,724.280029 260.334595,709.119202 258.662354,692.982117 C255.081711,658.429077 257.106903,623.762451 257.087311,589.156616 C257.065735,551.019653 258.178650,512.877869 259.141052,474.746796 C259.468994,461.754364 258.963959,448.729645 259.828613,435.784668 C261.149750,416.005859 259.907867,396.155670 261.716248,376.429626 C263.832764,353.342804 268.218384,330.896484 283.622528,312.289825 C285.001495,310.624146 286.467590,309.030579 288.138123,307.148560 z",
] as const;

export default function AnimatedLogo({
  fillStartRatio,
  strokeClassName,
  strokeFadeDurationMs,
  strokeColor = "currentColor",
  strokeOnly = false,
  strokeWidth = 20,
  durationMs = 1600,
  threshold = 0.3,
  triggerOnce = true,
  revealAfterAnimation = false,
  fadeMs = 250,
  rootMargin = "0px 0px -10% 0px",
  weight = 0,
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

  const reactId = useId();
  const instanceId = `al-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

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
  const fillStartMs =
    fillStartRatio === undefined
      ? drawMs - fillOverlapMs
      : Math.floor(durationMs * Math.min(1, Math.max(0, fillStartRatio)));
  const strokeFadeStartMs = Math.max(
    drawMs,
    Math.floor(fillStartMs + fillMs * 0.5),
  );
  const strokeFadeMs =
    strokeFadeDurationMs ?? Math.max(200, Math.floor(fillMs * 0.5));
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
      viewBox="250 265 540 535"
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
        @keyframes ${instanceId}-strokefade {
          from { stroke-opacity: 1; }
          to { stroke-opacity: 0; }
        }
      `}</style>
      {weight !== 0 && (
        <defs>
          <filter id={`${instanceId}-weight`}>
            <feMorphology
              operator={weight > 0 ? "dilate" : "erode"}
              radius={Math.abs(weight)}
            />
          </filter>
        </defs>
      )}
      {/* Layer 1: stroke only. Draws in via stroke-dashoffset, then fades
          away on its own. Nothing else happens on this layer. */}
      <g
        className={strokeClassName}
        fill="none"
        stroke={strokeClassName ? undefined : strokeColor}
      >
        {logoPaths.map((path, index) => {
          const beginMs = index * 80;
          const strokeStyle: React.CSSProperties | undefined = shouldAnimate
            ? {
                animation: strokeOnly
                  ? `${instanceId}-draw ${drawMs}ms ${drawEase} ${beginMs}ms forwards`
                  : [
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

      {!strokeOnly && (
        <g
          fill="currentColor"
          stroke="none"
          filter={weight !== 0 ? `url(#${instanceId}-weight)` : undefined}
        >
          {logoPaths.map((path, index) => {
            const beginMs = index * 80;
            const fillStyle: React.CSSProperties = {
              opacity: shouldAnimate ? 1 : 0,
              transition: `opacity ${fillMs}ms ${fillEase} ${beginMs + fillStartMs}ms`,
            };

            return <path key={`fill-${path}`} d={path} style={fillStyle} />;
          })}
        </g>
      )}
    </svg>
  );
}
