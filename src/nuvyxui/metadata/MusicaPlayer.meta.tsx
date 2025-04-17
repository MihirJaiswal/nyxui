import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { MusicPlayer } from "@/nuvyxui/components/MusicPlayer";
import MusicPlayerDemo from "@/nuvyxui/demos/MusicPlayerDemo";

import MusicPlayerSource from '!!raw-loader!@/nuvyxui/components/MusicPlayer.tsx';
import MusicPlayerDemoSource from '!!raw-loader!@/nuvyxui/demos/MusicPlayerDemo.tsx';

export const musicPlayerData: ComponentData = {
  name: "Music Player",
  description:
    "A customizable music player component with multiple themes, playback controls, progress tracking, and responsive design for creating music player interfaces.",
  preview: <MusicPlayerDemo />,
  usage: MusicPlayerDemoSource,
  componentCode: MusicPlayerSource,
  dependencies: [
    {
      name: "Lucide React",
      description: "Beautiful & consistent icon toolkit",
      install: {
        npm: "npm install lucide-react",
        pnpm: "pnpm add lucide-react",
        yarn: "yarn add lucide-react",
        bun: "bun add lucide-react",
      },
    },
  ],
  props: [
    {
      name: "MusicPlayer Props",
      items: [
        {
          name: "theme",
          type: 'string',
          default: '"default"',
          description: "Visual theme of the music player (default, spotify, cosmic, nebula, or custom)."
        },
        {
          name: "shadow",
          type: "boolean",
          default: "true",
          description: "Whether to display shadow effect on the player."
        },
        {
          name: "rounded",
          type: 'string',
          default: '"xl"',
          description: "Corner radius of the player component."
        },
        {
          name: "artwork",
          type: "string",
          default: '"/placeholder.svg"',
          description: "Path to the album artwork image."
        },
        {
          name: "trackTitle",
          type: "string",
          default: '"undefined"',
          description: "Title of the track being played."
        },
        {
          name: "artist",
          type: "string",
          default: '"undefined"',
          description: "Name of the artist or band."
        },
        {
          name: "album",
          type: "string",
          default: '"After Hours"',
          description: "Name of the album."
        },
        {
          name: "initialTime",
          type: "number",
          default: "0",
          description: "Initial playback position in seconds."
        },
        {
          name: "totalDuration",
          type: "number",
          default: "217",
          description: "Total duration of the track in seconds."
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply to the component."
        },
        {
          name: "autoPlay",
          type: "boolean",
          default: "false",
          description: "Whether to start playback automatically."
        },
        {
          name: "onPlayPause",
          type: "function",
          default: "undefined",
          description: "Callback function triggered when play/pause is toggled."
        },
        {
          name: "onTimeChange",
          type: "function",
          default: "undefined",
          description: "Callback function triggered when playback time changes."
        },
        {
          name: "onTrackEnd",
          type: "function",
          default: "undefined",
          description: "Callback function triggered when track playback ends."
        },
        {
          name: "controls",
          type: "{ shuffle?: boolean; repeat?: boolean; heart?: boolean; }",
          default: "{ shuffle: true, repeat: true, heart: true }",
          description: "Controls visibility of additional player controls."
        }
      ]
    }
  ],
  category: "Media",
  examples: [
    {
      name: "Default Theme Player",
      preview: (
        <div className="w-full max-w-xs mx-auto border border-gray-300 dark:border-gray-700 rounded-md">
          <MusicPlayer 
            theme="default"
            trackTitle="changes" 
            artist="XXXTENTACION" 
            album="?"
            rounded="md"
            artwork="/assets/images/music-player/cover.jpg"
          />
        </div>
      ),
      filename: "DefaultThemePlayer.tsx",
      code: `import { MusicPlayer } from "@/nuvyxui/components/MusicPlayer";
  
export function DefaultThemePlayer() {
  return (
    <div className="w-full max-w-xs mx-auto border border-gray-300 dark:border-gray-700 rounded-md">
          <MusicPlayer 
            theme="default"
            trackTitle="changes" 
            artist="XXXTENTACION" 
            album="?"
            rounded="md"
            artwork="/assets/images/music-player/cover.jpg"
          />
    </div>
  );
}`
    },
    {
      name: "Cosmic Theme with Custom Controls",
      preview: (
        <div className="w-full max-w-xs mx-auto border border-gray-300 dark:border-gray-700 rounded-2xl">
          <MusicPlayer 
            theme="cosmic"
            trackTitle="Sugar" 
            artist="Maroon 5" 
            album="V"
            artwork="/assets/images/music-player/cover2.jpg"
            rounded="2xl"
            shadow={true}
            controls={{
              shuffle: true,
              repeat: false,
              heart: true
            }}
          />
        </div>
      ),
      filename: "CosmicThemePlayer.tsx",
      code: `import { MusicPlayer } from "@/nuvyxui/components/MusicPlayer";
  
export function CosmicThemePlayer() {
  return (
    <div className="max-w-sm mx-auto">
      <MusicPlayer 
        theme="cosmic"
        trackTitle="Starboy" 
        artist="The Weeknd" 
        album="Starboy"
        artwork="/path/to/artwork.jpg"
        rounded="2xl"
        shadow={true}
        controls={{
          shuffle: true,
          repeat: false,
          heart: true
        }}
      />
    </div>
  );
}`
    }
  ]
};