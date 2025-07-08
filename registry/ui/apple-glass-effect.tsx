import React, { useId } from 'react';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'prominent' | 'regular' | 'thin';
  blur?: number;
  opacity?: number;
  distortion?: 'none' | 'subtle' | 'medium' | 'strong';
  tint?: 'neutral' | 'warm' | 'cool' | 'vibrant';
  border?: boolean;
  hover?: boolean;
  glassOverlay?: boolean;
  highlightColor?: string;
  highlightOpacity?: number;
  innerGlowColor?: string;
  innerGlowOpacity?: number;
  specularIntensity?: number;
}

export const GlassContainer: React.FC<GlassContainerProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  variant = 'default',
  blur,
  opacity,
  distortion = 'medium',
  tint = 'warm',
  border = true,
  hover = true,
  glassOverlay = true,
  highlightColor = 'rgba(255, 255, 255, 0.4)',
  highlightOpacity = 1,
  innerGlowColor = 'rgba(255, 255, 255, 0.1)',
  innerGlowOpacity = 1,
  specularIntensity = 0.4,
  ...props
}) => {
  // Variant-specific configurations
  const variantConfig = {
    default: { blur: 20, opacity: 0.25 },
    prominent: { blur: 30, opacity: 0.35 },
    regular: { blur: 15, opacity: 0.2 },
    thin: { blur: 10, opacity: 0.15 },
  };

  const config = variantConfig[variant];
  const finalBlur = blur !== undefined ? blur : config.blur;
  const finalOpacity = opacity !== undefined ? opacity : config.opacity;

  // Distortion configurations
  const distortionConfig = {
    none: { scale: 0, frequency: 0 },
    subtle: { scale: 50, frequency: 0.008 },
    medium: { scale: 70, frequency: 0.008 },
    strong: { scale: 120, frequency: 0.012 },
  };

  // Tint configurations
  const tintStyles = {
    neutral: 'rgba(255, 255, 255, 0.25)',
    warm: 'rgba(255, 248, 240, 0.3)',
    cool: 'rgba(240, 248, 255, 0.3)',
    vibrant: 'rgba(255, 255, 255, 0.35)',
  };

  const distortConfig = distortionConfig[distortion];
  
  // Generate a consistent filter ID 
  const baseId = useId();
  const filterId = `glass-filter-${baseId}`;

  return (
    <div
      className={`relative font-semibold text-white cursor-pointer bg-transparent overflow-hidden transition-all duration-[400ms] rounded-[2rem] p-4 shadow-lg ${
        hover ? 'hover:scale-[1.02] hover:shadow-2xl' : ''
      } ${className}`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 2.2)',
        ...props.style,
      }}
      {...props}
    >
      <div 
        className="absolute inset-0 z-0 isolate"
        style={{
          backdropFilter: `blur(${finalBlur}px)`,
          filter: distortion !== 'none' ? `url(#${filterId})` : 'none',
          borderRadius: '2rem',
        }}
      />
      
      {/* Tinted overlay */}
      {glassOverlay && (
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: tintStyles[tint],
            opacity: finalOpacity,
            borderRadius: '2rem',
          }}
        />
      )}

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 z-15 opacity-[0.03]"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crest width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          borderRadius: '2rem',
        }}
      />
      
      {/* Border highlight */}
      {border && (
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '2rem',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.6),
              inset 0 0 20px ${innerGlowColor},
              0 1px 2px rgba(0, 0, 0, 0.1)
            `,
          }}
        />
      )}

      {/* Specular highlights */}
      <div 
        className="absolute inset-0 z-25 pointer-events-none"
        style={{
          opacity: highlightOpacity,
          borderRadius: '2rem',
          background: `
            linear-gradient(135deg, 
              ${highlightColor.replace(/rgba?\([^)]*\)/, `rgba(255, 255, 255, ${specularIntensity})`)} 0%, 
              transparent 20%, 
              transparent 80%, 
              ${highlightColor.replace(/rgba?\([^)]*\)/, `rgba(255, 255, 255, ${specularIntensity * 0.25})`)} 100%
            )
          `,
        }}
      />

      {/* Subtle inner glow*/}
      <div 
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          opacity: innerGlowOpacity,
          borderRadius: '2rem',
          boxShadow: `
            inset 0 0 20px ${innerGlowColor},
            inset 0 1px 2px ${highlightColor}
          `,
        }}
      />
      
      {/* Content layer*/}
      <div className='z-40 relative'>{children}</div>

      {/* SVG Filter Definition */}
      {distortion !== 'none' && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency={`${distortConfig.frequency} ${distortConfig.frequency}`}
                numOctaves="2" 
                seed="92" 
                result="noise" 
              />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="blurred" 
                scale={distortConfig.scale}
                xChannelSelector="R" 
                yChannelSelector="G" 
              />
            </filter>
          </defs>
        </svg>
      )}
    </div>
  );
};