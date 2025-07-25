"use client";

import React, { useState } from "react";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MusicPlayer, Track } from "@/registry/ui/music-player";

const MusicCardThemeCustomizer = () => {
    const [cardTheme, setCardTheme] = useState("spotify");
    const [slideDirection, setSlideDirection] = useState("right");
    const [isAnimating, setIsAnimating] = useState(false);

    // Sample track data
    const sampleTrack: Track = {
        id: "blinding-lights",
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        artwork: "/assets/images/landing-page/song.jpg",
        duration: 217,
    };

    // Sample queue for demonstration
    const sampleQueue: Track[] = [
        sampleTrack,
        {
            id: "save-your-tears",
            title: "Save Your Tears",
            artist: "The Weeknd",
            album: "After Hours",
            artwork: "/assets/images/landing-page/song.jpg",
            duration: 215,
        },
        {
            id: "starboy",
            title: "Starboy",
            artist: "The Weeknd ft. Daft Punk",
            album: "Starboy",
            artwork: "/assets/images/landing-page/song.jpg",
            duration: 230,
        },
    ];

    const themeOptions = [
        {
            name: "Spotify",
            value: "spotify",
            icon: <Volume2 className="h-3.5 w-3.5" />,
            color: "text-green-400",
        },
        {
            name: "Cosmic",
            value: "cosmic",
            icon: <Volume2 className="h-3.5 w-3.5" />,
            color: "text-indigo-400",
        },
        {
            name: "Midnight",
            value: "midnight",
            icon: <Volume2 className="h-3.5 w-3.5" />,
            color: "text-slate-400",
        },
        {
            name: "Default",
            value: "default",
            icon: <Volume2 className="h-3.5 w-3.5" />,
            color: "text-cyan-400",
        },
    ];

    const borderColors: Record<string, string> = {
        spotify: "border-green-400",
        cosmic: "border-indigo-400",
        midnight: "border-slate-400",
        default: "border-cyan-400",
    };

    const handleThemeChange = (newTheme: string) => {
        if (isAnimating || newTheme === cardTheme) return;

        const currentIndex = themeOptions.findIndex(
            (opt) => opt.value === cardTheme,
        );
        const newIndex = themeOptions.findIndex((opt) => opt.value === newTheme);

        setIsAnimating(true);
        setSlideDirection(newIndex > currentIndex ? "right" : "left");
        setCardTheme(newTheme);

        setTimeout(() => {
            setIsAnimating(false);
        }, 400);
    };

    const handleArrowNavigation = (direction: "prev" | "next") => {
        if (isAnimating) return;

        const currentIndex = themeOptions.findIndex(
            (opt) => opt.value === cardTheme,
        );
        
        let newIndex;
        if (direction === "prev") {
            newIndex = currentIndex === 0 ? themeOptions.length - 1 : currentIndex - 1;
            setSlideDirection("left");
        } else {
            newIndex = currentIndex === themeOptions.length - 1 ? 0 : currentIndex + 1;
            setSlideDirection("right");
        }

        setIsAnimating(true);
        setCardTheme(themeOptions[newIndex].value);

        setTimeout(() => {
            setIsAnimating(false);
        }, 400);
    };

    const slideVariants = {
        enterRight: {
            x: 300,
            opacity: 0,
        },
        enterLeft: {
            x: -300,
            opacity: 0,
        },
        center: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 350,
                damping: 30,
                mass: 1,
                duration: 0.4,
            },
        },
        exitRight: {
            x: 300,
            opacity: 0,
            transition: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.3,
            },
        },
        exitLeft: {
            x: -300,
            opacity: 0,
            transition: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.3,
            },
        },
    };

    return (
        <div className="md:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Desktop Layout - Side by side */}
                <div className="hidden md:flex justify-center items-center gap-12 relative">
                    {/* Left Arrow Button - Only visible on XL screens */}
                    <button
                        onClick={() => handleArrowNavigation("prev")}
                        disabled={isAnimating}
                        className="hidden lg:flex 2xl:hidden items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </button>

                    {/* Music Player - Center */}
                    <div className="flex-1 flex items-center justify-center">
                        <div
                            className="w-[380px] h-[400px] relative overflow-hidden"
                            style={{ perspective: "1200px" }}
                        >
                            <AnimatePresence
                                initial={false}
                                custom={slideDirection}
                                mode="popLayout"
                            >
                                <motion.div
                                    key={cardTheme}
                                    variants={slideVariants}
                                    initial={
                                        slideDirection === "right" ? "enterRight" : "enterLeft"
                                    }
                                    animate="center"
                                    exit={slideDirection === "right" ? "exitLeft" : "exitRight"}
                                    className="absolute inset-0 will-change-transform"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <MusicPlayer
                                        theme={cardTheme as "default" | "spotify" | "cosmic" | "midnight"}
                                        currentTrack={sampleTrack}
                                        queue={sampleQueue}
                                        currentIndex={0}
                                        initialTime={45}
                                        className="shadow-lg rounded-lg mr-1 scale-80 -mt-12"
                                        autoPlay={false}
                                        showEqualizer={true}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Arrow Button - Only visible on XL screens */}
                    <button
                        onClick={() => handleArrowNavigation("next")}
                        disabled={isAnimating}
                        className="hidden lg:flex 2xl:hidden items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </button>

                    {/* Theme Selection Buttons - Right Side (hidden on XL, shown on 2XL) */}
                    <div className="flex flex-col gap-4 lg:hidden 2xl:flex">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Choose Theme
                        </h3>
                        {themeOptions.map((option) => (
                            <button
                                key={option.value}
                                className={`flex bg-white dark:bg-black items-center gap-3 px-6 py-3 border rounded-xl transition-all duration-200 hover:scale-105 ${cardTheme === option.value
                                        ? `${borderColors[option.value] || borderColors.default
                                        } ${option.color} shadow-lg scale-105`
                                        : "border-gray-300 dark:border-gray-700 opacity-70 hover:opacity-100"
                                    }`}
                                onClick={() => handleThemeChange(option.value)}
                                disabled={isAnimating}
                            >
                                {option.icon}
                                <span className="text-base font-medium">{option.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Layout - Vertical */}
                <div className="md:hidden">
                    <div className="flex flex-col items-center mb-6">
                        <div className="flex gap-2 justify-center flex-wrap">
                            {themeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    className={`flex bg-white dark:bg-black items-center gap-1 px-3 py-1.5 border rounded-full transition-all ${cardTheme === option.value
                                            ? `${borderColors[option.value]} ${option.color}`
                                            : "border-gray-300 dark:border-gray-700 opacity-70 hover:opacity-100"
                                        }`}
                                    onClick={() => handleThemeChange(option.value)}
                                    disabled={isAnimating}
                                >
                                    {option.icon}
                                    <span className="text-xs font-medium">{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center px-4">
                        <div
                            className="w-full relative overflow-hidden"
                            style={{ perspective: "1200px" }}
                        >
                            <AnimatePresence
                                initial={false}
                                custom={slideDirection}
                                mode="popLayout"
                            >
                                <motion.div
                                    key={cardTheme}
                                    variants={slideVariants}
                                    initial={
                                        slideDirection === "right" ? "enterRight" : "enterLeft"
                                    }
                                    animate="center"
                                    exit={slideDirection === "right" ? "exitLeft" : "exitRight"}
                                    className="will-change-transform max-w-sm mx-auto"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <MusicPlayer
                                        theme={cardTheme as "default" | "spotify" | "cosmic" | "midnight"}
                                        currentTrack={sampleTrack}
                                        queue={sampleQueue}
                                        currentIndex={0}
                                        initialTime={45}
                                        className="shadow-lg rounded-lg"
                                        autoPlay={false}
                                        showEqualizer={true}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicCardThemeCustomizer;