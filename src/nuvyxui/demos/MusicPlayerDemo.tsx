import React from 'react';
import { MusicPlayer } from '@/nuvyxui/components/MusicPlayer';

export default function MusicPlayerCardsDemo() {
  const albums = [
    {
      theme: "spotify",
      artwork: "/api/placeholder/400/400",
      trackTitle: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep",
      initialTime: 30,
      totalDuration: 194
    }
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center">
        {albums.map((album, index) => (
          <div key={index} className="flex flex-col">
            <MusicPlayer
              theme={album.theme}
              shadow={true}
              rounded="xl"
              artwork={album.artwork}
              trackTitle={album.trackTitle}
              artist={album.artist}
              album={album.album}
              initialTime={album.initialTime}
              totalDuration={album.totalDuration}
              controls={{
                shuffle: true,
                repeat: true,
                heart: true
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}