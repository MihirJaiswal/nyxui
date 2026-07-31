import { MusicPlayer } from "@/registry/ui/music-player";
import type { Track } from "@/registry/ui/music-player";

export default function MusicPlayerDemo1() {
  const currentTrack: Track = {
    id: "1",
    title: "Changes",
    artist: "XXXTENTACION",
    album: "?",
    artwork: "/assets/images/music-player/cover.jpg",
    duration: 166,
  };

  return (
    <div className="w-full max-w-sm mx-auto rounded-md relative">
      <MusicPlayer
        currentTrack={currentTrack}
        initialTime={62}
        autoPlay={false}
        className="rounded-xl"
      />
    </div>
  );
}
