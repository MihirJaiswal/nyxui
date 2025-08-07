import React from "react";
import InteractiveKeyboard from "../ui/keyboard";

function KeyboardDemo() {
  return (
    <div className="w-full max-w-[300px] 2xl:max-w-[400px] md:max-w-fullhost scale-30 sm:scale-65 md:scale-80 lg:scale-75 2xl:scale-100">
      <InteractiveKeyboard theme="cyberpunk" />
    </div>
  );
}

export default KeyboardDemo;
