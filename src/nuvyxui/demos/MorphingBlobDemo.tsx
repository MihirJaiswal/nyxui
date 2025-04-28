import { MorphingBlob } from "@/nuvyxui/components/MorphingBlob";
import { MoonIcon } from "@radix-ui/react-icons";

export const MorphingBlobDemo = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6">
      <div className="relative">
        <MorphingBlob 
          theme="custom"
          customColors={{
            from: "#00406b",
            via: "#57006b",
            to: "#6b0057",
          }}
          size="lg"
          complexity={4}
          speed={2}
          glow={false}
          effect3D={true}
          hoverEffect={true}
          clickEffect={true}
          pulse={false}
        >
          <div className="text-center p-6">
            <MoonIcon className="h-10 w-10 mx-auto mb-3" />
            <h4 className="text-xl font-bold mb-2">Nuvyx UI</h4>
            <p className="text-sm opacity-90 max-w-[180px]">
              Beautiful animated backgrounds for modern UIs
            </p>
          </div>
        </MorphingBlob>
      </div>
    </div>
  );
};
