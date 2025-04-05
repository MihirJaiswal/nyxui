'use client';

import React, { useEffect, useRef } from 'react';

interface BubblesProps {
  backgroundColorA?: string;
  backgroundColorB?: string;
  bubbleColors?: {
    colorA?: string;
    colorB?: string;
    colorC?: string;
    colorD?: string;
    colorE?: string;
    interactive?: string;
  };
  blendMode?: string;
  bubbleSize?: string;
}

const BubbleBackground: React.FC<BubblesProps> = ({
  backgroundColorA = 'rgb(108, 0, 162)',
  backgroundColorB = 'rgb(0, 17, 82)',
  bubbleColors = {
    colorA: '18, 113, 255',
    colorB: '221, 74, 255',
    colorC: '100, 220, 255',
    colorD: '200, 50, 50',
    colorE: '180, 180, 50',
    interactive: '148, 100, 255',
  },
  blendMode = 'hard-light',
  bubbleSize = '80%',
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    const easeFactor = 10;
    
    function move() {
      if (!interactiveRef.current) return;
      
      curX += (tgX - curX) / easeFactor;
      curY += (tgY - curY) / easeFactor;
      
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }
    
    const handlePointerMove = (e: PointerEvent) => {
      tgX = e.clientX;
      tgY = e.clientY;
    };
    
    window.addEventListener('pointermove', handlePointerMove);
    move();
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);
  
  const bounceVAnimation = `
    @keyframes bounceV {
      0% { transform: translateY(-50%); }
      50% { transform: translateY(50%); }
      100% { transform: translateY(-50%); }
    }
  `;
  
  const bounceHAnimation = `
    @keyframes bounceH {
      0% { transform: translateX(-50%) translateY(-10%); }
      50% { transform: translateX(50%) translateY(10%); }
      100% { transform: translateX(-50%) translateY(-10%); }
    }
  `;
  
  const moveInCircleAnimation = `
    @keyframes moveInCircle {
      0% { transform: rotate(0deg); }
      50% { transform: rotate(180deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  const gooFilter = `
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
      <feBlend in="SourceGraphic" in2="goo" />
    </filter>
  `;
  
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&display=swap");
        ${bounceVAnimation}
        ${bounceHAnimation}
        ${moveInCircleAnimation}
      `}</style>
      
      <div 
        className="w-screen h-screen relative overflow-hidden"
        style={{ 
          background: `linear-gradient(40deg, ${backgroundColorA}, ${backgroundColorB})` 
        }}
      >
        <svg className="hidden" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: gooFilter }} />
        
        <div 
          className="w-full h-full"
          style={{ 
            filter: 'url(#goo) blur(40px)' 
          }}
        >
          <div 
            className="absolute opacity-100" 
            style={{
              width: bubbleSize,
              height: bubbleSize,
              top: `calc(50% - ${bubbleSize} / 2)`,
              left: `calc(50% - ${bubbleSize} / 2)`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorA}, 0.8) 0, rgba(${bubbleColors.colorA}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode as any,
              transformOrigin: 'center center',
              animation: 'bounceV 30s ease infinite'
            }}
          ></div>
          
          <div 
            className="absolute opacity-100" 
            style={{
              width: bubbleSize,
              height: bubbleSize,
              top: `calc(50% - ${bubbleSize} / 2)`,
              left: `calc(50% - ${bubbleSize} / 2)`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorB}, 0.8) 0, rgba(${bubbleColors.colorB}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode as any,
              transformOrigin: 'calc(50% - 400px)',
              animation: 'moveInCircle 20s reverse infinite'
            }}
          ></div>
          
          <div 
            className="absolute opacity-100" 
            style={{
              width: bubbleSize,
              height: bubbleSize,
              top: `calc(50% - ${bubbleSize} / 2 + 200px)`,
              left: `calc(50% - ${bubbleSize} / 2 - 500px)`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorC}, 0.8) 0, rgba(${bubbleColors.colorC}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode as any,
              transformOrigin: 'calc(50% + 400px)',
              animation: 'moveInCircle 40s linear infinite'
            }}
          ></div>
          <div 
            className="absolute opacity-70" 
            style={{
              width: bubbleSize,
              height: bubbleSize,
              top: `calc(50% - ${bubbleSize} / 2)`,
              left: `calc(50% - ${bubbleSize} / 2)`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorD}, 0.8) 0, rgba(${bubbleColors.colorD}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode as any,
              transformOrigin: 'calc(50% - 200px)',
              animation: 'bounceH 40s ease infinite'
            }}
          ></div>
          
          <div 
            className="absolute opacity-100" 
            style={{
              width: `calc(${bubbleSize} * 2)`,
              height: `calc(${bubbleSize} * 2)`,
              top: `calc(50% - ${bubbleSize})`,
              left: `calc(50% - ${bubbleSize})`,
              background: `radial-gradient(circle at center, rgba(${bubbleColors.colorE}, 0.8) 0, rgba(${bubbleColors.colorE}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode as any,
              transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
              animation: 'moveInCircle 20s ease infinite'
            }}
          ></div>
          
          <div 
            ref={interactiveRef}
            className="absolute w-full h-full opacity-70"
            style={{
              top: '-50%',
              left: '-50%',
              background: `radial-gradient(circle at center, rgba(${bubbleColors.interactive}, 0.8) 0, rgba(${bubbleColors.interactive}, 0) 50%) no-repeat`,
              mixBlendMode: blendMode as any
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default BubbleBackground;