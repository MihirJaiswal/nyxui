"use client";
import React, { useId } from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Repeat,
  Repeat1,
  Shuffle,
  Volume2,
  VolumeX,
  List,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  artwork: string;
  duration: number;
  url?: string;
}

export interface MusicPlayerProps {
  currentTrack?: Track;
  queue?: Track[];
  currentIndex?: number;
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
  artwork:
    "https://images.unsplash.com/photo-1760925897293-feeaf8165324?q=80&w=800",
  duration: 180,
};

const ACCENT = "#ffffff";

const morphTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

const waveKeyframes = `
@keyframes nyxWave0 { 0%,100%{height:4px} 25%{height:14px} 50%{height:8px} 75%{height:12px} }
@keyframes nyxWave1 { 0%,100%{height:14px} 25%{height:8px} 50%{height:12px} 75%{height:4px} }
@keyframes nyxWave2 { 0%,100%{height:8px} 25%{height:12px} 50%{height:4px} 75%{height:14px} }
@keyframes nyxWave3 { 0%,100%{height:12px} 25%{height:4px} 50%{height:14px} 75%{height:8px} }
.nyx-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.nyx-no-scrollbar::-webkit-scrollbar { display: none; }
`;

const WaveBars = ({
  playing,
  color = ACCENT,
  height = 14,
}: {
  playing: boolean;
  color?: string;
  height?: number;
}) => (
  <div className="flex items-end gap-0.5" style={{ height }}>
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="w-0.5 rounded-sm"
        style={{
          backgroundColor: color,
          height,
          animation: `nyxWave${i} 1s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
          animationPlayState: playing ? "running" : "paused",
        }}
      />
    ))}
  </div>
);

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" + sec : sec}`;
};

export const MusicPlayer = ({
  currentTrack,
  queue = [],
  currentIndex = 0,
  className = "",
  autoPlay = false,
  showEqualizer = true,
  onPlayPause,
  onTimeChange,
  onTrackEnd,
  onTrackChange,
  onVolumeChange,
}: MusicPlayerProps) => {
  const uid = useId();
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [mounted, setMounted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const volumeContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track =
    queue.length > 0
      ? (queue[activeIndex] ?? currentTrack ?? defaultTrack)
      : (currentTrack ?? defaultTrack);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasAudio = !!track.url;
  const audioUrl = track.url;

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio && track.url) {
      if (audio.paused) {
        audio.play().catch(() => {});
        setIsPlaying(true);
        onPlayPause?.(true);
      } else {
        audio.pause();
        setIsPlaying(false);
        onPlayPause?.(false);
      }
    } else {
      setIsPlaying((p) => {
        onPlayPause?.(!p);
        return !p;
      });
    }
  }, [onPlayPause, track.url]);

  const handleTrackEnd = useCallback(() => {
    if (repeatMode === "one") {
      setCurrentTime(0);
      return;
    }
    if (repeatMode === "all" || activeIndex < queue.length - 1) {
      const next = activeIndex + 1 >= queue.length ? 0 : activeIndex + 1;
      setActiveIndex(next);
      setCurrentTime(0);
      onTrackChange?.(queue[next], next);
    } else {
      setIsPlaying(false);
    }
    onTrackEnd?.();
  }, [repeatMode, activeIndex, queue, onTrackChange, onTrackEnd]);

  // Sync real audio element events when url-based playback is used
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      onTimeChange?.(audio.currentTime);
    };
    const onEnded = () => handleTrackEnd();
    const onLoadedMetadata = () => {
      if (isPlaying) audio.play().catch(() => {});
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [audioUrl, isPlaying, onTimeChange, handleTrackEnd]);

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      const ev = isMuted ? 0 : volume;
      audioRef.current.volume = ev / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted, audioUrl]);

  // Reset time when track changes
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.currentTime = 0;
    }
    if (!audioUrl) {
      setCurrentTime(0);
    }
  }, [audioUrl]);

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
          setCurrentTime((p) => Math.max(0, p - 10));
          break;
        case "ArrowRight":
          e.preventDefault();
          setCurrentTime((p) => Math.min(track.duration, p + 10));
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((p) => Math.min(100, p + 10));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((p) => Math.max(0, p - 10));
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [track.duration, togglePlay]);

  // Time progression (only for simulated playback — real audio uses timeupdate event)
  useEffect(() => {
    if (!isPlaying || hasAudio) return;
    const interval = setInterval(() => {
      setCurrentTime((time) => {
        if (time >= track.duration) {
          handleTrackEnd();
          return 0;
        }
        const n = time + 1;
        onTimeChange?.(n);
        return n;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, hasAudio, track.duration, onTimeChange, handleTrackEnd]);

  const seekTo = useCallback(
    (clientX: number) => {
      if (!progressRef.current) return;
      const { left, width } = progressRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - left) / width));
      const t = Math.floor(track.duration * pct);
      setCurrentTime(t);
      if (audioRef.current && track.url) {
        audioRef.current.currentTime = t;
      }
      onTimeChange?.(t);
    },
    [track.duration, track.url, onTimeChange],
  );

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const { left, width } = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - left) / width));
    setHoverTime(Math.floor(track.duration * pct));
  };

  const toggleMute = () => {
    setIsMuted((m) => {
      onVolumeChange?.(m ? volume : 0);
      return !m;
    });
  };

  // Close volume popover on outside click
  useEffect(() => {
    if (!showVolumeSlider) return;
    const handler = (e: MouseEvent) => {
      if (!volumeContainerRef.current) return;
      if (!volumeContainerRef.current.contains(e.target as Node)) {
        setShowVolumeSlider(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showVolumeSlider]);

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;
    const { top, height } = volumeRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, 1 - (e.clientY - top) / height));
    const v = Math.floor(pct * 100);
    setVolume(v);
    setIsMuted(v === 0);
    onVolumeChange?.(v);
  };

  const toggleRepeat = () => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
    setRepeatMode(modes[(modes.indexOf(repeatMode) + 1) % modes.length]);
  };

  const skipTrack = (dir: "next" | "prev") => {
    if (!queue.length) return;
    let next: number;
    if (dir === "next") {
      next = isShuffled
        ? Math.floor(Math.random() * queue.length)
        : (activeIndex + 1) % queue.length;
    } else {
      next = isShuffled
        ? Math.floor(Math.random() * queue.length)
        : activeIndex === 0
          ? queue.length - 1
          : activeIndex - 1;
    }
    setActiveIndex(next);
    setCurrentTime(0);
    onTrackChange?.(queue[next], next);
  };

  const selectFromQueue = (t: Track, i: number) => {
    setActiveIndex(i);
    setCurrentTime(0);
    onTrackChange?.(t, i);
    setShowQueue(false);
  };

  const progress = useMemo(
    () => (track.duration ? (currentTime / track.duration) * 100 : 0),
    [currentTime, track.duration],
  );

  if (!mounted) return null;

  const effectiveVolume = isMuted ? 0 : volume;

  return (
    <div className={cn("relative w-full max-w-sm mx-auto", className)}>
      <style>{waveKeyframes}</style>

      {track.url && (
        <audio
          ref={audioRef}
          src={track.url}
          preload="metadata"
          className="hidden"
        />
      )}

      <MotionConfig transition={morphTransition}>
        <motion.div className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {isCollapsed ? (
              /* ===== Collapsed: compact pill bar ===== */
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden rounded-2xl bg-black/70 ring-1 ring-white/10 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-3 p-2.5">
                  {/* Thumbnail — morphs into artwork (wrapper fixes img layoutId distortion) */}
                  <button
                    onClick={() => setIsCollapsed(false)}
                    className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10"
                  >
                    <motion.div
                      layoutId={`artwork-${uid}`}
                      transition={morphTransition}
                      className="absolute inset-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={track.artwork}
                        alt={track.title}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  </button>

                  {/* Title + artist — morphs into track info */}
                  <motion.button
                    layoutId={`track-info-${uid}`}
                    transition={morphTransition}
                    onClick={() => setIsCollapsed(false)}
                    className="flex min-w-0 flex-1 flex-col text-left"
                  >
                    <span className="flex items-center gap-2 truncate text-sm font-semibold text-white">
                      <span className="truncate">{track.title}</span>
                      {isPlaying && showEqualizer && (
                        <span className="flex-shrink-0">
                          <WaveBars
                            playing={isPlaying}
                            color={ACCENT}
                            height={10}
                          />
                        </span>
                      )}
                    </span>
                    <span className="truncate text-xs text-white/50">
                      {track.artist}
                    </span>
                  </motion.button>

                  {/* Mini progress */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tabular-nums text-white/40">
                      {formatTime(currentTime)}
                    </span>
                    <div className="h-1 w-12 overflow-hidden rounded-full bg-white/15">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Play/pause — morphs into dock play button */}
                  <motion.button
                    layoutId={`play-btn-${uid}`}
                    transition={morphTransition}
                    onClick={togglePlay}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-black"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 fill-black" />
                    ) : (
                      <Play className="ml-0.5 h-4 w-4 fill-black" />
                    )}
                  </motion.button>

                  {/* Expand */}
                  <button
                    onClick={() => setIsCollapsed(false)}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ===== Expanded: immersive card ===== */
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-zinc-900 ring-1 ring-white/10">
                  {/* Artwork — morphs from thumbnail (wrapper fixes img layoutId distortion) */}
                  <motion.div
                    layoutId={`artwork-${uid}`}
                    transition={morphTransition}
                    className="absolute inset-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={track.artwork}
                      alt={`${track.title} by ${track.artist}`}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>

                  {/* Scrims for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

                  {/* Top bar: collapse + volume */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <motion.button
                      onClick={() => setIsCollapsed(true)}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md ring-1 ring-white/15 transition-colors hover:bg-white/20"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.button>

                    {/* Volume button + popover */}
                    <div ref={volumeContainerRef} className="relative">
                      <button
                        onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md ring-1 ring-white/15 transition-colors hover:bg-white/20"
                      >
                        {effectiveVolume === 0 ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>

                      <AnimatePresence>
                        {showVolumeSlider && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.9 }}
                            className="absolute top-full right-0 mt-3 rounded-2xl bg-black/40 p-3 backdrop-blur-2xl ring-1 ring-white/15"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-xs tabular-nums text-white/60">
                                {effectiveVolume}
                              </span>
                              <div
                                ref={volumeRef}
                                className="relative h-24 w-2 cursor-pointer rounded-full bg-white/15"
                                onClick={handleVolumeChange}
                              >
                                <div
                                  className="absolute bottom-0 w-full rounded-full bg-white"
                                  style={{ height: `${effectiveVolume}%` }}
                                />
                              </div>
                              <button
                                onClick={toggleMute}
                                className="text-white/50 transition-colors hover:text-white"
                              >
                                {effectiveVolume === 0 ? (
                                  <VolumeX className="h-3.5 w-3.5" />
                                ) : (
                                  <Volume2 className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Track info — morphs from collapsed title */}
                  <motion.div
                    layoutId={`track-info-${uid}`}
                    transition={morphTransition}
                    className="absolute bottom-32 left-5 right-5"
                  >
                    <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
                      <span className="truncate drop-shadow-lg">
                        {track.title}
                      </span>
                      {isPlaying && showEqualizer && (
                        <span className="flex-shrink-0">
                          <WaveBars
                            playing={isPlaying}
                            color={ACCENT}
                            height={14}
                          />
                        </span>
                      )}
                    </h1>
                    <p className="mt-1 truncate text-sm text-white/70 drop-shadow-md">
                      {track.album
                        ? `${track.artist} • ${track.album}`
                        : track.artist}
                    </p>
                  </motion.div>

                  {/* Progress bar */}
                  <div className="absolute bottom-[5.5rem] left-5 right-5">
                    <div
                      ref={progressRef}
                      className="group relative h-1.5 cursor-pointer rounded-full bg-white/20"
                      onClick={(e) => seekTo(e.clientX)}
                      onMouseMove={handleProgressHover}
                      onMouseLeave={() => setHoverTime(null)}
                    >
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-white transition-[width] duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                      <div
                        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ left: `${progress}%`, marginLeft: "-6px" }}
                      />
                      {hoverTime !== null && (
                        <div
                          className="pointer-events-none absolute -top-8 rounded-md bg-black/90 px-1.5 py-0.5 text-[10px] text-white ring-1 ring-white/10"
                          style={{
                            left: `${(hoverTime / track.duration) * 100}%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          {formatTime(hoverTime)}
                        </div>
                      )}
                    </div>
                    <div className="mt-1.5 flex justify-between text-[10px] font-medium tabular-nums text-white/60">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(track.duration)}</span>
                    </div>
                  </div>

                  {/* Controls row: like + dock + collapse */}
                  <div className="absolute bottom-5 left-4 right-4 flex items-center justify-between">
                    {/* Like */}
                    <motion.button
                      onClick={() => setLiked(!liked)}
                      whileTap={{ scale: 0.8 }}
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-2xl ring-1 ring-white/15 transition-colors hover:bg-black/50"
                    >
                      <motion.span
                        animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="block"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            liked
                              ? "fill-rose-500 text-rose-500"
                              : "text-white",
                          )}
                        />
                      </motion.span>
                    </motion.button>

                    {/* Glass control dock */}
                    <div className="flex items-center gap-1 rounded-full bg-black/40 p-1.5 backdrop-blur-2xl ring-1 ring-white/15">
                      <button
                        onClick={() => setIsShuffled(!isShuffled)}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white",
                          isShuffled && "text-white",
                        )}
                        style={isShuffled ? { color: ACCENT } : undefined}
                      >
                        <Shuffle className="h-3.5 w-3.5" />
                      </button>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => skipTrack("prev")}
                        disabled={queue.length === 0}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-30"
                      >
                        <SkipBack className="h-5 w-5 fill-current" />
                      </motion.button>

                      {/* Play/pause — morphs from collapsed play button */}
                      <motion.button
                        layoutId={`play-btn-${uid}`}
                        transition={morphTransition}
                        onClick={togglePlay}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {isPlaying ? (
                            <motion.span
                              key="pause"
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.4, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Pause className="h-5 w-5 fill-black" />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="play"
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.4, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Play className="ml-0.5 h-5 w-5 fill-black" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => skipTrack("next")}
                        disabled={queue.length === 0}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-30"
                      >
                        <SkipForward className="h-5 w-5 fill-current" />
                      </motion.button>
                      <button
                        onClick={toggleRepeat}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
                        style={
                          repeatMode !== "off" ? { color: ACCENT } : undefined
                        }
                      >
                        {repeatMode === "one" ? (
                          <Repeat1 className="h-3.5 w-3.5" />
                        ) : (
                          <Repeat className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Queue toggle */}
                    <motion.button
                      onClick={() => setShowQueue(!showQueue)}
                      disabled={queue.length === 0}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-2xl ring-1 ring-white/15 transition-colors hover:bg-black/50 disabled:opacity-30"
                      style={showQueue ? { color: ACCENT } : undefined}
                    >
                      <List className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Queue panel */}
                <AnimatePresence>
                  {showQueue && queue.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl"
                    >
                      <div className="p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-white">
                            Up Next · {queue.length}
                          </h3>
                          <button
                            onClick={() => setShowQueue(false)}
                            className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="nyx-no-scrollbar max-h-64 space-y-1 overflow-y-auto pr-1">
                          {queue.map((qt, index) => {
                            const active = index === activeIndex;
                            return (
                              <motion.button
                                key={qt.id}
                                onClick={() => selectFromQueue(qt, index)}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                  "flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-white/5",
                                  active && "bg-white/10",
                                )}
                              >
                                <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={qt.artwork}
                                    alt={qt.title}
                                    className="h-full w-full object-cover"
                                  />
                                  {active && isPlaying && showEqualizer && (
                                    <div className="absolute inset-0 flex items-end justify-center bg-black/50 pb-1.5">
                                      <WaveBars
                                        playing={isPlaying}
                                        color={ACCENT}
                                        height={12}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p
                                    className={cn(
                                      "truncate text-sm",
                                      active ? "text-white" : "text-white/80",
                                    )}
                                    style={
                                      active ? { color: ACCENT } : undefined
                                    }
                                  >
                                    {qt.title}
                                  </p>
                                  <p className="truncate text-xs text-white/40">
                                    {qt.artist}
                                  </p>
                                </div>
                                <span className="flex-shrink-0 text-xs tabular-nums text-white/40">
                                  {formatTime(qt.duration)}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </MotionConfig>
    </div>
  );
};

export default MusicPlayer;
