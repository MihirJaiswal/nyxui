import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ComponentCard({
  slug,
  title,
  description,
  imageSrc,
  type = "components",
}: {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  type?: "components" | "blocks";
}) {
  const href = type === "blocks" ? `/blocks/${slug}` : `/components/${slug}`;

  return (
    <Link href={href} className="block">
      <div className="rounded-lg overflow-hidden max-w-4xl transition-all duration-300 cursor-pointer h-full">
        <div className="relative dark:border bg-black flex items-center justify-center rounded-lg dark:border-white/[0.1] overflow-hidden transition duration-200 hover:scale-105">
          <Image
            src={imageSrc}
            alt={title}
            width={1024}
            height={720}
            quality={100}
            decoding="async"
            className="transition duration-300 blur-0 rounded-md group-hover:scale-102"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              {title}
            </h2>
            <ArrowRight
              className="text-gray-500 dark:text-gray-400"
              size={20}
            />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
