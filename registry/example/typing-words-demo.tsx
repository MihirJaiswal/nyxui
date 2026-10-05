"use client";

import { TypingWords } from "@/registry/ui/typing-words";

export const TypingWordsDemo = () => {
  return (
    <div className="w-full bg-background px-4 py-16">
      <h1 className="text-center text-2xl font-bold md:text-5xl">
        Hey, I am a{" "}
        <TypingWords
          words={["Developer", "Designer", "Engineer", "Founder"]}
          startIndex={1}
          typingSpeed={70}
          deletingSpeed={35}
        />
      </h1>
    </div>
  );
};
