"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Maximize2,
  Minimize2,
  List
} from "lucide-react";
import Image from "next/image";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  duration: number;
  url?: string;
}

export interface MusicPlayerProps {
  theme?: "default" | "spotify" | "cosmic" | "midnight";
  currentTrack?: Track;
  queue?: Track[];
  currentIndex?: number;
  initialTime?: number;
  className?: string;
  autoPlay?: boolean;
  showEqualizer?: boolean;
  onPlayPause?: (isPlaying: boolean) => void;
  onTimeChange?: (time: number) => void;
  onTrackEnd?: () => void;
  onTrackChange?: (track: Track, index: number) => void;
  onVolumeChange?: (volume: number) => void;
}

const defaultTrack: Track = {
  id: "default",
  title: "Sample Track",
  artist: "Sample Artist",
  album: "Sample Album",
  artwork: "",
  duration: 180,
};

export const MusicPlayer = ({
  theme = "default",
  currentTrack,
  queue = [],
  currentIndex = 0,
  initialTime = 0,
  className = "",
  autoPlay = false,
  showEqualizer = true,
  onPlayPause,
  onTimeChange,
  onTrackEnd,
  onTrackChange,
  onVolumeChange,
}: MusicPlayerProps) => {
  const track = currentTrack || defaultTrack;
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [equalizerBars, setEqualizerBars] = useState(Array(12).fill(0));
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCurrentTime((prev) => Math.max(0, prev - 10));
          break;
        case "ArrowRight":
          e.preventDefault();
          setCurrentTime((prev) => Math.min(track.duration, prev + 10));
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((prev) => Math.min(100, prev + 10));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((prev) => Math.max(0, prev - 10));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [track.duration]);

  // Equalizer animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && showEqualizer) {
      interval = setInterval(() => {
        setEqualizerBars((bars) => bars.map(() => Math.random() * 100));
      }, 150);
    } else {
      setEqualizerBars(Array(12).fill(0));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, showEqualizer]);

  // Time progression
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((time) => {
          if (time >= track.duration) {
            handleTrackEnd();
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
  }, [isPlaying, track.duration, onTimeChange]);

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

  const handleTrackEnd = () => {
    if (repeatMode === "one") {
      setCurrentTime(0);
      return;
    }

    if (repeatMode === "all" || currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1 >= queue.length ? 0 : currentIndex + 1;
      if (onTrackChange && queue[nextIndex]) {
        onTrackChange(queue[nextIndex], nextIndex);
      }
    } else {
      setIsPlaying(false);
    }
    if (onTrackEnd) onTrackEnd();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const { left, width } = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - left;
    const percentage = Math.max(0, Math.min(1, clickPosition / width));
    const newTime = Math.floor(track.duration * percentage);
    setCurrentTime(newTime);
    if (onTimeChange) onTimeChange(newTime);
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const { left, width } = progressRef.current.getBoundingClientRect();
    const hoverPosition = e.clientX - left;
    const percentage = Math.max(0, Math.min(1, hoverPosition / width));
    const hoverTimeValue = Math.floor(track.duration * percentage);
    setHoverTime(hoverTimeValue);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;
    const { top, height } = volumeRef.current.getBoundingClientRect();
    const clickPosition = e.clientY - top;
    const percentage = Math.max(0, Math.min(1, 1 - clickPosition / height));
    const newVolume = Math.floor(percentage * 100);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (onVolumeChange) onVolumeChange(newVolume);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (onVolumeChange) onVolumeChange(isMuted ? volume : 0);
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  const toggleRepeat = () => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
    const currentModeIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const skipTrack = (direction: "next" | "prev") => {
    if (!queue.length) return;

    let nextIndex;
    if (direction === "next") {
      nextIndex = isShuffled
        ? Math.floor(Math.random() * queue.length)
        : (currentIndex + 1) % queue.length;
    } else {
      nextIndex = isShuffled
        ? Math.floor(Math.random() * queue.length)
        : currentIndex === 0
          ? queue.length - 1
          : currentIndex - 1;
    }

    if (onTrackChange && queue[nextIndex]) {
      onTrackChange(queue[nextIndex], nextIndex);
    }
  };

  const getThemeStyles = () => {
    const baseStyles = "transition-all duration-500 backdrop-blur-sm";
    switch (theme) {
      case "spotify":
        return `bg-green-50 dark:bg-black text-green-600 dark:text-green-500 border-2 border-green-400/40 shadow-2xl shadow-green-500/20 ${baseStyles}`;
      case "cosmic":
        return `bg-gradient-to-br from-violet-900/95 via-purple-800/95 to-fuchsia-900/95 text-white border border-violet-400/40 shadow-2xl shadow-purple-500/20 ${baseStyles}`;
      case "midnight":
        return `bg-gradient-to-br from-slate-200 via-gray-200 to-zinc-200 dark:from-slate-900/95 dark:via-neutral-800/95 dark:to-zinc-900/95 text-black dark:text-white border border-slate-400/40 shadow-2xl shadow-slate-500/20 ${baseStyles}`;
      default:
        return `bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 dark:from-blue-900/95 dark:via-cyan-800/95 dark:to-teal-900/95 text-black dark:text-white border border-blue-400/40 shadow-2xl shadow-cyan-500/20 ${baseStyles}`;
    }
  };

  const getAccentColor = () => {
    switch (theme) {
      case "spotify":
        return "bg-green-500";
      case "cosmic":
        return "bg-violet-400";
      case "midnight":
        return "bg-zinc-400 dark:slate-400";
      default:
        return "bg-cyan-400";
    }
  };

  const getEqualizerColor = () => {
    switch (theme) {
      case "spotify":
        return "from-green-300 to-green-500";
      case "cosmic":
        return "from-violet-300 to-purple-500";
      case "midnight":
        return "from-slate-200 to-gray-400";
      default:
        return "from-indigo-300 to-purple-500";
    }
  };

  if (!mounted) return null;

  return (
    <div
      className={`${getThemeStyles()} ${className} rounded-2xl overflow-hidden shadow-lg w-full max-w-md mx-auto min-w-0`}
    >
      {/* Artwork Section */}
      <div className="relative">
        <div
          className={`w-full transition-all duration-500 ${isExpanded ? "h-96" : "h-48 sm:h-60"} relative overflow-hidden`}
        >
          <Image
            src={track.artwork}
            alt={`${track.title} by ${track.artist}`}
            fill
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${isExpanded ? "from-transparent" : "from-black/80"} via-transparent to-transparent`}
          ></div>
          {/* Equalizer Overlay */}
          {showEqualizer && isPlaying && (
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex items-end gap-0.5 sm:gap-1 opacity-80">
              {equalizerBars.map((height, i) => (
                <div
                  key={i}
                  className={`w-1 sm:w-1.5 bg-gradient-to-t ${getEqualizerColor()} rounded-full transition-all duration-150 shadow-sm`}
                  style={{ height: `${Math.max(4, height * 0.3)}px` }}
                />
              ))}
            </div>
          )}

          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors"
          >
            {isExpanded ? (
              <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex-1 min-w-0 pr-2">
            <h1 className="text-lg sm:text-xl font-bold mb-1 truncate">{track.title}</h1>
            <p className="text-xs sm:text-sm opacity-70 truncate">
              {track.artist} • {track.album}
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 duration-300 ${
                liked
                  ? "text-red-500 drop-shadow-lg"
                  : "text-black/40 dark:text-white/60 hover:text-white"
              }`}
            >
              <Heart
                className={`h-4 w-4 sm:h-5 sm:w-5 ${liked ? "fill-current drop-shadow-sm" : ""}`}
              />
            </button>
            <button className="p-1.5 sm:p-2 rounded-full text-black/40 hover:text-black/60 dark:text-white/60 dark:hover:text-white transition-colors">
              <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-6">
          <div
            ref={progressRef}
            className="relative h-1.5 sm:h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden cursor-pointer group backdrop-blur-sm border border-white/5"
            onClick={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseLeave={() => setHoverTime(null)}
          >
            <div
              className={`absolute top-0 left-0 h-full ${getAccentColor().split(" ")[0]} rounded-full transition-all`}
              style={{ width: `${(currentTime / track.duration) * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg border-2 border-white/20"
              style={{
                left: `${(currentTime / track.duration) * 100}%`,
                marginLeft: "-6px",
              }}
            />
            {hoverTime !== null && (
              <div
                className="absolute -top-8 sm:-top-10 bg-black/90 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg pointer-events-none backdrop-blur-sm border border-white/10"
                style={{
                  left: `${(hoverTime / track.duration) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {formatTime(hoverTime)}
              </div>
            )}
          </div>
          <div className="flex justify-between mt-1 sm:mt-2 text-xs opacity-70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={`p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 ${
                isShuffled
                  ? `text-black dark:text-white`
                  : "text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
              }`}
            >
              <Shuffle className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={toggleRepeat}
              className={`p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 relative ${
                repeatMode !== "off"
                  ? "text-black dark:text-white"
                  : "text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
              }`}
            >
              <Repeat className="h-3 w-3 sm:h-4 sm:w-4" />
              {repeatMode === "one" && (
                <span className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={() => skipTrack("prev")}
              className="p-1.5 sm:p-2 text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all hover:scale-110"
              disabled={!queue.length}
            >
              <SkipBack className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              onClick={togglePlay}
              className={`p-3 sm:p-4 rounded-full ${getAccentColor()} text-black hover:scale-105 transition-all duration-300 hover:shadow-xl flex-shrink-0`}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 sm:h-6 sm:w-6 fill-black" />
              ) : (
                <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5 fill-black" />
              )}
            </button>

            <button
              onClick={() => skipTrack("next")}
              className="p-1.5 sm:p-2 text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all hover:scale-110"
              disabled={!queue.length}
            >
              <SkipForward className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1 sm:gap-3 relative flex-shrink-0">
            <button
              onClick={toggleVolumeSlider}
              className="p-1.5 sm:p-3 rounded-full text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all hover:scale-110"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </button>

            {/* Vertical Volume Slider */}
            {showVolumeSlider && (
              <div className="absolute bottom-full mb-2 right-0 bg-black/90 p-2 sm:p-3 rounded-xl backdrop-blur-sm border border-white/10 z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xs text-white/70">
                    {isMuted ? 0 : volume}%
                  </div>
                  <div
                    ref={volumeRef}
                    className="w-1.5 sm:w-2 h-16 sm:h-20 bg-white/20 rounded-full cursor-pointer border border-white/5 relative"
                    onClick={handleVolumeChange}
                  >
                    <div
                      className={`absolute bottom-0 w-full ${getAccentColor().split(" ")[0]} rounded-full transition-all`}
                      style={{ height: `${isMuted ? 0 : volume}%` }}
                    />
                  </div>
                  <button
                    onClick={toggleMute}
                    className="p-1 rounded text-white/60 hover:text-white transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    ) : (
                      <Volume2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    )}
                  </button>
                </div>
              </div>
            )}
            <button className="p-1.5 sm:p-2 rounded-full text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all hover:scale-110">
              <List className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};