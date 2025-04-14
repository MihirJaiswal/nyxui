import React from 'react';
import RevealCard from '@/nuvyxui/components/RevealCard';

const RevealCardDemo = () => {
  const heroes = [
    {
      coverImage: "https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanposter.jpg",
      titleImage: "https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/pngwing1.png",
      characterImage: "https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanpng.png",
      backgroundColor: "#01122e",
      borderColor: "#222",
      description: "The friendly neighborhood Spider-Man with his iconic red and blue suit."
    },
  ];

  return (
    <div className="py-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 relative">
            <span>
              Reveal Cards
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-xl leading-relaxed mb-8">
            <span className="block mt-2 text-gray-800 dark:text-gray-400 italic">Hover to reveal the superhero within.</span>
          </p>
        </div>
        
        {/* Cards Container */}
        <div className="flex flex-wrap justify-center gap-16 mt-4 mb-16">
          {heroes.map((hero, index) => (
            <div key={index} className="relative group transform transition-all duration-300 hover:scale-105">
              <div className="relative flex flex-col items-center">
                <RevealCard
                  coverImage={hero.coverImage}
                  titleImage={hero.titleImage}
                  characterImage={hero.characterImage}
                  backgroundColor={hero.backgroundColor}
                  borderColor={hero.borderColor}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevealCardDemo;