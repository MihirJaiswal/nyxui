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
  useSpring
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
}
interface DockContextType {
  width: number;
  hovered: boolean;
  setIsZooming: (value: boolean) => void;
  zoomLevel: any; 
  mouseX: any;
  animatingIndexes: string[];
  setAnimatingIndexes: (indexes: string[]) => void;
  selectedIcon: string | null;
  setSelectedIcon: (id: string | null) => void;
}

const INITIAL_WIDTH = 50;
const DockContext = createContext<DockContextType>({
  width: 0,
  hovered: false,
  setIsZooming: () => {},
  zoomLevel: null,
  mouseX: null,
  animatingIndexes: [],
  setAnimatingIndexes: () => {},
  selectedIcon: null,
  setSelectedIcon: () => {}
});

const useDock = () => useContext(DockContext);

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

function useCallbackRef<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}

function useMousePosition(
  options: { onChange?: (position: { x: number; y: number }) => void } = {},
  deps: readonly any[] = []
) {
  const { onChange } = options;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      
      if (onChange) {
        onChange({ x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y, onChange, ...deps]);

  return useMemo(
    () => ({
      x,
      y
    }),
    [x, y]
  );
}

export function MacDock({ apps, className }: MacDockProps) {
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const dockRef = useRef<HTMLDivElement>(null);
  const isZooming = useRef(false);
  const [animatingIndexes, setAnimatingIndexes] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const setIsZooming = useCallback((value: boolean) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  const zoomLevel = useMotionValue(1);

  useWindowResize(() => {
    setWidth(dockRef.current?.clientWidth || 0);
  });

  const mouseX = useMotionValue(Infinity);

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

  return (
    <DockContext.Provider
      value={{
        hovered,
        setIsZooming,
        width,
        zoomLevel,
        mouseX,
        animatingIndexes,
        setAnimatingIndexes,
        selectedIcon,
        setSelectedIcon
      }}
    >
      <motion.div
        ref={dockRef}
        className={cn(
          "fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-end h-16 p-1 gap-1",
          "bg-black/25 backdrop-blur-md rounded-2xl border border-white/20",
          className
        )}
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
          if (!isZooming.current) {
            setHovered(true);
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
  const size = useSpring(INITIAL_WIDTH, {
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
      
      const mouseX = dock.mouseX.get();
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      
      const distance = Math.abs(mouseX - centerX);
      const maxDist = 150;
      if (distance < maxDist) {
        const scaleFactor = 1 - distance / maxDist;
        const newSize = INITIAL_WIDTH + (30 * scaleFactor * scaleFactor);
        size.set(newSize);
      } else {
        size.set(INITIAL_WIDTH);
      }
    };

    const unsubscribe = dock.mouseX.on("change", updateSize);
    return () => {
      unsubscribe();
    };
  }, [dock.mouseX, dock.hovered, size]);

  const isAnimating = useRef(false);
  const controls = useAnimation();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (dock.selectedIcon === id) {
      isAnimating.current = true;
      controls.start({ y: -8 });
      opacity.set(0.5);
    }
  }, [dock.selectedIcon, id, controls, opacity]);

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
      controls.start({ y: -8, transition: { duration: 0.3 } });
      dock.setAnimatingIndexes([id]);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };
  
  const resetAnimation = () => {
    isAnimating.current = false;
    opacity.set(0);
    controls.start({ y: 0, transition: { duration: 0.3 } });
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!dock.hovered && isAnimating.current && dock.selectedIcon !== id) {
      resetAnimation();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dock.hovered, dock.selectedIcon, id]);

  useEffect(() => {
    if (dock.selectedIcon !== id && dock.selectedIcon !== null) {
      if (isAnimating.current) {
        resetAnimation();
      }
    }
  }, [dock.selectedIcon, id]);

  return (
    <div className="flex flex-col items-center gap-1 mx-0.5 relative">
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            className="absolute -top-16 py-2 px-4 bg-black/70 text-white/90 rounded z-20 pointer-events-none"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            {name}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-black/70 border-l-transparent border-r-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col items-center">
        <motion.button
          ref={cardRef}
          className="relative rounded-md overflow-hidden transition-all duration-300 ease-out"
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
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
                className="w-1.5 h-1.5 rounded-full bg-white/80"
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
  const { animatingIndexes, selectedIcon } = useDock();
  const isAnimating = animatingIndexes.includes(id) || selectedIcon === id;

  return (
    <span className="relative flex justify-center items-center z-0 overflow-hidden w-full h-full rounded-md">
      {!isAnimating && (
        <motion.div
          className="absolute z-10 opacity-40 filter blur-md transform translate-y-2.5 scale-125 w-full h-full"
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-contain"
            sizes="80px"
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
          sizes="80px"
        />
      </motion.div>
    </span>
  );
}

function DockDivider() {
  return (
    <motion.div
      className="h-full flex items-center p-1.5 cursor-ns-resize mx-2"
      drag="y"
      dragConstraints={{ top: -100, bottom: 50 }}
    >
      <span className="w-0.5 h-full rounded bg-white/20"></span>
    </motion.div>
  );
}

export { useDock, DockCard, DockCardInner, DockDivider };