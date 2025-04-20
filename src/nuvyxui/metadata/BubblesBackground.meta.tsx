import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import BubbleBackground from "@/nuvyxui/components/BubbleBackground";
import { BubblesBackgroundDemo } from "@/nuvyxui/demos/BubblesBackgroundDemo";
import BubbleBackgroundSource from "!!raw-loader!@/nuvyxui/components/BubbleBackground.tsx";
import BubblesBackgroundDemoSource from "!!raw-loader!@/nuvyxui/demos/BubblesBackgroundDemo.tsx";

export const bubbleBackgroundData: ComponentData = {
  name: "Bubbles Background",
  description:
    "An interactive fluid bubble background component with animated colorful blobs that respond to user interaction.",
  preview: <BubblesBackgroundDemo />,
  usage: BubblesBackgroundDemoSource,
  componentCode: BubbleBackgroundSource,
  dependencies: [
    {
      setup: {
        file: "globals.css",
        code: `@keyframes bounceV {
  0%, 100% { transform: translateY(-50%); }
  50% { transform: translateY(50%); }
}

@keyframes bounceH {
  0%, 100% { transform: translateX(-50%) translateY(-10%); }
  50% { transform: translateX(50%) translateY(10%); }
}
        
@keyframes moveInCircle {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`, 
        description: "Copy and paste this code into your globals.css file",
      },
    }
  ],
  tags: ["Background", "Animation", "Interactive"],
  props: [
    {
      name: "Bubble Background",
      items: [
        {
          name: "bgColorA",
          type: "string",
          default: '"rgb(108, 0, 162)"',
          description: "First color for the background gradient.",
        },
        {
          name: "bgColorB",
          type: "string",
          default: '"rgb(0, 17, 82)"',
          description: "Second color for the background gradient.",
        },
        {
          name: "bubbleColors",
          type: "object",
          default: "defaultBubbleColors",
          description:
            "RGB color values for different bubbles and the interactive bubble.",
        },
        {
          name: "blendMode",
          type: "string",
          default: '"hard-light"',
          description: "CSS blend mode for the bubble elements.",
        },
        {
          name: "bubbleSize",
          type: "string",
          default: '"80%"',
          description: "Size of the bubble elements relative to the container.",
        },
      ],
    },
  ],

  category: "Background",
  examples: [
    {
      name: "Sunset Theme",
      preview: (
        <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
          <BubbleBackground
            bgColorA="rgb(252, 70, 107)"
            bgColorB="rgb(63, 94, 251)"
            bubbleColors={{
              colorA: "252, 70, 107",
              colorB: "254, 130, 68",
              colorC: "255, 207, 115",
              colorD: "240, 169, 135",
              colorE: "251, 215, 134",
              interactive: "242, 112, 89",
            }}
            blendMode="screen"
          />
        </div>
      ),
      filename: "SunsetBubbles.tsx",
      code: `import { BubbleBackground } from "@/nuvyxui/components/BubbleBackground";
    
  export function SunsetBubbles() {
    return (
      <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
        <BubbleBackground
          bgColorA="rgb(252, 70, 107)"
          bgColorB="rgb(63, 94, 251)"
          bubbleColors={{
            colorA: "252, 70, 107",
            colorB: "254, 130, 68",
            colorC: "255, 207, 115",
            colorD: "240, 169, 135",
            colorE: "251, 215, 134",
            interactive: "242, 112, 89"
          }}
          blendMode="screen"
        />
      </div>
    );
  }`,
    },
    {
      name: "Neon Theme",
      preview: (
        <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
          <BubbleBackground
            bgColorA="rgb(0, 0, 0)"
            bgColorB="rgb(20, 20, 20)"
            bubbleColors={{
              colorA: "255, 0, 153",
              colorB: "0, 255, 179",
              colorC: "255, 0, 255",
              colorD: "0, 255, 255",
              colorE: "255, 255, 0",
              interactive: "0, 255, 0",
            }}
            blendMode="screen"
            bubbleSize="85%"
          />
        </div>
      ),
      filename: "NeonBubbles.tsx",
      code: `import { BubbleBackground } from "@/nuvyxui/components/BubbleBackground";
    
  export function NeonBubbles() {
    return (
      <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
        <BubbleBackground
          bgColorA="rgb(0, 0, 0)"
          bgColorB="rgb(20, 20, 20)"
          bubbleColors={{
            colorA: "255, 0, 153",
            colorB: "0, 255, 179",
            colorC: "255, 0, 255",
            colorD: "0, 255, 255",
            colorE: "255, 255, 0",
            interactive: "0, 255, 0"
          }}
          blendMode="screen"
          bubbleSize="85%"
        />
      </div>
    );
  }`,
    }
  ],
};
