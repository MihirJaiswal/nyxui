'use client'
import InteractiveKeyboard from "@/registry/ui/keyboard"
import InteractiveTerminal from "@/registry/ui/terminal"
import { Code } from "lucide-react"
import { useTheme } from "next-themes"

export const TerminalKeyboardDemo = () => {
    const theme = useTheme()
  const keyboardVariant = theme.theme === "light" ? "neon" : "cyberpunk"
  return (
    <div className="rounded-xl overflow-hidden relative w-full h-full bg-black/90 dark:from-zinc-900 dark:to-black shadow-lg">
      <div className="w-full  overflow-hidden overscroll-none  ">
        <div className="w-full h-full overflow-hidden overscroll-none">
          <InteractiveTerminal
            autoExecute={true}
            command="npx shadcn@latest"
            className="rounded-none font-mono text-sm pb-2"
            repeat={true}
            variant="custom"
            customTheme={{
              container: "bg-transparent dark:bg-black text-emerald-500 dark:text-green-500",
              header:
                "bg-zinc-800 dark:bg-green-950/40 text-emerald-400 dark:text-green-500",
              output: "bg-zinc-800 dark:bg-green-950/40 text-emerald-400 dark:text-green-500",
              button:
                "bg-gray-100 dark:bg-gray-950 text-emerald-500 dark:text-green-500 hover:bg-gray-200 dark:hover:bg-gray-800",
            }}
            icon={<Code className="mr-1 mt-1 text-emerald-500 dark:text-green-500 w-4 h-4" />}
            steps={["Checking registry...", "Installing dependencies..."]}
            finalMessage={`✔  Created 1 file:    - src/components/ui/terminal.tsx      `}
            promptSymbol="#"
            stepDelay={500}
          />
        </div>
      </div>

      <div className="flex-grow relative w-full flex items-center justify-end lg:justify-start">
        <div className="transform scale-70 md:scale-80 origin-center lg:origin-top -mt-56">
          <InteractiveKeyboard
            layout="standard"
            showFunctionKeys={false}
            showNavigationCluster={false}
            activeKeys={["Enter"]}
            activeKeyGlowColor="#00C24E"
            activeKeyGlowIntensity={2}
            theme={keyboardVariant}
            keyPressAnimationDuration={800}
            allowPhysicalKeyboard={true}
            perspective={800}
            rotateX={15}
            accentColor="#00C24E"
          />
        </div>
      </div>

      <div className="absolute bottom-6 right-4">
        <div className="px-2 py-1 bg-emerald-200/10 dark:bg-zinc-800 rounded text-xs text-emerald-600 dark:text-green-400 flex items-center border border-emerald-300 dark:border-gray-600">
          <span className="w-2 h-2 bg-emerald-500 dark:bg-green-500 rounded-full mr-1 animate-pulse"></span>
          ONLINE
        </div>
      </div>
    </div>
  )
}
