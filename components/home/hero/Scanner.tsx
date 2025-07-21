import { ImageScanner } from '@/registry/ui/image-scanner'
import React from 'react'

export const Scanner = () => {
  // Define your custom scan results
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
      <ImageScanner
        image="/assets/images/landing-page/nyx.png"
        scanType='matrix'
        scanColor="emerald"
        scanDelay={5}
        showDataOverlay={false}
        showScanResults
        scanResults={personScanResults}
        autoScan={true}
        loop
      />
    </div>
  )
}