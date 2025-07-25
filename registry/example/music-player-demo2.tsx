import { MusicPlayer } from "../ui/music-player";
import type { Track } from "../ui/music-player";

export default function MusicPlayerDemo2() {
  const currentTrack: Track = {
    id: "1",
    title: "Sugar",
    artist: "Maroon 5",
    album: "V",
    artwork: "/assets/images/music-player/cover2.jpg",
    duration: 235, 
  };

  const queue: Track[] = [
    currentTrack,
    {
      id: "2",
      title: "Payphone",
      artist: "Maroon 5",
      album: "Overexposed",
      artwork: "/assets/images/music-player/cover3.jpg",
      duration: 231,
    },
    {
      id: "3",
      title: "Animals",
      artist: "Maroon 5",
      album: "V",
      artwork: "/assets/images/music-player/cover4.jpg",
      duration: 191,
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto border border-gray-300 dark:border-gray-700 rounded-2xl relative">
      <MusicPlayer
        currentTrack={currentTrack}
        queue={queue}
        currentIndex={0}
        initialTime={0}
        autoPlay={false}
        className="rounded-2xl"
      />
    </div>
  );
}