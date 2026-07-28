/**
 * Color conversion utilities shared across the app.
 * Registry components are excluded — these are for internal use only.
 */

function componentToHex(component: number): string {
  return Math.max(0, Math.min(255, component)).toString(16).padStart(2, "0");
}

export function rgbToHex(red: number, green: number, blue: number): string {
  return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalizedHex = hex.replace("#", "");
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);
  if (!match) {
    return null;
  }
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

/**
 * Returns the RGB values of a hex color as a `"r, g, b"` string.
 * Returns `"0, 255, 255"` if the hex is invalid (matches existing behavior).
 */
export function hexToRgbString(hex: string): string {
  const rgb = hexToRgb(hex);
  return rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "0, 255, 255";
}
