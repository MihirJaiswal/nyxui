import { MusicPlayer } from "../components/music-player";

export default function MusicPlayerDemo1() {
  return (
    <div className="w-full max-w-xs mx-auto border border-gray-300 dark:border-gray-700 rounded-md">
      <MusicPlayer
        theme="default"
        trackTitle="changes"
        artist="XXXTENTACION"
        album="?"
        artwork="/assets/images/music-player/cover.jpg"
        className="rounded-xl"
      />
    </div>
  );
}
