import React from 'react';
import Image from 'next/image';

interface CardProps {
  coverImage: string;
  titleImage: string;
  characterImage: string;
  
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderColor?: string;
  hoverRotation?: number;
  titleTranslateY?: number;
  characterTranslateY?: number;
  characterTranslateZ?: number;
  href?: string;
  alt?: {
    cover?: string;
    title?: string;
    character?: string;
  };
  gradientColors?: {
    top?: string;
    bottom?: string;
  };
  animation?: {
    duration?: number;
    delay?: number;
  };
  shadow?: string;
  priority?: boolean;
}

const SpecialCard: React.FC<CardProps> = ({
  coverImage,
  titleImage,
  characterImage,
  width = 266,
  height = 400,
  backgroundColor = "#192740",
  borderColor = "#ddd",
  hoverRotation = 25,
  titleTranslateY = -50,
  characterTranslateY = -30,
  characterTranslateZ = 100,
  href = "#",
  alt = {
    cover: "Cover Image",
    title: "Title",
    character: "Character"
  },
  gradientColors = {
    top: "rgba(12,13,19,1)",
    bottom: "rgba(12,13,19,1)"
  },
  animation = {
    duration: 500,
    delay: 0
  },
  shadow = "2px 35px 32px -8px rgba(0,0,0,0.75)",
  priority = false
}) => {
  const animationStyle = {
    transitionDuration: `${animation.duration}ms`,
    transitionDelay: `${animation.delay}ms`
  };

  return (
    <a
      href={href}
      className="group relative flex justify-center items-end no-underline perspective-[2500px]"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor,
        borderColor,
        padding: '0 36px',
        margin: '0 10px',
        border: `1px solid ${borderColor}`
      }}
    >
      {/* Background Container: Clipped content */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div
          className="absolute inset-0 transition-all duration-500 
                    group-hover:[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)_translateZ(0)]
                    group-hover:shadow-[2px_35px_32px_-8px_rgba(0,0,0,0.75)]"
          style={{
            ...animationStyle,
            '--hover-rotation': `${hoverRotation}deg`,
            '--hover-shadow': shadow
          } as React.CSSProperties}
        >
          <Image
            src={coverImage}
            alt={alt.cover || "Cover Image"}
            fill
            className="object-cover"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
          
          {/* Top gradient overlay */}
          <div
            className="absolute inset-0
                     bg-gradient-to-t from-transparent via-[rgba(12,13,19,0.5)] to-[rgba(12,13,19)]
                     opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={animationStyle}
          ></div>
          
          {/* Bottom gradient overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-[80px]
                     bg-gradient-to-b from-transparent via-[rgba(12,13,19,0.5)] to-[rgba(12,13,19)]
                     opacity-100 transition-all duration-500 group-hover:h-[120px]"
            style={animationStyle}
          ></div>
        </div>
      </div>

      {/* Character Image: Not clipped so it can overflow */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src={characterImage}
          alt={alt.character || "Character"}
          fill
          className="object-cover opacity-0 transition-all duration-500
                   group-hover:opacity-100 group-hover:[transform:translate3d(0,-30%,100px)]"
          style={{
            ...animationStyle,
            '--character-translate-y': `${characterTranslateY}%`,
            '--character-translate-z': `${characterTranslateZ}px`
          } as React.CSSProperties}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      </div>

      {/* Title Image */}
      <div className="relative z-20 w-full">
        <Image
          src={titleImage}
          alt={alt.title || "Title"}
          width={500}
          height={500}
          className="w-full transition-transform duration-500
                   group-hover:[transform:translate3d(0,-50px,100px)]"
          style={{
            ...animationStyle,
            '--title-translate-y': `${titleTranslateY}px`,
            '--title-translate-z': `${characterTranslateZ}px`
          } as React.CSSProperties}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      </div>
    </a>
  );
};

export default SpecialCard;