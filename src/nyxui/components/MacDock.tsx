"use client"
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  MotionValue
} from "framer-motion"
import { cn } from "@/lib/utils"

interface AppIcon {
  id: string;
  name: string;
  iconSrc: string;
  isActive?: boolean;
  isSeparator?: boolean;
  onClick?: () => void;
  children?: ReactNode; 
}

interface MacDockProps {
  apps: AppIcon[];
  className?: string;
  mobilePosition?: 'bottom' | 'left' | 'right';
}

interface DockContextType {
  width: number;
  height: number;
  hovered: boolean;
  setIsZooming: (value: boolean) => void;
  zoomLevel: MotionValue<number>; 
  mouseX: MotionValue<number>;
  isMobile: boolean;
  orientation: 'portrait' | 'landscape';
  animatingIndexes: string[];
  setAnimatingIndexes: (indexes: string[]) => void;
  selectedIcon: string | null;
  setSelectedIcon: (id: string | null) => void;
}

const MOBILE_BREAKPOINT = 768;
const BASE_ICON_SIZE = 50;
const MOBILE_ICON_SIZE = 40;
const DockContext = createContext<DockContextType | null>(null);
const useDock = () => {
  const context = useContext(DockContext);
  if (context === null) {
    throw new Error("useDock must be used within a MacDock provider");
  }
  return context;
}

function useWindowResize(callback: (width: number, height: number) => void) {
  const callbackRef = useCallbackRef(callback);

  useEffect(() => {
    const handleResize = () => {
      callbackRef(window.innerWidth, window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callbackRef]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useCallbackRef<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}

export function MacDock({ apps, className, mobilePosition = 'bottom' }: MacDockProps) {
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const dockRef = useRef<HTMLDivElement>(null);
  const isZooming = useRef(false);
  const [animatingIndexes, setAnimatingIndexes] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const setIsZooming = useCallback((value: boolean) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  const zoomLevel = useMotionValue(1);
  const mouseX = useMotionValue<number>(Infinity);

  useWindowResize((windowWidth, windowHeight) => {
    setWidth(dockRef.current?.clientWidth || 0);
    setHeight(dockRef.current?.clientHeight || 0);
    setIsMobile(windowWidth < MOBILE_BREAKPOINT);
    setOrientation(windowWidth > windowHeight ? 'landscape' : 'portrait');
  });

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        const selected = selectedIcon;
        if (selected) {
          setAnimatingIndexes([selected]);
        } else {
          setAnimatingIndexes([]);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [animatingIndexes, selectedIcon]);

  const contextValue: DockContextType = {
    hovered,
    setIsZooming,
    width,
    height,
    zoomLevel,
    mouseX,
    isMobile,
    orientation,
    animatingIndexes,
    setAnimatingIndexes,
    selectedIcon,
    setSelectedIcon
  };

  const positionClasses = isMobile 
    ? mobilePosition === 'bottom' 
      ? "fixed bottom-2 left-1/2 transform -translate-x-1/2 flex items-end"
      : mobilePosition === 'left'
        ? "fixed left-2 top-1/2 transform -translate-y-1/2 flex flex-col items-center"
        : "fixed right-2 top-1/2 transform -translate-y-1/2 flex flex-col items-center"
    : "fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-end";
  const gapPaddingClasses = isMobile 
    ? "p-0.5 gap-0.5" 
    : "p-1 gap-1";

  return (
    <DockContext.Provider value={contextValue}>
      <motion.div
        ref={dockRef}
        className={cn(
          positionClasses,
          gapPaddingClasses,
          "bg-black/25 backdrop-blur-md rounded-2xl border border-white/20",
          isMobile ? "h-12" : "h-16",
          className
        )}
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
          if (!isZooming.current) {
            setHovered(true);
          }
        }}
        onTouchStart={() => {
          if (isMobile) {
            setHovered(true);
          }
        }}
        onTouchEnd={() => {
          if (isMobile) {
            setHovered(false);
          }
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          setHovered(false);
        }}
        style={{
          scale: zoomLevel
        }}
      >
        {apps.map((app) => (
          <DockItem key={app.id} app={app} />
        ))}
      </motion.div>
    </DockContext.Provider>
  );
}

function DockItem({ app }: { app: AppIcon }) {
  if (app.isSeparator) {
    return <DockDivider />;
  }
  
  return (
    <DockCard id={app.id} name={app.name} onClick={app.onClick}>
      <DockCardInner src={app.iconSrc} id={app.id}>
        {app.children}
      </DockCardInner>
      {app.isActive && (
        <div className="absolute -bottom-1 w-1.5 h-1.5 bg-white/50 rounded-full" />
      )}
    </DockCard>
  );
}

interface DockCardProps {
  children: ReactNode;
  id: string;
  name: string;
  onClick?: () => void;
}

function DockCard({ children, id, name, onClick }: DockCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const dock = useDock();
  const [showTooltip, setShowTooltip] = useState(false);
  const initialSize = dock.isMobile ? MOBILE_ICON_SIZE : BASE_ICON_SIZE;
  
  const size = useSpring(initialSize, {
    stiffness: 320,
    damping: 20,
    mass: 0.1
  });

  const opacity = useSpring(0, {
    stiffness: 300,
    damping: 20
  });

  useEffect(() => {
    const updateSize = () => {
      if (!cardRef.current || !dock.hovered) return;
      if (dock.isMobile) {
        size.set(initialSize);
        return;
      }
      
      const mouseX = dock.mouseX.get();
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      
      const distance = Math.abs(mouseX - centerX);
      const maxDist = 150;
      if (distance < maxDist) {
        const scaleFactor = 1 - distance / maxDist;
        const newSize = initialSize + (30 * scaleFactor * scaleFactor);
        size.set(newSize);
      } else {
        size.set(initialSize);
      }
    };

    const unsubscribe = dock.mouseX.on("change", updateSize);
    return () => {
      unsubscribe();
    };
  }, [dock.mouseX, dock.hovered, size, dock.isMobile, initialSize]);

  const isAnimating = useRef(false);
  const controls = useAnimation();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (dock.selectedIcon === id) {
      isAnimating.current = true;
      controls.start({ y: dock.isMobile ? -4 : -8 });
      opacity.set(0.5);
    }
  }, [dock.selectedIcon, id, controls, opacity, dock.isMobile]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
    if (dock.selectedIcon === id) {
      dock.setSelectedIcon(null);
      resetAnimation();
    } else {
      dock.setSelectedIcon(id);
      isAnimating.current = true;
      opacity.set(0.5);
      controls.start({ 
        y: dock.isMobile ? -4 : -8, 
        transition: { duration: 0.3 } 
      });
      dock.setAnimatingIndexes([id]);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };
  
  const resetAnimation = useCallback(() => {
    isAnimating.current = false;
    opacity.set(0);
    controls.start({ y: 0, transition: { duration: 0.3 } });
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [opacity, controls]);

  useEffect(() => {
    if (!dock.hovered && isAnimating.current && dock.selectedIcon !== id) {
      resetAnimation();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dock.hovered, dock.selectedIcon, id, resetAnimation]);

  useEffect(() => {
    if (dock.selectedIcon !== id && dock.selectedIcon !== null) {
      if (isAnimating.current) {
        resetAnimation();
      }
    }
  }, [dock.selectedIcon, id, resetAnimation]);
  const tooltipPositionClass = dock.isMobile && dock.orientation === 'portrait' 
    ? "absolute -left-24 top-1/2 -translate-y-1/2" 
    : "absolute -top-16";

  const tooltipArrowClass = dock.isMobile && dock.orientation === 'portrait'
    ? "absolute top-1/2 -right-2 -translate-y-1/2 transform rotate-90 w-0 h-0 border-t-8 border-b-8 border-l-8 border-l-black/70 border-t-transparent border-b-transparent"
    : "absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-black/70 border-l-transparent border-r-transparent";

  return (
    <div className="flex flex-col items-center gap-1 mx-0.5 relative">
      <AnimatePresence>
        {showTooltip && !dock.isMobile && (
          <motion.div 
            className={`py-2 px-4 bg-black/70 text-white/90 rounded z-20 pointer-events-none ${tooltipPositionClass}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            {name}
            <div className={tooltipArrowClass} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col items-center">
        <motion.button
          ref={cardRef}
          className="relative rounded-md overflow-hidden transition-all duration-300 ease-out"
          onClick={handleClick}
          onMouseEnter={() => !dock.isMobile && setShowTooltip(true)}
          onMouseLeave={() => !dock.isMobile && setShowTooltip(false)}
          animate={controls}
          whileTap={{ scale: 0.95 }}
          style={{
            width: size,
            height: size
          }}
        >
          {children}
        </motion.button>
        
        <AnimatePresence mode="popLayout">
          {(dock.animatingIndexes.includes(id) || dock.selectedIcon === id) && (
            <motion.div
              key={`dot-${id}`}
              layoutId={`indicator-${id}`}
              style={{ opacity }}
            >
              <motion.div
                exit={{ transition: { duration: 0 } }}
                className={`rounded-full bg-white/80 ${dock.isMobile ? "w-1 h-1" : "w-1.5 h-1.5"}`}
                style={{ opacity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface DockCardInnerProps {
  src: string;
  id: string;
  children?: ReactNode;
}

function DockCardInner({ src, id, children }: DockCardInnerProps) {
  const dock = useDock();
  const { animatingIndexes, selectedIcon, isMobile } = dock;
  const isAnimating = animatingIndexes.includes(id) || selectedIcon === id;
  const shadowScaleClass = isMobile ? "scale-110" : "scale-125";
  const shadowTranslateClass = isMobile ? "translate-y-1.5" : "translate-y-2.5";

  return (
    <span className="relative flex justify-center items-center z-0 overflow-hidden w-full h-full rounded-md">
      {!isAnimating && (
        <motion.div
          className={`absolute z-10 opacity-40 filter blur-md transform ${shadowTranslateClass} ${shadowScaleClass} w-full h-full`}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-contain"
            sizes={isMobile ? "40px" : "80px"}
          />
        </motion.div>
      )}

      <AnimatePresence>
        {isAnimating && children ? (
          <motion.div
            className="relative z-20 h-full w-full rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              transition: { type: "spring", delay: 0.1 }
            }}
            exit={{
              scale: 0,
              opacity: 0,
              transition: { duration: 0.2 }
            }}
          >
            <div className="h-full w-full flex flex-col items-center justify-center">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layoutId={id}
        className="relative z-0 w-full h-full"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-contain"
          sizes={isMobile ? "40px" : "80px"}
        />
      </motion.div>
    </span>
  );
}

function DockDivider() {
  const dock = useDock();
  
  const dividerClass = dock.isMobile 
    ? "w-0.5 h-full rounded bg-white/20" 
    : "w-0.5 h-full rounded bg-white/20";
    
  const marginClass = dock.isMobile ? "mx-1" : "mx-2";

  return (
    <motion.div
      className={`h-full flex items-center p-1.5 cursor-ns-resize ${marginClass}`}
      drag="y"
      dragConstraints={{ top: -100, bottom: 50 }}
    >
      <span className={dividerClass}></span>
    </motion.div>
  );
}

export { useDock, DockCard, DockCardInner, DockDivider };