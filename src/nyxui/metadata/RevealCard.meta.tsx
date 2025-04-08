import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import RevealCard from "@/nyxui/components/RevealCard";
import RevealCardDemo from "@/nyxui/demos/RevealCardDemo";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/RevealCard.tsx");
const CardSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/RevealCardDemo.tsx");
const CardDemoSource = fs.readFileSync(demoPath, "utf8");

export const revealCardData: ComponentData = {
  name: "Reveal Card",
  description:
    "A dynamic card component with layered images and hover animations. It supports customization for dimensions, colors, animations, and more via props.",
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
          description: "URL for the cover image."
        },
        {
          name: "titleImage",
          type: "string",
          default: '""',
          description: "URL for the title image."
        },
        {
          name: "characterImage",
          type: "string",
          default: '""',
          description: "URL for the character image."
        },
        {
          name: "width",
          type: "number",
          default: "266",
          description: "Width of the card in pixels."
        },
        {
          name: "height",
          type: "number",
          default: "400",
          description: "Height of the card in pixels."
        },
        {
          name: "backgroundColor",
          type: "string",
          default: '"#192740"',
          description: "Background color of the card."
        },
        {
          name: "borderColor",
          type: "string",
          default: '"#ddd"',
          description: "Border color of the card."
        },
        {
          name: "hoverRotation",
          type: "number",
          default: "25",
          description: "Rotation angle on hover."
        },
        {
          name: "titleTranslateY",
          type: "number",
          default: "-50",
          description: "Y-axis translation for title image on hover."
        },
        {
          name: "characterTranslateY",
          type: "number",
          default: "-30",
          description: "Y-axis translation for character image on hover."
        },
        {
          name: "characterTranslateZ",
          type: "number",
          default: "100",
          description: "Z-axis translation for character image on hover."
        },
        {
          name: "href",
          type: "string",
          default: '"#"',
          description: "Hyperlink reference for the card."
        },
        {
          name: "alt",
          type: "{ cover?: string; title?: string; character?: string; }",
          default:
            '{ cover: "Cover Image", title: "Title", character: "Character" }',
          description: "Alternate text for the images."
        },
        {
          name: "gradientColors",
          type: "{ top?: string; bottom?: string; }",
          default:
            '{ top: "rgba(12,13,19,1)", bottom: "rgba(12,13,19,1)" }',
          description: "Gradient overlay colors for the cover image."
        },
        {
          name: "animation",
          type: "{ duration?: number; delay?: number; }",
          default: '{ duration: 500, delay: 0 }',
          description: "Animation duration and delay in milliseconds."
        },
        {
          name: "shadow",
          type: "string",
          default: '"2px 35px 32px -8px rgba(0,0,0,0.75)"',
          description: "Shadow effect applied on hover."
        },
        {
          name: "priority",
          type: "boolean",
          default: "false",
          description:
            "If true, images are prioritized for loading (eager loading)."
        }
      ]
    }
  ],
  category: "Cards",
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
              backgroundColor="#1a1a1a"
              borderColor="#333333"
            />
          </div>
        </div>
      ),
      filename: "BatmanDark.tsx",
      code: `import RevealCard from "@/nyxui/components/RevealCard";
  
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
            backgroundColor="#1a1a1a"
            borderColor="#333333"
          />
        </div>
      </div>
    );
  }`
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
              backgroundColor="#064001"
              borderColor="#D4AF37"
              characterTranslateY={-40}
              characterTranslateZ={150}
              titleTranslateY={-70}
              animation={{
                duration: 600,
                delay: 100
              }}
              shadow="0px 40px 40px -10px rgba(255,125,0,0.4)"
            />
          </div>
        </div>
      ),
      filename: "IronManTech.tsx",
      code: `import RevealCard from "@/nyxui/components/RevealCard";
  
  export function IronManTech() {
    return (
      <div className="flex flex-col items-center py-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <RevealCard
            coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulkposter.jpg"
            titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hlogo1.png"
            characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulp1.png"
            backgroundColor="#064001"
            borderColor="#D4AF37"
            characterTranslateY={-40}
            characterTranslateZ={150}
            titleTranslateY={-70}
            animation={{
              duration: 600,
              delay: 100
            }}
            shadow="0px 40px 40px -10px rgba(255,125,0,0.4)"
          />
        </div>
      </div>
    );
  }`
    },
  ]
};
