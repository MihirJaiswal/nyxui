"use client";
import React, { useState } from "react";
import { ImageScanner } from "../components/ImageScanner";
import { Button } from "@/components/ui/button";

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
              <h3 className="font-bold text-xl mt-2">
                Click to Scan
              </h3>
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
              <h3 className="font-bold text-xl mt-2">
                Repeating Scan
              </h3>
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
              <h3 className="font-bold text-xl mt-2">
                Button Triggered
              </h3>
            </div>
            <Button
              onClick={triggerNewScan}
            >
              Trigger Scan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
