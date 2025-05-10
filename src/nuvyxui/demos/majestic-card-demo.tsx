"use client";
import { useState } from "react";
import { MajesticCard } from "@/nuvyxui/components/majestic-card";
import Image from "next/image";

export function MajesticCardDemo() {
  const [isHovering, setIsHovering] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  function toggleLike() {
    setIsLiked((prev) => !prev);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center mx-auto">
      <div className="w-full max-w-md flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Hover on the card</h1>
      </div>
      <div className="w-full max-w-md">
        <MajesticCard
          variant={isHovering ? "magnetic" : "float"}
          intensity={3}
          hoverEffect
          speed="normal"
          className="w-full mx-auto overflow-hidden rounded-xl shadow-md shadow-purple-500"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            <div className="h-72 w-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <Image
                src="/assets/images/majestic-card/img.jpg"
                alt="Quantum Processor"
                width={500}
                height={500}
                loading="lazy"
                quality={100}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
              NEW
            </div>
          </div>

          <MajesticCard
            variant="glow"
            intensity={5}
            className="bg-white dark:bg-black"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                  Quantum Processor
                </h3>
                <span className="text-lg font-bold">₹71,850</span>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    (42 reviews)
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Next-gen 128-core quantum chip with advanced AI capabilities
                  and integrated neural processing for edge computing solutions.
                </p>
              </div>
              <div className="flex justify-between items-center space-x-2">
                <MajesticCard variant="breathe" className="rounded-lg">
                  <button className="p-[1.5px] relative rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500" />
                    <div className="px-6 py-1.5  bg-black rounded-lg relative group transition duration-200 text-white hover:bg-transparent">
                      Add to cart
                    </div>
                  </button>
                </MajesticCard>
                <button
                  className="flex items-center justify-center p-2 transition-colors duration-200"
                  onClick={toggleLike}
                  aria-label={isLiked ? "Unlike" : "Like"}
                >
                  {isLiked ? (
                    <svg
                      className="w-6 h-6 text-red-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-700 dark:text-gray-300"
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
                  )}
                </button>
              </div>
            </div>
          </MajesticCard>

          <div className="px-5 py-3 bg-gray-50 dark:bg-gray-950 border-t-2  border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>In stock: 7 units</span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Ships in 24 hours
            </span>
          </div>
        </MajesticCard>
      </div>
    </div>
  );
}
