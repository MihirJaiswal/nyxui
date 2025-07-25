import { ImageScanner } from "../ui/image-scanner"

export default function ImageScannerDemo() {
    const personScanResults = [
        {
          id: "person-1",
          type: "object" as const,
          confidence: 98,
          position: { x: 60, y: 40 }, 
          label: "Person"
        },
        {
            id: "gun",
            type: "object" as const,
            confidence: 90,
            position: { x: 30, y: 30 }, 
            label: "Gun"
          }
      ]
  return (
    <div>
      <ImageScanner
        image="/assets/images/image-scanner/img.jpg"
        scanType='default'
        scanColor="emerald"
        scanDelay={2}
        showDataOverlay={false}
        showScanResults
        scanResults={personScanResults}
        autoScan={true}
        loop
      />
    </div>
  )
}
