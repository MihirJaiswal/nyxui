"use client";
import React, { useRef, useEffect } from "react";
import { Character, CharacterSelector } from "../components/CharacterSelector";

const SimpleCharacterSelectorDemo = () => {
  const selectionSoundRef = useRef<HTMLAudioElement>(null);
  const confirmSoundRef = useRef<HTMLAudioElement>(null);

  const characters = [
    {
      id: "char1",
      name: "Baizhi",
      image: "/assets/images/heroselector/img/1.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/1.png",
    },
    {
      id: "char2",
      name: "Camellya",
      image: "/assets/images/heroselector/img/2.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/2.png",
    },
    {
      id: "char3",
      name: "Changli",
      image: "/assets/images/heroselector/img/3.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/3.png",
    },
    {
      id: "char4",
      name: "Rover",
      image: "/assets/images/heroselector/img/4.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/4.png",
    },
    {
      id: "char5",
      name: "Sanhua",
      image: "/assets/images/heroselector/img/5.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/5.png",
    },
    {
      id: "char6",
      name: "Shore",
      image: "/assets/images/heroselector/img/6.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/6.png",
    },
    {
      id: "char7",
      name: "Verina",
      image: "/assets/images/heroselector/img/7.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/7.png",
    },
    {
      id: "char8",
      name: "Yinlin",
      image: "/assets/images/heroselector/img/8.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/8.png",
    },
    {
      id: "char9",
      name: "Youhu",
      image: "/assets/images/heroselector/img/9.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/9.png",
    },
    {
      id: "char10",
      name: "Encore",
      image: "/assets/images/heroselector/img/10.png",
      category: "Fantasy",
      demoImage: "/assets/images/heroselector/icons/10.png",
    },
  ];

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isCardClick =
        target.closest("[data-character-id]") ||
        target.tagName === "IMG" ||
        target.closest(".character-card") ||
        (target.closest('[role="button"]') &&
          target.closest('[role="button"]')?.querySelector("img"));

      if (isCardClick) {
        playSelectionSound();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const playSelectionSound = () => {
    if (selectionSoundRef.current) {
      selectionSoundRef.current.currentTime = 0;
      selectionSoundRef.current
        .play()
        .catch((err) => console.warn("Audio Play Error:", err));
    }
  };

  const handleSelectionChange = (selectedCharacters: Character[]) => {
    console.log("Selected characters:", selectedCharacters);
  };

  const handleConfirm = (selectedCharacters: Character[]) => {
    if (confirmSoundRef.current) {
      confirmSoundRef.current.currentTime = 0;
      confirmSoundRef.current
        .play()
        .catch((err) => console.warn("Audio Play Error:", err));
    }

    console.log("Confirmed characters:", selectedCharacters);
  };

  return (
    <div className="">
      <audio
        ref={selectionSoundRef}
        src="/assets/audio/click-sound.wav"
        preload="auto"
      />
      <audio
        ref={confirmSoundRef}
        src="/assets/audio/confirm-sound.wav"
        preload="auto"
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 px-2 drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 dark:from-purple-00 to-pink-500 dark:to-pink-400">
              Waifu is laifu!!
            </span>
          </h1>
          <p className="text-cyan-500 text-lg">Pick your Poison</p>
        </div>

        <div className="bg-blue/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-cyan-500/20">
          <div className="mb-6 flex justify-between items-center">
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          <CharacterSelector
            characterImages={characters}
            displayMode="flex"
            cardGap={25}
            cardsCount={3}
            cardWidth={300}
            cardHeight={400}
            hoverEffect="scale"
            enableSearch={true}
            cardBorderRadius={5}
            gridColumns={4}
            enableConfirmation={false}
            dialogTitle="Select Characters"
            onSelectionChange={handleSelectionChange}
            onConfirm={handleConfirm}
          />

          <div className="mt-6 flex justify-between items-center">
            <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCharacterSelectorDemo;
