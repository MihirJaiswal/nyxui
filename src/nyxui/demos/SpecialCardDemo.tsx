import React from 'react';
import SpecialCard from '@/nyxui/components/specialCard';

const SpecialCardDemo = () => {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-4 text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-600">
            Hover to Reveal the Hero
          </span>
        </h1>
        <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto text-lg">
          Experience interactive hero cards with stunning visual effects. Move your cursor over the card to see the transformation.
        </p>
        
        <div className="flex flex-wrap justify-center gap-12 mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-b dark:from-red-900 from-red-500 dark:to-blue-900 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col items-center mt-10">
              <SpecialCard
                coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanposter.jpg"
                titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/pngwing1.png"
                characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanpng.png"
                backgroundColor="black"
                borderColor="#222"
              />
              <p className="mt-6 text-gray-300 text-center max-w-sm">
                The friendly neighborhood Spider-Man with his iconic red and blue suit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialCardDemo;