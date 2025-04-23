"use client";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

export interface MajesticCardProps
  extends Omit<HTMLMotionProps<"div">, "style"> {
  variant?: "float" | "magnetic" | "glow" | "breathe";
  intensity?: 1 | 2 | 3 | 4 | 5;
  glowColor?: string;
  hoverEffect?: boolean;
  scrollEffect?: boolean;
  reduceMotion?: boolean;
  speed?: "slow" | "normal" | "fast";
  children: React.ReactNode;
  className?: string;
}

export function MajesticCard({
  variant = "float",
  intensity = 3,
  glowColor = "rgba(147, 197, 253, 0.5)",
  hoverEffect = true,
  scrollEffect = false,
  reduceMotion = false,
  speed = "normal",
  className,
  children,
  ...props
}: MajesticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [floatPhase, setFloatPhase] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const floatY = useMotionValue(0);
  const floatX = useMotionValue(0);
  const rotate = useMotionValue(0);

  const springConfig = useMemo(() => ({
    stiffness: speed === "fast" ? 700 : speed === "slow" ? 200 : 400,
    damping: speed === "fast" ? 20 : speed === "slow" ? 40 : 30,
  }), [speed]);

  const floatSpringConfig = useMemo(() => ({
    stiffness: 50,
    damping: 30,
    mass: 1.5,
  }), []);

  const intensityFactors = useMemo(() => ({
    1: 0.2, 2: 0.4, 3: 0.6, 4: 0.8, 5: 1.0,
  }), []);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springFloatY = useSpring(floatY, floatSpringConfig);
  const springFloatX = useSpring(floatX, floatSpringConfig);
  const springRotate = useSpring(rotate, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (reduceMotion || variant !== "float") return;

    let animationFrame: number;
    let lastTime = 0;
    const floatSpeed = speed === "slow" ? 0.5 : speed === "fast" ? 2 : 1;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setFloatPhase(prev => (prev + delta * floatSpeed) % (Math.PI * 2));
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [variant, reduceMotion, speed]);

  useEffect(() => {
    if (variant === "float" && !reduceMotion) {
      const factor = intensityFactors[intensity];
      floatY.set(Math.sin(floatPhase) * 10 * factor);
      floatX.set(Math.sin(floatPhase * 0.5) * 5 * factor);
      rotate.set(Math.sin(floatPhase * 0.3) * 2 * factor);
    }
  }, [floatPhase, variant, intensity, reduceMotion, floatX, floatY, rotate, intensityFactors]);

  useEffect(() => {
    if (!cardRef.current || !hoverEffect || reduceMotion) return;

    const card = cardRef.current;
    const factor = intensityFactors[intensity];

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const normalizedX = (e.clientX - rect.left) / rect.width;
      const normalizedY = (e.clientY - rect.top) / rect.height;
      setMousePosition({
        x: normalizedX,
        y: normalizedY
      });

      if (variant === "breathe") {
      } else if (variant === "magnetic") {
        const distance = Math.sqrt(Math.pow(mouseX, 2) + Math.pow(mouseY, 2));
        const maxDistance = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / 2;
        const falloff = Math.max(0, 1 - distance / maxDistance);
        const magneticStrength = 0.1;
        x.set(mouseX * magneticStrength * factor * falloff);
        y.set(mouseY * magneticStrength * factor * falloff);
      }
    };

    const handleMouseLeave = () => {
      if (variant !== "magnetic") {
        x.set(0);
        y.set(0);
        scale.set(1);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [variant, intensity, hoverEffect, reduceMotion, x, y, scale, intensityFactors]);

  useEffect(() => {
    if (!scrollEffect || reduceMotion) return;

    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visiblePercentage = Math.min(
        Math.max(0, (windowHeight - rect.top) / windowHeight),
        Math.max(0, rect.bottom / windowHeight)
      );
      const factor = intensityFactors[intensity];
      if (rect.top < windowHeight && rect.bottom > 0) {
        y.set(-window.scrollY * 0.05 * factor * visiblePercentage);
        const scrollScale = 1 + visiblePercentage * 0.05 * factor;
        scale.set(Math.min(scrollScale, 1.1));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollEffect, intensity, reduceMotion, y, scale, intensityFactors]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (!reduceMotion && variant !== "magnetic") {
      scale.set(1.02);
    }
  }, [reduceMotion, scale, variant]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!reduceMotion && variant !== "magnetic") {
      scale.set(1);
    }
  }, [reduceMotion, scale, variant]);

  const getGlowGradient = () => {
    if (variant !== "glow" || !isHovered) return null;

    const x = mousePosition.x * 100;
    const y = mousePosition.y * 100;

    return (
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${x}% ${y}%, ${glowColor}, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          borderRadius: "inherit",
        }}
      />
    );
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden transition-colors duration-300",
        variant === "breathe" && !reduceMotion && "animate-pulse",
        className
      )}
      style={{
        x: variant === "float" ? springFloatX : scrollEffect ? springY : springX,
        y: variant === "float" ? springFloatY : springY,
        rotate: variant === "float" ? springRotate : 0,
        scale: springScale,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", ...springConfig }}
      {...props}
    >
      {getGlowGradient()}
      {isHovered && className?.includes("backdrop-blur") && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
          style={{
            opacity: 0.1,
            transform: "rotate(30deg) translateX(-200%)",
            width: "150%",
            height: "200%",
            top: "-50%",
            left: 0,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}