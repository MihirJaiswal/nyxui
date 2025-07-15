import { componentsData } from "../../../registry/Data";
import Link from "next/link";
import Image from "next/image";
import { GlowCard } from "../../../registry/ui/glow-card";
import { cn } from "../../../lib/utils";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-14 text-gray-900 dark:text-gray-100">
        Categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedTags.map((tag) => (
          <GlowCard
            variant="cosmic"
            className="rounded-md border border-gray-300 dark:border-zinc-800"
            key={tag}
          >
            <div
              className={cn(
                `absolute inset-0 size-full`,
                `bg-[radial-gradient(#00000022_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]`,
                "lab-bg pointer-events-none [background-size:16px_16px]",
              )}
            />
            <Link
              key={tag}
              href={`/docs/category/${encodeURIComponent(tag.toLowerCase())}`}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-lg transition-all duration-500 ease-out group-hover:border-transparent group-hover:scale-[1.02] group-hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.1),0_10px_30px_-5px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_1px_3px_0_rgba(0,0,0,0.1),0_10px_30px_-5px_rgba(0,0,0,0.25)]"></div>

              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-gray-50/50 group-hover:to-gray-100/50 dark:group-hover:from-gray-900/50 dark:group-hover:to-gray-800/50 rounded-lg transition-all duration-500 ease-out opacity-0 group-hover:opacity-100"></div>

              <div className="relative p-8 rounded-lg">
                <div className="flex flex-col h-full">
                  <div className="mb-6 w-12 h-12 rounded-full">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={150}
                      height={150}
                      className="inline-block mr-2 rounded-full"
                      quality={100}
                      loading="lazy"
                    />
                  </div>

                  <div className="mb-2">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-gray-50 transition-all duration-300 ease-out group-hover:translate-x-1">
                      {tag}
                    </h2>
                  </div>

                  <div className="mt-auto flex justify-between items-end">
                    <span className="text-sm text-gray-500 dark:text-gray-400 transition-all duration-300 ease-out group-hover:text-gray-900 dark:group-hover:text-gray-100">
                      {tagCounts[tag]}{" "}
                      {tagCounts[tag] === 1 ? "component" : "components"}
                    </span>

                    <span className="text-sm text-transparent transition-all duration-300 ease-out group-hover:text-gray-900 dark:group-hover:text-gray-100 transform translate-x-0 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
