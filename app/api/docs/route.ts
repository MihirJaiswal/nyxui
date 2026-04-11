import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const docsRoot = path.join(process.cwd(), "content", "docs");

async function walkMdxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walkMdxFiles(fullPath);
      if (!entry.name.endsWith(".mdx")) return [];
      return [fullPath];
    }),
  );
  return files.flat();
}

export async function GET() {
  try {
    const files = await walkMdxFiles(docsRoot);
    const docs = await Promise.all(
      files.map(async (filePath: string) => {
        const raw = await fs.readFile(filePath, "utf8");
        const slug = path
          .relative(docsRoot, filePath)
          .replace(/\.mdx$/, "")
          .replace(/\\/g, "/");
        return { slug, content: raw };
      }),
    );
    return NextResponse.json(docs);
  } catch {
    return NextResponse.json({ error: "Failed to load docs" }, { status: 500 });
  }
}
