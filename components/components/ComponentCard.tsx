import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPlaiceholder } from "plaiceholder";
import { readFile } from "fs/promises";
import path from "path";

export async function ComponentCard({
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
  type?: "components" | "blocks" | "templates";
}) {
  // Generate the correct href based on type
  const getHref = () => {
    switch (type) {
      case "blocks":
        return `/blocks/${slug}`;
      case "templates":
        return `/templates/${slug}`;
      default:
        return `/components/${slug}`;
    }
  };

  let base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  try {
    const imagePath = path.join(process.cwd(), 'public', imageSrc);
    const imageBuffer = await readFile(imagePath);
    const placeholder = await getPlaiceholder(imageBuffer);
    base64 = placeholder.base64;
  } catch (error) {
    console.warn(`Could not generate placeholder for ${imageSrc}:`, error);
  }

  // Set image dimensions based on type (templates use different dimensions)
  const imageHeight = type === "templates" ? 650 : 720;

  return (
    <Link href={getHref()} className="block">
      <div className="rounded-lg overflow-hidden max-w-4xl transition-all duration-300 cursor-pointer h-full">
        <div className="relative dark:border bg-black flex items-center justify-center rounded-lg dark:border-white/[0.1] overflow-hidden transition duration-200 hover:scale-105">
          <Image
            src={imageSrc}
            alt={title}
            width={1024}
            height={imageHeight}
            quality={100}
            decoding="async"
            placeholder="blur"
            blurDataURL={base64}
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