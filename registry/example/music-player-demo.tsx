import React from "react";
import { MusicPlayer } from "../ui/music-player";
import type { Track } from "../ui/music-player";

export default function MusicPlayerCardsDemo() {
  const currentTrack: Track = {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    artwork: "/assets/images/music-player/song.jpg",
    duration: 194, // 3:14 in seconds
  };

  const queue: Track[] = [currentTrack];

  return (
    <div className="flex flex-col items-center w-full relative">
      <div className="flex flex-col w-full max-w-sm">
        <MusicPlayer
          theme="spotify"
          currentTrack={currentTrack}
          queue={queue}
          currentIndex={0}
          initialTime={30}
          autoPlay={false}
          showEqualizer={true}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}