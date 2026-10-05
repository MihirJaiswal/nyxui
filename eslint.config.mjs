import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["app/**/*.{ts,tsx}", "scripts/**/*.{ts,mts}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Use the @/ alias for imports from app routes.",
            },
          ],
        },
      ],
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
    },
  },
  {
    files: ["scripts/**/*.{ts,mts}"],
    rules: {
      "no-console": ["error", { allow: ["log", "warn", "error"] }],
    },
  },
  {
    // House rule: never pair a border/ring with a shadow on one element — that
    // draws a double edge. Use `smooth-shadow-ring-*`, which bakes a 1px
    // hairline ring into the shadow layer. See AGENTS.md › Elevated surfaces.
    //
    // Deliberately exempt: `ring-inset`, `shadow-inner`, `shadow-[inset…]`
    // highlights, and zero-offset `shadow-[0_0_…]` glows — none of those is an
    // outer edge.
    //
    // Currently "warn", not "error": ~53 pre-existing sites still violate it,
    // and erroring would fail `pnpm lint` and the build. Flip to "error" once
    // that backlog is cleared.
    files: ["**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "warn",
        {
          selector: `Literal[value=/(?=[\\s\\S]*(?:^|\\s)(?:border|ring-[0-9])(?![\\w-]))(?=[\\s\\S]*(?:^|\\s)shadow-(?!none|inner|\\[inset|\\[0_0_))(?![\\s\\S]*ring-inset)/]`,
          message:
            "Double edge: this class string pairs a border/ring with a shadow. Use smooth-shadow-ring-* instead (see AGENTS.md › Elevated surfaces).",
        },
      ],
    },
  },
  {
    ignores: ["__registry__/**/*", "public/r/**/*.json"],
  },
];

export default eslintConfig;
