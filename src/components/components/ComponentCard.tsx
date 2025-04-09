import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ComponentCard({ slug, title, description, imageSrc }: { slug: string; title: string; description: string; imageSrc: string }) {
  return (
    <Link href={`/components/${slug}`} className="block">
      <div className="rounded-lg overflow-hidden shadow-lg max-w-4xl transition-all duration-300 hover:shadow-xl cursor-pointer h-full">
        <div className="relative h-72 w-full">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover border"
            priority={false}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{title}</h2>
            <ArrowRight className="text-gray-500 dark:text-gray-400" size={20} />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
}