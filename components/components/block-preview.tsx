"use client";

import { Index } from "../../__registry__";
import React from "react";

interface BlockPreviewProps {
  name: string;
}

export function BlockPreview({ name }: BlockPreviewProps) {
  const Component = Index[name]?.component;

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Component not found: {name}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen">
      <Component />
    </div>
  );
}
