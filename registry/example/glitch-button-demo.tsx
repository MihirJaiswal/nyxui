"use client";
import React, { useState } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { toast, Toaster } from "sonner";
import { GlitchButton } from "../ui/glitch-button";
import {
  ArrowRight,
  Download,
  Info,
  Mail,
  Power,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";
import { MoonIcon } from "@radix-ui/react-icons";

interface ButtonsCard {
  children: React.ReactNode;
  onClick: () => void;
  isCopied: boolean;
}

type GlitchButtonType = {
  name: string;
  description: string;
  component: React.ReactNode;
  code?: string;
};

const ButtonsCard = ({ children, onClick, isCopied }: ButtonsCard) => {
  return (
    <div
      className="border group relative border-gray-300 dark:border-zinc-800 hover:border-zinc-500 hover:dark:border-zinc-500 rounded-lg p-3 flex flex-col items-center justify-center h-52 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="mb-4">{children}</div>
      <div className="absolute top-2 right-2">
        {isCopied ? (
          <Check className="h-3 w-3 text-green-500 transition-all duration-200" />
        ) : (
          <Copy className="h-3 w-3 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 group-hover:dark:text-zinc-500" />
        )}
      </div>
    </div>
  );
};

export const GlitchButtonDemo = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = (button: GlitchButtonType, index: number) => {
    if (button.code) {
      copyToClipboard(button.code, index);
      return;
    }
    let buttonString = reactElementToJSXString(button.component, {
      displayName: (element) => {
        if (
          typeof element === "object" &&
          element !== null &&
          "type" in element &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element as any).type?.name === "GlitchButton"
        ) {
          return "GlitchButton";
        }
        if (
          typeof element === "object" &&
          element !== null &&
          "type" in element &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element as any).type?.displayName
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (element as any).type.displayName;
        }
        if (
          typeof element === "object" &&
          element !== null &&
          "type" in element &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element as any).type?.name
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (element as any).type.name;
        }
        return "UnknownComponent";
      },
      functionValue: (fn) => fn.name || 'function',
    });

    if (buttonString) {
      const textToCopy = buttonString;
      copyToClipboard(textToCopy, index);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
        toast.success("Copied to clipboard");
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error copying text to clipboard:", err);
        toast.error("Error copying to clipboard");
      });
  };

  return (
    <div className="pb-4 px-4 w-full">
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto gap-6">
        {glitchButtons.map((button, idx) => (
          <ButtonsCard
            key={idx}
            onClick={() => copy(button, idx)}
            isCopied={copiedIndex === idx}
          >
            {button.component}
          </ButtonsCard>
        ))}
      </div>
    </div>
  );
};

export const glitchButtons = [
  {
    name: "Always Glitch",
    description: "Button with constant glitch effect",
    component: (
      <GlitchButton glitchAlways={true} className="text-sm sm:text-base">
        <div className="flex items-center">
          <Power className="mr-2 h-5 w-5" />
          <span>Always Glitch</span>
        </div>
      </GlitchButton>
    ),
    code: `<GlitchButton glitchAlways={true} className="text-sm sm:text-base">
  <div className="flex items-center">
    <Power className="mr-2 h-5 w-5" />
    <span>Always Glitch</span>
  </div>
</GlitchButton>`
  },
  {
    name: "Download",
    description: "Green download button with hover glitch",
    component: (
      <GlitchButton
        glitchOnHover={true}
        className="text-sm sm:text-base bg-black text-green-400 rounded-md"
      >
        <div className="flex items-center">
          <Download className="mr-2 h-5 w-5" />
          <span>DOWNLOAD</span>
        </div>
      </GlitchButton>
    ),
    code: `<GlitchButton
  glitchOnHover={true}
  className="text-sm sm:text-base bg-black text-green-400 rounded-md"
>
  <div className="flex items-center">
    <Download className="mr-2 h-5 w-5" />
    <span>DOWNLOAD</span>
  </div>
</GlitchButton>`
  },
  {
    name: "Warning",
    description: "Warning button with custom red/yellow glitch colors",
    component: (
      <GlitchButton
        glitchOnHover={true}
        glitchColors={{ primary: "#ff3e00", secondary: "#ffcc00" }}
        className="text-sm sm:text-base bg-red-900 text-yellow-300 rounded-lg"
      >
        <div className="flex items-center">
          <ShieldCheck className="mr-2 h-5 w-5" />
          <span>WARNING</span>
        </div>
      </GlitchButton>
    ),
    code: `<GlitchButton
  glitchOnHover={true}
  glitchColors={{ primary: "#ff3e00", secondary: "#ffcc00" }}
  className="text-sm sm:text-base bg-red-900 text-yellow-300 rounded-lg"
>
  <div className="flex items-center">
    <ShieldCheck className="mr-2 h-5 w-5" />
    <span>WARNING</span>
  </div>
</GlitchButton>`
  },
  {
    name: "Subscribe",
    description: "Blue subscribe button with hover glitch",
    component: (
      <GlitchButton
        glitchOnHover={true}
        glitchColors={{ primary: "#00aaff", secondary: "#0044ff" }}
        className="text-sm sm:text-base bg-blue-950 text-blue-300"
      >
        <div className="flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          <span>SUBSCRIBE</span>
        </div>
      </GlitchButton>
    ),
    code: `<GlitchButton
  glitchOnHover={true}
  glitchColors={{ primary: "#00aaff", secondary: "#0044ff" }}
  className="text-sm sm:text-base bg-blue-950 text-blue-300"
>
  <div className="flex items-center">
    <Mail className="mr-2 h-5 w-5" />
    <span>SUBSCRIBE</span>
  </div>
</GlitchButton>`
  },
  {
    name: "Nuvyx UI",
    description: "Purple themed button with cyan glitch",
    component: (
      <GlitchButton
        glitchColors={{ primary: "#be21ed", secondary: "#00ffcc" }}
        className="text-sm sm:text-base bg-purple-950"
      >
        <div className="flex items-center">
          <MoonIcon className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span>Nuvyx UI</span>
        </div>
      </GlitchButton>
    ),
    code: `<GlitchButton
  glitchColors={{ primary: "#be21ed", secondary: "#00ffcc" }}
  className="text-sm sm:text-base bg-purple-950"
>
  <div className="flex items-center">
    <MoonIcon className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
    <span>Nuvyx UI</span>
  </div>
</GlitchButton>`
  },
  {
    name: "More Info",
    description: "Indigo info button with custom glitch colors",
    component: (
      <GlitchButton
        glitchOnHover={true}
        glitchColors={{ primary: "#5500ff", secondary: "#00ddff" }}
        className="text-sm sm:text-base bg-indigo-800 text-indigo-100 rounded-lg"
      >
        <div className="flex items-center">
          <Info className="mr-2 h-5 w-5" />
          <span>MORE INFO</span>
        </div>
      </GlitchButton>
    ),
    code: `<GlitchButton
  glitchOnHover={true}
  glitchColors={{ primary: "#5500ff", secondary: "#00ddff" }}
  className="text-sm sm:text-base bg-indigo-800 text-indigo-100 rounded-lg"
>
  <div className="flex items-center">
    <Info className="mr-2 h-5 w-5" />
    <span>MORE INFO</span>
  </div>
</GlitchButton>`
  },
  {
    name: "Enter The Void",
    description: "Dark themed button with arrow and hover glitch",
    component: (
      <GlitchButton
        glitchOnHover={true}
        className="text-sm sm:text-base bg-slate-900 text-white"
      >
        <div className="flex items-center gap-2">
          <span>ENTER THE VOID</span>
          <ArrowRight className="h-5 w-5" />
        </div>
      </GlitchButton>
    ),
    code: `<GlitchButton
  glitchOnHover={true}
  className="text-sm sm:text-base bg-slate-900 text-white"
>
  <div className="flex items-center gap-2">
    <span>ENTER THE VOID</span>
    <ArrowRight className="h-5 w-5" />
  </div>
</GlitchButton>`
  },
  {
    name: "The Matrix",
    description: "Matrix themed green button",
    component: (
      <GlitchButton className="text-sm sm:text-base bg-green-600 text-black font-extrabold rounded-lg">
        The Matrix
      </GlitchButton>
    ),
    code: `<GlitchButton className="text-sm sm:text-base bg-green-600 text-black font-extrabold rounded-lg">
  The Matrix
</GlitchButton>`
  },
  {
    name: "Hacker Man",
    description: "Hacker themed button with red/blue glitch",
    component: (
      <GlitchButton
        glitchColors={{ primary: "#FF0000", secondary: "#0000FF" }}
        className="text-sm sm:text-base bg-black text-white rounded-lg"
      >
        Hacker Man
      </GlitchButton>
    ),
    code: `<GlitchButton
  glitchColors={{ primary: "#FF0000", secondary: "#0000FF" }}
  className="text-sm sm:text-base bg-black text-white rounded-lg"
>
  Hacker Man
</GlitchButton>`
  },
];