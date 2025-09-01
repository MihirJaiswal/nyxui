import { ImageScanner } from '@/registry/ui/image-scanner'
import React from 'react'

export const Scanner = () => {
  const personScanResults = [
    {
      id: "person-1",
      type: "object" as const,
      confidence: 95,
      position: { x: 50, y: 40 }, 
      label: "Person"
    }
  ]

  return (
    <div className="h-[300px] w-[300px]">
      <link rel="preload" as="image" href="/assets/images/landing-page/img.webp" />
      <ImageScanner
        image="/assets/images/landing-page/img.webp"
        scanType='matrix'
        scanColor="emerald"
        scanDelay={0} // Changed from 5 to 0 for immediate scanning
        showDataOverlay={false}
        showScanResults
        scanResults={personScanResults}
        autoScan={true}
        loop
      />
    </div>
  )
}