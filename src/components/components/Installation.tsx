'use client'
import React, { useState } from 'react';
import { Copy, Github, Package, FileCode, ChevronDown, ChevronUp, FileWarning, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentData } from '@/nyxui/ComponentInterfaces';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LIGHT_THEME = prism;

const CollapsibleSection = ({ title, icon, defaultCollapsed = true, children }: { title: string; icon: React.ReactNode; defaultCollapsed?: boolean; children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  
  return (
    <div className="rounded-xl border overflow-hidden">
      <div 
        className="bg-muted/40 px-6 py-3 border-b flex items-center justify-between cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          {isCollapsed ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
        </Button>
      </div>
      
      {!isCollapsed && children}
    </div>
  );
};

export const InstallationSection = ({ componentData }: { componentData: ComponentData }) => {
  const [showFullConfig, setShowFullConfig] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check if any dependencies have setup information
  const hasSetupInfo = componentData.dependencies?.some(dependency => dependency.setup);
  
  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  const handleCopyClick = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  const codeStyle = isDarkMode ? vscDarkPlus : LIGHT_THEME;
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
      <div className="rounded-xl border overflow-hidden">
        <Tabs defaultValue="manual" className="w-full">
          <div className="border-b bg-white dark:bg-black">
            <TabsList className="w-full justify-start h-12 px-4 bg-transparent">
              <TabsTrigger value="cli" className="data-[state=active]:bg-background">
                CLI
              </TabsTrigger>
              <TabsTrigger value="manual" className="data-[state=active]:bg-background">
                Manual
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="cli" className="p-6 space-y-6 bg-background">
            <div className="flex items-center gap-2 p-3 bg-primary/5 border rounded-lg">
              <div className="p-2 rounded-full bg-primary/10">
                <FileWarning className="size-4 text-primary" />
              </div>
              <p className="text-sm font-medium">CLI installation will be available soon.</p>
            </div>
            <div className="space-y-2">
            </div>
          </TabsContent>
          
          <TabsContent value="manual" className="p-8 space-y-8 bg-background">
            <div className="space-y-6">
              {componentData.dependencies && componentData.dependencies.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center rounded-full bg-primary/10 w-7 h-7 text-xs font-bold text-primary">1</span>
                    Install Dependencies
                  </h3>
                  
                  <CollapsibleSection 
                    title="Dependencies" 
                    icon={<Package className="size-4 text-primary" />}
                  >
                    <div className="p-6 space-y-6">
                      {componentData.dependencies.map((dependency, index) => (
                        <div key={dependency.name} className="space-y-3">
                          <p className="font-medium text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                            {dependency.name}
                            {dependency.description && (
                              <span className="text-xs text-muted-foreground ml-2">
                                - {dependency.description}
                              </span>
                            )}
                          </p>
                          
                          <Tabs defaultValue="npm" className="w-full">
                            <TabsList className="w-full grid grid-cols-4 h-9 bg-muted/40 p-1 rounded-lg dark:bg-black">
                              <TabsTrigger value="npm" className="text-xs h-7 px-2 rounded-md data-[state=active]:bg-background">
                                <Image
                                 src="/npm.svg"
                                 width={16}
                                 height={16}
                                 alt="npm"
                                 quality={100}
                                 loading="lazy"
                                 className="size-4 mr-1.5" />
                                npm
                              </TabsTrigger>
                              <TabsTrigger value="pnpm" className="text-xs h-7 px-2 rounded-md data-[state=active]:bg-background">
                                <Image
                                 src="/pnpm.svg"
                                 width={16}
                                 height={16}
                                 alt="pnpm"
                                 quality={100}
                                 loading="lazy"
                                 className="size-4 mr-1.5" />
                                pnpm
                              </TabsTrigger>
                              <TabsTrigger value="yarn" className="text-xs h-7 px-2 rounded-md data-[state=active]:bg-background">
                                <Image
                                 src="/yarn.svg"
                                 width={16}
                                 height={16}
                                 alt="yarn"
                                 quality={100}
                                 loading="lazy"
                                 className="size-4 mr-1.5" />
                                yarn
                              </TabsTrigger>
                              <TabsTrigger value="bun" className="text-xs h-7 px-2 rounded-md data-[state=active]:bg-background">
                                <Image
                                 src="/bun.svg"
                                 width={16}
                                 height={16}
                                 alt="bun"
                                 quality={100}
                                 loading="lazy"
                                 className="size-4 mr-1.5" />
                                bun
                              </TabsTrigger>
                            </TabsList>
                            
                            {dependency.install && Object.entries(dependency.install).map(([packageManager, command]) => (
                              <TabsContent key={packageManager} value={packageManager} className="mt-3">
                                <div className="relative">
                                  <div className="rounded-lg border overflow-hidden">
                                    <SyntaxHighlighter 
                                      language="bash" 
                                      style={codeStyle}
                                      customStyle={{
                                        margin: 0,
                                        padding: '12px',
                                        borderRadius: '0.5rem',
                                        fontSize: '12px',
                                      }}
                                    >
                                      {command}
                                    </SyntaxHighlighter>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute right-2 top-2 opacity-70 hover:opacity-100 h-6 w-6"
                                    onClick={() => handleCopyClick(command, `${dependency.name}-${packageManager}`)}
                                  >
                                    {copiedIndex === `${dependency.name}-${packageManager}` ? 
                                      <Check className="size-3.5" /> : 
                                      <Copy className="size-3.5" />
                                    }
                                    <span className="sr-only">Copy command</span>
                                  </Button>
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                </div>
              )}
              
              {/* Step 2: Setup Configuration (If Available) */}
              {hasSetupInfo && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span className="flex items-center justify-center rounded-full bg-primary/10 w-7 h-7 text-xs font-bold text-primary">2</span>
                    Setup Configuration
                  </h3>
                  
                  <CollapsibleSection 
                    title="Setup Files" 
                    icon={<FileCode className="size-4 text-primary" />}
                  >
                    <div className="p-6 space-y-6">
                      {componentData.dependencies?.filter(dependency => dependency.setup).map((dependency) => (
                        <div key={`setup-${dependency.name}`} className="space-y-4">
                          <p className="font-medium text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                            {dependency.name} Setup
                            {dependency.setup?.description && (
                              <span className="text-xs text-muted-foreground ml-2">
                                - {dependency.setup.description}
                              </span>
                            )}
                          </p>
                          
                          {dependency.setup?.file && dependency.setup?.code && (
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">
                                Create file: <code className="px-1.5 py-0.5 bg-muted rounded">{dependency.setup.file}</code>
                              </p>
                              <div className="relative">
                                <div className="rounded-lg border overflow-hidden">
                                  <SyntaxHighlighter 
                                    language="typescript" 
                                    style={codeStyle}
                                    customStyle={{
                                      margin: 0,
                                      padding: '12px',
                                      borderRadius: '0.5rem',
                                      fontSize: '12px',
                                    }}
                                  >
                                    {dependency.setup.code}
                                  </SyntaxHighlighter>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="absolute right-2 top-2 opacity-70 hover:opacity-100 h-6 w-6"
                                  onClick={() => handleCopyClick(dependency.setup?.code || '', `${dependency.name}-setup`)}
                                >
                                  {copiedIndex === `${dependency.name}-setup` ? 
                                    <Check className="size-3.5" /> : 
                                    <Copy className="size-3.5" />
                                  }
                                  <span className="sr-only">Copy setup code</span>
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                </div>
              )}
              
              {/* Step 3: Copy Component Code */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center rounded-full bg-primary/10 w-7 h-7 text-xs font-bold text-primary">
                    {componentData.dependencies && componentData.dependencies.length > 0 ? (hasSetupInfo ? 3 : 2) : 1}
                  </span>
                  Copy Component Code
                </h3>
                
                <CollapsibleSection 
                  title={`${componentData?.name || 'Component'}.tsx`} 
                  icon={<Github className="size-4 text-primary" />}
                >
                  <div className="relative">
                    <SyntaxHighlighter 
                      language="typescript" 
                      style={codeStyle}
                      customStyle={{
                        margin: 0,
                        padding: '24px',
                        fontSize: '12px',
                        maxHeight: '24rem',
                        overflow: 'auto'
                      }}
                      showLineNumbers
                    >
                      {componentData?.componentCode || '// Component code will appear here'}
                    </SyntaxHighlighter>
                    <div className="flex justify-end p-3 bg-background border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => componentData?.componentCode && handleCopyClick(componentData.componentCode, "component-code")}
                      >
                        {copiedIndex === "component-code" ? 
                          <Check className="size-3.5 mr-2" /> : 
                          <Copy className="size-3.5 mr-2" />
                        }
                        Copy Code
                      </Button>
                    </div>
                  </div>
                </CollapsibleSection>
              </div>

              {/* Final Step: Update import paths */}
              <div className="space-y-4">
                <p className="text-lg font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center rounded-full bg-primary/10 w-7 h-7 text-xs font-bold text-primary">
                    {componentData.dependencies && componentData.dependencies.length > 0 ? (hasSetupInfo ? 4 : 3) : 2}
                  </span>
                  Update the import paths to match your project setup.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};