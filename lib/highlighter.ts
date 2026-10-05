import type { BundledLanguage, Highlighter } from "shiki";
import { getNyxuiTheme, getNyxuiLightTheme } from "@/lib/shiki-themes";

/**
 * One shared shiki highlighter for the whole client session.
 *
 * Two things matter here:
 *
 * 1. shiki is imported dynamically. The static import it replaces pulled the
 *    full bundle — maps for 632 languages and 108 themes, plus the oniguruma
 *    engine — into the playground route chunk, for an app that highlights
 *    tsx and bash.
 *
 * 2. The highlighter is created once and reused. The previous call sites used
 *    the deprecated getHighlighter inside an effect, so every keystroke built
 *    a fresh, never-disposed highlighter and logged a deprecation trace.
 *
 * Languages load on demand and stay loaded, so the first request for a given
 * language pays for its grammar and later ones do not.
 */

let highlighterPromise: Promise<Highlighter> | null = null;

function createShared(): Promise<Highlighter> {
  return (async () => {
    const [{ createHighlighter }, darkTheme, lightTheme] = await Promise.all([
      import("shiki"),
      getNyxuiTheme(),
      getNyxuiLightTheme(),
    ]);

    return createHighlighter({
      themes: [darkTheme, lightTheme],
      langs: [],
    });
  })();
}

/**
 * Resolves the shared highlighter with `langs` guaranteed to be loaded.
 *
 * Never call dispose() on the result — see the note in lib/shiki-themes.ts.
 */
export async function getNyxuiHighlighter(
  langs: string[] = [],
): Promise<Highlighter> {
  highlighterPromise ??= createShared();
  const highlighter = await highlighterPromise;

  const loaded = new Set(highlighter.getLoadedLanguages());
  const missing = langs.filter((lang) => !loaded.has(lang));

  if (missing.length > 0) {
    await highlighter.loadLanguage(...(missing as BundledLanguage[]));
  }

  return highlighter;
}
