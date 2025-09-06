'use client'

import { useState, useEffect } from "react";
import { Sparkles } from "@/components/ui/particles";

export const LazySparkles = () => {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSparkles(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!showSparkles) return null;

  return (
    <Sparkles
      density={800}
      speed={1.2}
      size={1.2}
      direction='top'
      opacitySpeed={2}
      color='#DA33FF'
      className='w-full h-full'
    />
  );
};