"use client";
import type React from "react";
import { useEffect, useState } from "react";

interface KeyObject {
  label?: string;
  code?: string;
  size: number;
  spacer?: boolean;
  type?: string;
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
  theme?: "cyberpunk" | "minimal" | "retro" | "mechanical" | "neon" | "pastel";
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

const InteractiveKeyboard: React.FC<InteractiveKeyboardProps> = ({
  layout = "standard",
  showFunctionKeys = true,
  showNavigationCluster = true,
  activeKeys = [],
  activeKeyGlowColor = "#6366f1",
  activeKeyGlowIntensity = 0.8,
  theme = "cyberpunk",
  keyColor = "#2a2a2a",
  keyTextColor = "#ffffff",
  accentColor = "#6366f1",
  keyPressedColor = "#333333",
  keyPressAnimationDuration = 150,
  onKeyPress = () => {},
  onKeyRelease = () => {},
  className = "",
  allowPhysicalKeyboard = true,
  perspective = 1000,
  rotateX = 10,
  ...props
}) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const getKeyboardLayout = (): KeyboardRow[] => {
    switch (layout) {
      case "compact":
        return getStandardLayout().filter((row) => !row.function);
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
        nav: [
          { spacer: true, size: 0.5 },
          { type: "light", size: 0.5, code: "light1" },
          { type: "light", size: 0.5, code: "light2" },
          { type: "light", size: 0.5, code: "light3" },
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
          { label: "Caps", code: "CapsLock", size: 1.75 },
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
          { label: "↑", code: "ArrowUp", size: 1 },
          { spacer: true, size: 1 },
        ],
      },
      {
        keys: [
          { label: "Ctrl", code: "ControlLeft", size: 1.25 },
          { label: "Win", code: "MetaLeft", size: 1.25 },
          { label: "Alt", code: "AltLeft", size: 1.25 },
          { label: "Space", code: "Space", size: 6.25 },
          { label: "Alt", code: "AltRight", size: 1.25 },
          { label: "Win", code: "MetaRight", size: 1.25 },
          { label: "Menu", code: "ContextMenu", size: 1.25 },
          { label: "Ctrl", code: "ControlRight", size: 1.25 },
        ],
        nav: [
          { label: "←", code: "ArrowLeft", size: 1 },
          { label: "↓", code: "ArrowDown", size: 1 },
          { label: "→", code: "ArrowRight", size: 1 },
        ],
      },
    ];
  };

  useEffect(() => {
    if (!allowPhysicalKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.add(e.code);
        return newSet;
      });

      onKeyPress(e.code, e.key);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(e.code);
        return newSet;
      });
      onKeyRelease(e.code, e.key);
    };
    if (allowPhysicalKeyboard) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [allowPhysicalKeyboard, onKeyPress, onKeyRelease]);

  const handleKeyDown = (code: string) => {
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.add(code);
      return newSet;
    });

    onKeyPress(code);
  };

  const handleKeyUp = (code: string) => {
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(code);
      return newSet;
    });

    onKeyRelease(code);
  };

  const getThemeStyles = (): ThemeStyles => {
    switch (theme) {
      case "minimal":
        return {
          keyboard: {
            background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
            boxShadow:
              "0 10px 30px rgba(0, 0, 0, 0.08), 0 6px 10px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            borderRadius: "10px",
          },
          key: {
            background: "linear-gradient(to bottom, #ffffff, #f7f7f9)",
            color: "#333333",
            boxShadow:
              "0 2px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            textShadow: "none",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: "500",
            fontSize: "11px",
            borderRadius: "5px",
            transition: "all 0.15s ease",
          },
          keyPressed: {
            background: "linear-gradient(to bottom, #f0f0f0, #e8e8e8)",
            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.08)",
            color: accentColor,
            border: "1px solid rgba(0, 0, 0, 0.12)",
            transform: "translateY(1px)",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.05s ease",
          },
          keyHover: {
            background: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
            boxShadow:
              "0 2px 3px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)",
            color: accentColor,
            border: "1px solid rgba(0, 0, 0, 0.1)",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.15s ease",
          },
          keyActive: {
            background: "linear-gradient(to bottom, #ffffff, #f5f5f7)",
            boxShadow: `0 0 10px ${activeKeyGlowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
            color: activeKeyGlowColor,
            border: `1px solid ${activeKeyGlowColor}`,
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: `0 0 5px ${activeKeyGlowColor}`,
            borderRadius: "5px",
            transition: "all 0.1s ease",
          },
          specialKey: {
            background: "linear-gradient(to bottom, #f8f8fa, #eff0f2)",
            color: "#555555",
            boxShadow:
              "0 2px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            fontSize: "10px",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.15s ease",
          },
          functionKey: {
            background: "linear-gradient(to bottom, #f2f2f4, #eaeaec)",
            color: "#666666",
            fontSize: "9px",
            boxShadow:
              "0 2px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.15s ease",
          },
          modifierKey: {
            background: "linear-gradient(to bottom, #f2f2f4, #eaeaec)",
            color: "#555555",
            boxShadow:
              "0 2px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            fontSize: "10px",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.15s ease",
          },
          spaceKey: {
            background: "linear-gradient(to bottom, #ffffff, #f8f8f8)",
            color: "#333333",
            boxShadow:
              "0 2px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.15s ease",
          },
          arrowKey: {
            background: "linear-gradient(to bottom, #f2f2f4, #eaeaec)",
            color: "#555555",
            boxShadow:
              "0 2px 3px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.15s ease",
          },
        };

      case "retro":
        return {
          keyboard: {
            background: "linear-gradient(to bottom, #f5f0e8, #e8e0d0)",
            boxShadow:
              "0 8px 20px rgba(120, 100, 80, 0.2), 0 4px 8px rgba(120, 100, 80, 0.1), inset 0 1px 0 #fff",
            border: "2px solid #d0c0a0",
            borderRadius: "8px",
            padding: "8px",
          },
          key: {
            background: "linear-gradient(to bottom, #fff8e8, #f0e8d8)",
            color: "#705030",
            boxShadow: "0 4px 0 #c0b090, inset 0 1px 0 #fffaf0",
            textShadow: "none",
            border: "1px solid #d0c0a0",
            fontFamily: '"Courier New", monospace',
            fontWeight: "600",
            fontSize: "11px",
            borderRadius: "6px",
            transition: "all 0.12s ease-out",
            marginBottom: "4px",
          },
          keyPressed: {
            background: "linear-gradient(to bottom, #e8d8c0, #d8c8b0)",
            boxShadow: "0 0 0 #c0b090, inset 0 1px 2px rgba(120, 100, 80, 0.2)",
            color: "#604020",
            textShadow: "none",
            border: "1px solid #c0b090",
            transform: "translateY(4px)",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Courier New", monospace',
            borderRadius: "6px",
            marginBottom: "0px",
            transition: "all 0.05s ease",
          },
          keyHover: {
            background: "linear-gradient(to bottom, #fffaf0, #f8f0e0)",
            boxShadow: "0 4px 0 #c0b090, inset 0 1px 0 #fffaf0",
            color: "#604020",
            border: "1px solid #c0b090",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Courier New", monospace',
            textShadow: "none",
            borderRadius: "6px",
            transition: "all 0.12s ease-out",
            marginBottom: "4px",
          },
          keyActive: {
            background: "linear-gradient(to bottom, #fff8e8, #f0e8d8)",
            boxShadow: `0 4px 0 #c0b090, 0 0 15px ${activeKeyGlowColor}, inset 0 1px 0 #fffaf0`,
            color: activeKeyGlowColor,
            textShadow: `0 0 5px ${activeKeyGlowColor}`,
            border: `1px solid ${activeKeyGlowColor}`,
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Courier New", monospace',
            borderRadius: "6px",
            transition: "all 0.12s ease-out",
            marginBottom: "4px",
          },
          specialKey: {
            background: "linear-gradient(to bottom, #f0e8d8, #e0d0c0)",
            color: "#604020",
            boxShadow: "0 4px 0 #c0b090, inset 0 1px 0 #fffaf0",
            border: "1px solid #d0c0a0",
            fontSize: "10px",
            fontWeight: "600",
            fontFamily: '"Courier New", monospace',
            textShadow: "none",
            borderRadius: "6px",
            transition: "all 0.12s ease-out",
            marginBottom: "4px",
          },
          functionKey: {
            background: "linear-gradient(to bottom, #e8d8c0, #d8c8b0)",
            color: "#604020",
            fontSize: "9px",
            boxShadow: "0 4px 0 #c0b090, inset 0 1px 0 #fffaf0",
            border: "1px solid #d0c0a0",
            fontWeight: "600",
            fontFamily: '"Courier New", monospace',
            textShadow: "none",
            borderRadius: "6px",
            transition: "all 0.12s ease-out",
            marginBottom: "4px",
          },
          modifierKey: {
            background: "linear-gradient(to bottom, #e8d8c0, #d8c8b0)",
            color: "#604020",
            boxShadow: "0 4px 0 #c0b090, inset 0 1px 0 #fffaf0",
            border: "1px solid #d0c0a0",
            fontSize: "10px",
            fontWeight: "600",
            fontFamily: '"Courier New", monospace',
            textShadow: "none",
            borderRadius: "6px",
            transition: "all 0.12s ease-out",
            marginBottom: "4px",
          },
          spaceKey: {
            background: "linear-gradient(to bottom, #fff8e8, #f0e8d8)",
            color: "#705030",
            boxShadow: "0 4px 0 #c0b090, inset 0 1px 0 #fffaf0",
            border: "1px solid #d0c0a0",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Courier New", monospace',
            textShadow: "none",
            borderRadius: "6px",
            transition: "all 0.12s ease-out",
            marginBottom: "4px",
          },
          arrowKey: {
            background: "linear-gradient(to bottom, #e8d8c0, #d8c8b0)",
            color: "#604020",
            boxShadow: "0 4px 0 #c0b090, inset 0 1px 0 #fffaf0",
            border: "1px solid #d0c0a0",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Courier New", monospace',
            textShadow: "none",
            borderRadius: "6px",
            transition: "all 0.12s ease-out",
            marginBottom: "4px",
          },
        };

      case "cyberpunk":
        return {
          keyboard: {
            background: `linear-gradient(145deg, ${adjustColorBrightness(
              keyColor,
              -5
            )}, ${adjustColorBrightness(keyColor, -15)})`,
            boxShadow: `0 15px 40px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.5)`,
            border: `1px solid ${adjustColorBrightness(keyColor, -20)}`,
            borderRadius: "12px",
          },
          key: {
            background: `linear-gradient(145deg, ${adjustColorBrightness(
              keyColor,
              10
            )}, ${keyColor})`,
            color: keyTextColor,
            boxShadow: `0 3px 0 ${adjustColorBrightness(
              keyColor,
              -20
            )}, 0 0 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
            textShadow: `0 0 5px rgba(255, 255, 255, 0.3)`,
            border: `1px solid ${adjustColorBrightness(keyColor, -10)}`,
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            fontWeight: "600",
            fontSize: "11px",
            borderRadius: "6px",
            letterSpacing: "0.5px",
            transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
          },
          keyPressed: {
            background: `linear-gradient(145deg, ${keyPressedColor}, ${adjustColorBrightness(
              keyPressedColor,
              -10
            )})`,
            boxShadow: `0 0 0 ${adjustColorBrightness(
              keyColor,
              -20
            )}, 0 0 15px rgba(${hexToRgb(
              accentColor
            )}, 0.5), inset 0 1px 2px rgba(0, 0, 0, 0.3)`,
            color: accentColor,
            textShadow: `0 0 8px rgba(${hexToRgb(accentColor)}, 0.7)`,
            border: `1px solid ${adjustColorBrightness(keyPressedColor, 10)}`,
            transform: "translateY(2px)",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            borderRadius: "6px",
            letterSpacing: "0.5px",
            transition: "all 0.08s cubic-bezier(0.23, 1, 0.32, 1)",
          },
          keyHover: {
            background: `linear-gradient(145deg, ${adjustColorBrightness(
              keyColor,
              15
            )}, ${adjustColorBrightness(keyColor, 5)})`,
            boxShadow: `0 3px 0 ${adjustColorBrightness(
              keyColor,
              -20
            )}, 0 0 12px rgba(${hexToRgb(
              accentColor
            )}, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.15)`,
            color: accentColor,
            textShadow: `0 0 8px rgba(${hexToRgb(accentColor)}, 0.5)`,
            border: `1px solid ${adjustColorBrightness(keyColor, 0)}`,
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            borderRadius: "6px",
            letterSpacing: "0.5px",
            transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
          },
          keyActive: {
            background: `linear-gradient(145deg, ${adjustColorBrightness(
              keyColor,
              10
            )}, ${keyColor})`,
            boxShadow: `0 3px 0 ${adjustColorBrightness(
              keyColor,
              -20
            )}, 0 0 20px rgba(${hexToRgb(
              activeKeyGlowColor
            )}, ${activeKeyGlowIntensity}), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
            color: activeKeyGlowColor,
            textShadow: `0 0 10px rgba(${hexToRgb(activeKeyGlowColor)}, 0.9)`,
            border: `1px solid ${activeKeyGlowColor}`,
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            borderRadius: "6px",
            letterSpacing: "0.5px",
            transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
          },
          specialKey: {
            background: `linear-gradient(145deg, ${adjustColorBrightness(
              keyColor,
              0
            )}, ${adjustColorBrightness(keyColor, -10)})`,
            color: adjustColorBrightness(keyTextColor, -10),
            boxShadow: `0 3px 0 ${adjustColorBrightness(
              keyColor,
              -20
            )}, 0 0 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
            border: `1px solid ${adjustColorBrightness(keyColor, -10)}`,
            fontSize: "10px",
            fontWeight: "600",
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            textShadow: `0 0 5px rgba(255, 255, 255, 0.3)`,
            borderRadius: "6px",
            letterSpacing: "0.5px",
            transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
          },
          functionKey: {
            background: `linear-gradient(145deg, ${adjustColorBrightness(
              keyColor,
              -5
            )}, ${adjustColorBrightness(keyColor, -15)})`,
            color: adjustColorBrightness(keyTextColor, -15),
            fontSize: "9px",
            boxShadow: `0 3px 0 ${adjustColorBrightness(
              keyColor,
              -20
            )}, 0 0 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
            border: `1px solid ${adjustColorBrightness(keyColor, -10)}`,
            fontWeight: "600",
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            textShadow: `0 0 5px rgba(255, 255, 255, 0.3)`,
            borderRadius: "6px",
            letterSpacing: "0.5px",
            transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
          },
          modifierKey: {
            background: `linear-gradient(145deg, ${adjustColorBrightness(
              keyColor,
              -5
            )}, ${adjustColorBrightness(keyColor, -15)})`,
            color: adjustColorBrightness(keyTextColor, -5),
            boxShadow: `0 3px 0 ${adjustColorBrightness(
              keyColor,
              -20
            )}, 0 0 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
            border: `1px solid ${adjustColorBrightness(keyColor, -10)}`,
            fontSize: "10px",
            fontWeight: "600",
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            textShadow: `0 0 5px rgba(255, 255, 255, 0.3)`,
            borderRadius: "6px",
            letterSpacing: "0.5px",
            transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
          },
          spaceKey: {
            background: `linear-gradient(145deg, ${adjustColorBrightness(
              keyColor,
              5
            )}, ${adjustColorBrightness(keyColor, -5)})`,
            color: keyTextColor,
            boxShadow: `0 3px 0 ${adjustColorBrightness(
              keyColor,
              -20
            )}, 0 0 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
            border: `1px solid ${adjustColorBrightness(keyColor, -10)}`,
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            textShadow: `0 0 5px rgba(255, 255, 255, 0.3)`,
            borderRadius: "6px",
            letterSpacing: "0.5px",
            transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
          },
          arrowKey: {
            background: `linear-gradient(145deg, ${adjustColorBrightness(
              keyColor,
              -5
            )}, ${adjustColorBrightness(keyColor, -15)})`,
            color: accentColor,
            boxShadow: `0 3px 0 ${adjustColorBrightness(
              keyColor,
              -20
            )}, 0 0 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
            border: `1px solid ${adjustColorBrightness(keyColor, -10)}`,
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
            textShadow: `0 0 5px rgba(${hexToRgb(accentColor)}, 0.5)`,
            borderRadius: "6px",
            letterSpacing: "0.5px",
            transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
          },
        };
      case "neon":
        return {
          keyboard: {
            background: "linear-gradient(to bottom, #121212, #1a1a1a)",
            boxShadow:
              "0 15px 40px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "10px",
          },
          key: {
            background: "linear-gradient(to bottom, #222222, #111111)",
            color: "#00ffcc",
            boxShadow:
              "0 3px 0 #000, 0 0 8px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
            textShadow: "0 0 8px rgba(0, 255, 204, 0.7)",
            border: "1px solid #333",
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: "500",
            fontSize: "11px",
            borderRadius: "6px",
            transition: "all 0.15s ease",
          },
          keyPressed: {
            background: "linear-gradient(to bottom, #111111, #0a0a0a)",
            boxShadow:
              "0 0 0 #000, 0 0 15px rgba(0, 255, 204, 0.7), inset 0 1px 2px rgba(0, 0, 0, 0.5)",
            color: "#ffffff",
            textShadow: "0 0 10px rgba(0, 255, 204, 1)",
            border: "1px solid #00ffcc",
            transform: "translateY(3px)",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Orbitron", sans-serif',
            borderRadius: "6px",
            transition: "all 0.05s ease",
          },
          keyHover: {
            background: "linear-gradient(to bottom, #2a2a2a, #191919)",
            boxShadow:
              "0 3px 0 #000, 0 0 12px rgba(0, 255, 204, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            textShadow: "0 0 8px rgba(0, 255, 204, 0.8)",
            border: "1px solid #00aa88",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Orbitron", sans-serif',
            borderRadius: "6px",
            transition: "all 0.15s ease",
          },
          keyActive: {
            background: "linear-gradient(to bottom, #222222, #111111)",
            boxShadow:
              "0 3px 0 #000, 0 0 20px rgba(0, 255, 204, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
            color: "#ffffff",
            textShadow: "0 0 15px rgba(0, 255, 204, 1)",
            border: "1px solid #00ffcc",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Orbitron", sans-serif',
            borderRadius: "6px",
            transition: "all 0.15s ease",
          },
          specialKey: {
            background: "linear-gradient(to bottom, #191919, #0d0d0d)",
            color: "#ff3399",
            boxShadow:
              "0 3px 0 #000, 0 0 8px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
            border: "1px solid #333",
            fontSize: "10px",
            fontWeight: "500",
            fontFamily: '"Orbitron", sans-serif',
            textShadow: "0 0 8px rgba(255, 51, 153, 0.7)",
            borderRadius: "6px",
            transition: "all 0.15s ease",
          },
          functionKey: {
            background: "linear-gradient(to bottom, #191919, #0d0d0d)",
            color: "#3399ff",
            fontSize: "9px",
            boxShadow:
              "0 3px 0 #000, 0 0 8px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
            border: "1px solid #333",
            fontWeight: "500",
            fontFamily: '"Orbitron", sans-serif',
            textShadow: "0 0 8px rgba(51, 153, 255, 0.7)",
            borderRadius: "6px",
            transition: "all 0.15s ease",
          },
          modifierKey: {
            background: "linear-gradient(to bottom, #191919, #0d0d0d)",
            color: "#ffcc00",
            boxShadow:
              "0 3px 0 #000, 0 0 8px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
            border: "1px solid #333",
            fontSize: "10px",
            fontWeight: "500",
            fontFamily: '"Orbitron", sans-serif',
            textShadow: "0 0 8px rgba(255, 204, 0, 0.7)",
            borderRadius: "6px",
            transition: "all 0.15s ease",
          },
          spaceKey: {
            background: "linear-gradient(to bottom, #222222, #111111)",
            color: "#00ffcc",
            boxShadow:
              "0 3px 0 #000, 0 0 8px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
            border: "1px solid #333",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Orbitron", sans-serif',
            textShadow: "0 0 8px rgba(0, 255, 204, 0.7)",
            borderRadius: "6px",
            transition: "all 0.15s ease",
          },
          arrowKey: {
            background: "linear-gradient(to bottom, #191919, #0d0d0d)",
            color: "#ff9900",
            boxShadow:
              "0 3px 0 #000, 0 0 8px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
            border: "1px solid #333",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Orbitron", sans-serif',
            textShadow: "0 0 8px rgba(255, 153, 0, 0.7)",
            borderRadius: "6px",
            transition: "all 0.15s ease",
          },
        };

      case "pastel":
        return {
          keyboard: {
            background: "linear-gradient(to bottom, #f0e6f6, #e7ddf0)",
            boxShadow:
              "0 12px 30px rgba(200, 180, 220, 0.3), 0 8px 15px rgba(200, 180, 220, 0.2)",
            border: "1px solid #d8cceb",
            borderRadius: "16px",
            padding: "12px",
          },
          key: {
            background: "linear-gradient(to bottom, #ffffff, #f5f0f9)",
            color: "#7b6d8d",
            boxShadow:
              "0 3px 0 #d8cceb, 0 0 5px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
            textShadow: "none",
            border: "1px solid #e2d7f0",
            fontFamily: '"Quicksand", "Avenir Next", sans-serif',
            fontWeight: "500",
            fontSize: "11px",
            borderRadius: "10px",
            transition: "all 0.2s ease",
          },
          keyPressed: {
            background: "linear-gradient(to bottom, #f0e6f9, #e7ddf5)",
            boxShadow: "0 0 0 #d8cceb, inset 0 1px 2px rgba(0, 0, 0, 0.05)",
            color: "#9370db",
            textShadow: "none",
            border: "1px solid #d8cceb",
            transform: "translateY(3px)",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Quicksand", "Avenir Next", sans-serif',
            borderRadius: "10px",
            transition: "all 0.1s ease",
          },
          keyHover: {
            background: "linear-gradient(to bottom, #ffffff, #f9f5fc)",
            boxShadow:
              "0 3px 0 #d8cceb, 0 0 8px rgba(155, 122, 188, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1)",
            color: "#9370db",
            border: "1px solid #d8cceb",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Quicksand", "Avenir Next", sans-serif',
            textShadow: "none",
            borderRadius: "10px",
            transition: "all 0.2s ease",
          },
          keyActive: {
            background: "linear-gradient(to bottom, #ffffff, #f5f0f9)",
            boxShadow:
              "0 3px 0 #d8cceb, 0 0 12px rgba(155, 122, 188, 0.4), inset 0 1px 0 rgba(255, 255, 255, 1)",
            color: "#9370db",
            textShadow: "0 0 3px rgba(155, 122, 188, 0.3)",
            border: "1px solid #b79ce8",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Quicksand", "Avenir Next", sans-serif',
            borderRadius: "10px",
            transition: "all 0.2s ease",
          },
          specialKey: {
            background: "linear-gradient(to bottom, #f9f0fc, #f0e6f6)",
            color: "#9382ab",
            boxShadow:
              "0 3px 0 #d8cceb, 0 0 5px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
            border: "1px solid #e2d7f0",
            fontSize: "10px",
            fontWeight: "500",
            fontFamily: '"Quicksand", "Avenir Next", sans-serif',
            textShadow: "none",
            borderRadius: "10px",
            transition: "all 0.2s ease",
          },
          functionKey: {
            background: "linear-gradient(to bottom, #f0e6f6, #e7ddf0)",
            color: "#a58cc4",
            fontSize: "9px",
            boxShadow:
              "0 3px 0 #d8cceb, 0 0 5px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
            border: "1px solid #e2d7f0",
            fontWeight: "500",
            fontFamily: '"Quicksand", "Avenir Next", sans-serif',
            textShadow: "none",
            borderRadius: "10px",
            transition: "all 0.2s ease",
          },
          modifierKey: {
            background: "linear-gradient(to bottom, #f0e6f6, #e7ddf0)",
            color: "#9382ab",
            boxShadow:
              "0 3px 0 #d8cceb, 0 0 5px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
            border: "1px solid #e2d7f0",
            fontSize: "10px",
            fontWeight: "500",
            fontFamily: '"Quicksand", "Avenir Next", sans-serif',
            textShadow: "none",
            borderRadius: "10px",
            transition: "all 0.2s ease",
          },
          spaceKey: {
            background: "linear-gradient(to bottom, #ffffff, #f5f0f9)",
            color: "#7b6d8d",
            boxShadow:
              "0 3px 0 #d8cceb, 0 0 5px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
            border: "1px solid #e2d7f0",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Quicksand", "Avenir Next", sans-serif',
            textShadow: "none",
            borderRadius: "10px",
            transition: "all 0.2s ease",
          },
          arrowKey: {
            background: "linear-gradient(to bottom, #f0e6f6, #e7ddf0)",
            color: "#b79ce8",
            boxShadow:
              "0 3px 0 #d8cceb, 0 0 5px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)",
            border: "1px solid #e2d7f0",
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: '"Quicksand", "Avenir Next", sans-serif',
            textShadow: "none",
            borderRadius: "10px",
            transition: "all 0.2s ease",
          },
        };

      case "mechanical":
        return {
          keyboard: {
            background: "linear-gradient(to bottom, #2c2c2c, #1a1a1a)",
            boxShadow:
              "0 12px 30px rgba(0, 0, 0, 0.5), 0 8px 15px rgba(0, 0, 0, 0.4)",
            border: "2px solid #000",
            borderRadius: "8px",
            padding: "10px",
          },
          key: {
            background: "linear-gradient(to bottom, #363636, #222222)",
            color: "#ddd",
            boxShadow:
              "0 2px 0 #000, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.05)",
            textShadow: "none",
            border: "1px solid #111",
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: "600",
            fontSize: "11px",
            borderRadius: "5px",
            transition: "all 0.08s ease",
            height: "40px",
          },
          keyPressed: {
            background: "linear-gradient(to bottom, #222222, #1a1a1a)",
            boxShadow: "0 0 0 #000, inset 0 0 10px rgba(0, 0, 0, 0.8)",
            color: "#fff",
            textShadow: "none",
            border: "1px solid #000",
            transform: "translateY(2px)",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"IBM Plex Mono", monospace',
            borderRadius: "5px",
            transition: "all 0.02s ease",
            height: "40px",
          },
          keyHover: {
            background: "linear-gradient(to bottom, #3a3a3a, #262626)",
            boxShadow:
              "0 2px 0 #000, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.08)",
            color: "#fff",
            border: "1px solid #111",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"IBM Plex Mono", monospace',
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.08s ease",
            height: "40px",
          },
          keyActive: {
            background: "linear-gradient(to bottom, #363636, #222222)",
            boxShadow:
              "0 2px 0 #000, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.05)",
            color: "#ff7700",
            textShadow: "0 0 5px rgba(255, 119, 0, 0.5)",
            border: "1px solid #ff7700",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"IBM Plex Mono", monospace',
            borderRadius: "5px",
            transition: "all 0.08s ease",
            height: "40px",
          },
          specialKey: {
            background: "linear-gradient(to bottom, #2d2d2d, #1d1d1d)",
            color: "#aaa",
            boxShadow:
              "0 2px 0 #000, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.05)",
            border: "1px solid #111",
            fontSize: "10px",
            fontWeight: "600",
            fontFamily: '"IBM Plex Mono", monospace',
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.08s ease",
            height: "40px",
          },
          functionKey: {
            background: "linear-gradient(to bottom, #2a2a2a, #1a1a1a)",
            color: "#888",
            fontSize: "9px",
            boxShadow:
              "0 2px 0 #000, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.05)",
            border: "1px solid #111",
            fontWeight: "600",
            fontFamily: '"IBM Plex Mono", monospace',
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.08s ease",
            height: "30px",
          },
          modifierKey: {
            background: "linear-gradient(to bottom, #2d2d2d, #1d1d1d)",
            color: "#bbb",
            boxShadow:
              "0 2px 0 #000, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.05)",
            border: "1px solid #111",
            fontSize: "10px",
            fontWeight: "600",
            fontFamily: '"IBM Plex Mono", monospace',
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.08s ease",
            height: "40px",
          },
          spaceKey: {
            background: "linear-gradient(to bottom, #363636, #222222)",
            color: "#ddd",
            boxShadow:
              "0 2px 0 #000, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.05)",
            border: "1px solid #111",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"IBM Plex Mono", monospace',
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.08s ease",
            height: "40px",
          },
          arrowKey: {
            background: "linear-gradient(to bottom, #2d2d2d, #1d1d1d)",
            color: "#ff7700",
            boxShadow:
              "0 2px 0 #000, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 5px rgba(255, 255, 255, 0.05)",
            border: "1px solid #111",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: '"IBM Plex Mono", monospace',
            textShadow: "none",
            borderRadius: "5px",
            transition: "all 0.08s ease",
            height: "40px",
          },
        };
    }
  };
  const getKeyStyle = (
    key: KeyObject,
    isPressed: boolean,
    isActive: boolean
  ) => {
    const size = key.size || 1;
    const keyType = getKeyType(key);
    let baseStyle = { ...themeStyles.key };
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
    return {
      position: "relative" as const,
      width: `${calcKeyWidth(size)}px`,
      height: `${keyHeight}px`,
      ...(isPressed ? { ...baseStyle, ...themeStyles.keyPressed } : baseStyle),
      borderRadius: baseStyle.borderRadius || "4px",
      display: "flex" as const,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      cursor: "pointer",
      userSelect: "none" as const,
      transition: `all ${keyPressAnimationDuration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
      transform: isPressed
        ? themeStyles.keyPressed.transform || "translateY(2px)"
        : "translateY(0)",
      fontSize: baseStyle.fontSize || "11px",
      fontWeight: baseStyle.fontWeight || 500,
      fontFamily: baseStyle.fontFamily || "inherit",
      padding: "0",
      margin: "0",
      letterSpacing: baseStyle.letterSpacing || "normal",
      willChange: "transform, box-shadow",
    };
  };
  function adjustColorBrightness(hex: string, percent: number): string {
    const num = Number.parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${Number.parseInt(result[1], 16)}, ${Number.parseInt(
          result[2],
          16
        )}, ${Number.parseInt(result[3], 16)}`
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
  const themeStyles = getThemeStyles();
  const keyboardLayout = getKeyboardLayout();
  const keyUnit = 40;
  const keySpacing = 6;
  const keyHeight = 40;
  const calcKeyWidth = (size: number): number =>
    keyUnit * size + keySpacing * (size - 1);
  const keyboardStyle = {
    ...themeStyles.keyboard,
    display: "flex" as const,
    flexDirection: "column" as const,
    padding: "20px",
    borderRadius: themeStyles.keyboard.borderRadius || "10px",
    transform: `perspective(${perspective}px) rotateX(${rotateX}deg)`,
    position: "relative" as const,
    gap: `${keySpacing}px`,
    maxWidth: "fit-content",
    transition: "all 0.3s ease",
  };
  const calculateMainRowWidth = (row: KeyboardRow): number => {
    let totalWidth = 0;
    for (const key of row.keys) {
      if (key.spacer) {
        totalWidth += calcKeyWidth(key.size);
      } else if (key.type === "light") {
        totalWidth += 8 + (key.size || 0.5) * 4;
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

  const maxMainRowWidth = calculateMaxMainRowWidth();
  return (
    <div
      className={`keyboard-container ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
      {...props}
    >
      <div
        className="keyboard-wrapper"
        style={{ display: "flex", gap: "20px" }}
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
                  marginTop: row.function && rowIndex === 0 ? "10px" : "0",
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
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: accentColor,
                            boxShadow: `0 0 8px rgba(${hexToRgb(
                              accentColor
                            )}, 0.7)`,
                            position: "relative",
                            marginTop: "4px",
                            marginLeft: keyIndex === 0 ? "0" : "6px",
                          }}
                        />
                      );
                    }
                    const isPressed = pressedKeys.has(key.code || "");
                    const isActive = isKeyActive(key.code);
                    return (
                      <div
                        key={`key-${rowIndex}-${keyIndex}`}
                        data-key={key.code}
                        className={`key ${key.code} ${
                          isActive ? "active" : ""
                        }`}
                        style={getKeyStyle(key, isPressed, isActive)}
                        onMouseDown={() => key.code && handleKeyDown(key.code)}
                        onMouseUp={() => key.code && handleKeyUp(key.code)}
                        onMouseLeave={() =>
                          key.code &&
                          pressedKeys.has(key.code) &&
                          handleKeyUp(key.code)
                        }
                        onTouchStart={(e) => {
                          e.preventDefault();
                        }}
                        onTouchEnd={() => key.code && handleKeyUp(key.code)}
                        onMouseEnter={() => {
                          const element = document.querySelector(
                            `.key.${key.code}`
                          ) as HTMLElement;
                          if (
                            element &&
                            !pressedKeys.has(key.code || "") &&
                            !isActive
                          ) {
                            Object.assign(element.style, themeStyles.keyHover);
                          }
                        }}
                        onMouseOut={() => {
                          const element = document.querySelector(
                            `.key.${key.code}`
                          ) as HTMLElement;
                          if (
                            element &&
                            !pressedKeys.has(key.code || "") &&
                            !isActive
                          ) {
                            const keyType = getKeyType(key);
                            let baseStyle = { ...themeStyles.key };

                            if (
                              keyType === "special" &&
                              themeStyles.specialKey
                            ) {
                              baseStyle = {
                                ...baseStyle,
                                ...themeStyles.specialKey,
                              };
                            } else if (
                              keyType === "function" &&
                              themeStyles.functionKey
                            ) {
                              baseStyle = {
                                ...baseStyle,
                                ...themeStyles.functionKey,
                              };
                            } else if (
                              keyType === "modifier" &&
                              themeStyles.modifierKey
                            ) {
                              baseStyle = {
                                ...baseStyle,
                                ...themeStyles.modifierKey,
                              };
                            } else if (
                              keyType === "space" &&
                              themeStyles.spaceKey
                            ) {
                              baseStyle = {
                                ...baseStyle,
                                ...themeStyles.spaceKey,
                              };
                            } else if (
                              keyType === "arrow" &&
                              themeStyles.arrowKey
                            ) {
                              baseStyle = {
                                ...baseStyle,
                                ...themeStyles.arrowKey,
                              };
                            }

                            Object.assign(element.style, baseStyle);
                          }
                        }}
                      >
                        {key.label}
                      </div>
                    );
                  })}
                </div>
                {showNavigationCluster && row.nav && row.nav.length > 0 && (
                  <div
                    className="nav-cluster"
                    style={{
                      display: "flex",
                      gap: `${keySpacing}px`,
                      marginLeft: `${Math.max(
                        0,
                        maxMainRowWidth - mainRowWidth + keySpacing * 2
                      )}px`,
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
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: accentColor,
                              boxShadow: `0 0 8px rgba(${hexToRgb(
                                accentColor
                              )}, 0.7)`,
                              position: "relative",
                              marginTop: "4px",
                              marginLeft: keyIndex === 0 ? "0" : "6px",
                            }}
                          />
                        );
                      }
                      const isPressed = pressedKeys.has(key.code || "");
                      const isActive = isKeyActive(key.code);
                      return (
                        <div
                          key={`nav-key-${rowIndex}-${keyIndex}`}
                          data-key={key.code}
                          className={`key ${key.code} ${
                            isActive ? "active" : ""
                          }`}
                          style={getKeyStyle(key, isPressed, isActive)}
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
                          }}
                          onTouchEnd={() => key.code && handleKeyUp(key.code)}
                          onMouseEnter={() => {
                            const element = document.querySelector(
                              `.key.${key.code}`
                            ) as HTMLElement;
                            if (
                              element &&
                              !pressedKeys.has(key.code || "") &&
                              !isActive
                            ) {
                              Object.assign(
                                element.style,
                                themeStyles.keyHover
                              );
                            }
                          }}
                          onMouseOut={() => {
                            const element = document.querySelector(
                              `.key.${key.code}`
                            ) as HTMLElement;
                            if (
                              element &&
                              !pressedKeys.has(key.code || "") &&
                              !isActive
                            ) {
                              const keyType = getKeyType(key);
                              let baseStyle = { ...themeStyles.key };

                              if (
                                keyType === "special" &&
                                themeStyles.specialKey
                              ) {
                                baseStyle = {
                                  ...baseStyle,
                                  ...themeStyles.specialKey,
                                };
                              } else if (
                                keyType === "function" &&
                                themeStyles.functionKey
                              ) {
                                baseStyle = {
                                  ...baseStyle,
                                  ...themeStyles.functionKey,
                                };
                              } else if (
                                keyType === "modifier" &&
                                themeStyles.modifierKey
                              ) {
                                baseStyle = {
                                  ...baseStyle,
                                  ...themeStyles.modifierKey,
                                };
                              } else if (
                                keyType === "space" &&
                                themeStyles.spaceKey
                              ) {
                                baseStyle = {
                                  ...baseStyle,
                                  ...themeStyles.spaceKey,
                                };
                              } else if (
                                keyType === "arrow" &&
                                themeStyles.arrowKey
                              ) {
                                baseStyle = {
                                  ...baseStyle,
                                  ...themeStyles.arrowKey,
                                };
                              }
                              Object.assign(element.style, baseStyle);
                            }
                          }}
                        >
                          {key.label}
                        </div>
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
