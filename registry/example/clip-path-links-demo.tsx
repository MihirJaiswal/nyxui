"use client";

import {
  Blocks,
  BookOpen,
  Github,
  Layers,
  Palette,
  Sparkles,
  Terminal,
  Wand2,
  Wrench,
} from "lucide-react";
import {
  ClipPathGrid,
  ClipPathRow,
  ClipPathTile,
} from "@/registry/blocks/clip-path-links";

export const ClipPathLinksDemo = () => {
  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathGrid>
          <ClipPathRow className="grid-cols-2">
            <ClipPathTile href="#docs">
              <BookOpen className="text-xl sm:text-3xl lg:text-4xl" />
            </ClipPathTile>
            <ClipPathTile href="#playground">
              <Wand2 className="text-xl sm:text-3xl lg:text-4xl" />
            </ClipPathTile>
          </ClipPathRow>
          <ClipPathRow className="grid-cols-4">
            <ClipPathTile href="#components">
              <Layers className="text-xl sm:text-3xl lg:text-4xl" />
            </ClipPathTile>
            <ClipPathTile href="#blocks">
              <Blocks className="text-xl sm:text-3xl lg:text-4xl" />
            </ClipPathTile>
            <ClipPathTile href="#templates">
              <Palette className="text-xl sm:text-3xl lg:text-4xl" />
            </ClipPathTile>
            <ClipPathTile href="#effects">
              <Sparkles className="text-xl sm:text-3xl lg:text-4xl" />
            </ClipPathTile>
          </ClipPathRow>
          <ClipPathRow className="grid-cols-3">
            <ClipPathTile href="#cli">
              <Terminal className="text-xl sm:text-3xl lg:text-4xl" />
            </ClipPathTile>
            <ClipPathTile href="#tools">
              <Wrench className="text-xl sm:text-3xl lg:text-4xl" />
            </ClipPathTile>
            <ClipPathTile href="#github">
              <Github className="text-xl sm:text-3xl lg:text-4xl" />
            </ClipPathTile>
          </ClipPathRow>
        </ClipPathGrid>
      </div>
    </div>
  );
};
