import { MusicPlayer } from "../ui/music-player";

export default function MusicPlayerDemo2() {
  return (
    <div className="w-full max-w-xs mx-auto border border-gray-300 dark:border-gray-700 rounded-2xl relative">
      <MusicPlayer
        theme="cosmic"
        trackTitle="Sugar"
        artist="Maroon 5"
        album="V"
        artwork="/assets/images/music-player/cover2.jpg"
        className="rounded-2xl"
        controls={{
          shuffle: true,
          repeat: false,
          heart: true,
        }}
      />
    </div>
  );
}
