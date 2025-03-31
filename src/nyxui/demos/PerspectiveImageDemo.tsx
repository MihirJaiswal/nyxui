"use client"

import React from "react"
import { PerspectiveImage } from "@/nyxui/components/PerspectiveImage"

export function PerspectiveImageDemo() {
  const imageSrc =
    "https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeNzg-kMHhUBP4AmHnLsrPYzxKHVceLnkwtLhxZlDssj7KjhStloJR6px7EbquZ83uDcygnWkekxysvuNYVzLQ3GyBMRl2PpU7pO.jpg?r=db8"

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
          3D Perspective Image Hover
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">
          Experience interactive 3D tilt effects with a single image source.
        </p>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <PerspectiveImage
              src={imageSrc}
              alt="3D Perspective Example 1"
              width={400}
              height={300}
              intensity={15}
              perspective={1000}
              shine={true}
              shadow={true}
              border={false}
              glare={true}
              glareOpacity={0.8}
              borderRadius="8px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
