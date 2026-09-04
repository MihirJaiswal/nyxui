import { MusicPlayer } from "@/registry/ui/music-player";
import type { Track } from "@/registry/ui/music-player";

export default function MusicPlayerDemo2() {
  const queue: Track[] = [
    {
      id: "1",
      title: "Sugar",
      artist: "Maroon 5",
      album: "V",
      artwork: "/assets/images/music-player/cover2.jpg",
      duration: 235,
    },
    {
      id: "2",
      title: "Payphone",
      artist: "Maroon 5",
      album: "Overexposed",
      artwork:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600",
      duration: 233,
    },
    {
      id: "3",
      title: "Animals",
      artist: "Maroon 5",
      album: "V",
      artwork:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600",
      duration: 231,
    },
    {
      id: "4",
      title: "Maps",
      artist: "Maroon 5",
      album: "V",
      artwork:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=600",
      duration: 189,
    },
    {
      id: "5",
      title: "One More Night",
      artist: "Maroon 5",
      album: "Overexposed",
      artwork:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600",
      duration: 235,
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto relative">
      <MusicPlayer
        currentTrack={queue[0]}
        queue={queue}
        currentIndex={0}
        initialTime={30}
        autoPlay={false}
        className="rounded-2xl"
      />
    </div>
  );
}
