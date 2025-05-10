import React from "react";
import RevealCard from "@/nuvyxui/components/reveal-card";

const RevealCardDemo = () => {
  const heroes = [
    {
      coverImage:
        "https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanposter.jpg",
      titleImage:
        "https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/pngwing1.png",
      characterImage:
        "https://raw.githubusercontent.com/MihirJaiswal/hero-hq/main/public/spidermanpng.png",
    },
  ];

  return (
    <div className="py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h1 className="text-3xl font-extrabold mb-4 relative">
            <span>Hover on the card</span>
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-16 mt-4 mb-16">
          {heroes.map((hero, index) => (
            <div
              key={index}
              className="relative group transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative flex flex-col items-center">
                <RevealCard
                  coverImage={hero.coverImage}
                  titleImage={hero.titleImage}
                  characterImage={hero.characterImage}
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
