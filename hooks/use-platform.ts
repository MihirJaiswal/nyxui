"use client";

import { useEffect, useState } from "react";

export type Platform =
  | "macos"
  | "ios"
  | "windows"
  | "android"
  | "linux"
  | "unknown";

interface PlatformInfo {
  platform: Platform;
  isMac: boolean;
  isIOS: boolean;
  isWindows: boolean;
  isAndroid: boolean;
  isLinux: boolean;
  /** macOS or iOS (Apple platforms). */
  isApple: boolean;
  /** Any mobile OS (iOS or Android). */
  isMobile: boolean;
  /** The mod key label for shortcuts: "⌘" on Apple, "Ctrl" elsewhere. */
  modKey: "⌘" | "Ctrl";
}

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";

  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() ?? "";

  // iPad on iOS 13+ reports as Mac, so also check for touch + Mac.
  const isIPad =
    /ipad/.test(ua) ||
    (platform === "macintel" && navigator.maxTouchPoints > 1);

  if (/iphone|ipod/.test(ua) || isIPad) return "ios";
  if (/android/.test(ua)) return "android";
  if (/mac/.test(platform) || /macintosh/.test(ua)) return "macos";
  if (/win/.test(platform) || /windows/.test(ua)) return "windows";
  if (/linux/.test(platform) || /linux/.test(ua)) return "linux";

  return "unknown";
}

function toInfo(platform: Platform): PlatformInfo {
  const isMac = platform === "macos";
  const isIOS = platform === "ios";
  const isWindows = platform === "windows";
  const isAndroid = platform === "android";
  const isLinux = platform === "linux";
  const isApple = isMac || isIOS;

  return {
    platform,
    isMac,
    isIOS,
    isWindows,
    isAndroid,
    isLinux,
    isApple,
    isMobile: isIOS || isAndroid,
    modKey: isApple ? "⌘" : "Ctrl",
  };
}

/**
 * Detect the user's OS/platform. Returns `unknown` during SSR and on
 * first render, then resolves to the detected platform after mount.
 */
export function usePlatform(): PlatformInfo {
  const [info, setInfo] = useState<PlatformInfo>(() =>
    toInfo(detectPlatform()),
  );

  useEffect(() => {
    setInfo(toInfo(detectPlatform()));
  }, []);

  return info;
}

export { detectPlatform };
