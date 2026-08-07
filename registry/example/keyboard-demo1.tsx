import React from "react";
import InteractiveKeyboard from "@/registry/ui/keyboard";

export default function KeyboardDemo1() {
  return (
    <div className="w-fit max-w-full">
      <InteractiveKeyboard theme="neon" layout="compact" />
    </div>
  );
}
