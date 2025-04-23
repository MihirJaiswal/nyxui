import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import RevealCard from "@/nuvyxui/components/RevealCard";
import RevealCardDemo from "@/nuvyxui/demos/RevealCardDemo";

import CardSource from "!!raw-loader!@/nuvyxui/components/RevealCard.tsx";
import CardDemoSource from "!!raw-loader!@/nuvyxui/demos/RevealCardDemo.tsx";

export const revealCardData: ComponentData = {
  name: "Reveal Card",
  description:
    "A dynamic card component with layered images and hover animations.",
  preview: <RevealCardDemo />,
  usage: CardDemoSource,
  componentCode: CardSource,
  dependencies: [],
  props: [
    {
      name: "Card Props",
      items: [
        {
          name: "coverImage",
          type: "string",
          default: '""',
          description: "URL for the cover image.",
        },
        {
          name: "titleImage",
          type: "string",
          default: '""',
          description: "URL for the title image.",
        },
        {
          name: "characterImage",
          type: "string",
          default: '""',
          description: "URL for the character image.",
        },
        {
          name: "width",
          type: "number",
          default: "266",
          description: "Width of the card in pixels.",
        },
        {
          name: "height",
          type: "number",
          default: "400",
          description: "Height of the card in pixels.",
        },
        {
          name: "hoverRotation",
          type: "number",
          default: "25",
          description: "Rotation angle on hover.",
        },
        {
          name: "titleTranslateY",
          type: "number",
          default: "-50",
          description: "Y-axis translation for title image on hover.",
        },
        {
          name: "characterTranslateY",
          type: "number",
          default: "-30",
          description: "Y-axis translation for character image on hover.",
        },
        {
          name: "characterTranslateZ",
          type: "number",
          default: "100",
          description: "Z-axis translation for character image on hover.",
        },
        {
          name: "alt",
          type: "object",
          default:
            '{ cover: "Cover Image", title: "Title", character: "Character" }',
          description: "Alternate text for the images.",
        },
        {
          name: "gradientColors",
          type: "object",
          default: '{ top: "rgba(12,13,19,1)", bottom: "rgba(12,13,19,1)" }',
          description: "Gradient overlay colors for the cover image.",
        },
        {
          name: "animation",
          type: "object",
          default: "{ duration: 500, delay: 0 }",
          description: "Animation duration and delay in milliseconds.",
        },
        {
          name: "priority",
          type: "boolean",
          default: "false",
          description:
            "If true, images are prioritized for loading (eager loading).",
        },
        {
          name: "threshold",
          type: "number",
          default: "0.3",
          description: "The threshold for triggering the animation (0-1).",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes for the card.",
        },
      ],
    },
  ],
  category: "Cards",
  tags: ["Card", "3D", "Interactive"],
  examples: [
    {
      name: "Batman Dark",
      preview: (
        <div className="flex flex-col items-center py-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-yellow-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <RevealCard
              coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/thedarkknightposter.jpg"
              titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/dlogo.png"
              characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/klipart.png"
              width={300}
              height={400}
            />
          </div>
        </div>
      ),
      filename: "BatmanDark.tsx",
      code: `import RevealCard from "@/nuvyxui/components/RevealCard";
  
  export function BatmanDark() {
    return (
      <div className="flex flex-col items-center py-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-yellow-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <RevealCard
            coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/thedarkknightposter.jpg"
            titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/dlogo.png"
            characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/klipart.png"
            width={300}
            height={400}
          />
        </div>
      </div>
    );
  }`,
    },
    {
      name: "Hulk Power",
      preview: (
        <div className="flex flex-col items-center py-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <RevealCard
              coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulkposter.jpg"
              titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hlogo1.png"
              characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulp1.png"
              characterTranslateY={-40}
              characterTranslateZ={150}
              titleTranslateY={-70}
              animation={{
                duration: 600,
                delay: 100,
              }}
            />
          </div>
        </div>
      ),
      filename: "IronManTech.tsx",
      code: `import RevealCard from "@/nuvyxui/components/RevealCard";
  
  export function IronManTech() {
    return (
      <div className="flex flex-col items-center py-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <RevealCard
            coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulkposter.jpg"
            titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hlogo1.png"
            characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulp1.png"
            characterTranslateY={-40}
            characterTranslateZ={150}
            titleTranslateY={-70}
            animation={{
              duration: 600,
              delay: 100
            }}
          />
        </div>
      </div>
    );
  }`,
    },
  ],
};
