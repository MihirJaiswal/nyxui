"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Repeat,
  Shuffle,
} from "lucide-react";
import Image from "next/image";

export interface MusicPlayerProps {
  theme?: "default" | "spotify" | "cosmic" | "nebula" | string;
  artwork?: string;
  trackTitle?: string;
  artist?: string;
  album?: string;
  initialTime?: number;
  totalDuration?: number;
  className?: string;
  autoPlay?: boolean;
  onPlayPause?: (isPlaying: boolean) => void;
  onTimeChange?: (time: number) => void;
  onTrackEnd?: () => void;
  controls?: {
    shuffle?: boolean;
    repeat?: boolean;
    heart?: boolean;
  };
}

export const MusicPlayer = ({
  theme = "default",
  artwork = "/api/placeholder/400/400",
  trackTitle = "undefined",
  artist = "undefined",
  album = "undefined",
  initialTime = 0,
  totalDuration = 217,
  className = "",
  autoPlay = false,
  onPlayPause,
  onTimeChange,
  onTrackEnd,
  controls = {
    shuffle: true,
    repeat: true,
    heart: true,
  },
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          if (time >= totalDuration) {
            setIsPlaying(false);
            if (onTrackEnd) onTrackEnd();
            return 0;
          }
          const newTime = time + 1;
          if (onTimeChange) onTimeChange(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalDuration, onTimeChange, onTrackEnd]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const togglePlay = () => {
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);
    if (onPlayPause) onPlayPause(newPlayState);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const { left, width } = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - left;
    const percentage = clickPosition / width;
    const newTime = Math.floor(totalDuration * percentage);

    setCurrentTime(newTime);
    if (onTimeChange) onTimeChange(newTime);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const getThemeStyles = () => {
    const baseStyles = "transition-all duration-300";
    switch (theme) {
      case "spotify":
        return `
          bg-white text-green-600 border-2 border-green-400
          dark:bg-black dark:text-green-400 dark:border-green-400
          ${baseStyles}
        `
          .replace(/\s+/g, " ")
          .trim();

      case "cosmic":
        return `
          bg-indigo-50 text-indigo-900 border border-indigo-200
          dark:bg-gradient-to-br dark:from-indigo-950 dark:to-blue-950 dark:text-white dark:border-indigo-300
          ${baseStyles}
        `
          .replace(/\s+/g, " ")
          .trim();

      case "nebula":
        return `
          bg-purple-100 text-purple-700 border border-purple-300
          dark:bg-gradient-to-br dark:from-purple-900 dark:to-indigo-900
          dark:text-purple-200 dark:border-purple-600
          ${baseStyles}
        `
          .replace(/\s+/g, " ")
          .trim();

      default:
        return `
          bg-white text-zinc-900
          dark:bg-zinc-900 dark:text-white
          ${baseStyles}
        `
          .replace(/\s+/g, " ")
          .trim();
    }
  };

  const getThemeColor = () => {
    switch (theme) {
      case "spotify":
        return "bg-green-500";
      case "cosmic":
        return "bg-indigo-500";
      case "nebula":
        return "bg-purple-500";
      default:
        return "bg-white";
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={`${getThemeStyles()} ${className} overflow-hidden`}>
      <div className="w-full h-44 relative">
        <Image
          src={artwork}
          alt={`${trackTitle} by ${artist}`}
          width={400}
          height={256}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      <div className="p-6 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold mb-1">{trackTitle}</h1>
            <p className="text-sm opacity-70">
              {artist} • {album}
            </p>
          </div>
          {controls.heart && (
            <button
              onClick={toggleLike}
              aria-label="Like"
              className={`transition-colors hover:scale-105 ${
                liked ? "text-red-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
            </button>
          )}
        </div>
        <div className="mb-2">
          <div
            className="relative h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className={`absolute top-0 left-0 h-full ${getThemeColor()} rounded-full`}
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs opacity-70">
              {formatTime(currentTime)}
            </span>
            <span className="text-xs opacity-70">
              {formatTime(totalDuration)}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            {controls.shuffle && (
              <button
                aria-label="Shuffle"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Shuffle className="h-5 w-5" />
              </button>
            )}
            <div className="flex items-center gap-5">
              <button
                aria-label="Skip Back"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <SkipBack className="h-6 w-6" />
              </button>
              <button
                aria-label="Play/Pause"
                className={`${getThemeColor()} text-black rounded-full p-3 hover:scale-105 transition-transform`}
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 fill-current" />
                )}
              </button>
              <button
                aria-label="Skip Forward"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <SkipForward className="h-6 w-6" />
              </button>
            </div>
            {controls.repeat && (
              <button
                aria-label="Repeat"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Repeat className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
