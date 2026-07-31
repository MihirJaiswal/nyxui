"use client";
import { lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";

const MusicPlayer = lazy(() =>
  import("@/registry/ui/music-player").then((module) => ({
    default: module.MusicPlayer,
  })),
);

const MusicPlayerSkeleton = ({ className }: { className?: string }) => (
  <div
    className={`bg-zinc-900 ring-1 ring-white/10 rounded-[2rem] overflow-hidden shadow-lg w-full max-w-sm mx-auto ${className}`}
  >
    <div className="aspect-[4/5] w-full bg-zinc-800 animate-pulse" />
  </div>
);

const MusicCardThemeCustomizer = () => {
  const sampleTrack = {
    id: "blinding-lights",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    artwork: "/assets/images/landing-page/song.jpg",
    duration: 217,
  };

  return (
    <div className="md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center relative">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[380px] relative overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key="player"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="will-change-transform"
                >
                  <Suspense
                    fallback={
                      <MusicPlayerSkeleton className="scale-80 -mt-12" />
                    }
                  >
                    <MusicPlayer
                      currentTrack={sampleTrack}
                      currentIndex={0}
                      initialTime={45}
                      className="shadow-lg rounded-lg mr-1 scale-80 -mt-12"
                      autoPlay={false}
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
