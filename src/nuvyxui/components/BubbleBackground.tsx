"use client";

import React, { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface BubblesProps {
  bgColorA?: string;
  bgColorB?: string;
  bubbleColors?: {
    colorA?: string;
    colorB?: string;
    colorC?: string;
    colorD?: string;
    colorE?: string;
    interactive?: string;
  };
  blendMode?: CSSProperties["mixBlendMode"];
  bubbleSize?: string;
}

const defaultBubbleColors = {
  colorA: "18, 113, 255",
  colorB: "221, 74, 255",
  colorC: "100, 220, 255",
  colorD: "200, 50, 50",
  colorE: "180, 180, 50",
  interactive: "148, 100, 255"
}

const BubbleBackground: React.FC<BubblesProps> = ({
  bgColorA = "rgb(108, 0, 162)",
  bgColorB = "rgb(0, 17, 82)",
  bubbleColors = defaultBubbleColors,
  blendMode = "hard-light",
  bubbleSize = "80%",
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    const easeFactor = 10;
    let animationFrameId: number;

    function move() {
      if (!interactiveRef.current) return;

      curX += (tgX - curX) / easeFactor;
      curY += (tgY - curY) / easeFactor;

      interactiveRef.current.style.transform = `translate(${curX}px, ${curY}px)`;
      animationFrameId = requestAnimationFrame(move);
    }

    const handlePointerMove = (e: PointerEvent) => {
      tgX = e.clientX;
      tgY = e.clientY;
    };

    window.addEventListener("pointermove", handlePointerMove);
    animationFrameId = requestAnimationFrame(move);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        className="w-screen h-screen relative overflow-hidden"
        style={{
          background: `linear-gradient(40deg, ${bgColorA}, ${bgColorB})`,
        }}
      >
        <svg
          className="absolute w-0 h-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </svg>

        <div
          className="w-full h-full"
          style={{
            filter: "url(#goo) blur(40px)",
          }}
        >
          <div
            className="absolute opacity-100"
            style={{
              width: bubbleSize,
              height: bubbleSize,
              top: `calc(50% - ${bubbleSize} / 2)`,
              left: `calc(50% - ${bubbleSize} / 2)`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorA}, 0.8) 0, rgba(${bubbleColors.colorA}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode,
              transformOrigin: "center center",
              animation: "bounceV 30s ease infinite",
            }}
          />

          <div
            className="absolute opacity-100"
            style={{
              width: bubbleSize,
              height: bubbleSize,
              top: `calc(50% - ${bubbleSize} / 2)`,
              left: `calc(50% - ${bubbleSize} / 2)`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorB}, 0.8) 0, rgba(${bubbleColors.colorB}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode,
              transformOrigin: "calc(50% - 400px)",
              animation: "moveInCircle 20s reverse infinite",
            }}
          />

          <div
            className="absolute opacity-100"
            style={{
              width: bubbleSize,
              height: bubbleSize,
              top: `calc(50% - ${bubbleSize} / 2 + 200px)`,
              left: `calc(50% - ${bubbleSize} / 2 - 500px)`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorC}, 0.8) 0, rgba(${bubbleColors.colorC}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode,
              transformOrigin: "calc(50% + 400px)",
              animation: "moveInCircle 40s linear infinite",
            }}
          />
          
          <div
            className="absolute opacity-70"
            style={{
              width: bubbleSize,
              height: bubbleSize,
              top: `calc(50% - ${bubbleSize} / 2)`,
              left: `calc(50% - ${bubbleSize} / 2)`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorD}, 0.8) 0, rgba(${bubbleColors.colorD}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode,
              transformOrigin: "calc(50% - 200px)",
              animation: "bounceH 40s ease infinite",
            }}
          />

          <div
            className="absolute opacity-100"
            style={{
              width: `calc(${bubbleSize} * 2)`,
              height: `calc(${bubbleSize} * 2)`,
              top: `calc(50% - ${bubbleSize})`,
              left: `calc(50% - ${bubbleSize})`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorE}, 0.8) 0, rgba(${bubbleColors.colorE}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode,
              transformOrigin: "calc(50% - 800px) calc(50% + 200px)",
              animation: "moveInCircle 20s ease infinite",
            }}
          />

          <div
            ref={interactiveRef}
            className="absolute w-full h-full opacity-70"
            style={{
              top: "-50%",
              left: "-50%",
              background: `radial-gradient(circle at center, rgba(${bubbleColors.interactive}, 0.8) 0, rgba(${bubbleColors.interactive}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BubbleBackground;