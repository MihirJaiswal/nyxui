"use client";

import * as React from "react";
import { ChevronRight, File, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/components/code-block/copy-button";

export interface FileCodeViewerFile {
  /** Raw source (used for copy). */
  code: string;
  /** Pre-highlighted dual-theme HTML from shiki. */
  html: string;
  /** Display path, e.g. components/hero-card.tsx */
  path: string;
  /** Short display name. */
  name?: string;
  language?: string;
}

/* ------------------------------------------------------------------ */
/*  File tree                                                          */
/* ------------------------------------------------------------------ */

interface TreeNode {
  name: string;
  path: string;
  children: Map<string, TreeNode>;
  isFile: boolean;
}

/**
 * Removes the longest common directory prefix shared by every file
 * (`hero/hero-section-05/components/nav.tsx` → `components/nav.tsx`).
 */
function stripCommonPrefix(files: FileCodeViewerFile[]): FileCodeViewerFile[] {
  if (!files.length) return files;

  const splitPaths = files.map((file) => file.path.split("/").filter(Boolean));
  let prefix = splitPaths[0].slice(0, -1);

  for (const parts of splitPaths.slice(1)) {
    let i = 0;
    while (i < prefix.length && prefix[i] === parts[i]) i++;
    prefix = prefix.slice(0, i);
    if (!prefix.length) break;
  }

  if (!prefix.length) return files;
  const prefixLength = prefix.join("/").length + 1;

  return files.map((file) => ({
    ...file,
    path: file.path.slice(prefixLength),
  }));
}

function buildTree(files: FileCodeViewerFile[]): TreeNode {
  const root: TreeNode = {
    name: "",
    path: "",
    children: new Map(),
    isFile: false,
  };

  for (const file of files) {
    const segments = file.path.split("/").filter(Boolean);
    let node = root;

    segments.forEach((segment, index) => {
      const isLeaf = index === segments.length - 1;
      const path = segments.slice(0, index + 1).join("/");
      let child = node.children.get(segment);

      if (!child) {
        child = {
          name: segment,
          path,
          children: new Map(),
          isFile: isLeaf,
        };
        node.children.set(segment, child);
      }

      node = child;
    });
  }

  return root;
}

function FileIcon({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase();

  if (ext === "json") {
    return (
      <span
        aria-hidden="true"
        className="flex size-4 shrink-0 items-center justify-center text-[10px] font-bold leading-none text-amber-500"
      >
        {"{}"}
      </span>
    );
  }

  return (
    <File
      aria-hidden="true"
      className="size-4 shrink-0 text-muted-foreground"
    />
  );
}

function FileTreeButton({
  node,
  depth,
  activePath,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  activePath: string;
  onSelect: (path: string) => void;
}) {
  const isActive = node.path === activePath;

  return (
    <button
      type="button"
      onClick={() => onSelect(node.path)}
      style={{ "--index": `${depth * 1.4 + 1.5}rem` } as React.CSSProperties}
      data-active={isActive}
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-none pl-(--index) text-left text-sm whitespace-nowrap outline-none transition-colors",
        "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        "data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground",
      )}
    >
      <FileIcon name={node.name} />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

function FolderTree({
  node,
  depth,
  activePath,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  activePath: string;
  onSelect: (path: string) => void;
}) {
  const [open, setOpen] = React.useState(true);
  const entries = React.useMemo(
    () =>
      [...node.children.values()].sort((a, b) => {
        if (a.isFile !== b.isFile) return a.isFile ? 1 : -1;
        return a.name.localeCompare(b.name);
      }),
    [node],
  );

  // Invisible root — render children directly.
  if (!node.name) {
    return (
      <>
        {entries.map((child) =>
          child.isFile ? (
            <FileTreeButton
              key={child.path}
              node={child}
              depth={depth}
              activePath={activePath}
              onSelect={onSelect}
            />
          ) : (
            <FolderTree
              key={child.path}
              node={child}
              depth={depth}
              activePath={activePath}
              onSelect={onSelect}
            />
          ),
        )}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ "--index": `${depth * 1.4 + 0.5}rem` } as React.CSSProperties}
        aria-expanded={open}
        className="flex h-8 w-full items-center gap-2 rounded-none pl-(--index) text-left text-sm text-muted-foreground outline-none transition-colors hover:bg-muted/50 hover:text-foreground"
      >
        <ChevronRight
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 transition-transform",
            open && "rotate-90",
          )}
        />
        <Folder aria-hidden="true" className="size-4 shrink-0" />
        <span className="truncate">{node.name}</span>
      </button>

      {open &&
        entries.map((child) =>
          child.isFile ? (
            <FileTreeButton
              key={child.path}
              node={child}
              depth={depth + 1}
              activePath={activePath}
              onSelect={onSelect}
            />
          ) : (
            <FolderTree
              key={child.path}
              node={child}
              depth={depth + 1}
              activePath={activePath}
              onSelect={onSelect}
            />
          ),
        )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Viewer                                                             */
/* ------------------------------------------------------------------ */

export function FileCodeViewer({
  files,
  className,
}: {
  files: FileCodeViewerFile[];
  className?: string;
}) {
  const visibleFiles = React.useMemo(() => stripCommonPrefix(files), [files]);

  const [activePath, setActivePath] = React.useState(
    () => visibleFiles[0]?.path ?? "",
  );

  const activeFile = React.useMemo(
    () =>
      visibleFiles.find((file) => file.path === activePath) ?? visibleFiles[0],
    [visibleFiles, activePath],
  );

  const tree = React.useMemo(() => buildTree(visibleFiles), [visibleFiles]);
  const showTree = visibleFiles.length > 1;

  if (!visibleFiles.length || !activeFile) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-full flex-col overflow-hidden rounded-xl border border-border bg-background sm:flex-row sm:items-stretch",
        className,
      )}
    >
      {/* file tree rail */}
      {showTree && (
        <div className="flex min-h-full w-full shrink-0 flex-col border-b border-border bg-muted/40 sm:w-64 sm:self-stretch sm:border-r sm:border-b-0">
          <div className="flex h-12 shrink-0 items-center border-b border-border px-4 text-sm font-medium text-muted-foreground">
            Files
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto py-1">
            <FolderTree
              node={tree}
              depth={0}
              activePath={activeFile.path}
              onSelect={setActivePath}
            />
          </div>
        </div>
      )}

      {/* code pane */}
      <figure
        data-rehype-pretty-code-figure
        className="relative m-0 flex min-w-0 flex-1 flex-col overflow-hidden rounded-none border-none"
      >
        <figcaption className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4 py-2 text-sm text-foreground">
          <FileIcon name={activeFile.name ?? activeFile.path} />
          <span className="truncate font-mono text-[13px]">
            {activeFile.path}
          </span>
          <CopyButton
            value={activeFile.code}
            src={activeFile.path}
            event="copy_source_code"
            aria-label="Copy"
            data-slot="copy-button"
            data-variant="ghost"
            data-size="icon-xs"
            className="ml-auto inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
          />
        </figcaption>
        <div
          className="h-162.5 min-w-0 overflow-y-auto scrollbar-no px-4 py-3.5 [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!bg-transparent [&_pre]:text-[13px] [&_pre]:leading-6 [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
          dangerouslySetInnerHTML={{ __html: activeFile.html }}
        />
      </figure>
    </div>
  );
}

export default FileCodeViewer;
