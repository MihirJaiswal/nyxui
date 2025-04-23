"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Pencil, Eraser, Square, Save, Menu } from "lucide-react";

export interface MSpaintProps {
  width?: number;
  height?: number;
  canvasWidth?: number;
  canvasHeight?: number;
  title?: string;
  menuItems?: string[];
  className?: string;
  style?: React.CSSProperties;
  colorPalette?: string[];
  brushSize?: number;
  eraserSize?: number;
  onSave?: (canvas: HTMLCanvasElement) => void;
}

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  variant?: "default" | "ghost";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className = "",
  onClick,
  title = "",
  variant = "default",
}) => {
  const variantStyles = variant === "ghost"
    ? "hover:bg-gray-200 hover:text-gray-900"
    : "bg-gray-200 text-gray-900 hover:bg-gray-300";
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${className}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

const DEFAULT_COLORS = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FFA500", "#800080", "#A52A2A", "#808080"
];

export default function MSpaint({
  width = 800,
  height = 500,
  canvasWidth = 2000,
  canvasHeight = 2000,
  title = "untitled - Paint",
  menuItems = ["File", "Edit", "View", "Image", "Options", "Help"],
  className = "",
  style = {},
  colorPalette = DEFAULT_COLORS,
  brushSize = 2,
  eraserSize = 20,
  onSave,
}: MSpaintProps) {
  const backgroundColor = "#FFFFFF";
  const defaultStatusMessage = "For Help, click Help Topics on the Help Menu.";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("brush");
  const [dimensions, setDimensions] = useState({ width, height });
  const [dragState, setDragState] = useState({ isDragging: false, offset: { x: 0, y: 0 } });
  const [statusText, setStatusText] = useState(defaultStatusMessage);
  const [saveCount, setSaveCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const isMobile = dimensions.width < 640;
  const draggable = !isMobile; 
  const showWindowControls = !isMobile; 
  const canvasVisibleWidth = dimensions.width - (isMobile ? 52 : 76);
  
  const cursorStyle = useCallback(() => {
    if (tool === "eraser") {
      return "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='white' stroke='black' stroke-width='1'><circle cx='12' cy='12' r='10'/></svg>\") 12 12, auto";
    } else {
      const isLightColor = (() => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.7;
      })();

      const encodedSVG = encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
          <circle cx='8' cy='8' r='6' fill='${color}' ${isLightColor ? 'stroke="black" stroke-width="1"' : ""} />
        </svg>
      `);
      return `url("data:image/svg+xml;utf8,${encodedSVG}") 8 8, crosshair`;
    }
  }, [tool, color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
        const parentHeight = window.innerHeight;
        setDimensions({
          width: parentWidth < 768 ? (parentWidth > 20 ? parentWidth - 20 : parentWidth) : width,
          height: parentWidth < 768 ? Math.min(parentHeight - 100, height) : height
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, height]);

  useEffect(() => {
    if (!draggable) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (dragState.isDragging) {
        const left = e.clientX - dragState.offset.x;
        const top = e.clientY - dragState.offset.y;
        if (containerRef.current) {
          containerRef.current.style.left = `${left}px`;
          containerRef.current.style.top = `${top}px`;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (dragState.isDragging && e.touches.length === 1) {
        const touch = e.touches[0];
        const left = touch.clientX - dragState.offset.x;
        const top = touch.clientY - dragState.offset.y;
        if (containerRef.current) {
          containerRef.current.style.left = `${left}px`;
          containerRef.current.style.top = `${top}px`;
        }
      }
    };
    const handleEnd = () => {
      setDragState(prev => ({ ...prev, isDragging: false }));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleEnd);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [draggable, dragState]);

  useEffect(() => {
    if (canvasContainerRef.current) {
      canvasContainerRef.current.style.overflow = "hidden";
    }
  }, []);

  const getCanvasScaleFactors = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return { scaleX: 1, scaleY: 1 };
    const rect = canvas.getBoundingClientRect();
    return {
      scaleX: canvas.width / rect.width,
      scaleY: canvas.height / rect.height,
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { scaleX, scaleY } = getCanvasScaleFactors();

    let clientX, clientY;
    if ("touches" in e) {
      if (e.touches.length !== 1) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    context.beginPath();
    context.moveTo(x, y);
    setLastPosition({ x, y });
    setIsDrawing(true);
  }, [getCanvasScaleFactors]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const { scaleX, scaleY } = getCanvasScaleFactors();
    let clientX, clientY;
    if ("touches" in e) {
      e.preventDefault();
      if (e.touches.length !== 1) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    context.beginPath();
    context.moveTo(lastPosition.x, lastPosition.y);
    context.lineTo(x, y);
    context.strokeStyle = tool === "eraser" ? backgroundColor : color;
    const currentToolSize = tool === "eraser" ? eraserSize : brushSize;
    const lineWidth = currentToolSize * Math.max(scaleX, scaleY);
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
    setLastPosition({ x, y });
  }, [isDrawing, lastPosition, tool, color, brushSize, eraserSize, getCanvasScaleFactors]);

  const startDragging = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!draggable) return;
    let clientX, clientY;
    if ("touches" in e) {
      if (e.touches.length !== 1) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    setDragState({
      isDragging: true,
      offset: {
        x: clientX - (containerRef.current?.offsetLeft || 0),
        y: clientY - (containerRef.current?.offsetTop || 0)
      }
    });
  }, [draggable]);

  const updateStatus = useCallback((text: string, resetAfter = 3000) => {
    setStatusText(text);
    setTimeout(() => setStatusText(defaultStatusMessage), resetAfter);
  }, []);

  const handleSave = useCallback(() => {
    if (!canvasRef.current) return;
    try {
      if (onSave) {
        onSave(canvasRef.current);
      } else {
        const fileName = `${title.replace(" - Paint", "")}_${saveCount}.png`;
        setSaveCount(prev => prev + 1);

        const dataUrl = canvasRef.current.toDataURL("image/png");
        if (downloadLinkRef.current) {
          downloadLinkRef.current.href = dataUrl;
          downloadLinkRef.current.download = fileName;
          downloadLinkRef.current.click();
        }

        updateStatus(`Image saved as ${fileName}`);
      }
    } catch (error) {
      console.error("Error saving image:", error);
      updateStatus("Error saving image. Try again.");
    }
  }, [title, saveCount, onSave, updateStatus]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context && canvas) {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      updateStatus("Canvas cleared.");
    }
  }, [updateStatus]);

  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor);
    updateStatus(`Color selected: ${newColor}`, 2000);
  }, [updateStatus]);

  const toggleColorPicker = useCallback(() => {
    setShowColorPicker(prev => {
      const newState = !prev;
      if (newState && colorPickerRef.current) {
        setTimeout(() => colorPickerRef.current?.click(), 100);
      }
      return newState;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute md:px-0 bg-gray-200 border-2 border-white shadow-md ${className}`}
      style={{
        width: `${dimensions.width}px`,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "100vw",
        ...style,
      }}
    >
      <a ref={downloadLinkRef} style={{ display: "none" }} />      
      <div
        className="bg-blue-900 text-white px-2 py-1 flex justify-between items-center"
        style={{ cursor: draggable ? "move" : "default" }}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      >
        <span className="truncate">{title}</span>
        {showWindowControls && (
          <div className="flex gap-1">
            <CustomButton variant="ghost" className="h-5 w-5 p-0 min-w-0 text-white hover:bg-blue-700">_</CustomButton>
            <CustomButton variant="ghost" className="h-5 w-5 p-0 min-w-0 text-white hover:bg-blue-700">□</CustomButton>
            <CustomButton variant="ghost" className="h-5 w-5 p-0 min-w-0 text-white hover:bg-blue-700">×</CustomButton>
          </div>
        )}
      </div>
      
      {menuItems && menuItems.length > 0 && (
        <div className="relative bg-gray-300 px-2 py-1 text-sm">
          {isMobile ? (
            <>
              <CustomButton onClick={() => setMenuOpen(!menuOpen)} className="text-sm py-0.5 px-2 flex items-center">
                <Menu size={14} className="mr-1" /> Menu
              </CustomButton>

              {menuOpen && (
                <div className="absolute top-full left-0 z-10 bg-gray-300 shadow-md border border-gray-400 py-1 text-black">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-400 cursor-pointer text-black"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            menuItems.map((item, index) => (
              <span
                key={index}
                className="mr-4 px-2 py-0.5 hover:bg-gray-400 cursor-pointer rounded text-black"
              >
                {item}
              </span>
            ))
          )}
        </div>
      )}
      
      <div className="flex">
        <div className={`${isMobile ? "w-10" : "w-12"} bg-gray-300 p-1 border-r border-gray-400 flex flex-col items-center`}>
          <CustomButton
            variant="ghost"
            className={`w-8 h-8 p-0 min-w-0 mb-1 ${tool === "brush" ? "bg-blue-200 border-2 border-blue-600 shadow-lg" : "hover:bg-gray-200"}`}
            onClick={() => setTool("brush")}
            title="Brush Tool"
          >
            <Pencil size={20} className="text-black" />
          </CustomButton>
          <CustomButton
            variant="ghost"
            className={`w-8 h-8 p-0 min-w-0 mb-1 ${tool === "eraser" ? "bg-blue-200 border-2 border-blue-600 shadow-lg" : "hover:bg-gray-200"}`}
            onClick={() => setTool("eraser")}
            title="Eraser Tool"
          >
            <Eraser size={20} className="text-black" />
          </CustomButton>
          <CustomButton
            variant="ghost"
            className="w-8 h-8 p-0 min-w-0 mb-1 hover:bg-gray-200"
            onClick={clearCanvas}
            title="Clear Canvas"
          >
            <Square size={20} className="text-black" />
          </CustomButton>
          <CustomButton
            variant="ghost"
            className="w-8 h-8 p-0 min-w-0 mb-1 bg-green-100 hover:bg-green-200"
            onClick={handleSave}
            title="Save Image"
          >
            <Save size={20} className="text-green-700" />
          </CustomButton>
        </div>
        <div
          ref={canvasContainerRef}
          className="flex-grow border border-gray-400"
          style={{
            width: `${canvasVisibleWidth}px`,
            height: `${dimensions.height - (isMobile ? 130 : 108)}px`,
            overflow: "hidden",
          }}
        >
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={() => setIsDrawing(false)}
            onMouseOut={() => setIsDrawing(false)}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchCancel={() => setIsDrawing(false)}
            style={{
            cursor: cursorStyle(),
            width: "100%", 
            height: "100%",
            }}
          />
        </div>
      </div>
      <div className="flex bg-gray-300 gap-3 p-2 border-t border-gray-400 overflow-x-auto">
        <div className="relative ml-2">
          <CustomButton
            variant="ghost"
            className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} p-0 min-w-0 relative overflow-hidden border-2 border-gray-400 transition-all duration-200
              ${showColorPicker ? "border-2 border-blue-500 scale-110 shadow-md" : ""}`}
            onClick={toggleColorPicker}
            title="Custom Color"
          >
            <div className="w-full h-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500" />
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
              <span className="text-xs font-bold">+</span>
            </div>
          </CustomButton>
          <input
            ref={colorPickerRef}
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="absolute opacity-0 pointer-events-none"
            style={{ top: 0, left: 0, width: "1px", height: "1px" }}
          />
          <div
            className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} border-2 border-gray-400 mt-1`}
            style={{ backgroundColor: color }}
            title={`Current Color: ${color}`}
          />
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-2 justify-center items-center">
          {colorPalette && colorPalette.map((c) => (
            <CustomButton
              key={c}
              variant="ghost"
              className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} p-0 min-w-0 transition-all duration-200
                ${color === c ? "border-4 border-blue-500 scale-110 shadow-md" : ""}`}
              onClick={() => handleColorChange(c)}
              title={c}
            >
              <div style={{ backgroundColor: c }} className="w-full h-full" />
            </CustomButton>
          ))}
        </div>
      </div>
      <div className="bg-gray-300 px-2 py-1.5 text-sm border-t border-gray-400 flex flex-wrap items-center">
        <div className={`${isMobile ? "w-full" : "flex-grow"} truncate text-black`}>
          {statusText}
        </div>
      </div>
    </div>
  );
}