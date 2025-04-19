"use client";
import React, { useState, useEffect } from "react";
import DrawingCanvas from "@/nuvyxui/components/MSpaint";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default function MSpaintDemo() {
  const { width, height } = useWindowSize();

  const customPalette = [
    "#000000",
    "#555555",
    "#800000",
    "#804000",
    "#808000",
    "#008000",
    "#008080",
    "#000080",
    "#800080",
    "#FFFFFF",
    "#AAAAAA",
    "#FF0000",
    "#FF8000",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#FF00FF",
  ];

  const handleSave = (canvas: HTMLCanvasElement) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const fileName = `MyDrawing_${Date.now()}.png`;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, "image/png");
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <DrawingCanvas
        initialWidth={width - 800}
        initialHeight={height - 200}
        title="My Drawing App"
        initialBackgroundColor="#f0f0f0"
        colorPalette={customPalette}
        onSave={handleSave}
        menuItems={["File", "Edit", "Tools", "Help"]}
        statusMessage="Click and drag to draw. Use eraser to remove strokes."
      />
    </div>
  );
}
