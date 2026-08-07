import { createHighlighter, type ThemeRegistration } from "shiki";

/**
 * GitHub themes with their red (#ff7b72 / #cf222e) replaced by the NyxUI
 * brand orange (#FF4F11). Every other token color is left untouched.
 *
 * We avoid `bundledThemes` (which does dynamic imports that break esbuild's
 * MDX pipeline at build time) and instead load the theme by name through a
 * throwaway highlighter, then clone + modify the result.
 */

const BRAND_ORANGE = "#FF4F11";
const REPLACE_DARK = "#ff7b72";
const REPLACE_LIGHT = "#cf222e";

interface BaseThemeShape {
  name: string;
  type: string;
  fg: string;
  bg: string;
  colors: Record<string, string>;
  settings: Array<{
    scope?: string | string[];
    settings?: { foreground?: string; background?: string };
  }>;
  [key: string]: unknown;
}

function rebrand(
  base: BaseThemeShape,
  replace: string,
  name: string,
): ThemeRegistration {
  const settings = (base.settings ?? []).map((t) => {
    const fg = t.settings?.foreground;
    if (fg && fg.toLowerCase() === replace) {
      return { ...t, settings: { ...t.settings, foreground: BRAND_ORANGE } };
    }
    return t;
  });

  return {
    ...base,
    name,
    settings,
  } as unknown as ThemeRegistration;
}

let darkCache: ThemeRegistration | null = null;
let lightCache: ThemeRegistration | null = null;

export async function getNyxuiTheme(): Promise<ThemeRegistration> {
  if (darkCache) return darkCache;

  const tmp = await createHighlighter({
    themes: ["github-dark-default"],
    langs: [],
  });
  const base = tmp.getTheme("github-dark-default") as unknown as BaseThemeShape;
  tmp.dispose();

  darkCache = rebrand(base, REPLACE_DARK, "nyxui-dark");
  return darkCache;
}

export async function getNyxuiLightTheme(): Promise<ThemeRegistration> {
  if (lightCache) return lightCache;

  const tmp = await createHighlighter({
    themes: ["github-light-default"],
    langs: [],
  });
  const base = tmp.getTheme(
    "github-light-default",
  ) as unknown as BaseThemeShape;
  tmp.dispose();

  lightCache = rebrand(base, REPLACE_LIGHT, "nyxui-light");
  return lightCache;
}
