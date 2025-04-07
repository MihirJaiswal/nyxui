import React from 'react';
import SpecialCard from '@/nyxui/components/specialCard';

const SpecialCardDemo = () => {
  const heroes = [
    {
      coverImage: "https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanposter.jpg",
      titleImage: "https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/pngwing1.png",
      characterImage: "https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanpng.png",
      backgroundColor: "black",
      borderColor: "#222",
      description: "The friendly neighborhood Spider-Man with his iconic red and blue suit."
    },
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h1 className="text-6xl font-extrabold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-600">
              Superhero Showcase
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-blue-600 rounded-full"></div>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-xl leading-relaxed">
            Experience interactive hero cards with stunning visual effects. 
            <span className="block mt-2 text-purple-400 italic">Hover to reveal the superhero within.</span>
          </p>
        </div>
        
        {/* Cards Container */}
        <div className="flex flex-wrap justify-center gap-16 mb-16">
          {heroes.map((hero, index) => (
            <div key={index} className="relative group transform transition-all duration-300 hover:scale-105">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-lg blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse group-hover:animate-none"></div>
              <div className="relative flex flex-col items-center">
                <SpecialCard
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

export default SpecialCardDemo;