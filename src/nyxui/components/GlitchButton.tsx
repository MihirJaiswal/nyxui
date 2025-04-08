'use client'
import React, { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface GlitchButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glitchIntensity?: 'low' | 'medium' | 'high';
  glitchOnHover?: boolean;
  glitchAlways?: boolean;
  glitchColors?: {
    primary?: string;
    secondary?: string;
  };
}

export const GlitchButton: React.FC<GlitchButtonProps> = ({
  children,
  className = "",
  onClick,
  glitchIntensity = 'medium',
  glitchOnHover = true,
  glitchAlways = false,
  glitchColors = {
    primary: '#ef00ef',
    secondary: '#00ffff'
  }
}) => {
  const [content, setContent] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [bgColorClass, setBgColorClass] = useState('bg-gray-900');
  const [textColorClass, setTextColorClass] = useState('text-white');
  const [isRounded, setIsRounded] = useState(false);
  
  useEffect(() => {
    if (buttonRef.current) {
      setContent(buttonRef.current.textContent || "");
    }
  }, [children]);

  useEffect(() => {
    const bgMatch = className.match(/bg-[a-z]+-[0-9]+/);
    if (bgMatch) {
      setBgColorClass(bgMatch[0]);
    }
    const textMatch = className.match(/text-[a-z]+-[0-9]+/);
    if (textMatch) {
      setTextColorClass(textMatch[0]);
    }
    setIsRounded(
      className.includes('rounded') || 
      className.includes('rounded-lg') || 
      className.includes('rounded-md') || 
      className.includes('rounded-sm') || 
      className.includes('rounded-full')
    );
  }, [className]);

  useEffect(() => {
    const intensityMultiplier = 
      glitchIntensity === 'low' ? 0.5 : 
      glitchIntensity === 'high' ? 2 : 1;
    
    const styleId = 'glitch-button-styles';
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.innerHTML = `
        @keyframes glitchFx1 {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(0); }
          20% { transform: translateX(${-4 * intensityMultiplier}px); }
          30% { transform: translateX(0); }
          40% { transform: translateX(${12 * intensityMultiplier}px); }
          50% { transform: translateX(${8 * intensityMultiplier}px); }
          60% { transform: translateX(${24 * intensityMultiplier}px); }
          70% { transform: translateX(${2 * intensityMultiplier}px); }
          80% { transform: translateX(${-4 * intensityMultiplier}px); }
          90% { transform: translateX(0); }
        }
        @keyframes glitchFx2 {
          0% { transform: translateX(${4 * intensityMultiplier}px); }
          10% { transform: translateX(${-12 * intensityMultiplier}px); }
          20% { transform: translateX(${-2 * intensityMultiplier}px); }
          30% { transform: translateX(${1 * intensityMultiplier}px); }
          40%, 50%, 60%, 70% { transform: translateX(0); }
          80% { transform: translateX(${4 * intensityMultiplier}px); }
          90% { transform: translateX(${-2 * intensityMultiplier}px); }
          100% { transform: translateX(${-15 * intensityMultiplier}px); }
        }
        @keyframes glitchFx3 {
          0% { transform: translateX(${4 * intensityMultiplier}px); }
          10% { transform: translateX(0); }
          20% { transform: translateX(${4 * intensityMultiplier}px); }
          30% { transform: translateX(0); }
          40% { transform: translateX(${-4 * intensityMultiplier}px); }
          50% { transform: translateX(0); }
          60% { transform: translateX(${-4 * intensityMultiplier}px); }
          70% { transform: translateX(0); }
          80% { transform: translateX(${12 * intensityMultiplier}px); }
          90% { transform: translateX(0); }
          100% { transform: translateX(${-12 * intensityMultiplier}px); }
        }
        
        @keyframes glitchSkew {
          0% { transform: skew(0deg); }
          10% { transform: skew(${1 * intensityMultiplier}deg); }
          20% { transform: skew(${-2 * intensityMultiplier}deg); }
          30% { transform: skew(${1.5 * intensityMultiplier}deg); }
          40% { transform: skew(${-1 * intensityMultiplier}deg); }
          50% { transform: skew(${2 * intensityMultiplier}deg); }
          60% { transform: skew(${-1.5 * intensityMultiplier}deg); }
          70% { transform: skew(${1.5 * intensityMultiplier}deg); }
          80% { transform: skew(${-2 * intensityMultiplier}deg); }
          90% { transform: skew(${1 * intensityMultiplier}deg); }
          100% { transform: skew(0deg); }
        }
        
        @keyframes flickerAnimation {
          0% { opacity: 1; }
          19% { opacity: 1; }
          20% { opacity: 0; }
          21% { opacity: 1; }
          49% { opacity: 1; }
          50% { opacity: 0.7; }
          51% { opacity: 1; }
          79% { opacity: 1; }
          80% { opacity: 0.8; }
          81% { opacity: 1; }
          100% { opacity: 1; }
        }
        
        @keyframes clickGlitch {
          0%, 100% { clip-path: inset(0 0 0 0); }
          20% { clip-path: inset(${20 * intensityMultiplier}% 0 ${40 * intensityMultiplier}% 0); }
          40% { clip-path: inset(${50 * intensityMultiplier}% 0 ${20 * intensityMultiplier}% 0); }
          60% { clip-path: inset(${30 * intensityMultiplier}% 0 ${60 * intensityMultiplier}% 0); }
          80% { clip-path: inset(${10 * intensityMultiplier}% 0 ${70 * intensityMultiplier}% 0); }
        }
        
        .glitch-layer-1 {
          animation: glitchFx1 ${800 / intensityMultiplier}ms infinite step-end;
        }
        .glitch-layer-2 {
          animation: glitchFx2 ${900 / intensityMultiplier}ms infinite step-end;
        }
        .glitch-layer-3 {
          animation: glitchFx3 ${1000 / intensityMultiplier}ms infinite step-end;
        }
        .glitch-skew {
          animation: glitchSkew ${1200 / intensityMultiplier}ms infinite step-end;
        }
        .flicker-animation {
          animation: flickerAnimation 2s infinite;
        }
        .click-glitch {
          animation: clickGlitch 500ms step-end forwards;
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, [glitchIntensity]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  const showGlitch = (glitchAlways || (glitchOnHover && isHovering) || isClicked);

  const containerClasses = twMerge(
    'relative cursor-pointer font-mono overflow-hidden',
    'text-4xl', 
    'bg-gray-900', 
    'text-white', 
    'p-4 m-1.5',
    'group',
    'shadow-[inset_white_5px_5px_0px,inset_white_-5px_5px_0px,inset_white_5px_-5px_0px,inset_white_-5px_-5px_0px]',
    'hover:shadow-none',
    'hover:bg-gradient-to-r hover:from-fuchsia-600 hover:via-white hover:to-cyan-400',
    isClicked ? 'click-glitch' : '',
    className 
  );
  
  const textShadowStyle = {
    textShadow: `
      -1.5px -1.5px 0 ${glitchColors.primary}, 
      1.5px 1.5px 0 ${glitchColors.secondary}
    `
  };

  return (
    <div 
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={containerClasses}
    >
      <span className={`
        block
        ${showGlitch ? 'opacity-0' : 'opacity-100'} 
        transition-opacity
        ${glitchAlways ? 'flicker-animation' : ''}
      `}>
        {children}
      </span>
      
      {showGlitch && (
        <div className={`
          absolute inset-0 
          overflow-hidden 
          ${isClicked ? 'glitch-skew' : ''}
        `}>
          {/* Glitch layer 1*/}
          <div className={`
            absolute left-0 w-full h-1/3 top-0 
            ${bgColorClass}
            shadow-[inset_white_5px_5px_0px,inset_white_-5px_0px_0px]
            ${isRounded ? 'rounded-t-lg' : ''}
            overflow-hidden
            glitch-layer-1
          `}>
            <div 
              className={`
                absolute w-full ${textColorClass}
                top-0 left-0 right-0
                flex items-center justify-center
                h-full
              `}
              style={textShadowStyle}
            >
              <div className="transform translate-y-0 mt-[45px]">
                {children}
              </div>
            </div>
          </div>
          
          {/* Glitch layer 2*/}
          <div className={`
            absolute left-0 w-full h-1/3 top-1/3 
            ${bgColorClass}
            shadow-[inset_white_5px_0px_0px,inset_white_-5px_0px_0px]
            overflow-hidden
            glitch-layer-2
          `}>
            <div 
              className={`
                absolute w-full ${textColorClass}
                top-0 left-0 right-0
                flex items-center justify-center
                h-[300%] -translate-y-1/3
              `}
              style={textShadowStyle}
            >
              <div>
                {children}
              </div>
            </div>
          </div>
          
          {/* Glitch layer 3*/}
          <div className={`
            absolute left-0 w-full h-1/3 top-2/3 
            ${bgColorClass}
            shadow-[inset_white_5px_-5px_0px,inset_white_-5px_0px_0px]
            ${isRounded ? 'rounded-b-lg' : ''}
            overflow-hidden
            glitch-layer-3
          `}>
            <div 
              className={`
                absolute w-full ${textColorClass}
                top-0 left-0 right-0
                flex items-center justify-center
                h-[300%] -translate-y-2/3
              `}
              style={textShadowStyle}
            >
              <div>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};