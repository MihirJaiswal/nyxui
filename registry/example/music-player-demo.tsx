import React from "react";
import { MusicPlayer } from "@/registry/ui/music-player";
import type { Track } from "@/registry/ui/music-player";

export default function MusicPlayerCardsDemo() {
  const queue: Track[] = [
    {
      id: "1",
      title: "Starboy",
      artist: "The Weeknd",
      album: "Starboy",
      artwork: "/assets/images/music-player/cover.jpg",
      duration: 267,
      url: "/assets/audio/song.mp3",
    },
    {
      id: "2",
      title: "claudes plan",
      artist: "Jeff Guo",
      artwork: "/assets/images/music-player/cover2.png",
      duration: 190,
      url: "/assets/audio/song2.mp3",
    },
    {
      id: "3",
      title: "Sugar",
      artist: "Maroon 5",
      album: "V",
      artwork: "/assets/images/music-player/cover2.jpg",
      duration: 235,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full relative">
      <div className="flex flex-col w-full max-w-sm">
        <MusicPlayer
          currentTrack={queue[0]}
          queue={queue}
          currentIndex={0}
          autoPlay={false}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}
