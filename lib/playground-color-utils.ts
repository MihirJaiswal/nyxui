import { rgbToHex } from "@/lib/colors";
import type { ComponentPropValue } from "@/types/playground";

const namedColorHex: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#000000",
};

const colorValuePattern =
  /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}|(\d{1,3}\s*,\s*){2}\d{1,3})/i;

export function getColorPickerValue(value: string): string {
  const trimmedValue = value.trim();

  if (/^#[0-9a-f]{6}$/i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (/^#[0-9a-f]{3}$/i.test(trimmedValue)) {
    const [, red, green, blue] = trimmedValue;
    return `#${red}${red}${green}${green}${blue}${blue}`;
  }

  const rgbMatch = trimmedValue.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i,
  );

  if (rgbMatch) {
    return rgbToHex(
      Number(rgbMatch[1]),
      Number(rgbMatch[2]),
      Number(rgbMatch[3]),
    );
  }

  const tripletMatch = trimmedValue.match(
    /^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/,
  );

  if (tripletMatch) {
    return rgbToHex(
      Number(tripletMatch[1]),
      Number(tripletMatch[2]),
      Number(tripletMatch[3]),
    );
  }

  return namedColorHex[trimmedValue.toLowerCase()] ?? "#000000";
}

function isColorText(value: ComponentPropValue): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();
  return (
    colorValuePattern.test(trimmedValue) ||
    trimmedValue.toLowerCase() in namedColorHex
  );
}

function isRecordValue(
  value: ComponentPropValue,
): value is Record<string, ComponentPropValue> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export function isColorArrayValue(
  value: ComponentPropValue,
): value is string[] {
  return Array.isArray(value) && value.every(isColorText);
}

export function isColorMapValue(
  value: ComponentPropValue,
): value is Record<string, string> {
  return isRecordValue(value) && Object.values(value).every(isColorText);
}
