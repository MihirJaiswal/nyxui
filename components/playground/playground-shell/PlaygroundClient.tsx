"use client";

import { Suspense } from "react";
import { PlaygroundContent } from "./PlaygroundContent";
import { PlaygroundLoading } from "./PlaygroundEmptyState";

const PlaygroundClient = ({
  initialComponent,
}: {
  initialComponent?: string;
}) => {
  return (
    <Suspense fallback={<PlaygroundLoading />}>
      <PlaygroundContent initialComponent={initialComponent} />
    </Suspense>
  );
};

export default PlaygroundClient;
