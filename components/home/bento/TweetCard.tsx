"use client";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/registry/ui/glow-card";
import Image from "next/image";
import Link from "next/link";
import Imageripple from "./ImageRipple";
import img from '../../../public/assets/images/landing-page/mihir.webp'

export const TwitterCard = () => {

  return (
    <GlowCard
    allowCustomBackground
      className="w-full !p-0 rounded-xl hover:rounded-2xl md:max-w-full h-full mx-auto bg-white dark:bg-black shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none sm:border md:border-none max-w-xs"
    >
      <div
        className="p-3 sm:p-5"
      >
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={img}
                  alt="Mihir Jaiswal"
                  width={500}
                  height={500}
                  loading="lazy"
                  placeholder="blur"
                  quality={100}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <h3 className="font-bold text-sm sm:text-base text-black dark:text-white">
                  Mihir Jaiswal
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                  @mihirjaiswal
                </p>
              </div>
              <svg
                height="20"
                width="20"
                className="flex-shrink-0 ml-1"
                fill="currentcolor"
                viewBox="0 0 1200 1227"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
            Hover on the image below to see the magic! 😆{" "}
            <span className="text-blue-600 dark:text-blue-400 transition-colors cursor-pointer font-medium">
              #webdev
            </span>{" "}
            <span className="text-blue-600 dark:text-blue-400 transition-colors cursor-pointer font-medium">
              #magic
            </span>
          </p>
          <div className="flex mt-6 items-center justify-center overflow-hidden rounded-sm border dark:bg-zinc-800 h-44 relative">
          <div className="absolute inset-0 h-full w-full items-center px-5 [background:radial-gradient(125%_125%_at_50%_10%,#E5ECFC_40%,#EED5FE_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
              <Imageripple/>
          </div>
        </div>
        <div className="mt-3 sm:mt-8 flex items-center justify-between text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <button className="flex items-center space-x-1 group">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-red-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-red-500 transition-colors">
                42
              </span>
            </button>
            <button className="flex items-center space-x-1 group">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-green-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-green-500 transition-colors">
                24
              </span>
            </button>
            <button className="flex items-center space-x-1 group">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-blue-500 transition-colors">
                16
              </span>
            </button>
          </div>
          <button className="flex items-center space-x-1 text-xs sm:text-sm hover:text-blue-500 transition-colors">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
      <div className="px-3 sm:px-5 py-2 sm:py-3 border-t border-gray-800 flex justify-between items-center">
        <span className="text-xxs sm:text-xs text-gray-600 dark:text-gray-400">
          1:24 PM · Apr 7, 2025
        </span>
        <Link href="https://x.com/mihir_jaiswal_" target="_blank" rel="noopener noreferrer">
        <Button
            size="sm"
            className="transition-all duration-300 transform hover:scale-105 font-semibold px-4 py-2 bg-blue-500 rounded-full"
          >
              <span className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Follow
              </span>
          </Button>
        </Link>
      </div>
    </GlowCard>
  );
};
