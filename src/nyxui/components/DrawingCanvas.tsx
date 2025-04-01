'use client'
import React, { useRef, useState, useEffect } from 'react';

export interface DrawingCanvasProps {
  initialWidth?: number;
  initialHeight?: number;
  initialBackgroundColor?: string;
  canvasWidth?: number;
  canvasHeight?: number;
  colorPalette?: string[];
  showWindowControls?: boolean;
  title?: string;
  menuItems?: string[];
  statusMessage?: string;
  draggable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSave?: (canvas: HTMLCanvasElement) => void;
}

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  variant?: "default" | "ghost";
}

// Custom button component to replace shadcn Button
const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  className = "", 
  onClick, 
  title = "",
  variant = "default"  // default, ghost, etc.
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyles = "";
  if (variant === "ghost") {
    variantStyles = "hover:bg-gray-200 hover:text-gray-900";
  } else if (variant === "default") {
    variantStyles = "bg-gray-200 text-gray-900 hover:bg-gray-300";
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

const DEFAULT_COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000',
  '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80', '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
];

export default function DrawingCanvas({
  initialWidth = 800,
  initialHeight = 500,
  initialBackgroundColor = '#FFFFFF',
  canvasWidth = 2000,
  canvasHeight = 2000,
  colorPalette = DEFAULT_COLORS,
  showWindowControls = true,
  title = "untitled - Paint",
  menuItems = ["File", "Edit", "View", "Image", "Options", "Help"],
  statusMessage = "For Help, click Help Topics on the Help Menu.",
  draggable = true,
  className = "",
  style = {},
  onSave
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState('brush');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [statusText, setStatusText] = useState(statusMessage);
  const [saveCount, setSaveCount] = useState(0);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [menuOpen, setMenuOpen] = useState(false);

  // Responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Get the parent element's width or use window width if no parent
        const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
        const parentHeight = window.innerHeight;
        
        // On mobile (screens less than 768px) make it nearly full screen with some padding
        if (parentWidth < 768) {
          setWidth(parentWidth > 20 ? parentWidth - 20 : parentWidth);
          setHeight(Math.min(parentHeight - 100, initialHeight));
        } else {
          // On larger screens, use the initial values
          setWidth(initialWidth);
          setHeight(initialHeight);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialWidth, initialHeight]);

  // Initialize canvas with background color
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      context.fillStyle = initialBackgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [initialBackgroundColor]);

  // Document-level mouse/touch event handlers for dragging
  useEffect(() => {
    if (draggable) {
      const handleMouseMove = (e: MouseEvent) => {
        if (dragging) {
          const left = e.clientX - position.x;
          const top = e.clientY - position.y;
          if (containerRef.current) {
            containerRef.current.style.left = `${left}px`;
            containerRef.current.style.top = `${top}px`;
          }
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (dragging && e.touches.length === 1) {
          const touch = e.touches[0];
          const left = touch.clientX - position.x;
          const top = touch.clientY - position.y;
          if (containerRef.current) {
            containerRef.current.style.left = `${left}px`;
            containerRef.current.style.top = `${top}px`;
          }
        }
      };

      const handleEnd = () => {
        setDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [dragging, position.x, position.y, draggable]);

  // Adjust coordinates using scaling factors
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      let clientX, clientY;
      
      if ('touches' in e) {
        // Handle touch event
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          clientX = touch.clientX;
          clientY = touch.clientY;
        } else {
          return; // Multi-touch not handled for drawing
        }
      } else {
        // Handle mouse event
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      let clientX, clientY;
      
      if ('touches' in e) {
        // Prevent scrolling while drawing
        e.preventDefault();
        
        // Handle touch event
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          clientX = touch.clientX;
          clientY = touch.clientY;
        } else {
          return; // Multi-touch not handled for drawing
        }
      } else {
        // Handle mouse event
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      
      context.lineTo(x, y);
      context.strokeStyle = tool === 'eraser' ? initialBackgroundColor : color;
      context.lineWidth = tool === 'eraser' ? 20 : 2;
      context.lineCap = 'round';
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const startDragging = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!draggable) return;
    setDragging(true);
    
    let clientX, clientY;
    
    if ('touches' in e) {
      // Handle touch event
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        return; // Multi-touch not handled for dragging
      }
    } else {
      // Handle mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    setPosition({
      x: clientX - (containerRef.current?.offsetLeft || 0),
      y: clientY - (containerRef.current?.offsetTop || 0)
    });
  };

  const handleSave = () => {
    if (canvasRef.current) {
      try {
        if (onSave) {
          onSave(canvasRef.current);
        } else {
          // This block is here in case no onSave is provided.
          const fileName = `${title.replace(' - Paint', '')}_${saveCount}.png`;
          setSaveCount(prev => prev + 1);
          const dataUrl = canvasRef.current.toDataURL('image/png');
          if (downloadLinkRef.current) {
            downloadLinkRef.current.href = dataUrl;
            downloadLinkRef.current.download = fileName;
            downloadLinkRef.current.click();
          }
          setStatusText(`Image saved as ${fileName}`);
          setTimeout(() => setStatusText(statusMessage), 3000);
        }
      } catch (error) {
        console.error("Error saving image:", error);
        setStatusText("Error saving image. Try again.");
        setTimeout(() => setStatusText(statusMessage), 3000);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      context.fillStyle = initialBackgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      setStatusText("Canvas cleared.");
      setTimeout(() => setStatusText(statusMessage), 3000);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Get visible canvas size based on container
  const canvasVisibleWidth = width - (window.innerWidth < 640 ? 52 : 76);
  const isMobile = width < 640;

  return (
    <div 
      ref={containerRef}
      className={`absolute px-4 md:px-0 bg-gray-200 border-2 border-white shadow-md ${className}`} 
      style={{ 
        width: `${width}px`, 
        left: '50%', 
        top: '50%', 
        transform: 'translate(-50%, -50%)',
        maxWidth: '100vw',
        ...style 
      }}
    >
      {/* Hidden download link */}
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
      
      <div 
        className="bg-blue-900 text-white px-2 py-1 flex justify-between items-center"
        style={{ cursor: draggable ? 'move' : 'default' }}
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
      
      {menuItems.length > 0 && (
        <div className="relative bg-gray-300 px-2 py-1 text-sm">
          {isMobile ? (
            <>
              <CustomButton 
                onClick={toggleMenu}
                className="text-sm py-0.5 px-2"
              >
                Menu ▾
              </CustomButton>
              
              {menuOpen && (
                <div className="absolute top-full left-0 z-10 bg-gray-300 shadow-md border border-gray-400 py-1">
                  {menuItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Desktop menu
            menuItems.map((item, index) => (
              <span 
                key={index} 
                className="mr-4 px-2 py-0.5 hover:bg-gray-400 cursor-pointer rounded"
              >
                {item}
              </span>
            ))
          )}
        </div>
      )}
      
      <div className="flex">
        <div className={`${isMobile ? 'w-10' : 'w-12'} bg-gray-300 p-1 border-r border-gray-400 flex flex-col items-center`}>
          <CustomButton
            variant="ghost"
            className={`w-8 h-8 p-0 min-w-0 mb-1 ${tool === 'brush' ? 'bg-blue-200 border-2 border-blue-600 shadow-lg' : 'hover:bg-gray-200'}`}
            onClick={() => setTool('brush')}
            title="Brush Tool"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M18 12l-8-8-6 6c-2 2-2 5 0 7s5 2 7 0l7-7" />
              <path d="M17 7l3 3" />
            </svg>
          </CustomButton>
          <CustomButton
            variant="ghost"
            className={`w-8 h-8 p-0 min-w-0 mb-1 ${tool === 'eraser' ? 'bg-blue-200 border-2 border-blue-600 shadow-lg' : 'hover:bg-gray-200'}`}
            onClick={() => setTool('eraser')}
            title="Eraser Tool"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M20 20H7L3 16C2 15 2 13 3 12L13 2L22 11L20 20Z" />
              <path d="M17 17L7 7" />
            </svg>
          </CustomButton>
          <CustomButton
            variant="ghost"
            className="w-8 h-8 p-0 min-w-0 mb-1 hover:bg-gray-200"
            onClick={clearCanvas}
            title="Clear Canvas"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </CustomButton>
          <CustomButton
            variant="ghost"
            className="w-8 h-8 p-0 min-w-0 mb-1 bg-green-100 hover:bg-green-200"
            onClick={handleSave}
            title="Save Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-700">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          </CustomButton>
        </div>
        <div 
          className="flex-grow overflow-auto border border-gray-400" 
          style={{ 
            width: `${canvasVisibleWidth}px`, 
            height: `${height - (isMobile ? 130 : 108)}px` 
          }}
        >
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onTouchCancel={stopDrawing}
            style={{ cursor: tool === 'eraser' ? 'cell' : 'crosshair' }}
          />
        </div>
      </div>
      
      <div className="flex bg-gray-300 p-2 border-t border-gray-400 overflow-x-auto">
        <div className="flex flex-wrap gap-1">
          {colorPalette.map((c) => (
            <CustomButton
              key={c}
              variant="ghost"
              className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} p-0 min-w-0 rounded-md transition-all duration-200 ${color === c ? 'ring-2 ring-offset-2 ring-blue-600 scale-110 shadow-md' : ''}`}
              onClick={() => setColor(c)}
              title={c}
            >
              <div style={{ backgroundColor: c }} className="w-full h-full rounded-md" />
            </CustomButton>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-300 px-2 py-1.5 text-sm border-t border-gray-400 flex flex-wrap items-center">
        <div className={`${isMobile ? 'w-full' : 'flex-grow'} truncate`}>{statusText}</div>
        <div className="flex items-center mt-1">
          <span className="mr-2 text-xs sm:text-sm">Current:</span>
          <div className="w-5 h-5 rounded-md border border-gray-600" style={{ backgroundColor: color }} />
        </div>
      </div>
    </div>
  );
}