import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import SpecialCard from "@/nyxui/components/specialCard";
import SpecialCardDemo from "@/nyxui/demos/SpecialCardDemo";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/specialCard.tsx");
const CardSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/SpecialCardDemo.tsx");
const CardDemoSource = fs.readFileSync(demoPath, "utf8");

export const specialCardData: ComponentData = {
  name: "Special Card",
  description:
    "A dynamic card component with layered images and hover animations. It supports customization for dimensions, colors, animations, and more via props.",
  preview: <SpecialCardDemo />,
  usage: CardDemoSource,
  componentCode: CardSource,
  dependencies: [
    {
      name: "Next.js",
      description: "React framework used to build the component.",
      install: {
        npm: "npm install next react react-dom",
        yarn: "yarn add next react react-dom",
        pnpm: "pnpm install next react react-dom",
        bun: "bun install next react react-dom"
      }
    },
    {
      name: "Tailwind CSS",
      description:
        "Utility-first CSS framework used for styling the component.",
      install: {
        npm: "npm install tailwindcss postcss autoprefixer && npx tailwindcss init -p",
        yarn: "yarn add tailwindcss postcss autoprefixer && yarn tailwindcss init -p",
        pnpm: "pnpm install tailwindcss postcss autoprefixer && pnpm tailwindcss init -p",
        bun: "bun install tailwindcss postcss autoprefixer && bun tailwindcss init -p"
      },
      setup: {
        description: "Configure Tailwind CSS by creating a tailwind.config.js file.",
        file: "tailwind.config.js",
        code: `module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`
      }
    }
  ],
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
  category: "Components",
  examples: [
    {
      name: "Batman Dark",
      preview: (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium mb-4">Batman Dark</h2>
          <SpecialCard
            coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/thedarkknightposter.jpg"
            titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/dlogo.png"
            characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/klipart.png"
            width={300}
            height={400}
          />
        </div>
      ),
      filename: "BatmanDark.tsx",
      code: `import SpecialCard from "@/nyxui/components/SpecialCard";

export function BatmanDark() {
  return (
    <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium mb-4">Batman Dark</h2>
          <SpecialCard
            coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/thedarkknightposter.jpg"
            titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/dlogo.png"
            characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/klipart.png"
            width={300}
            height={400}
          />
        </div>
  );
}`
    },
    {
      name: "Iron Man Tech",
      preview: (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium mb-4">Iron Man Tech</h2>
          <SpecialCard
            coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulkposter.jpg"
            titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hlogo1.png"
            characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulp1.png"
            backgroundColor="#5A1E0A"
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
      ),
      filename: "IronManTech.tsx",
      code: `import SpecialCard from "@/nyxui/components/SpecialCard";

export function IronManTech() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-medium mb-4">Iron Man Tech</h2>
      <SpecialCard
        coverImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulkposter.jpg"
        titleImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hlogo1.png"
        characterImage="https://raw.githubusercontent.com/MihirJaiswal/hero-hq/refs/heads/main/public/hulp1.png"
        backgroundColor="#5A1E0A"
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
  );
}`
    },
  ]
};
