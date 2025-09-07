"use client";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChevronsUp, Command, Menu } from "lucide-react";
import { useEffect, useState } from "react";

interface KeyObject {
  label?: string;
  code?: string;
  size: number;
  spacer?: boolean;
  type?: string;
  icon?: string;
}

interface KeyboardRow {
  keys: KeyObject[];
}

interface MinimalKeyboardProps {
  activeKeys?: string[];
  activeKeyGlowColor?: string;
  activeKeyGlowIntensity?: number;
  accentColor?: string;
  keyColor?: string;
  keyTextColor?: string;
  keyPressedColor?: string;
  keyPressAnimationDuration?: number;
  allowPhysicalKeyboard?: boolean;
  perspective?: number;
  rotateX?: number;
  onKeyPress?: (code: string, key?: string) => void;
  onKeyRelease?: (code: string, key?: string) => void;
}

const MinimalKeyboard: React.FC<MinimalKeyboardProps> = ({
  activeKeys = [],
  activeKeyGlowColor = "#00C24E",
  activeKeyGlowIntensity = 0.8,
  accentColor = "#00C24E",
  keyColor = "#2a2a2a",
  keyTextColor = "#ffffff",
  keyPressedColor = "#333333",
  keyPressAnimationDuration = 150,
  allowPhysicalKeyboard = true,
  perspective = 1000,
  rotateX = 10,
}) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const getStandardLayout = (): KeyboardRow[] => {
    return [
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
          { label: "Backspace", code: "Backspace", size: 2, icon: "backspace" },
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
      },
      {
        keys: [
          { label: "Ctrl", code: "ControlLeft", size: 1.25 },
          { code: "MetaLeft", size: 1.25, icon: "windows" },
          { label: "Alt", code: "AltLeft", size: 1.25 },
          { label: "Space", code: "Space", size: 6.25 },
          { label: "Alt", code: "AltRight", size: 1.25 },
          { code: "MetaRight", size: 1.25, icon: "windows" },
          { code: "ContextMenu", size: 1.25, icon: "menu" },
          { label: "Ctrl", code: "ControlRight", size: 1.25 },
        ],
      },
    ];
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
        case "backspace":
          return <ArrowLeft className="h-3 w-3" />;
        default:
          return null;
      }
    };
  

  useEffect(() => {
    if (!allowPhysicalKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.add(e.code);
        return newSet;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(e.code);
        return newSet;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [allowPhysicalKeyboard]);

  const handleKeyDown = (code: string) => {
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.add(code);
      return newSet;
    });
  };

  const handleKeyUp = (code: string) => {
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(code);
      return newSet;
    });
  };

  const adjustColorBrightness = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
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
  };

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "0, 255, 255";
  };

  const isKeyActive = (code: string | undefined): boolean => {
    if (!code) return false;
    return activeKeys.includes(code);
  };

  const getKeyStyle = (key: KeyObject, isPressed: boolean, isActive: boolean) => {
    const size = key.size || 1;
    const keyUnit = 40;
    const keySpacing = 6;
    const calcKeyWidth = (size: number): number => keyUnit * size + keySpacing * (size - 1);

    // Exact cyberpunk theme styles from InteractiveKeyboard
    let baseStyle = {
      background: `linear-gradient(145deg, ${adjustColorBrightness(keyColor, 10)}, ${keyColor})`,
      color: keyTextColor,
      boxShadow: `0 3px 0 ${adjustColorBrightness(keyColor, -20)}, 0 0 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
      textShadow: `0 0 5px rgba(255, 255, 255, 0.3)`,
      border: `1px solid ${adjustColorBrightness(keyColor, -10)}`,
      fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
      fontWeight: "600",
      fontSize: "11px",
      borderRadius: "6px",
      letterSpacing: "0.5px",
      transition: "all 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
    };

    if (isActive) {
      baseStyle = {
        ...baseStyle,
        background: `linear-gradient(145deg, ${adjustColorBrightness(keyColor, 10)}, ${keyColor})`,
        boxShadow: `0 3px 0 ${adjustColorBrightness(keyColor, -20)}, 0 0 20px rgba(${hexToRgb(activeKeyGlowColor)}, ${activeKeyGlowIntensity}), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
        color: activeKeyGlowColor,
        textShadow: `0 0 10px rgba(${hexToRgb(activeKeyGlowColor)}, 0.9)`,
        border: `1px solid ${activeKeyGlowColor}`,
      };
    }

    if (isPressed) {
      baseStyle = {
        ...baseStyle,
        background: `linear-gradient(145deg, ${keyPressedColor}, ${adjustColorBrightness(keyPressedColor, -10)})`,
        boxShadow: `0 0 0 ${adjustColorBrightness(keyColor, -20)}, 0 0 15px rgba(${hexToRgb(accentColor)}, 0.5), inset 0 1px 2px rgba(0, 0, 0, 0.3)`,
        color: accentColor,
        textShadow: `0 0 8px rgba(${hexToRgb(accentColor)}, 0.7)`,
        border: `1px solid ${adjustColorBrightness(keyPressedColor, 10)}`,
        transition: "all 0.08s cubic-bezier(0.23, 1, 0.32, 1)",
      };
    }

    return {
      ...baseStyle,
      position: "relative" as const,
      width: `${calcKeyWidth(size)}px`,
      height: "40px",
      display: "flex" as const,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      cursor: "pointer",
      userSelect: "none" as const,
      transition: `all ${keyPressAnimationDuration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
      transform: isPressed ? "translateY(2px)" : "translateY(0)",
      willChange: "transform, box-shadow",
    };
  };

  const keyboardLayout = getStandardLayout();
  const keySpacing = 6;
  const keyboardStyle = {
    background: `#1A1A1A`,
    boxShadow: `0 15px 40px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.5)`,
    border: `1px solid ${adjustColorBrightness(keyColor, -20)}`,
    borderRadius: "12px",
    padding: "20px",
    display: "flex" as const,
    flexDirection: "column" as const,
    transform: `perspective(${perspective}px) rotateX(${rotateX}deg)`,
    position: "relative" as const,
    gap: `${keySpacing}px`,
    maxWidth: "fit-content",
    transition: "all 0.3s ease",
  };

  return (
    <div
      className="keyboard-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div className="keyboard" style={keyboardStyle}>
        {keyboardLayout.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="keyboard-row"
            style={{
              display: "flex",
              gap: `${keySpacing}px`,
              justifyContent: "flex-start",
            }}
          >
            {row.keys.map((key, keyIndex) => {
              if (key.spacer) {
                return (
                  <div
                    key={`spacer-${rowIndex}-${keyIndex}`}
                    style={{
                      width: `${40 * key.size + keySpacing * (key.size - 1)}px`,
                      height: "40px",
                      background: "transparent",
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
                  className={`key ${key.code} ${isActive ? "active" : ""}`}
                  style={getKeyStyle(key, isPressed, isActive)}
                  onMouseDown={() => key.code && handleKeyDown(key.code)}
                  onMouseUp={() => key.code && handleKeyUp(key.code)}
                  onMouseLeave={() =>
                    key.code && pressedKeys.has(key.code) && handleKeyUp(key.code)
                  }
                  onTouchStart={(e) => {
                    e.preventDefault();
                  }}
                  onTouchEnd={() => key.code && handleKeyUp(key.code)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {renderKeyIcon(key)}
                    {key.label && <span>{key.label}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinimalKeyboard;