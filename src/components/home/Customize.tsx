import React from 'react';
import CardThemeCustomizer from './Customizable';
import { Tiles } from '../ui/Tiles';

const Customize = () => {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center justify-center gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 items-center justify-center text-center w-full mb-6">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center flex-wrap">
          <h1 className="tracking-tight font-bold text-5xl lg:text-7xl">
            Make it{" "} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">yours</span>,{" "} 
          </h1>
          <h1 className="tracking-tight font-bold text-5xl lg:text-7xl">
            your way.
          </h1>
        </div>
        <p className="md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mt-4 bg-white dark:bg-black md:bg-none md:border-none p-4 rounded-lg border border-purple-500">
          Customize your experience with our intuitive theme editor. Choose colors, styles, and layouts that reflect your unique personality.
        </p>
      </div>
      <div className="w-full relative">
        <div className="absolute -top-44 md:-top-12 -left-12 w-96 h-96 opacity-70 -z-1 overflow-hidden pointer-events-none">
          <Tiles rows={8} cols={8} className="scale-110" />
          <div className="absolute inset-0 md:bg-gradient-to-br dark:from-zinc-950 from-white via-transparent to-background" />
        </div>
        <CardThemeCustomizer />
      </div>
    </section>
  );
};

export default Customize;