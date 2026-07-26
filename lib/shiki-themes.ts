import { createHighlighter, type ThemeRegistration } from "shiki";

/**
 * GitHub Dark Default with its red (#ff7b72) replaced by the NyxUI
 * brand orange (#FF4F11). Every other token color is left untouched.
 *
 * We avoid `bundledThemes` (which does dynamic imports that break esbuild's
 * MDX pipeline at build time) and instead load the theme by name through a
 * throwaway highlighter, then clone + modify the result.
 */

const BRAND_ORANGE = "#FF4F11";
const REPLACE = "#ff7b72";

let cache: ThemeRegistration | null = null;

export async function getNyxuiTheme(): Promise<ThemeRegistration> {
  if (cache) return cache;

  const tmp = await createHighlighter({
    themes: ["github-dark-default"],
    langs: [],
  });
  const base = tmp.getTheme("github-dark-default") as unknown as {
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
  };

  const settings = (base.settings ?? []).map((t) => {
    const fg = t.settings?.foreground;
    if (fg && fg.toLowerCase() === REPLACE) {
      return { ...t, settings: { ...t.settings, foreground: BRAND_ORANGE } };
    }
    return t;
  });

  tmp.dispose();

  cache = {
    ...base,
    name: "nyxui-dark",
    settings,
  } as unknown as ThemeRegistration;
  return cache;
}
