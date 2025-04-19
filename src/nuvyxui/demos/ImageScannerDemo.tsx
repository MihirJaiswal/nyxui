"use client";
import React, { useState } from "react";
import { ImageScanner } from "../components/ImageScanner";

export const ImageScannerDemo = () => {
  const [triggerIndex, setTriggerIndex] = useState<number | null>(null);
  const [scanCount, setScanCount] = useState(0);
  const triggerNewScan = () => {
    setTriggerIndex(null);
    setTimeout(() => {
      setTriggerIndex(5);
      setScanCount((prev) => prev + 1);
    }, 50);
  };

  return (
    <div className="max-w-6xl mx-auto p-3">
      <div className="p-3">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          ImageScanner
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-4 p-6 transition-all duration-300">
            <div className="relative group">
              <ImageScanner
                image="/logo.png"
                scanDirection="vertical"
                scanColor="blue"
                className="w-48 h-48 rounded-lg cursor-pointer border-2 border-blue-200 dark:border-blue-900"
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400">
                Click to Scan
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Click on the image to trigger the scan effect
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 transition-all duration-300">
            <div className="relative">
              <ImageScanner
                image="/logo.png"
                scanType="line"
                scanColor="amber"
                repeating={true}
                scanSpeed={3}
                className="w-48 h-48 rounded-lg border-2 border-amber-200 dark:border-amber-900"
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl text-amber-600 dark:text-amber-400">
                Repeating Scan
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Continuously scans in a loop
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 transition-all duration-300">
            <div className="relative">
              <ImageScanner
                image="/logo.png"
                scanSpeed={1}
                scanColor="red"
                triggerScan={triggerIndex === 5}
                key={`scanner-${scanCount}`}
                className="w-48 h-48 rounded-lg border-2 border-red-200 dark:border-red-900"
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl text-red-600 dark:text-red-400">
                Button Triggered
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Click the button to trigger scanning
              </p>
            </div>
            <button
              onClick={triggerNewScan}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Trigger Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
