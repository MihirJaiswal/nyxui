import { MusicPlayer, Track } from "../ui/music-player";

export default function MusicPlayerDemo1() {

  const currentTrack: Track = {
    id: "1",
    title: "Changes",
    artist: "XXXTENTACION",
    album: "?",
    artwork: "/assets/images/music-player/cover.jpg",
    duration: 194, 
  };
  return (
    <div className="w-full max-w-sm mx-auto rounded-md relative">
      <MusicPlayer
        theme="midnight"
        currentTrack={currentTrack}
          currentIndex={0}
          initialTime={30}
          autoPlay={false}
          showEqualizer={true}
          className="rounded-xl"
      />
    </div>
  );
}
