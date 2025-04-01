'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

export const MatrixCodeRain = ({ 
  color = "#00ff00", 
  charset = '0123#!$^&456789ABCDEFRLY',
  fontSize = 16,
  fps = 20,
  opacity = 0.05,
  fullScreen = false,
  width = "100%",
  height = "400px"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<number[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let w = 0, h = 0;
    let lastFrameTime = 0;
    const frameInterval = 1000 / fps;
    
    const resize = () => {
      if (fullScreen) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      } else {
        const container = canvas.parentElement;
        if (!container) return;
        w = canvas.width = container.clientWidth;
        h = canvas.height = container.clientHeight;
      }
      particlesRef.current = Array(Math.ceil(w / fontSize)).fill(0);
    };
    
    const random = (items: string) => items[Math.floor(Math.random() * items.length)];
    
    const draw = (timestamp: number) => {
      if (timestamp - lastFrameTime >= frameInterval) {
        ctx.fillStyle = `rgba(0,0,0,${opacity})`;
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < particlesRef.current.length; i++) {
          let v = particlesRef.current[i];
          ctx.fillText(random(charset), i * fontSize, v);
          particlesRef.current[i] = v >= h || v >= 10000 * Math.random() ? 0 : v + fontSize;
        }
        
        lastFrameTime = timestamp;
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    const handleResize = () => {
      resize();
    };
    
    window.addEventListener('resize', handleResize);
    resize();
    animationRef.current = requestAnimationFrame(draw);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, charset, fontSize, fps, opacity, fullScreen]);
  
  const containerStyle = {
    position: 'relative',
    width: fullScreen ? '100vw' : width,
    height: fullScreen ? '100vh' : height,
    overflow: 'hidden'
  };
  
  const canvasStyle = {
    display: 'block',
    position: fullScreen ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    zIndex: fullScreen ? -1 : 'auto'
  };
  
  return (
    <div className={cn(containerStyle)}>
      <canvas ref={canvasRef} className={cn(canvasStyle)} />
    </div>
  );
};
