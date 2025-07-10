"use client";
import React, { useState } from "react";
import { MatrixCodeRain } from "../ui/matrix-code-rain";
// Main Demo Component
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
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      <div>
        <MatrixCodeRain color={color} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="bg-black text-white border-2 border-white text-xl px-4 py-2 z-10 hover:bg-gray-800 transition-colors duration-200"
          onClick={handleColorChange}
        >
          Change Color
        </button>
      </div>
    </div>
  );
}
