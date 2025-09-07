"use client";
import { useState, lazy, Suspense } from "react";
import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MusicPlayer = lazy(() => 
  import("@/registry/ui/music-player").then(module => ({ 
    default: module.MusicPlayer 
  }))
);

// Spotify-themed loading skeleton component
const MusicPlayerSkeleton = ({ className }: { className?: string }) => (
  <div className={`bg-green-50 dark:bg-black text-green-600 dark:text-green-500 border-2 border-green-400/40 shadow-2xl shadow-green-500/20 transition-all duration-500 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg w-full max-w-md mx-auto min-w-0 ${className}`}>
    {/* Artwork Section */}
    <div className="relative">
      <div className="w-full h-48 sm:h-60 relative overflow-hidden bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
        {/* Sample album image placeholder with Spotify colors */}
        <div className="w-full h-full bg-green-300 dark:bg-green-700 flex items-center justify-center">
          <div className="w-20 h-20 bg-green-500 dark:bg-green-400 rounded-full opacity-50"></div>
        </div>
        {/* Expand button skeleton */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 bg-black/40 rounded-full backdrop-blur-sm">
          <div className="h-3 w-3 sm:h-4 sm:w-4 bg-white/60 rounded"></div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex-1 min-w-0 pr-2 space-y-2">
          <div className="h-5 sm:h-6 bg-green-200 dark:bg-green-800 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-green-200 dark:bg-green-800 rounded animate-pulse w-1/2"></div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="relative h-1.5 sm:h-2 bg-green-200/30 dark:bg-green-800/30 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full w-1/3 animate-pulse"></div>
        </div>
        <div className="flex justify-between mt-1 sm:mt-2">
          <div className="h-3 bg-green-200 dark:bg-green-800 rounded animate-pulse w-8"></div>
          <div className="h-3 bg-green-200 dark:bg-green-800 rounded animate-pulse w-8"></div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse hidden sm:block"></div>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse hidden sm:block"></div>
        </div>
      </div>
    </div>
  </div>
);

const MusicCardThemeCustomizer = () => {
    const [cardTheme, setCardTheme] = useState("spotify");
    const [slideDirection, setSlideDirection] = useState("right");
    const [isAnimating, setIsAnimating] = useState(false);

    const sampleTrack = {
        id: "blinding-lights",
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        artwork: "/assets/images/landing-page/song.jpg",
        duration: 217,
    };

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

    // Get current theme info for mobile display
    const currentThemeOption = themeOptions.find(opt => opt.value === cardTheme);

    return (
        <div className="md:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="hidden md:flex justify-center items-center lg:gap-4 xl:gap-12 relative">
                    <button
                        onClick={() => handleArrowNavigation("prev")}
                        disabled={isAnimating}
                        className="hidden lg:flex 2xl:hidden items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <ChevronLeft className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                    </button>

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
                                    <Suspense fallback={
                                        <MusicPlayerSkeleton className="shadow-lg rounded-lg mr-1 scale-80 -mt-12" />
                                    }>
                                        <MusicPlayer
                                            theme={cardTheme as "default" | "spotify" | "cosmic" | "midnight"}
                                            currentTrack={sampleTrack}
                                            currentIndex={0}
                                            initialTime={45}
                                            className="shadow-lg rounded-lg mr-1 scale-80 -mt-12"
                                            autoPlay={false}
                                            showEqualizer={true}
                                        />
                                    </Suspense>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    <button
                        onClick={() => handleArrowNavigation("next")}
                        disabled={isAnimating}
                        className="hidden lg:flex 2xl:hidden items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <ChevronRight className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                    </button>
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

                <div className="md:hidden">
                    <div className="flex items-center justify-center gap-4 mb-6 px-4">
                        <button
                            onClick={() => handleArrowNavigation("prev")}
                            disabled={isAnimating}
                            className="flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                            <ChevronLeft className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                        </button>

                        {/* Current Theme Display */}
                        <div className={`flex items-center gap-3 px-6 py-3 bg-white dark:bg-black border rounded-xl shadow-md min-w-[140px] justify-center ${borderColors[cardTheme]} ${currentThemeOption?.color}`}>
                            {currentThemeOption?.icon}
                            <span className="text-base font-medium">{currentThemeOption?.name}</span>
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => handleArrowNavigation("next")}
                            disabled={isAnimating}
                            className="flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                        </button>
                    </div>

                    {/* Music Player */}
                    <div className="flex justify-center">
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
                                    <Suspense fallback={
                                        <MusicPlayerSkeleton className="shadow-lg rounded-lg" />
                                    }>
                                        <MusicPlayer
                                            theme={cardTheme as "default" | "spotify" | "cosmic" | "midnight"}
                                            currentTrack={sampleTrack}
                                            currentIndex={0}
                                            initialTime={45}
                                            className="shadow-lg rounded-lg"
                                            autoPlay={false}
                                            showEqualizer={true}
                                        />
                                    </Suspense>
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