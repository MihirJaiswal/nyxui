import React from 'react';
import SpecialCard from '@/nyxui/components/specialCard';

const SpecialCardDemo = () => {
  return (
    <div className="py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Hover on the Card</h1>
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <SpecialCard
            coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanposter.jpg"
            titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/pngwing1.png"
            characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanpng.png"
            backgroundColor='black'
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialCardDemo;