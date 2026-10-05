import type { ThemeRegistration } from "shiki";

/**
 * GitHub themes with their red (#ff7b72 / #cf222e) replaced by the NyxUI
 * brand orange (#FF4F11). Every other token color is left untouched.
 *
 * We avoid `bundledThemes` (which does dynamic imports that break esbuild's
 * MDX pipeline at build time) and instead load the theme by name through a
 * throwaway highlighter, then clone + modify the result.
 *
 * NOTE: do NOT call `tmp.dispose()` on the throwaway highlighter — in shiki
 * v2 dispose() releases the shared WASM/oniguruma engine, which poisons any
 * subsequent highlighter in the same session and silently prevents syntax
 * highlighting (the caller falls back to an un-styled <pre>).
 *
 * shiki itself is imported dynamically. A static import would pull the full
 * bundle — the 632-language and 108-theme maps plus the oniguruma engine —
 * into the initial chunk of every route that touches this module.
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

async function buildTheme(
  source: "github-dark-default" | "github-light-default",
  replace: string,
  name: string,
): Promise<ThemeRegistration> {
  const { createHighlighter } = await import("shiki");
  const tmp = await createHighlighter({ themes: [source], langs: [] });
  return rebrand(
    tmp.getTheme(source) as unknown as BaseThemeShape,
    replace,
    name,
  );
}

let darkCache: Promise<ThemeRegistration> | null = null;
let lightCache: Promise<ThemeRegistration> | null = null;

export function getNyxuiTheme(): Promise<ThemeRegistration> {
  darkCache ??= buildTheme("github-dark-default", REPLACE_DARK, "nyxui-dark");
  return darkCache;
}

export function getNyxuiLightTheme(): Promise<ThemeRegistration> {
  lightCache ??= buildTheme(
    "github-light-default",
    REPLACE_LIGHT,
    "nyxui-light",
  );
  return lightCache;
}
