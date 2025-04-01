'use client';

import { useState } from 'react';
import {MatrixCodeRain} from '@/nyxui/components/MatrixCodeRain';

export const MatrixCodeRainDemo = () => {
  const [color, setColor] = useState('#00ff00');
  const [fontSize, setFontSize] = useState(16);
  const [fps, setFps] = useState(20);
  const [charset, setCharset] = useState('0123#!$^&456789ABCDEFRLY');
  const [fullScreen, setFullScreen] = useState(false);
  
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Matrix Code Rain Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Configuration</h2>
          
          <div className="space-y-2">
            <label className="block">
              Color:
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)} 
                className="ml-2"
              />
            </label>
          </div>
          
          <div className="space-y-2">
            <label className="block">
              Font Size: {fontSize}px
              <input 
                type="range" 
                min="8" 
                max="32" 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))} 
                className="w-full"
              />
            </label>
          </div>
          
          <div className="space-y-2">
            <label className="block">
              FPS: {fps}
              <input 
                type="range" 
                min="5" 
                max="60" 
                value={fps} 
                onChange={(e) => setFps(Number(e.target.value))} 
                className="w-full"
              />
            </label>
          </div>
          
          <div className="space-y-2">
            <label className="block">
              Characters:
              <input 
                type="text" 
                value={charset} 
                onChange={(e) => setCharset(e.target.value)} 
                className="w-full mt-1 p-2 border rounded"
              />
            </label>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={fullScreen} 
                onChange={(e) => setFullScreen(e.target.checked)} 
                className="mr-2"
              />
              Fullscreen Background
            </label>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden bg-black h-80">
          <MatrixCodeRain 
            color={color}
            fontSize={fontSize}
            fps={fps}
            charset={charset}
            fullScreen={false}
            height="320px"
          />
        </div>
      </div>
      
      {fullScreen && (
        <MatrixCodeRain 
          color={color}
          fontSize={fontSize}
          fps={fps}
          charset={charset}
          fullScreen={true}
        />
      )}
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Usage Example:</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {`// Basic usage
<MatrixCodeRain />

// With custom props
<MatrixCodeRain 
  color="#ff00ff"
  fontSize={20}
  fps={30}
  charset="MATRIX01"
  fullScreen={false}
  width="500px"
  height="300px"
/>`}
      </pre>
    </main>
  );
}