#!/usr/bin/env node
/**
 * sync-public — copy the FREE subset of this repo into the public mirror
 * (github.com/MihirJaiswal/nyxui) and push it.
 *
 * Usage:
 *   pnpm sync-public              # sync current working tree
 *   pnpm sync-public --dry-run    # show what would be copied, no commit/push
 *
 * How it works:
 *   1. Clones the PUBLIC repo (origin) into a temp dir
 *   2. Copies whitelisted paths from this folder over it
 *   3. Removes paths that no longer exist here (for whitelisted dirs)
 *   4. Commits + pushes to origin main
 *
 * Safety: only paths in ALLOWED below ever get copied. Anything Pro
 * (registry/pro/**, registry-data/**, .env*) is never
 * touched, even if listed by mistake.
 */

import { execSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, relative } from "node:path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PUBLIC_REMOTE = "origin";
const PUBLIC_BRANCH = "main";

/** Whitelisted paths (files or dirs) allowed in the public repo. */
const ALLOWED = [
  // registry sources (free only — registry/pro/** is hard-excluded below)
  "registry/ui",
  "registry/example",
  "registry/lib",
  "registry/Data.tsx",
  "registry/registry-ui.ts",
  "registry/registry-examples.ts",
  "registry/registry-lib.ts",
  // Pro *manifests* only — names, titles, prices-facing metadata. The Pro
  // sources they point at (registry/pro/**) stay excluded. The public site
  // needs these to render the Pro catalogue and /pro pricing page.
  "registry/registry-pro.ts",
  "registry/registry-pro-examples.ts",
  // built registry output (free JSONs only — pro JSONs are excluded below)
  "public/r",
  "registry.json",
  // static assets used by the free site: logos, hover-tick + music-player
  // audio, free component demo images, template/playground videos, fonts
  "public/assets/logos",
  "public/assets/audio",
  "public/assets/images",
  "public/assets/videos",
  "public/fonts",
  // docs
  "content",
  // site code
  "app",
  "components",
  "hooks",
  "lib",
  // Shared type definitions. components/ and lib/ are mirrored and reference
  // these, so leaving them out freezes the public copies and the mirror fails
  // to typecheck against newer component code.
  "types",
  "providers",
  "stores",
  "__registry__",
  // config / meta
  "package.json",
  "pnpm-lock.yaml",
  "tsconfig.json",
  "tsconfig.scripts.json",
  "next.config.ts",
  "next.config.mjs",
  "postcss.config.mjs",
  "components.json",
  "content-collections.ts",
  "eslint.config.mjs",
  "prettier.config.mjs",
  ".gitignore",
  ".prettierrc.json",
  ".gitattributes",
  ".npmrc",
  "README.md",
  "LICENSE",
  "CONTRIBUTING.md",
  "scripts",
  ".github",
  ".husky",
];

/**
 * HARD EXCLUDES — never copied to public, even if inside an allowed dir.
 * These are the Pro-content paths. Keep in sync with .husky/pre-push.
 */
const PRO_EXCLUDES = [
  "registry/pro",
  "registry-data",
  "content/docs/pro",
  "app/api/pro",
  "components/pro-only",
  "public/pro",
  // Pro block imagery — referenced only by registry/pro/blocks/**
  "public/blocks",
  // Pro agent skills sold to entitled customers. Scope this to the Pro skill
  // only — skills/ also holds the public contributor skills, and excluding the
  // whole directory makes the guard reject those as leaks.
  "skills/building-with-nyxui",
  "skills/syncing-public-mirror",
  // Pro preview obfuscation pipeline — private-only, never ships publicly.
  "scripts/obfuscate-pro.mjs",
  "app/pro-obf.css",
  ".obf",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const isDryRun = process.argv.includes("--dry-run");

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: "pipe", encoding: "utf-8", ...opts });
}

function info(msg) {
  console.log(`  ${msg}`);
}

function die(msg) {
  console.error(`\n✗ ${msg}`);
  process.exit(1);
}

/** Normalize a path for prefix matching. */
const norm = (p) => p.replace(/\\/g, "/").replace(/^\.\//, "");

/** True if a given path is inside any of the exclude dirs. */
function isExcluded(path) {
  const p = norm(path);
  return PRO_EXCLUDES.some((exc) => {
    const e = norm(exc);
    return p === e || p.startsWith(`${e}/`);
  });
}

/** Recursively list files under a dir, relative to root. */
function listFiles(root, dir = root, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) listFiles(root, full, acc);
    else acc.push(relative(root, full));
  }
  return acc;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const root = process.cwd();

  console.log(
    isDryRun
      ? "\n◇ sync-public (DRY RUN — no commit, no push)\n"
      : "\n◇ sync-public\n",
  );

  // --- sanity: make sure the remotes are what we expect -------------------
  let publicUrl;
  try {
    publicUrl = run(`git remote get-url ${PUBLIC_REMOTE}`).trim();
  } catch {
    die(`remote "${PUBLIC_REMOTE}" not found. Add it first.`);
  }
  if (publicUrl.includes("nyxui-private")) {
    die(`remote "origin" points at the PRIVATE repo (${publicUrl}). Refusing.`);
  }
  info(`public remote : ${publicUrl}`);

  // --- clone public repo into temp dir -------------------------------------
  const tmp = mkdtempSync(join(tmpdir(), "nyxui-sync-"));
  const mirror = join(tmp, "public");
  console.log("\n◇ cloning public repo (shallow)…");
  try {
    run(
      `git clone --depth 1 --branch ${PUBLIC_BRANCH} ${publicUrl} "${mirror}"`,
    );
  } catch {
    die(
      `could not clone ${PUBLIC_BRANCH} from origin — does the branch exist?`,
    );
  }

  // --- copy allowed paths ---------------------------------------------------
  console.log("\n◇ copying allowed paths…");
  const copied = [];
  const skippedPro = [];

  for (const path of ALLOWED) {
    const src = join(root, path);
    if (!existsSync(src)) continue; // allowed to be absent

    if (isExcluded(path)) {
      skippedPro.push(path);
      continue;
    }

    const dest = join(mirror, path);
    if (statSync(src).isDirectory()) {
      // remove old copy of this dir in the mirror, then copy fresh
      rmSync(dest, { recursive: true, force: true });
      mkdirSync(join(mirror, path.split("/")[0]), { recursive: true });
      cpSync(src, dest, {
        recursive: true,
        filter: (srcPath) => {
          const rel = relative(root, srcPath);
          if (!rel) return true;
          if (isExcluded(rel)) {
            skippedPro.push(rel);
            return false;
          }
          // never copy env files or secrets anywhere
          if (basename(rel).startsWith(".env")) return false;
          return true;
        },
      });
      copied.push(`${path}/`);
    } else {
      mkdirSync(join(mirror, ...path.split("/").slice(0, -1)), {
        recursive: true,
      });
      cpSync(src, dest);
      copied.push(path);
    }
  }

  if (skippedPro.length > 0) {
    info(`skipped ${skippedPro.length} pro-only path(s) (expected)`);
  }

  // --- swap in the pro-free registry listing --------------------------------
  // The private registry.json lists every pro item with a registry/pro/** file
  // path. Those sources are excluded from the mirror, so shadcn registry:build
  // aborts with ENOENT on the first one it tries to read. The generated
  // pro-free listing is the one the mirror has to ship, both at the repo root
  // (shadcn reads it) and under public/ (the site serves it).
  const publicListing = join(root, "public/registry.json");
  if (!existsSync(publicListing)) {
    rmSync(tmp, { recursive: true, force: true });
    die(
      "missing public/registry.json — run `pnpm registry:build` before syncing",
    );
  }
  cpSync(publicListing, join(mirror, "registry.json"));
  mkdirSync(join(mirror, "public"), { recursive: true });
  cpSync(publicListing, join(mirror, "public/registry.json"));
  info("swapped registry.json for the pro-free public listing");

  // --- swap in the pro-free registry index ----------------------------------
  // The private __registry__/index.tsx React.lazy-imports every pro block.
  // registry/pro/** is excluded from the mirror, so shipping that file would
  // leave the public build with ~111 unresolvable import specifiers. Ship the
  // generated pro-free variant as the mirror's index instead.
  const publicIndexSrc = join(mirror, "__registry__/index.public.tsx");
  const mirrorIndex = join(mirror, "__registry__/index.tsx");
  if (!existsSync(publicIndexSrc)) {
    rmSync(tmp, { recursive: true, force: true });
    die(
      "missing __registry__/index.public.tsx — run `pnpm registry:build` before syncing",
    );
  }
  cpSync(publicIndexSrc, mirrorIndex);
  rmSync(publicIndexSrc, { force: true });
  info("swapped __registry__/index.tsx for the pro-free public index");

  // --- verify no pro files snuck in -----------------------------------------
  const mirrorFiles = listFiles(mirror);
  const leaked = mirrorFiles.filter((f) => isExcluded(f));
  if (leaked.length > 0) {
    console.error("\n✗ PRO FILES LEAKED INTO PUBLIC SNAPSHOT:");
    leaked.forEach((f) => console.error(`    ${f}`));
    rmSync(tmp, { recursive: true, force: true });
    die("aborting — check PRO_EXCLUDES in scripts/sync-public.mjs");
  }
  info(`verified: 0 pro files in snapshot (${mirrorFiles.length} files)`);

  // --- verify no pro *references* survive -----------------------------------
  // A file can carry no pro path in its own name yet still import one. Those
  // specifiers must resolve at build time, so a dangling one breaks the public
  // build. Data-only strings (the pro manifests list `registry/pro/...` paths
  // as plain values) are fine and deliberately not matched here. `\s*` spans
  // newlines because the formatter wraps long import() calls.
  const PRO_IMPORT_RE =
    /(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*)["'`](?:@\/)?registry\/pro\//;
  const SCANNABLE_RE = /\.(tsx?|mts|mjs|cjs|jsx|js|mdx|css)$/;
  const danglingRefs = mirrorFiles.filter(
    (f) =>
      SCANNABLE_RE.test(f) &&
      PRO_IMPORT_RE.test(readFileSync(join(mirror, f), "utf8")),
  );
  if (danglingRefs.length > 0) {
    console.error("\n✗ UNRESOLVABLE PRO IMPORTS IN PUBLIC SNAPSHOT:");
    danglingRefs.forEach((f) => console.error(`    ${f}`));
    rmSync(tmp, { recursive: true, force: true });
    die(
      "aborting — these files import registry/pro/**, which the mirror excludes",
    );
  }
  info(`verified: 0 pro imports in snapshot`);

  // --- report ---------------------------------------------------------------
  console.log("\n◇ copied:");
  copied.forEach((c) => info(c));

  if (isDryRun) {
    console.log("\n◇ dry run complete — nothing was committed or pushed.\n");
    rmSync(tmp, { recursive: true, force: true });
    return;
  }

  // --- commit + push ----------------------------------------------------------
  console.log("\n◇ committing…");
  const gitOpts = { cwd: mirror };
  run("git add -A", gitOpts);
  const status = run("git status --porcelain", gitOpts);
  if (!status.trim()) {
    console.log("  no changes — public repo is already in sync.\n");
    rmSync(tmp, { recursive: true, force: true });
    return;
  }
  run(
    'git commit -m "sync: update public mirror from private repo" --no-verify',
    gitOpts,
  );
  run(`git push origin ${PUBLIC_BRANCH}`, gitOpts);
  console.log("  pushed to origin/" + PUBLIC_BRANCH);

  rmSync(tmp, { recursive: true, force: true });
  console.log("\n✓ sync complete.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
