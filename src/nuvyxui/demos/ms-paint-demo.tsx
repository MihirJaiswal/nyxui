"use client";
import DrawingCanvas from "@/nuvyxui/components/ms-paint";

export default function MSpaintDemo() {
  const handleSave = (canvas: HTMLCanvasElement) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const fileName = `MyDrawing_${Date.now()}.png`;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, "image/png");
  };
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <DrawingCanvas
        title="My Drawing App"
        onSave={handleSave}
        menuItems={["File", "Edit", "Tools", "Help"]}
      />
    </div>
  );
}
