"use client";
import React, { useState } from "react";
import { MatrixCodeRain } from "@/registry/ui/matrix-code-rain";

export default function MatrixCodeRainDemo() {
  const [color, setColor] = useState("#00ff00");
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

  const handleColorChange = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  return (
    <div className="relative h-[450px] w-full overflow-hidden rounded-lg border border-border">
      <MatrixCodeRain color={color} width="100%" height="100%" />

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="z-10 border-2 border-white bg-black px-4 py-2 text-xl text-white transition-colors duration-200 hover:bg-gray-800"
          onClick={handleColorChange}
        >
          Change Color
        </button>
      </div>
    </div>
  );
}
