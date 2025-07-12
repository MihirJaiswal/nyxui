"use client"

import type React from "react"
import { useState } from "react"
import reactElementToJSXString from "react-element-to-jsx-string"
import { toast, Toaster } from "sonner"
import LampHeading from "../ui/lamp-heading"
import { Copy, Check } from "lucide-react"

interface LampCard {
  children: React.ReactNode
  onClick: () => void
  isCopied: boolean
}

type LampHeadingType = {
  name: string
  description: string
  component: React.ReactNode
  code?: string
}

const LampCard = ({ children, onClick, isCopied }: LampCard) => {
  return (
    <div
      className="border group relative border-gray-300 dark:border-zinc-800 hover:border-zinc-500 hover:dark:border-zinc-500 rounded-lg p-6 flex flex-col items-center justify-center h-60 cursor-pointer hover:shadow-lg transition-all duration-300 bg-white dark:bg-black/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <div className="mb-4 w-full flex items-center justify-center">{children}</div>
      <div className="absolute top-3 right-3">
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500 transition-all duration-200" />
        ) : (
          <Copy className="h-4 w-4 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 group-hover:dark:text-zinc-500" />
        )}
      </div>
    </div>
  )
}

export const LampHeadingDemo = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copy = (lamp: LampHeadingType, index: number) => {
    if (lamp.code) {
      copyToClipboard(lamp.code, index)
      return
    }

    const lampString = reactElementToJSXString(lamp.component, {
      displayName: (element) => {
        if (
          typeof element === "object" &&
          element !== null &&
          "type" in element &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element as any).type?.name === "LampHeading"
        ) {
          return "LampHeading"
        }
        return "UnknownComponent"
      },
      functionValue: (fn) => fn.name || "function",
    })

    if (lampString) {
      copyToClipboard(lampString, index)
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text)
        toast.success("Copied to clipboard")
        setCopiedIndex(index)
        setTimeout(() => {
          setCopiedIndex(null)
        }, 2000)
      })
      .catch((err) => {
        console.error("Error copying text to clipboard:", err)
        toast.error("Error copying to clipboard")
      })
  }

  return (
    <div className="w-full">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lampHeadings.map((lamp, idx) => (
            <LampCard key={idx} onClick={() => copy(lamp, idx)} isCopied={copiedIndex === idx}>
              {lamp.component}
            </LampCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export const lampHeadings = [
  {
    name: "Classic Neon",
    description: "Classic pink to purple gradient with particles",
    component: (
      <LampHeading
        text="Blade Runner"
        textSize="2xl"
        className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
        showParticles={true}
        showLightRays={true}
        gradientColors={{
          from: "#FF33C7",
          via: "#CD35FF",
          to: "#4533F7",
        }}
      />
    ),
    code: `<LampHeading
  text="Blade Runner"
  textSize="2xl"
  className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
  showParticles={true}
  showLightRays={true}
  gradientColors={{
    from: "#FF33C7",
    via: "#CD35FF",
    to: "#4533F7",
  }}
/>`,
  },
  {
    name: "Cyberpunk Blue",
    description: "Electric blue cyberpunk theme with light rays",
    component: (
      <LampHeading
        text="Legacy"
        textSize="xl"
        className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
        direction="below"
        showLightRays={true}
        showParticles={true}
        glowIntensity={1.2}
        gradientColors={{
          from: "#00D4FF",
          via: "#0099CC",
          to: "#0066FF",
        }}
        animationSpeed={3}
      />
    ),
    code: `<LampHeading
  text="Legacy"
  textSize="xl"
  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
  direction="below"
  showLightRays={true}
  showParticles={true}
  glowIntensity={1.2}
  gradientColors={{
    from: "#00D4FF",
    via: "#0099CC",
    to: "#0066FF",
  }}
  animationSpeed={3}
/>`,
  },
  {
    name: "Fire Glow",
    description: "Warm fire colors with intense glow",
    component: (
      <LampHeading
        text="Mad Max: Fury Road"
        textSize="lg"
        className="bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent"
        glowIntensity={0.8}
        glowSize={40}
        showParticles={true}
        pulseEffect={true}
        gradientColors={{
          from: "#FF4500",
          via: "#FF6B00",
          to: "#FFD700",
        }}
        animationSpeed={2}
      />
    ),
    code: `<LampHeading
  text="Mad Max: Fury Road"
  textSize="lg"
  className="bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent"
  glowIntensity={0.8}
  glowSize={40}
  showParticles={true}
  pulseEffect={true}
  gradientColors={{
    from: "#FF4500",
    via: "#FF6B00",
    to: "#FFD700",
  }}
  animationSpeed={2}
/>`,
  },
  {
    name: "Matrix Green",
    description: "Classic matrix green with upward direction",
    component: (
      <LampHeading
        text="THE MATRIX"
        textSize="xl"
        className="text-green-700 dark:text-green-300"
        direction="above"
        showLightRays={true}
        showParticles={false}
        gradientColors={{
          from: "#00FF41",
          to: "#00AA00",
        }}
        lampHeight={60}
        interactive={true}
      />
    ),
    code: `<LampHeading
  text="THE MATRIX"
  textSize="xl"
  className="text-green-700 dark:text-green-300"
  direction="above"
  showLightRays={true}
  showParticles={false}
  gradientColors={{
    from: "#00FF41",
    to: "#00AA00",
  }}
  lampHeight={60}
  interactive={true}
/>`,
  },
  {
    name: "Electric Mint",
    description: "Fresh mint green with electric feel",
    component: (
      <LampHeading
        text="Ghost in the Shell"
        textSize="xl"
        className="text-teal-700 dark:text-teal-300"
        direction="above"
        showLightRays={false}
        showParticles={true}
        gradientColors={{
          from: "#00FFFF",
          via: "#00CED1",
          to: "#20B2AA",
        }}
        glowIntensity={1.3}
        lineHeight={6}
      />
    ),
    code: `<LampHeading
  text="Ghost in the Shell"
  textSize="xl"
  className="text-teal-700 dark:text-teal-300"
  direction="above"
  showLightRays={false}
  showParticles={true}
  gradientColors={{
    from: "#00FFFF",
    via: "#00CED1",
    to: "#20B2AA",
  }}
  glowIntensity={1.3}
  lineHeight={6}
/>`,
  },
  {
    name: "Retro Wave",
    description: "80s retro wave aesthetic with vibrant colors",
    component: (
      <LampHeading
        text="Stranger Things"
        textSize="xl"
        className="bg-gradient-to-r bg-pink-700 via-pink-200 to-pink-700 dark:from-pink-500 dark:via-pink-400 dark:to-purple-600 bg-clip-text text-transparent"
        direction="above"
        showLightRays={false}
        showParticles={true}
        gradientColors={{
          from: "#FF0080",
          via: "#FF4080",
          to: "#8000FF",
        }}
        lampHeight={70}
        glowIntensity={0.7}
        animationSpeed={3}
        interactive={true}
      />
    ),
    code: `<LampHeading
  text="Stranger Things"
  textSize="xl"
  className="bg-gradient-to-r bg-pink-700 via-pink-200 to-pink-700 dark:from-pink-300 dark:via-pink-300 dark:to-purple-300 bg-clip-text text-transparent"
  direction="above"
  showLightRays={true}
  showParticles={true}
  gradientColors={{
    from: "#FF0080",
    via: "#FF4080",
    to: "#8000FF",
  }}
  lampHeight={70}
  glowIntensity={0.7}
  animationSpeed={3}
  interactive={true}
/>`,
  }
]
