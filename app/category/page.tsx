import { componentsData } from "@/registry/Data";
import Link from "next/link";
import Image from "next/image";
import { categoryHref } from "@/lib/links";

export default function CategoriesPage() {
  const allTags = new Set<string>();
  Object.values(componentsData.components).forEach((component) => {
    component.tags.forEach((tag) => allTags.add(tag));
  });

  const sortedTags = Array.from(allTags).sort();

  const tagCounts: Record<string, number> = {};
  sortedTags.forEach((tag) => {
    tagCounts[tag] = Object.values(componentsData.components).filter(
      (component) => component.tags.some((t) => t === tag),
    ).length;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-14 text-gray-900 dark:text-gray-100">
        Categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedTags.map((tag) => (
          <Link
            key={tag}
            href={categoryHref(tag)}
            className="bg-[#121212] border-[#121212] shadow-glass hover:bg-[#161616] group relative flex cursor-pointer flex-col overflow-hidden rounded-[20px] border p-3 h-[280px]"
          >
            <div className="flex items-center justify-between gap-2 px-2 pb-2">
              <p className="font-medium text-white line-clamp-1">{tag}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#ededed]/50 text-sm font-medium">
                  {tagCounts[tag]}{" "}
                  {tagCounts[tag] === 1 ? "component" : "components"}
                </span>
              </div>
            </div>

            <div
              className="relative w-full flex-1 overflow-hidden border border-[#000000] rounded-2xl flex items-center justify-center"
              style={{
                boxShadow:
                  "rgba(255, 255, 255, 0.1) 0px 0px 0.1px 0px inset, rgba(255, 255, 255, 0.11) 0px 1px 1px 0px inset, rgb(0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.31) 0px 1px 2px 0px",
              }}
            >
              <div className="w-14 h-14 rounded-full flex-shrink-0">
                <Image
                  src="/nyx-logo.webp"
                  alt={tag}
                  width={150}
                  height={150}
                  className="inline-block rounded-lg w-full h-full"
                  quality={100}
                  loading="lazy"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
