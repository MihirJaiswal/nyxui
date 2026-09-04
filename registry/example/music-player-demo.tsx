import React from "react";
import { MusicPlayer } from "@/registry/ui/music-player";
import type { Track } from "@/registry/ui/music-player";

export default function MusicPlayerCardsDemo() {
  const currentTrack: Track = {
    id: "1",
    title: "Something Just Like This",
    artist: "Coldplay and The Chainsmokers",
    artwork: "/assets/images/music-player/cover.webp",
    duration: 408,
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      <div className="flex flex-col w-full max-w-sm">
        <MusicPlayer
          currentTrack={currentTrack}
          initialTime={45}
          autoPlay={false}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}
