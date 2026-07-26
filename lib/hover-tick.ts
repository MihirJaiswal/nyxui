"use client";

// ---- Hover tick sound -------------------------------------------------
// Uses the Web Audio API: the file at /public/sounds/tick.mp3 is fetched
// and decoded once into an AudioBuffer, then each hover spawns a fresh
// AudioBufferSourceNode. This is the reliable way to play a short SFX
// rapidly and overlapping — cloneNode() on an <audio> element does NOT
// share the decoded media data, so successive plays get dropped silently.
// playbackRate is nudged slightly per row so scanning down a list has a
// tiny ascending-pitch feel.

let audioContext: AudioContext | null = null;
let tickBuffer: AudioBuffer | null = null;
let tickLoadPromise: Promise<void> | null = null;

export const preloadTick = () => {
  if (typeof window === "undefined") return;
  if (!audioContext) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    audioContext = new Ctor();
  }
  if (!tickLoadPromise) {
    tickLoadPromise = fetch("/sounds/tick.mp3")
      .then((res) => res.arrayBuffer())
      .then((data) => audioContext!.decodeAudioData(data))
      .then((buf) => {
        tickBuffer = buf;
      })
      .catch(() => {
        // Allow a retry on a later gesture if decode failed.
        tickLoadPromise = null;
      });
  }
};

export const playHoverTick = (index: number) => {
  if (!audioContext) {
    // First user gesture — boot up the context + start decoding.
    preloadTick();
    return;
  }
  // AudioContext starts suspended until a user gesture occurs; mouseenter
  // counts, so resume here. This is browser autoplay policy, not a bug.
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  if (!tickBuffer) return; // still decoding from the first gesture

  const source = audioContext.createBufferSource();
  source.buffer = tickBuffer;
  // Small per-row variation, capped so it never gets too chipmunk-y or slow.
  source.playbackRate.value = Math.min(1.25, Math.max(0.85, 1 + index * 0.015));

  const gain = audioContext.createGain();
  gain.gain.value = 0.4;
  source.connect(gain);
  gain.connect(audioContext.destination);
  source.start();
};
