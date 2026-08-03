"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronsUp,
  Menu,
} from "lucide-react";

interface KeyObject {
  label?: string;
  sublabel?: string;
  code?: string;
  size: number;
  spacer?: boolean;
  type?: string;
  icon?: string;
  tone?: "accent" | "regular" | "utility";
}
interface KeyboardRow {
  function?: boolean;
  keys: KeyObject[];
  nav?: KeyObject[];
}
interface InteractiveKeyboardProps {
  layout?: "standard" | "compact";
  showFunctionKeys?: boolean;
  showNavigationCluster?: boolean;
  activeKeys?: string[];
  activeKeyGlowColor?: string;
  activeKeyGlowIntensity?: number;
  theme?: "cyberpunk" | "retro" | "neon" | "pastel";
  keyColor?: string;
  keyTextColor?: string;
  accentColor?: string;
  keyPressedColor?: string;
  keyPressAnimationDuration?: number;
  onKeyPress?: (code: string, key?: string) => void;
  onKeyRelease?: (code: string, key?: string) => void;
  className?: string;
  allowPhysicalKeyboard?: boolean;
  perspective?: number;
  rotateX?: number;
  [key: string]: unknown;
}

interface KeyStyleProps {
  background: string;
  color: string;
  boxShadow: string;
  textShadow?: string;
  border: string;
  fontFamily?: string;
  fontWeight?: string | number;
  fontSize?: string;
  borderRadius?: string;
  letterSpacing?: string;
  transform?: string;
  transition?: string;
  height?: string;
  marginBottom?: string;
  padding?: string;
  width?: string;
}

interface ThemeStyles {
  keyboard: {
    background: string;
    boxShadow: string;
    border: string;
    borderRadius?: string;
    marginBottom?: string;
    padding?: string;
    width?: string;
  };
  key: KeyStyleProps;
  keyPressed: KeyStyleProps;
  keyHover: KeyStyleProps;
  keyActive?: KeyStyleProps;
  specialKey?: KeyStyleProps;
  functionKey?: KeyStyleProps;
  modifierKey?: KeyStyleProps;
  spaceKey?: KeyStyleProps;
  arrowKey?: KeyStyleProps;
}

interface PhysicalKeyColors {
  bg: string;
  text: string;
  cap: string;
}

interface PhysicalTheme {
  accent: string;
  caseBg: string;
  caseBorder: string;
  plateBg: string;
  regular: PhysicalKeyColors;
  utility: PhysicalKeyColors;
}

type KeyVisualStyle = React.CSSProperties & Record<`--${string}`, string>;

const InteractiveKeyboard: React.FC<InteractiveKeyboardProps> = ({
  layout = "standard",
  showFunctionKeys = true,
  showNavigationCluster = true,
  activeKeys = [],
  activeKeyGlowColor = "#F57644",
  activeKeyGlowIntensity = 0.8,
  theme = "cyberpunk",
  keyColor = "#2a2a2a",
  keyTextColor = "#ffffff",
  accentColor = "#F57644",
  keyPressedColor = "#333333",
  keyPressAnimationDuration = 150,
  onKeyPress = () => {},
  onKeyRelease = () => {},
  className = "",
  allowPhysicalKeyboard = true,
  perspective = 1000,
  rotateX = 0,
  ...props
}) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const getKeyboardLayout = (): KeyboardRow[] => {
    switch (layout) {
      case "compact":
        return getCompactLayout();
      case "standard":
      default:
        return getStandardLayout();
    }
  };

  const getStandardLayout = (): KeyboardRow[] => {
    return [
      {
        function: true,
        keys: [
          { label: "Esc", code: "Escape", size: 1 },
          { spacer: true, size: 1 },
          { label: "F1", code: "F1", size: 1 },
          { label: "F2", code: "F2", size: 1 },
          { label: "F3", code: "F3", size: 1 },
          { label: "F4", code: "F4", size: 1 },
          { spacer: true, size: 0.5 },
          { label: "F5", code: "F5", size: 1 },
          { label: "F6", code: "F6", size: 1 },
          { label: "F7", code: "F7", size: 1 },
          { label: "F8", code: "F8", size: 1 },
          { spacer: true, size: 0.5 },
          { label: "F9", code: "F9", size: 1 },
          { label: "F10", code: "F10", size: 1 },
          { label: "F11", code: "F11", size: 1 },
          { label: "F12", code: "F12", size: 1 },
        ],
        nav: [{ type: "lights", size: 3, code: "lights" }],
      },
      {
        keys: [
          { label: "`", code: "Backquote", size: 1 },
          { label: "1", code: "Digit1", size: 1 },
          { label: "2", code: "Digit2", size: 1 },
          { label: "3", code: "Digit3", size: 1 },
          { label: "4", code: "Digit4", size: 1 },
          { label: "5", code: "Digit5", size: 1 },
          { label: "6", code: "Digit6", size: 1 },
          { label: "7", code: "Digit7", size: 1 },
          { label: "8", code: "Digit8", size: 1 },
          { label: "9", code: "Digit9", size: 1 },
          { label: "0", code: "Digit0", size: 1 },
          { label: "-", code: "Minus", size: 1 },
          { label: "=", code: "Equal", size: 1 },
          { label: "Backspace", code: "Backspace", size: 2 },
        ],
        nav: [
          { label: "Del", code: "Delete", size: 1 },
          { label: "End", code: "End", size: 1 },
          { label: "PgDn", code: "PageDown", size: 1 },
        ],
      },
      {
        keys: [
          { label: "Tab", code: "Tab", size: 1.5 },
          { label: "Q", code: "KeyQ", size: 1 },
          { label: "W", code: "KeyW", size: 1 },
          { label: "E", code: "KeyE", size: 1 },
          { label: "R", code: "KeyR", size: 1 },
          { label: "T", code: "KeyT", size: 1 },
          { label: "Y", code: "KeyY", size: 1 },
          { label: "U", code: "KeyU", size: 1 },
          { label: "I", code: "KeyI", size: 1 },
          { label: "O", code: "KeyO", size: 1 },
          { label: "P", code: "KeyP", size: 1 },
          { label: "[", code: "BracketLeft", size: 1 },
          { label: "]", code: "BracketRight", size: 1 },
          { label: "\\", code: "Backslash", size: 1.5 },
        ],
        nav: [
          { label: "Ins", code: "Insert", size: 1 },
          { label: "Home", code: "Home", size: 1 },
          { label: "PgUp", code: "PageUp", size: 1 },
        ],
      },
      {
        keys: [
          { label: "Caps", code: "CapsLock", size: 1.75, icon: "capslock" },
          { label: "A", code: "KeyA", size: 1 },
          { label: "S", code: "KeyS", size: 1 },
          { label: "D", code: "KeyD", size: 1 },
          { label: "F", code: "KeyF", size: 1 },
          { label: "G", code: "KeyG", size: 1 },
          { label: "H", code: "KeyH", size: 1 },
          { label: "J", code: "KeyJ", size: 1 },
          { label: "K", code: "KeyK", size: 1 },
          { label: "L", code: "KeyL", size: 1 },
          { label: ";", code: "Semicolon", size: 1 },
          { label: "'", code: "Quote", size: 1 },
          { label: "Enter", code: "Enter", size: 2.25 },
        ],
        nav: [
          { label: "Print", code: "PrintScreen", size: 1 },
          { label: "Scroll", code: "ScrollLock", size: 1 },
          { label: "Pause", code: "Pause", size: 1 },
        ],
      },
      {
        keys: [
          { label: "Shift", code: "ShiftLeft", size: 2.25 },
          { label: "Z", code: "KeyZ", size: 1 },
          { label: "X", code: "KeyX", size: 1 },
          { label: "C", code: "KeyC", size: 1 },
          { label: "V", code: "KeyV", size: 1 },
          { label: "B", code: "KeyB", size: 1 },
          { label: "N", code: "KeyN", size: 1 },
          { label: "M", code: "KeyM", size: 1 },
          { label: ",", code: "Comma", size: 1 },
          { label: ".", code: "Period", size: 1 },
          { label: "/", code: "Slash", size: 1 },
          { label: "Shift", code: "ShiftRight", size: 2.75 },
        ],
        nav: [
          { spacer: true, size: 1 },
          { label: "", code: "ArrowUp", size: 1, icon: "arrowup" },
          { spacer: true, size: 1 },
        ],
      },
      {
        keys: [
          { label: "Ctrl", code: "ControlLeft", size: 1.25 },
          { label: "", code: "MetaLeft", size: 1.25, icon: "windows" },
          { label: "Alt", code: "AltLeft", size: 1.25 },
          { label: "", code: "Space", size: 6.25 },
          { label: "Alt", code: "AltRight", size: 1.25 },
          { label: "", code: "MetaRight", size: 1.25, icon: "windows" },
          { label: "", code: "ContextMenu", size: 1.25, icon: "menu" },
          { label: "Ctrl", code: "ControlRight", size: 1.25 },
        ],
        nav: [
          { label: "", code: "ArrowLeft", size: 1, icon: "arrowleft" },
          { label: "", code: "ArrowDown", size: 1, icon: "arrowdown" },
          { label: "", code: "ArrowRight", size: 1, icon: "arrowright" },
        ],
      },
    ];
  };

  const getCompactLayout = (): KeyboardRow[] => {
    const navigationKeys: {
      functionEnd: KeyObject[];
      pageUp: KeyObject[];
      pageDown: KeyObject[];
      home: KeyObject[];
      end: KeyObject[];
      arrowUp: KeyObject[];
      arrows: KeyObject[];
    } = showNavigationCluster
      ? {
          functionEnd: [
            { label: "Print", code: "PrintScreen", size: 1, tone: "utility" },
            { label: "Del", code: "Delete", size: 1, tone: "utility" },
            { type: "light", size: 1, code: "light1" },
          ],
          pageUp: [{ label: "PgUp", code: "PageUp", size: 1, tone: "utility" }],
          pageDown: [
            { label: "PgDn", code: "PageDown", size: 1, tone: "utility" },
          ],
          home: [{ label: "Home", code: "Home", size: 1, tone: "utility" }],
          end: [{ label: "End", code: "End", size: 1, tone: "utility" }],
          arrowUp: [{ label: "", code: "ArrowUp", size: 1, icon: "arrowup" }],
          arrows: [
            { label: "", code: "ArrowLeft", size: 1, icon: "arrowleft" },
            { label: "", code: "ArrowDown", size: 1, icon: "arrowdown" },
            { label: "", code: "ArrowRight", size: 1, icon: "arrowright" },
          ],
        }
      : {
          functionEnd: [],
          pageUp: [],
          pageDown: [],
          home: [],
          end: [],
          arrowUp: [],
          arrows: [],
        };

    return [
      {
        function: true,
        keys: [
          { label: "Esc", code: "Escape", size: 1, tone: "accent" },
          { label: "F1", code: "F1", size: 1, tone: "regular" },
          { label: "F2", code: "F2", size: 1, tone: "regular" },
          { label: "F3", code: "F3", size: 1, tone: "regular" },
          { label: "F4", code: "F4", size: 1, tone: "regular" },
          { label: "F5", code: "F5", size: 1, tone: "utility" },
          { label: "F6", code: "F6", size: 1, tone: "utility" },
          { label: "F7", code: "F7", size: 1, tone: "utility" },
          { label: "F8", code: "F8", size: 1, tone: "utility" },
          { label: "F9", code: "F9", size: 1, tone: "utility" },
          { label: "F10", code: "F10", size: 1, tone: "regular" },
          { label: "F11", code: "F11", size: 1, tone: "regular" },
          { label: "F12", code: "F12", size: 1, tone: "regular" },
          ...navigationKeys.functionEnd,
        ],
      },
      {
        keys: [
          { label: "`", code: "Backquote", size: 1 },
          { label: "1", code: "Digit1", size: 1 },
          { label: "2", code: "Digit2", size: 1 },
          { label: "3", code: "Digit3", size: 1 },
          { label: "4", code: "Digit4", size: 1 },
          { label: "5", code: "Digit5", size: 1 },
          { label: "6", code: "Digit6", size: 1 },
          { label: "7", code: "Digit7", size: 1 },
          { label: "8", code: "Digit8", size: 1 },
          { label: "9", code: "Digit9", size: 1 },
          { label: "0", code: "Digit0", size: 1 },
          { label: "-", code: "Minus", size: 1 },
          { label: "=", code: "Equal", size: 1 },
          { label: "Backspace", code: "Backspace", size: 2, tone: "utility" },
          ...navigationKeys.pageUp,
        ],
      },
      {
        keys: [
          { label: "Tab", code: "Tab", size: 1.5, tone: "utility" },
          { label: "Q", code: "KeyQ", size: 1 },
          { label: "W", code: "KeyW", size: 1 },
          { label: "E", code: "KeyE", size: 1 },
          { label: "R", code: "KeyR", size: 1 },
          { label: "T", code: "KeyT", size: 1 },
          { label: "Y", code: "KeyY", size: 1 },
          { label: "U", code: "KeyU", size: 1 },
          { label: "I", code: "KeyI", size: 1 },
          { label: "O", code: "KeyO", size: 1 },
          { label: "P", code: "KeyP", size: 1 },
          { label: "[", code: "BracketLeft", size: 1 },
          { label: "]", code: "BracketRight", size: 1 },
          { label: "\\", code: "Backslash", size: 1.5, tone: "utility" },
          ...navigationKeys.pageDown,
        ],
      },
      {
        keys: [
          {
            label: "Caps",
            code: "CapsLock",
            size: 2,
            icon: "capslock",
            tone: "utility",
          },
          { label: "A", code: "KeyA", size: 1 },
          { label: "S", code: "KeyS", size: 1 },
          { label: "D", code: "KeyD", size: 1 },
          { label: "F", code: "KeyF", size: 1 },
          { label: "G", code: "KeyG", size: 1 },
          { label: "H", code: "KeyH", size: 1 },
          { label: "J", code: "KeyJ", size: 1 },
          { label: "K", code: "KeyK", size: 1 },
          { label: "L", code: "KeyL", size: 1 },
          { label: ";", code: "Semicolon", size: 1 },
          { label: "'", code: "Quote", size: 1 },
          { label: "Enter", code: "Enter", size: 2, tone: "utility" },
          ...navigationKeys.home,
        ],
      },
      {
        keys: [
          { label: "Shift", code: "ShiftLeft", size: 2.5, tone: "utility" },
          { label: "Z", code: "KeyZ", size: 1 },
          { label: "X", code: "KeyX", size: 1 },
          { label: "C", code: "KeyC", size: 1 },
          { label: "V", code: "KeyV", size: 1 },
          { label: "B", code: "KeyB", size: 1 },
          { label: "N", code: "KeyN", size: 1 },
          { label: "M", code: "KeyM", size: 1 },
          { label: ",", code: "Comma", size: 1 },
          { label: ".", code: "Period", size: 1 },
          { label: "/", code: "Slash", size: 1 },
          { label: "Shift", code: "ShiftRight", size: 1.5, tone: "utility" },
          ...navigationKeys.arrowUp,
          ...navigationKeys.end,
        ],
      },
      {
        keys: [
          { label: "Ctrl", code: "ControlLeft", size: 1.25, tone: "utility" },
          {
            label: "",
            code: "MetaLeft",
            size: 1.25,
            icon: "windows",
            tone: "utility",
          },
          {
            label: "Alt",
            code: "AltLeft",
            size: 1.25,
            tone: "utility",
          },
          { label: "", code: "Space", size: 5.25 },
          { label: "Alt", code: "AltRight", size: 1, tone: "utility" },
          {
            label: "",
            code: "MetaRight",
            size: 1,
            icon: "windows",
            tone: "utility",
          },
          {
            label: "",
            code: "ContextMenu",
            size: 1,
            icon: "menu",
            tone: "utility",
          },
          { label: "Ctrl", code: "ControlRight", size: 1, tone: "utility" },
          ...navigationKeys.arrows,
        ],
      },
    ];
  };

  useEffect(() => {
    if (!allowPhysicalKeyboard) return;

    const clearPressedKeys = () => {
      const keysToRelease = Array.from(pressedKeysRef.current);
      if (keysToRelease.length === 0) return;

      pressedKeysRef.current = new Set();
      setPressedKeys(new Set());
      keysToRelease.forEach((code) => onKeyRelease(code));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.add(e.code);
        pressedKeysRef.current = newSet;
        return newSet;
      });

      onKeyPress(e.code, e.key);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(e.code);
        if (
          e.key === "Meta" ||
          e.code === "MetaLeft" ||
          e.code === "MetaRight"
        ) {
          newSet.delete("MetaLeft");
          newSet.delete("MetaRight");
        }
        pressedKeysRef.current = newSet;
        return newSet;
      });
      onKeyRelease(e.code, e.key);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearPressedKeys();
      }
    };

    if (allowPhysicalKeyboard) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      window.addEventListener("blur", clearPressedKeys);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", clearPressedKeys);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [allowPhysicalKeyboard, onKeyPress, onKeyRelease]);

  const handleKeyDown = (code: string) => {
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.add(code);
      pressedKeysRef.current = newSet;
      return newSet;
    });

    onKeyPress(code);
  };

  const handleKeyUp = (code: string) => {
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(code);
      pressedKeysRef.current = newSet;
      return newSet;
    });

    onKeyRelease(code);
  };

  const getThemeStyles = (): ThemeStyles => ({
    keyboard: {
      background: physicalTheme.plateBg,
      boxShadow:
        "inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -8px 14px rgba(0, 0, 0, 0.18)",
      border: "1px solid " + physicalTheme.caseBorder,
      borderRadius: "5px",
    },
    key: {
      background: physicalTheme.regular.bg,
      color: physicalTheme.regular.text,
      boxShadow: "0 5px 0 rgba(0, 0, 0, 0.36)",
      textShadow: "none",
      border: "1px solid rgba(23, 23, 23, 0.78)",
      fontFamily: "DM Mono, SF Mono, IBM Plex Mono, monospace",
      fontWeight: 500,
      fontSize: "11px",
      borderRadius: "12px 12px 4px 4px",
      transition: "all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
    },
    keyPressed: {
      background: physicalTheme.utility.bg,
      color: physicalTheme.utility.text,
      boxShadow: "0 1px 0 rgba(0, 0, 0, 0.46)",
      textShadow: "none",
      border: "1px solid rgba(23, 23, 23, 0.78)",
      transform: "translateY(4px)",
      fontFamily: "DM Mono, SF Mono, IBM Plex Mono, monospace",
      fontWeight: 500,
      fontSize: "11px",
      borderRadius: "12px 12px 4px 4px",
      transition: "all 0.05s ease",
    },
    keyHover: {
      background: physicalTheme.regular.bg,
      color: physicalTheme.regular.text,
      boxShadow: "0 5px 0 rgba(0, 0, 0, 0.36)",
      textShadow: "none",
      border: "1px solid rgba(23, 23, 23, 0.78)",
    },
    keyActive: {
      background: activeKeyGlowColor,
      color: "rgba(0, 0, 0, 0.55)",
      boxShadow:
        "0 0 18px rgba(" +
        hexToRgb(activeKeyGlowColor) +
        ", " +
        activeKeyGlowIntensity +
        ")",
      textShadow: "none",
      border: "1px solid " + activeKeyGlowColor,
    },
    specialKey: {
      background: physicalTheme.utility.bg,
      color: physicalTheme.utility.text,
      boxShadow: "0 5px 0 rgba(0, 0, 0, 0.36)",
      textShadow: "none",
      border: "1px solid rgba(23, 23, 23, 0.78)",
    },
    functionKey: {
      background: physicalTheme.utility.bg,
      color: physicalTheme.utility.text,
      boxShadow: "0 5px 0 rgba(0, 0, 0, 0.36)",
      textShadow: "none",
      border: "1px solid rgba(23, 23, 23, 0.78)",
    },
    modifierKey: {
      background: physicalTheme.utility.bg,
      color: physicalTheme.utility.text,
      boxShadow: "0 5px 0 rgba(0, 0, 0, 0.36)",
      textShadow: "none",
      border: "1px solid rgba(23, 23, 23, 0.78)",
    },
    spaceKey: {
      background: physicalTheme.regular.bg,
      color: physicalTheme.regular.text,
      boxShadow: "0 5px 0 rgba(0, 0, 0, 0.36)",
      textShadow: "none",
      border: "1px solid rgba(23, 23, 23, 0.78)",
    },
    arrowKey: {
      background: physicalTheme.regular.bg,
      color: physicalTheme.regular.text,
      boxShadow: "0 5px 0 rgba(0, 0, 0, 0.36)",
      textShadow: "none",
      border: "1px solid rgba(23, 23, 23, 0.78)",
    },
  });

  const getKeyStyle = (
    key: KeyObject,
    isPressed: boolean,
    isActive: boolean,
  ): React.CSSProperties => {
    const size = key.size || 1;
    const keyType = getKeyType(key);
    let baseStyle = { ...themeStyles.key };
    const keyColorStyle = getPhysicalKeyColor(key, keyType, isActive);

    if (keyType === "special" && themeStyles.specialKey) {
      baseStyle = { ...baseStyle, ...themeStyles.specialKey };
    } else if (keyType === "function" && themeStyles.functionKey) {
      baseStyle = { ...baseStyle, ...themeStyles.functionKey };
    } else if (keyType === "modifier" && themeStyles.modifierKey) {
      baseStyle = { ...baseStyle, ...themeStyles.modifierKey };
    } else if (keyType === "space" && themeStyles.spaceKey) {
      baseStyle = { ...baseStyle, ...themeStyles.spaceKey };
    } else if (keyType === "arrow" && themeStyles.arrowKey) {
      baseStyle = { ...baseStyle, ...themeStyles.arrowKey };
    }
    if (isActive && themeStyles.keyActive) {
      baseStyle = { ...baseStyle, ...themeStyles.keyActive };
    }
    const activeGlowShadow = isActive
      ? `, 0 0 16px rgba(${hexToRgb(activeKeyGlowColor)}, ${activeKeyGlowIntensity})`
      : "";
    const visualStyle: KeyVisualStyle = {
      position: "relative" as const,
      width: `${calcKeyWidth(size)}px`,
      height: `${keyHeight}px`,
      ...(isPressed ? { ...baseStyle, ...themeStyles.keyPressed } : baseStyle),
      background: isPressed ? keyColorStyle.bg : `${keyColorStyle.bg}cc`,
      border: "1px solid rgba(23, 23, 23, 0.78)",
      borderRadius: "12px 12px 4px 4px",
      boxShadow: isPressed
        ? `0 1px 0 rgba(0, 0, 0, 0.46)${activeGlowShadow}, inset 0 2px 4px rgba(0, 0, 0, 0.24)`
        : `0 5px 0 rgba(0, 0, 0, 0.36), 0 6px 0 rgba(0, 0, 0, 0.16)${activeGlowShadow}`,
      color: keyColorStyle.text,
      display: "flex" as const,
      justifyContent: "center" as const,
      alignItems: "flex-start" as const,
      cursor: "pointer",
      userSelect: "none" as const,
      transition: `transform ${keyPressAnimationDuration}ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow ${keyPressAnimationDuration}ms cubic-bezier(0.2, 0.8, 0.2, 1), background-color ${keyPressAnimationDuration}ms ease`,
      transform: isPressed
        ? hasTilt
          ? "translateZ(4px) translateY(4px)"
          : "translateY(4px)"
        : hasTilt
          ? "translateZ(12px)"
          : "none",
      fontSize: "9px",
      fontWeight: 500,
      fontFamily: "'DM Mono', 'SF Mono', 'IBM Plex Mono', monospace",
      padding: "0",
      margin: "0",
      appearance: "none" as const,
      WebkitTapHighlightColor: "transparent",
      letterSpacing: "0px",
      lineHeight: "1",
      overflow: "hidden",
      boxSizing: "border-box" as const,
      "--key-bevel-width": size >= 2 ? "20px" : "28px",
      "--key-bevel-offset": size >= 2 ? "8px" : "12px",
      "--key-bevel-opacity": size >= 2 ? "0.18" : "0.3",
      willChange:
        hasTilt || isPressed || isActive ? "transform, box-shadow" : "auto",
    };

    return visualStyle;
  };

  const getKeyFaceStyle = (
    key: KeyObject,
    isPressed: boolean,
    isActive: boolean,
  ): React.CSSProperties => {
    const keyType = getKeyType(key);
    let baseStyle = { ...themeStyles.key };
    const keyColorStyle = getPhysicalKeyColor(key, keyType, isActive);

    if (keyType === "special" && themeStyles.specialKey) {
      baseStyle = { ...baseStyle, ...themeStyles.specialKey };
    } else if (keyType === "function" && themeStyles.functionKey) {
      baseStyle = { ...baseStyle, ...themeStyles.functionKey };
    } else if (keyType === "modifier" && themeStyles.modifierKey) {
      baseStyle = { ...baseStyle, ...themeStyles.modifierKey };
    } else if (keyType === "space" && themeStyles.spaceKey) {
      baseStyle = { ...baseStyle, ...themeStyles.spaceKey };
    } else if (keyType === "arrow" && themeStyles.arrowKey) {
      baseStyle = { ...baseStyle, ...themeStyles.arrowKey };
    }

    if (isActive && themeStyles.keyActive) {
      baseStyle = { ...baseStyle, ...themeStyles.keyActive };
    }

    const activeStyle =
      isPressed && themeStyles.keyPressed
        ? { ...baseStyle, ...themeStyles.keyPressed }
        : baseStyle;
    const inset = 6;

    return {
      position: "relative",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `calc(100% - ${inset * 2}px)`,
      height: isPressed ? "31px" : "37px",
      marginTop: isPressed ? "2px" : "0",
      padding: key.size >= 2 ? "4px 8px 5px" : "4px 5px 5px",
      borderRadius: "0 0 6px 6px",
      boxSizing: "border-box",
      background: keyColorStyle.cap,
      border: "1px solid rgba(0, 0, 0, 0.12)",
      borderTop: "none",
      boxShadow: isPressed
        ? "inset 0 1px 3px rgba(0, 0, 0, 0.18)"
        : "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      color: keyColorStyle.text,
      fontFamily: activeStyle.fontFamily,
      fontSize: getKeyLabelFontSize(key),
      fontWeight: activeStyle.fontWeight,
      letterSpacing: "0px",
      textShadow: "none",
      transition: `transform ${keyPressAnimationDuration}ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow ${keyPressAnimationDuration}ms ease`,
      transform: hasTilt
        ? isPressed
          ? "translateZ(1px)"
          : "translateZ(3px)"
        : "none",
    };
  };

  const getPhysicalKeyColor = (
    key: KeyObject,
    keyType: string,
    isActive: boolean,
  ): PhysicalKeyColors => {
    if (isActive || key.code === "Escape" || key.tone === "accent") {
      return {
        bg: isActive ? activeKeyGlowColor : physicalTheme.accent,
        text: "rgba(0, 0, 0, 0.55)",
        cap: isActive ? activeKeyGlowColor : physicalTheme.accent,
      };
    }

    if (key.tone === "regular") {
      return physicalTheme.regular;
    }

    if (key.tone === "utility") {
      return physicalTheme.utility;
    }

    if (
      keyType === "special" ||
      keyType === "modifier" ||
      keyType === "function"
    ) {
      return physicalTheme.utility;
    }

    return physicalTheme.regular;
  };

  const getKeyLabelFontSize = (key: KeyObject): string => {
    const length = key.label?.length ?? 0;

    if (layout === "compact" && key.sublabel) return "8px";
    if (layout === "compact" && key.size <= 1 && length >= 4) return "8px";
    if (layout === "compact" && key.size <= 1.25) return "9px";
    if (key.size <= 1 && length >= 5) return "8px";
    if (key.size <= 1 && length >= 4) return "9px";
    if (key.size < 1.5 && length >= 3) return "10px";

    return "11px";
  };

  const getPhysicalTheme = (): PhysicalTheme => {
    const customAccent = accentColor !== "#F57644";
    const customKeyColor = keyColor !== "#2a2a2a";
    const customKeyTextColor = keyTextColor !== "#ffffff";
    const customPressedColor = keyPressedColor !== "#333333";
    const palettes: Record<
      NonNullable<InteractiveKeyboardProps["theme"]>,
      PhysicalTheme
    > = {
      cyberpunk: {
        accent: "#ff4f11",
        caseBg: "#383838",
        caseBorder: "#0b0b0b",
        plateBg: "#292929",
        regular: {
          bg: "#d8d8d8",
          text: "rgba(0, 0, 0, 0.72)",
          cap: "#d8d8d8",
        },
        utility: {
          bg: "#505050",
          text: "rgba(255, 255, 255, 0.78)",
          cap: "#505050",
        },
      },
      retro: {
        accent: "#a84f05",
        caseBg: "#816a49",
        caseBorder: "#332517",
        plateBg: "#58402b",
        regular: {
          bg: "#d3bd94",
          text: "rgba(83, 55, 28, 0.76)",
          cap: "#d3bd94",
        },
        utility: {
          bg: "#513c25",
          text: "rgba(255, 244, 214, 0.86)",
          cap: "#513c25",
        },
      },
      neon: {
        accent: "#19f6c9",
        caseBg: "#0b1726",
        caseBorder: "#20394e",
        plateBg: "#08111e",
        regular: {
          bg: "#203449",
          text: "rgba(202, 255, 246, 0.92)",
          cap: "#263d52",
        },
        utility: {
          bg: "#101c2f",
          text: "rgba(124, 255, 226, 0.9)",
          cap: "#17263c",
        },
      },
      pastel: {
        accent: "#c94a62",
        caseBg: "#9f8aa7",
        caseBorder: "#65506c",
        plateBg: "#8e7897",
        regular: {
          bg: "#d3c2b3",
          text: "rgba(88, 63, 94, 0.72)",
          cap: "#d3c2b3",
        },
        utility: {
          bg: "#7056bf",
          text: "rgba(255, 255, 255, 0.88)",
          cap: "#7056bf",
        },
      },
    };

    const selected = palettes[theme];
    const themed = customAccent
      ? { ...selected, accent: accentColor }
      : selected;

    if (!customKeyColor && !customKeyTextColor && !customPressedColor) {
      return themed;
    }

    return {
      ...themed,
      regular: {
        bg: customKeyColor ? keyColor : themed.regular.bg,
        text: customKeyTextColor ? keyTextColor : themed.regular.text,
        cap: customKeyColor ? keyColor : themed.regular.cap,
      },
      utility: {
        bg: customPressedColor ? keyPressedColor : themed.utility.bg,
        text: customKeyTextColor ? keyTextColor : themed.utility.text,
        cap: customPressedColor ? keyPressedColor : themed.utility.cap,
      },
    };
  };
  function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${Number.parseInt(result[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)}`
      : "0, 255, 255";
  }
  const getKeyType = (key: KeyObject): string => {
    if (!key.code) return "regular";
    if (key.type === "numpad") return "numpad";
    if (["Space"].includes(key.code)) return "space";
    if (
      [
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
        "Escape",
      ].includes(key.code)
    )
      return "function";
    if (
      [
        "ShiftLeft",
        "ShiftRight",
        "ControlLeft",
        "ControlRight",
        "AltLeft",
        "AltRight",
        "MetaLeft",
        "MetaRight",
        "CapsLock",
      ].includes(key.code)
    )
      return "modifier";
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key.code))
      return "arrow";
    if (
      [
        "Backspace",
        "Tab",
        "Enter",
        "Delete",
        "Home",
        "End",
        "PageUp",
        "PageDown",
        "Insert",
        "PrintScreen",
        "ScrollLock",
        "Pause",
        "ContextMenu",
      ].includes(key.code)
    )
      return "special";

    return "regular";
  };
  const isKeyActive = (code: string | undefined): boolean => {
    if (!code) return false;
    return activeKeys.includes(code);
  };

  const renderKeyIcon = (key: KeyObject) => {
    if (!key.icon) return null;

    switch (key.icon) {
      case "windows":
        return <Command className="h-3 w-3" />;
      case "menu":
        return <Menu className="h-3 w-3" />;
      case "capslock":
        return <ChevronsUp className="h-3 w-3 mr-1" />;
      case "arrowup":
        return <ArrowUp className="h-3 w-3" />;
      case "arrowdown":
        return <ArrowDown className="h-3 w-3" />;
      case "arrowleft":
        return <ArrowLeft className="h-3 w-3" />;
      case "arrowright":
        return <ArrowRight className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const physicalTheme = getPhysicalTheme();
  const themeStyles = getThemeStyles();
  const keyboardLayout = getKeyboardLayout();
  const hasTilt = rotateX !== 0;
  const keyUnit = layout === "compact" ? 46 : 50;
  const keySpacing = 0;
  const keyHeight = layout === "compact" ? 46 : 50;
  const calcKeyWidth = (size: number): number =>
    keyUnit * size + keySpacing * (size - 1);
  const keyboardStyle = {
    background: physicalTheme.plateBg,
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -8px 14px rgba(0, 0, 0, 0.18)",
    border: `1px solid ${physicalTheme.caseBorder}`,
    display: "flex" as const,
    flexDirection: "column" as const,
    padding: "0 0 8px 0",
    borderRadius: "5px",
    position: "relative" as const,
    gap: "0",
    maxWidth: "fit-content",
    overflow: "visible",
    transform: hasTilt ? "translateZ(8px)" : "none",
    transformStyle: hasTilt ? ("preserve-3d" as const) : ("flat" as const),
  };
  const keyboardWrapperStyle: React.CSSProperties = {
    display: "flex",
    gap: "20px",
    padding: "12px",
    borderRadius: "16px",
    border: `2px solid ${physicalTheme.caseBorder}`,
    background: physicalTheme.caseBg,
    overflow: "visible",
    position: "relative",
    transform: hasTilt ? `rotateX(${rotateX}deg)` : "none",
    transformOrigin: "center bottom",
    transformStyle: hasTilt ? "preserve-3d" : "flat",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };
  const calculateMainRowWidth = (row: KeyboardRow): number => {
    let totalWidth = 0;
    for (const key of row.keys) {
      if (key.spacer) {
        totalWidth += calcKeyWidth(key.size);
      } else if (key.type === "light" || key.type === "lights") {
        totalWidth += getLightSlotWidth(key);
      } else {
        totalWidth += calcKeyWidth(key.size);
      }
    }
    if (row.keys.length > 0) {
      totalWidth += (row.keys.length - 1) * keySpacing;
    }
    return totalWidth;
  };
  const calculateMaxMainRowWidth = (): number => {
    let maxWidth = 0;
    for (const row of keyboardLayout) {
      if (row.keys.length > 0) {
        const rowWidth = calculateMainRowWidth(row);
        maxWidth = Math.max(maxWidth, rowWidth);
      }
    }
    return maxWidth;
  };
  const getLightSlotWidth = (key: KeyObject): number =>
    key.type === "lights" || key.size >= 1 ? calcKeyWidth(key.size) : 14;

  const maxMainRowWidth = calculateMaxMainRowWidth();
  return (
    <div
      className={cn("keyboard-container", className)}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        overflow: "visible",
        perspective: hasTilt ? `${perspective}px` : undefined,
        perspectiveOrigin: "center center",
      }}
      {...props}
    >
      <style>{`
        .keyboard-container .keyboard-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.5));
          transform: translateZ(-18px) translateY(14px);
          box-shadow: 0 22px 34px rgba(0, 0, 0, 0.38);
        }
        .keyboard-container .keyboard-wrapper::after {
          content: "";
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: -13px;
          height: 18px;
          pointer-events: none;
          border-radius: 0 0 14px 14px;
          background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.68));
          transform: translateZ(-10px);
          transform-origin: top;
        }
        .keyboard-container .keyboard-wrapper[data-tilted="false"]::before,
        .keyboard-container .keyboard-wrapper[data-tilted="false"]::after {
          content: none;
        }
        .keyboard-container .keyboard { isolation: isolate; }
        .keyboard-container .keyboard::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          opacity: 0.7;
          background: linear-gradient(115deg, rgba(255,255,255,0.07), transparent 28%, transparent 72%, rgba(255,255,255,0.025));
        }
        .keyboard-container .keyboard-row {
          z-index: 1;
        }
        .keyboard-container .key::before,
        .keyboard-container .key::after {
          content: "";
          position: absolute;
          bottom: 0;
          width: 32px;
          height: 1px;
          pointer-events: none;
          z-index: 0;
          background: rgba(0, 0, 0, 0.32);
          opacity: var(--key-bevel-opacity);
        }
        .keyboard-container .key::before {
          left: 0;
          width: var(--key-bevel-width);
          transform: rotate(-70deg) translateX(calc(var(--key-bevel-offset) * -1));
          transform-origin: left bottom;
        }
        .keyboard-container .key::after {
          right: 0;
          width: var(--key-bevel-width);
          transform: rotate(70deg) translateX(var(--key-bevel-offset));
          transform-origin: right bottom;
        }
        .keyboard-container .key:focus-visible {
          outline: 2px solid ${physicalTheme.accent};
          outline-offset: 3px;
          z-index: 2;
        }
        .keyboard-container .key-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          max-width: 100%;
          gap: 3px;
          white-space: nowrap;
        }
        .keyboard-container .key-label[data-stacked="true"] {
          flex-direction: column;
          gap: 2px;
          line-height: 1;
        }
        .keyboard-container .key-sublabel {
          font-size: 0.9em;
          opacity: 0.72;
        }
        @media (prefers-reduced-motion: reduce) {
          .keyboard-container .keyboard, .keyboard-container .key { transition-duration: 0.01ms !important; }
        }
      `}</style>
      <div
        className="keyboard-wrapper"
        data-tilted={hasTilt ? "true" : "false"}
        style={keyboardWrapperStyle}
      >
        <div className="keyboard" style={keyboardStyle}>
          {keyboardLayout.map((row, rowIndex) => {
            if (row.function && !showFunctionKeys) return null;
            const mainRowWidth = calculateMainRowWidth(row);
            return (
              <div
                key={`row-${rowIndex}`}
                className="keyboard-row"
                style={{
                  display: "flex",
                  gap: `${keySpacing}px`,
                  position: "relative",
                  marginTop:
                    row.function && rowIndex === 0
                      ? "-4px"
                      : layout === "compact" && rowIndex === 0
                        ? "-4px"
                        : "0",
                  justifyContent: "flex-start",
                }}
              >
                <div style={{ display: "flex", gap: `${keySpacing}px` }}>
                  {row.keys.map((key, keyIndex) => {
                    if (key.spacer) {
                      return (
                        <div
                          key={`spacer-${rowIndex}-${keyIndex}`}
                          style={{
                            width: `${calcKeyWidth(key.size)}px`,
                            height: `${keyHeight}px`,
                            background: "transparent",
                          }}
                        />
                      );
                    }

                    if (key.type === "light") {
                      return (
                        <div
                          key={`light-${rowIndex}-${keyIndex}`}
                          style={{
                            width: `${getLightSlotWidth(key)}px`,
                            height: `${keyHeight}px`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                          }}
                        >
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: physicalTheme.accent,
                              boxShadow: `0 0 8px rgba(${hexToRgb(physicalTheme.accent)}, 0.75)`,
                            }}
                          />
                        </div>
                      );
                    }

                    if (key.type === "lights") {
                      return (
                        <div
                          key={`lights-${rowIndex}-${keyIndex}`}
                          style={{
                            width: `${getLightSlotWidth(key)}px`,
                            height: `${keyHeight}px`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            position: "relative",
                          }}
                        >
                          {[0, 1, 2].map((light) => (
                            <span
                              key={light}
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: physicalTheme.accent,
                                boxShadow: `0 0 8px rgba(${hexToRgb(physicalTheme.accent)}, 0.75)`,
                              }}
                            />
                          ))}
                        </div>
                      );
                    }
                    const isPressed = pressedKeys.has(key.code || "");
                    const isActive = isKeyActive(key.code);
                    return (
                      <button
                        type="button"
                        key={`key-${rowIndex}-${keyIndex}`}
                        data-key={key.code}
                        className={cn("key", key.code, isActive && "active")}
                        style={getKeyStyle(key, isPressed, isActive)}
                        aria-label={key.label || key.code}
                        onMouseDown={() => key.code && handleKeyDown(key.code)}
                        onMouseUp={() => key.code && handleKeyUp(key.code)}
                        onMouseLeave={() =>
                          key.code &&
                          pressedKeys.has(key.code) &&
                          handleKeyUp(key.code)
                        }
                        onTouchStart={(e) => {
                          e.preventDefault();
                          key.code && handleKeyDown(key.code);
                        }}
                        onTouchEnd={() => key.code && handleKeyUp(key.code)}
                        onTouchCancel={() => key.code && handleKeyUp(key.code)}
                      >
                        <div style={getKeyFaceStyle(key, isPressed, isActive)}>
                          <div
                            className="key-label"
                            data-stacked={key.sublabel ? "true" : undefined}
                          >
                            {renderKeyIcon(key)}
                            {key.sublabel && (
                              <span className="key-sublabel">
                                {key.sublabel}
                              </span>
                            )}
                            {key.label && <span>{key.label}</span>}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {showNavigationCluster && row.nav && row.nav.length > 0 && (
                  <div
                    className="nav-cluster"
                    style={{
                      display: "flex",
                      gap: `${keySpacing}px`,
                      marginLeft: `${Math.max(0, maxMainRowWidth - mainRowWidth + keySpacing * 2)}px`,
                    }}
                  >
                    {row.nav.map((key, keyIndex) => {
                      if (key.spacer) {
                        return (
                          <div
                            key={`nav-spacer-${rowIndex}-${keyIndex}`}
                            style={{
                              width: `${calcKeyWidth(key.size)}px`,
                              height: `${keyHeight}px`,
                              background: "transparent",
                            }}
                          />
                        );
                      }

                      if (key.type === "light") {
                        return (
                          <div
                            key={`nav-light-${rowIndex}-${keyIndex}`}
                            style={{
                              width: `${getLightSlotWidth(key)}px`,
                              height: `${keyHeight}px`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: physicalTheme.accent,
                                boxShadow: `0 0 8px rgba(${hexToRgb(physicalTheme.accent)}, 0.75)`,
                              }}
                            />
                          </div>
                        );
                      }

                      if (key.type === "lights") {
                        return (
                          <div
                            key={`nav-lights-${rowIndex}-${keyIndex}`}
                            style={{
                              width: `${getLightSlotWidth(key)}px`,
                              height: `${keyHeight}px`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              position: "relative",
                            }}
                          >
                            {[0, 1, 2].map((light) => (
                              <span
                                key={light}
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  background: physicalTheme.accent,
                                  boxShadow: `0 0 8px rgba(${hexToRgb(physicalTheme.accent)}, 0.75)`,
                                }}
                              />
                            ))}
                          </div>
                        );
                      }
                      const isPressed = pressedKeys.has(key.code || "");
                      const isActive = isKeyActive(key.code);
                      return (
                        <button
                          type="button"
                          key={`nav-key-${rowIndex}-${keyIndex}`}
                          data-key={key.code}
                          className={cn("key", key.code, isActive && "active")}
                          style={getKeyStyle(key, isPressed, isActive)}
                          aria-label={key.label || key.code}
                          onMouseDown={() =>
                            key.code && handleKeyDown(key.code)
                          }
                          onMouseUp={() => key.code && handleKeyUp(key.code)}
                          onMouseLeave={() =>
                            key.code &&
                            pressedKeys.has(key.code) &&
                            handleKeyUp(key.code)
                          }
                          onTouchStart={(e) => {
                            e.preventDefault();
                            key.code && handleKeyDown(key.code);
                          }}
                          onTouchEnd={() => key.code && handleKeyUp(key.code)}
                          onTouchCancel={() =>
                            key.code && handleKeyUp(key.code)
                          }
                        >
                          <div
                            style={getKeyFaceStyle(key, isPressed, isActive)}
                          >
                            <div
                              className="key-label"
                              data-stacked={key.sublabel ? "true" : undefined}
                            >
                              {renderKeyIcon(key)}
                              {key.sublabel && (
                                <span className="key-sublabel">
                                  {key.sublabel}
                                </span>
                              )}
                              {key.label && <span>{key.label}</span>}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InteractiveKeyboard;
