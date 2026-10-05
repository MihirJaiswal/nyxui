/**
 * Regenerate the "## Installation" section for pro block MDX files.
 *
 * I truncated all block MDX files at `## Installation` in a previous
 * turn. Free block MDX files were restored from git, but pro block MDX
 * files are untracked (they live only in the private repo) so git can't
 * restore them. This script rebuilds the Installation section for every
 * pro block MDX file, using `registry/registry-pro.ts` as the source of
 * truth for the block name + npm dependencies.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pro } from "../registry/registry-pro";

const DOCS_DIR = join(process.cwd(), "content", "docs", "pro", "blocks");

function installSectionFor(name: string, deps: string[]): string {
  const uniqueDeps = Array.from(new Set(deps.filter((d) => d && d !== "next")));
  const npmInstall = uniqueDeps.length
    ? `\n\`\`\`bash\nnpm install ${uniqueDeps.join(" ")}\n\`\`\`\n`
    : "";

  return `
## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

\`\`\`bash
npx shadcn@latest add @nyxui-pro/${name}
\`\`\`

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Install dependencies.</Step>
${npmInstall}
<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="${name}" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</Tabs>
`;
}

let touched = 0;
let missing = 0;
const availableDocs = new Set(readdirSync(DOCS_DIR));

for (const item of pro) {
  // Only re-inject into files that DO exist in content/docs/pro/blocks.
  // The pro components (clip-path-links, hover-image-links,
  // typing-words) doc paths
  // may live elsewhere; those aren't touched.
  const filename = `${item.name}.mdx`;
  if (!availableDocs.has(filename)) {
    missing++;
    continue;
  }
  const p = join(DOCS_DIR, filename);
  const src = readFileSync(p, "utf8");
  if (src.includes("\n## Installation")) {
    // Already has Installation — leave it.
    continue;
  }
  const install = installSectionFor(item.name, item.dependencies ?? []);
  writeFileSync(p, src.trimEnd() + "\n" + install);
  touched++;
}

console.log(
  `regen-pro-block-install: wrote Installation section into ${touched} file(s); ${missing} pro item(s) had no matching MDX under ${DOCS_DIR}.`,
);
