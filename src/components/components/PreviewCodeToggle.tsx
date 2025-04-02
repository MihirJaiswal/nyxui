"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Check, Code, Copy, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from "next-themes"

interface PreviewCodeToggleProps {
  preview: React.ReactNode
  code: string
  language?: string
  previewClassName?: string
  defaultTab?: "preview" | "code"
  darkCodeTheme?: "vscDarkPlus" 
  lightCodeTheme?: "prism"
}

export const PreviewCodeToggle = ({
  preview,
  code,
  language = "tsx",
  previewClassName,
  defaultTab = "preview",
  darkCodeTheme = "vscDarkPlus",
  lightCodeTheme = "prism"
}: PreviewCodeToggleProps) => {
  const [copied, setCopied] = useState(false)
  const { theme, systemTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined)

  useEffect(() => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme
    setCurrentTheme(resolvedTheme)
  }, [theme, systemTheme])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy code:", error)
    }
  }

  const codeStyle = currentTheme === 'light' ? prism : vscDarkPlus

  return (
    <div className="rounded-lg border shadow-sm">
      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <TabsList className="h-9 grid-cols-2 rounded-lg border">
            <TabsTrigger value="preview" className="flex items-center gap-1.5 px-3">
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-1.5 px-3">
              <Code className="h-3.5 w-3.5" />
              <span>Code</span>
            </TabsTrigger>
          </TabsList>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy code</span>
              </>
            )}
          </Button>
        </div>
        <TabsContent value="preview" className="p-0 focus-visible:outline-none focus-visible:ring-0">
        <div className={cn("flex min-h-[400px] relative w-full items-center justify-center md:p-6", previewClassName)}>
  {preview}
</div>
        </TabsContent>
        <TabsContent value="code" className="p-0 focus-visible:outline-none focus-visible:ring-0">
          <div className="max-h-[500px] overflow-auto rounded-b-lg">
            <SyntaxHighlighter 
              language={language} 
              style={codeStyle}
              customStyle={{
                margin: 0,
                borderRadius: '0 0 0.5rem 0.5rem',
                fontSize: '0.875rem',
              }}
              showLineNumbers={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}