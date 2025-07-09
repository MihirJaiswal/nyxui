import { MorphingBlob } from "../ui/morphing-blob";
import { MoonIcon } from "@radix-ui/react-icons";

export const MorphingBlobDemo = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6">
      <div className="relative flex flex-col bg-background rounded-full">
        <div className="absolute top-12 left-10 h-[78%] w-[78%] bg-blue-400/60 dark:bg-blue-400/30 rounded-full blur-xl shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse"></div>
        <MorphingBlob
          theme="primary"
        >
          <div className="text-center p-6">
            <MoonIcon className="h-10 w-10 mx-auto mb-3 text-white" />
            <h4 className="text-xl w-full font-bold mb-2 text-white">Nuvyx UI</h4>
          </div>
        </MorphingBlob>
      </div>
    </div>
  );
};