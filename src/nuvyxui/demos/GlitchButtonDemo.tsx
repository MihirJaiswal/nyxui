import React from "react";
import { GlitchButton } from "@/nuvyxui/components/GlitchButton";
import { ArrowRight, Download, Info, Mail, Power, ShieldCheck } from "lucide-react";
import { MoonIcon } from "@radix-ui/react-icons";

export const GlitchButtonDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GlitchButton glitchAlways={true} className="text-sm sm:text-base">
          <div className="flex items-center">
            <Power className="mr-2 h-5 w-5" />
            <span>Always Glitch</span>
          </div>
        </GlitchButton>
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GlitchButton
          glitchOnHover={true}
          className="text-sm sm:text-base bg-black text-green-400 rounded-md"
        >
          <div className="flex items-center">
            <Download className="mr-2 h-5 w-5" />
            <span>DOWNLOAD</span>
          </div>
        </GlitchButton>
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
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
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
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
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GlitchButton
          glitchColors={{ primary: "#be21ed", secondary: "#00ffcc" }}
          className="text-sm sm:text-base bg-purple-950"
        >
          <div className="flex items-center">
            <MoonIcon className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>Nuvyx UI</span>
          </div>
        </GlitchButton>
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
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
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GlitchButton
          glitchOnHover={true}
          className="text-sm sm:text-base bg-slate-900 text-white"
        >
          <div className="flex items-center gap-2">
            <span>ENTER THE VOID</span>
            <ArrowRight className="h-5 w-5" />
          </div>
        </GlitchButton>
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GlitchButton
          className="text-sm sm:text-base bg-green-600 text-black font-extrabold rounded-lg"
        >
          The Matrix
        </GlitchButton>
      </div>
      <div className="flex justify-center items-center h-48 border border-gray-300 dark:border-gray-800 rounded-lg">
        <GlitchButton
          glitchColors={{ primary: "#FF0000", secondary: "#0000FF" }}
          className="text-sm sm:text-base bg-black text-white rounded-lg"
        >
          Hacker Man
        </GlitchButton>
      </div>
    </div>
  );
};
