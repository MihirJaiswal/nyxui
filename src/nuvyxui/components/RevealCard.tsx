"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CardProps {
  coverImage: string;
  titleImage: string;
  characterImage: string;
  width?: number;
  height?: number;
  hoverRotation?: number;
  titleTranslateY?: number;
  characterTranslateY?: number;
  characterTranslateZ?: number;
  alt?: {
    cover?: string;
    title?: string;
    character?: string;
  };
  animation?: {
    duration?: number;
    delay?: number;
  };
  priority?: boolean;
  threshold?: number;
  className?: string;
}

const RevealCard: React.FC<CardProps> = ({
  coverImage,
  titleImage,
  characterImage,
  width = 266,
  height = 400,
  hoverRotation = 25,
  titleTranslateY = -50,
  characterTranslateY = -15,
  characterTranslateZ = 100,
  alt = {
    cover: "Cover Image",
    title: "Title",
    character: "Character",
  },
  animation = {
    duration: 500,
    delay: 0,
  },
  priority = false,
  threshold = 0.3,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const currentRef = cardRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasBeenRevealed) {
            setIsRevealed(true);
            setHasBeenRevealed(true);
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, hasBeenRevealed]);

  const handleCardClick = () => {
    setIsRevealed(!isRevealed);
    setHasBeenRevealed(true);
  };

  const animationStyle = {
    transitionDuration: `${animation.duration}ms`,
    transitionDelay: `${animation.delay}ms`,
  };

  const shouldReveal = isMobile
    ? isRevealed
    : isRevealed || (!hasBeenRevealed && isVisible);

  const mobileRevealClass =
    isMobile && shouldReveal
      ? "[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)_translateZ(0)] shadow-xl"
      : "";

  const characterRevealClass =
    isMobile && shouldReveal
      ? "opacity-100 [transform:translate3d(0,-25%,100px)]"
      : "";

  const titleRevealClass =
    isMobile && shouldReveal ? "[transform:translate3d(0,-50px,100px)]" : "";

  const desktopHoverClass = !isMobile
    ? "group-hover:[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)_translateZ(0)] group-hover:shadow-xl"
    : "";

  const characterHoverClass = !isMobile
    ? "group-hover:opacity-100 group-hover:[transform:translate3d(0,-25%,100px)]"
    : "";

  const titleHoverClass = !isMobile
    ? "group-hover:[transform:translate3d(0,-50px,100px)]"
    : "";

  return (
    <div
      ref={cardRef}
      className={`group relative flex justify-center items-end no-underline perspective-[2500px] cursor-pointer border p-0 mx-3 ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 overflow-hidden z-0">
        <div
          className={`absolute inset-0 transition-all duration-500 ${desktopHoverClass} ${mobileRevealClass}`}
          style={
            {
              ...animationStyle,
              "--hover-rotation": `${hoverRotation}deg`,
            } as React.CSSProperties
          }
        >
          <Image
            src={coverImage}
            alt={alt.cover || "Cover Image"}
            fill
            className="object-cover"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />

          <div
            className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-black/30"
            style={animationStyle}
          ></div>
        </div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src={characterImage}
          alt={alt.character || "Character"}
          fill
          className={`object-cover opacity-0 transition-all duration-500 ${characterHoverClass} ${
            shouldReveal ? characterRevealClass : ""
          }`}
          style={
            {
              ...animationStyle,
              "--character-translate-y": `${characterTranslateY}%`,
              "--character-translate-z": `${characterTranslateZ}px`,
            } as React.CSSProperties
          }
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      </div>

      <div className="relative z-20 w-full">
        <Image
          src={titleImage}
          alt={alt.title || "Title"}
          width={500}
          height={500}
          className={`w-full transition-transform duration-500 ${titleHoverClass} ${
            shouldReveal ? titleRevealClass : ""
          }`}
          style={
            {
              ...animationStyle,
              "--title-translate-y": `${titleTranslateY}px`,
              "--title-translate-z": `${characterTranslateZ}px`,
            } as React.CSSProperties
          }
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      </div>

      {isMobile && (
        <div className="absolute bottom-2 right-2 z-30 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-opacity duration-300">
          <span className="text-white text-xs">{isRevealed ? "×" : "+"}</span>
        </div>
      )}
    </div>
  );
};

export default RevealCard;