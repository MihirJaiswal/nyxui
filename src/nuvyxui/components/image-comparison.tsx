"use client";

import { cn } from "@/lib/utils";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  AnimationOptions,
} from "framer-motion";

const SliderContext = createContext<
  | {
      position: number;
      setPosition: (pos: number) => void;
      motionPosition: MotionValue<number>;
      orientation: "horizontal" | "vertical";
      isDragging: boolean;
      contentDimensions: { width: number; height: number } | null;
    }
  | undefined
>(undefined);

export type ContrastSliderProps = {
  children: React.ReactNode;
  className?: string;
  hoverControl?: boolean;
  orientation?: "horizontal" | "vertical";
  defaultPosition?: number;
  animationConfig?: Partial<AnimationOptions>;
  dividerColor?: string;
  constrainToContent?: boolean;
};

const DEFAULT_ANIMATION_CONFIG = {
  damping: 15,
  stiffness: 400,
  mass: 0.4,
};

function ImageSlider({
  children,
  className,
  hoverControl = false,
  orientation = "horizontal",
  defaultPosition = 50,
  animationConfig,
  dividerColor,
  constrainToContent = false,
}: ContrastSliderProps) {
  const [isActive, setIsActive] = useState(false);
  const baseMotion = useMotionValue(defaultPosition);
  const springMotion = useSpring(
    baseMotion,
    animationConfig ?? DEFAULT_ANIMATION_CONFIG,
  );
  const [position, setPosition] = useState(defaultPosition);
  const [contentDimensions, setContentDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const motionToUse = hoverControl ? baseMotion : springMotion;

  useEffect(() => {
    baseMotion.set(defaultPosition);
    setPosition(defaultPosition);
  }, [defaultPosition, baseMotion]);

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        const container = containerRef.current;
        if (!container) return;

        const firstImg = container.querySelector("img");
        if (!firstImg) return;

        if (firstImg.complete) {
          calculateDimensions(firstImg);
        } else {
          firstImg.onload = () => calculateDimensions(firstImg);
        }
      };

      const calculateDimensions = (img: HTMLImageElement) => {
        const container = containerRef.current;
        if (!container) return;

        const { naturalWidth, naturalHeight } = img;
        const containerParent = container.parentElement;
        const maxWidth = containerParent?.clientWidth || window.innerWidth;
        const maxHeight = containerParent?.clientHeight || window.innerHeight;
        let width, height;
        const aspectRatio = naturalWidth / naturalHeight;

        if (constrainToContent) {
          if (naturalWidth > maxWidth) {
            width = maxWidth;
            height = maxWidth / aspectRatio;
          } else if (naturalHeight > maxHeight) {
            height = maxHeight;
            width = maxHeight * aspectRatio;
          } else {
            width = naturalWidth;
            height = naturalHeight;
          }
        } else {
          const containerRatio = maxWidth / maxHeight;

          if (aspectRatio > containerRatio) {
            width = maxWidth;
            height = maxWidth / aspectRatio;
          } else {
            height = maxHeight;
            width = maxHeight * aspectRatio;
          }
        }

        setContentDimensions({ width, height });
      };

      updateDimensions();

      window.addEventListener("resize", updateDimensions);

      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, [constrainToContent]);

  const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isActive && !hoverControl) return;

    const container = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();

    let clientX, clientY;
    if ("touches" in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }
    let interactiveLeft = container.left;
    let interactiveTop = container.top;
    let interactiveWidth = container.width;
    let interactiveHeight = container.height;

    if (contentDimensions) {
      const offsetX = (container.width - contentDimensions.width) / 2;
      const offsetY = (container.height - contentDimensions.height) / 2;

      interactiveLeft += offsetX;
      interactiveTop += offsetY;
      interactiveWidth = contentDimensions.width;
      interactiveHeight = contentDimensions.height;

      if (
        clientX < interactiveLeft ||
        clientX > interactiveLeft + interactiveWidth ||
        clientY < interactiveTop ||
        clientY > interactiveTop + interactiveHeight
      ) {
        return;
      }
    }

    let percentValue;
    if (orientation === "horizontal") {
      const xPos = clientX - interactiveLeft;
      percentValue = Math.min(
        Math.max((xPos / interactiveWidth) * 100, 0),
        100,
      );
    } else {
      const yPos = clientY - interactiveTop;
      percentValue = Math.min(
        Math.max((yPos / interactiveHeight) * 100, 0),
        100,
      );
    }

    baseMotion.set(percentValue);
    setPosition(percentValue);
  };

  return (
    <SliderContext.Provider
      value={{
        position,
        setPosition,
        motionPosition: motionToUse,
        orientation,
        isDragging: isActive || hoverControl,
        contentDimensions,
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          "relative select-none overflow-hidden rounded-lg",
          constrainToContent ? "inline-block" : "w-full h-full",
          hoverControl &&
            (orientation === "horizontal"
              ? "cursor-ew-resize"
              : "cursor-ns-resize"),
          className,
        )}
        onMouseMove={handleInteraction}
        onMouseDown={() => !hoverControl && setIsActive(true)}
        onMouseUp={() => !hoverControl && setIsActive(false)}
        onMouseLeave={() => !hoverControl && setIsActive(false)}
        onTouchMove={handleInteraction}
        onTouchStart={() => !hoverControl && setIsActive(true)}
        onTouchEnd={() => !hoverControl && setIsActive(false)}
        style={
          {
            "--divider-color": dividerColor || "#ffffff",
            width: contentDimensions
              ? `${contentDimensions.width}px`
              : undefined,
            height: contentDimensions
              ? `${contentDimensions.height}px`
              : undefined,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          } as React.CSSProperties
        }
      >
        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            width: contentDimensions ? `${contentDimensions.width}px` : "100%",
            height: contentDimensions
              ? `${contentDimensions.height}px`
              : "100%",
          }}
        >
          {children}
        </div>
      </div>
    </SliderContext.Provider>
  );
}

type ImageLayerProps = {
  className?: string;
  alt: string;
  src: string;
  layer: "first" | "second";
  loading?: "lazy" | "eager";
  priority?: boolean;
};

const ImageLayer = ({
  className,
  alt,
  src,
  layer,
  loading = "eager",
  priority = false,
}: ImageLayerProps) => {
  const { motionPosition, orientation } = useContext(SliderContext)!;

  const firstLayerClip = useTransform(motionPosition, (value) =>
    orientation === "horizontal"
      ? `inset(0 0 0 ${value}%)`
      : `inset(${value}% 0 0 0)`,
  );

  const secondLayerClip = useTransform(motionPosition, (value) =>
    orientation === "horizontal"
      ? `inset(0 ${100 - value}% 0 0)`
      : `inset(0 0 ${100 - value}% 0)`,
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={priority ? "high" : "auto"}
      className={cn(`absolute inset-0 h-full w-full object-contain`, className)}
      style={{
        clipPath: layer === "first" ? firstLayerClip : secondLayerClip,
        willChange: "clip-path",
      }}
    />
  );
};

type DividerProps = {
  className?: string;
  children?: React.ReactNode;
  width?: number;
  showHandle?: boolean;
  handleSize?: number;
  handleColor?: string;
  handleIcon?: ReactNode;
  hitAreaSize?: number;
};

const Divider = ({
  className,
  children,
  width = 2,
  showHandle = true,
  handleSize = 24,
  handleColor,
  handleIcon,
  hitAreaSize = 20,
}: DividerProps) => {
  const { motionPosition, orientation, isDragging } =
    useContext(SliderContext)!;
  const dividerPosition = useTransform(motionPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={cn(
        "absolute",
        orientation === "horizontal"
          ? `bottom-0 top-0 cursor-ew-resize`
          : `left-0 right-0 cursor-ns-resize`,
        className,
      )}
      style={{
        left: orientation === "horizontal" ? dividerPosition : 0,
        top: orientation === "vertical" ? dividerPosition : 0,
        width: orientation === "horizontal" ? `${width}px` : "100%",
        height: orientation === "vertical" ? `${width}px` : "100%",
        backgroundColor: "var(--divider-color)",
        willChange: "transform, left, top",
        pointerEvents: "all",
        zIndex: 5,
      }}
    >
      <div
        className="absolute bg-transparent"
        style={{
          left: orientation === "horizontal" ? `${-hitAreaSize / 2}px` : 0,
          right: orientation === "horizontal" ? `${-hitAreaSize / 2}px` : 0,
          top: orientation === "vertical" ? `${-hitAreaSize / 2}px` : 0,
          bottom: orientation === "vertical" ? `${-hitAreaSize / 2}px` : 0,
          width:
            orientation === "horizontal" ? `${width + hitAreaSize}px` : "100%",
          height:
            orientation === "vertical" ? `${width + hitAreaSize}px` : "100%",
          cursor: orientation === "horizontal" ? "ew-resize" : "ns-resize",
          zIndex: 10,
        }}
      />

      {showHandle && (
        <div
          className={cn(
            "absolute rounded-full bg-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
            isDragging && "scale-110",
          )}
          style={{
            width: `${handleSize}px`,
            height: `${handleSize}px`,
            left: orientation === "horizontal" ? "50%" : "50%",
            top: orientation === "vertical" ? "50%" : "50%",
            backgroundColor: handleColor || "var(--divider-color)",
            willChange: "transform",
            zIndex: 20,
          }}
        >
          {handleIcon || children}
        </div>
      )}
    </motion.div>
  );
};

export { ImageSlider, ImageLayer, Divider };
