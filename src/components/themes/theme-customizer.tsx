import { useState } from "react"
import { 
  Check, 
  PaintBucket, 
  Palette, 
  Save 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const fontFamilyOptions = [
  "system-ui, sans-serif",
  "Inter, sans-serif", 
  "Roboto, sans-serif", 
  "Helvetica, sans-serif", 
  "Arial, sans-serif", 
  "Georgia, serif", 
  "Courier New, monospace"
]

const borderRadiusOptions = [
  "0rem",     // No radius
  "0.25rem",  // Extra small
  "0.375rem", // Small (default)
  "0.5rem",   // Medium
  "0.75rem",  // Large
  "1rem"      // Extra large
]

interface Gradient {
  id: string
  name: string
  angle: number
  colors: string[]
}

export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
  fontFamily: string
  borderRadius: string
  description?: string
  gradient?: Gradient
}

interface ThemeCustomizerProps {
  customThemes: Theme[]
  setCustomThemes: React.Dispatch<React.SetStateAction<Theme[]>>
  selectedTheme: Theme
  setSelectedTheme: React.Dispatch<React.SetStateAction<Theme>>
  currentCustomTheme: Theme
  setCurrentCustomTheme: React.Dispatch<React.SetStateAction<Theme>>
  isNewThemeDialogOpen: boolean
  setIsNewThemeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  newThemeName: string
  setNewThemeName: React.Dispatch<React.SetStateAction<string>>
  handleSaveCustomTheme: () => void
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  customThemes,
  setCustomThemes,
  selectedTheme,
  setSelectedTheme,
  currentCustomTheme,
  setCurrentCustomTheme,
  isNewThemeDialogOpen,
  setIsNewThemeDialogOpen,
  newThemeName,
  setNewThemeName,
  handleSaveCustomTheme
}) => {
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false)

  // Color update handler for custom theme
  const updateThemeColor = (colorKey: keyof Theme['colors'], value: string) => {
    setCurrentCustomTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    }))
  }

  // Font family update handler
  const updateThemeFontFamily = (fontFamily: string) => {
    setCurrentCustomTheme(prev => ({
      ...prev,
      fontFamily
    }))
  }

  // Border radius update handler
  const updateThemeBorderRadius = (borderRadius: string) => {
    setCurrentCustomTheme(prev => ({
      ...prev,
      borderRadius
    }))
  }

  return (
    <>
      <TabsContent value="custom" className="space-y-6 pt-6">
        <div className="flex justify-between mb-4">
          <Dialog 
            open={isNewThemeDialogOpen} 
            onOpenChange={setIsNewThemeDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <PaintBucket className="mr-2 h-4 w-4" /> Create New Theme
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Theme</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newThemeName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewThemeName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <Button onClick={handleSaveCustomTheme}>
                  <Save className="mr-2 h-4 w-4" /> Save Theme
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            onClick={() => setIsCustomizeDialogOpen(true)}
          >
            <Palette className="mr-2 h-4 w-4" /> Customize Current Theme
          </Button>
        </div>

        {/* Customize Theme Dialog */}
        <Dialog 
          open={isCustomizeDialogOpen} 
          onOpenChange={setIsCustomizeDialogOpen}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Customize Theme</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(currentCustomTheme.colors).map((colorKey) => (
                    <div key={colorKey} className="space-y-2">
                      <Label>
                        {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} Color
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="color" 
                          value={currentCustomTheme.colors[colorKey as keyof Theme['colors']]}
                          onChange={(e) =>
                            updateThemeColor(
                              colorKey as keyof Theme['colors'],
                              e.target.value
                            )
                          }
                          className="w-16 h-10 p-0 border-none"
                        />
                        <Input 
                          type="text" 
                          value={currentCustomTheme.colors[colorKey as keyof Theme['colors']]}
                          onChange={(e) =>
                            updateThemeColor(
                              colorKey as keyof Theme['colors'],
                              e.target.value
                            )
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Typography</h3>
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <select 
                    value={currentCustomTheme.fontFamily}
                    onChange={(e) => updateThemeFontFamily(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {fontFamilyOptions.map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Border Radius</h3>
                <div className="space-y-2">
                  <Label>Corner Roundness</Label>
                  <select 
                    value={currentCustomTheme.borderRadius}
                    onChange={(e) => updateThemeBorderRadius(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {borderRadiusOptions.map((radius) => (
                      <option key={radius} value={radius}>
                        {radius === "0rem" ? "None" : 
                         radius === "0.25rem" ? "Extra Small" : 
                         radius === "0.375rem" ? "Small" : 
                         radius === "0.5rem" ? "Medium" : 
                         radius === "0.75rem" ? "Large" : 
                         "Extra Large"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button 
                onClick={() => {
                  // If the current custom theme is already saved, update it in the customThemes array.
                  const exists = customThemes.some(theme => theme.id === currentCustomTheme.id)
                  if (exists) {
                    setCustomThemes(prev =>
                      prev.map(theme =>
                        theme.id === currentCustomTheme.id ? currentCustomTheme : theme
                      )
                    )
                  }
                  // Update the selected theme to reflect the customizations.
                  setSelectedTheme(currentCustomTheme)
                  setIsCustomizeDialogOpen(false)
                  toast("Theme customized successfully!")
                }}
              >
                <Save className="mr-2 h-4 w-4" /> Apply Customizations
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Custom Themes Display */}
        {customThemes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {customThemes.map((theme) => (
              <Card
                key={theme.id}
                className={cn(
                  "cursor-pointer overflow-hidden transition-all hover:shadow-md group",
                  selectedTheme.id === theme.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedTheme(theme)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{theme.name}</h3>
                    {selectedTheme.id === theme.id && <Check className="size-4 text-primary" />}
                  </div>
                  <div className="mt-4 flex gap-2">
                    {Object.values(theme.colors).map((color, i) => (
                      <div key={i} className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No custom themes created yet</p>
            <p className="text-sm mt-2">Click &quot;Create New Theme&quot; to get started</p>
          </div>
        )}
      </TabsContent>
    </>
  )
}
