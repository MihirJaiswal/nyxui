"use client";
import { GlitchButton } from "@/registry/ui/glitch-button";
import { MatrixCodeRain } from "@/registry/ui/matrix-code-rain";
import { useState } from "react";

const colors = [
  "#00ff00",
  "#ff0000",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ff8800",
  "#8800ff",
  "#0088ff",
  "#ff0088",
];

export const Matrix = () => {
  const [color, setColor] = useState("#00ff00");
  const handleChange = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };
  return (
    <div className="xl:w-[350px] bg-white dark:bg-black xl:h-[303px] h-[260px] w-[320px] relative border-2"
    style={{
      borderColor: color,
    }}
    >
      <MatrixCodeRain
        color={color}
        charset="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%@!nyxui"
        fontSize={14}
        fps={30}
        opacity={0.05}
        fullScreen={false}
        height="100%"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <GlitchButton
          className="font-mono text-lg font-bold tracking-wider z-10 drop-shadow-lg bg-black px-4 py-2 border-2"
          onClick={handleChange}
          style={{
            color: color,
            borderColor: color,
          }}
        >
          Change Color
        </GlitchButton>
      </div>
    </div>
  );
};
