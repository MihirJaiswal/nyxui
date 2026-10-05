"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type TypingWordsProps = {
  /** Words the headline cycles through. */
  words: string[];
  /** Index of the word the cycle starts at. */
  startIndex?: number;
  /** Time between each typed character, in ms. */
  typingSpeed?: number;
  /** Time between each deleted character, in ms. */
  deletingSpeed?: number;
  /** How long the fully-typed word holds before it starts deleting, in ms. */
  pauseAtEnd?: number;
  /** Per-character reveal duration, in seconds. */
  characterDuration?: number;
  /** Extra classes on the animated span. */
  className?: string;
};

export function TypingWords({
  words,
  startIndex = 0,
  typingSpeed = 50,
  deletingSpeed = typingSpeed,
  pauseAtEnd = 1000,
  characterDuration = 0.3,
  className,
}: TypingWordsProps) {
  const safeWords = words.length ? words : [""];
  const clampedStart = Math.max(0, Math.min(startIndex, safeWords.length - 1));
  const [currentWordIndex, setCurrentWordIndex] = useState(clampedStart);
  const [partialLength, setPartialLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const word = safeWords[currentWordIndex % safeWords.length] ?? "";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && partialLength < word.length) {
      timeout = setTimeout(() => {
        setPartialLength((prev) => prev + 1);
      }, typingSpeed);
    } else if (!isDeleting && partialLength === word.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAtEnd);
    } else if (isDeleting && partialLength > 0) {
      timeout = setTimeout(() => {
        setPartialLength((prev) => prev - 1);
      }, deletingSpeed);
    } else if (isDeleting && partialLength === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % safeWords.length);
    }
    return () => clearTimeout(timeout);
  }, [
    word,
    currentWordIndex,
    isDeleting,
    partialLength,
    safeWords.length,
    typingSpeed,
    deletingSpeed,
    pauseAtEnd,
  ]);

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="tracking-tighter">
        {word
          .substring(0, partialLength)
          .split("")
          .map((char, index) => (
            <motion.span
              key={`${index}-${char}`}
              initial={{ opacity: 0, rotateY: 90, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, rotateY: 0, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, rotateY: -90, y: -10, filter: "blur(10px)" }}
              transition={{ duration: characterDuration }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
      </span>
    </span>
  );
}

export default TypingWords;
