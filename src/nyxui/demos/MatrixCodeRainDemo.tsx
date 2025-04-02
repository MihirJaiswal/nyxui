'use client'
import React, { useState } from 'react';
import { MatrixCodeRain } from '../components/MatrixCodeRain';

export const MatrixCodeRainDemo = () => {
  const [color, setColor] = useState("#00ff00");
  const colors = ["#00ff00", "#ff0000", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ff8800", "#8800ff", "#0088ff", "#ff0088"];
  const handleColorChange = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };
    return (
    <div className='h-[300px] w-full relative overflow-hidden'>
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold relative text-white text-center">Matrix Code Rain Demo</h1>
      <p className="text-white text-center text-lg">A customizable Matrix-style digital rain effect that can be used as a background or in a container.</p>
      <div className='flex justify-center gap-4'>
        <button className='bg-white text-black px-4 py-2 rounded-lg' onClick={handleColorChange}>Change Color</button>
      </div>
    </div>
     <MatrixCodeRain 
     fullScreen
     color={color}
     />
    </div>
  );
};