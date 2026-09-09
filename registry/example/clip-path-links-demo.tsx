"use client";

import {
  SiAppletv,
  SiDiscord,
  SiHbo,
  SiNetflix,
  SiPlex,
  SiParamountplus,
  SiPrimevideo,
  SiTwitch,
  SiYoutube,
} from "react-icons/si";
import {
  ClipPathGrid,
  ClipPathRow,
  ClipPathTile,
} from "@/registry/blocks/clip-path-links";

export const ClipPathLinksDemo = () => {
  return (
    <div className="w-full bg-background px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathGrid>
          <ClipPathRow className="grid-cols-2">
            <ClipPathTile href="#netflix">
              <SiNetflix className="text-2xl" />
            </ClipPathTile>
            <ClipPathTile href="#hbo">
              <SiHbo className="text-3xl" />
            </ClipPathTile>
          </ClipPathRow>
          <ClipPathRow className="grid-cols-4">
            <ClipPathTile href="#paramount">
              <SiParamountplus className="text-lg sm:text-xl lg:text-2xl" />
            </ClipPathTile>
            <ClipPathTile href="#plex">
              <SiPlex className="text-4xl" />
            </ClipPathTile>
            <ClipPathTile href="#prime">
              <SiPrimevideo className="text-5xl sm:text-6xl lg:text-7xl" />
            </ClipPathTile>
            <ClipPathTile href="#appletv">
              <SiAppletv className="text-4xl" />
            </ClipPathTile>
          </ClipPathRow>
          <ClipPathRow className="grid-cols-3">
            <ClipPathTile href="#youtube">
              <SiYoutube className="text-2xl" />
            </ClipPathTile>
            <ClipPathTile href="#twitch">
              <SiTwitch className="text-2xl" />
            </ClipPathTile>
            <ClipPathTile href="#discord">
              <SiDiscord className="text-2xl" />
            </ClipPathTile>
          </ClipPathRow>
        </ClipPathGrid>
      </div>
    </div>
  );
};
