"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"
import { Check, Loader2, Moon, Sun, Monitor, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { HexColorPicker } from "react-colorful"
import { useColorTheme } from "@/lib/theme-context"
import { ThemePreview } from "./theme-preview"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define color themes
const colorThemes = [
  {
    name: "Blue (Default)",
    primary: "#3b82f6", // blue-500
    secondary: "#dbeafe", // blue-100
    accent: "#3b82f6", // blue-500
    isDark: false,
  },
  {
    name: "Green",
    primary: "#22c55e", // green-500
    secondary: "#dcfce7", // green-100
    accent: "#22c55e", // green-500
    isDark: false,
  },
  {
    name: "Purple",
    primary: "#a855f7", // purple-500
    secondary: "#f3e8ff", // purple-100
    accent: "#a855f7", // purple-500
    isDark: false,
  },
  {
    name: "Red",
    primary: "#ef4444", // red-500
    secondary: "#fee2e2", // red-100
    accent: "#ef4444", // red-500
    isDark: false,
  },
  {
    name: "Orange",
    primary: "#f97316", // orange-500
    secondary: "#ffedd5", // orange-100
    accent: "#f97316", // orange-500
    isDark: false,
  },
  {
    name: "Dark Blue",
    primary: "#3b82f6", // blue-500
    secondary: "#1e3a8a", // blue-900
    accent: "#3b82f6", // blue-500
    isDark: true,
  },
]

export function AppearanceSettings() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const { colorTheme, availableThemes, themesByIndustry, applyTheme, getThemeById, isThemeDark } = useColorTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedColorTheme, setSelectedColorTheme] = useState(0)
  const [customPrimaryColor, setCustomPrimaryColor] = useState("#3b82f6") // Default to blue
  const [customSecondaryColor, setCustomSecondaryColor] = useState("#dbeafe") // Default to light blue
  const [customAccentColor, setCustomAccentColor] = useState("#3b82f6") // Default to blue
  const [customIsDark, setCustomIsDark] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [borderRadius, setBorderRadius] = useState(8)
  const [activeTab, setActiveTab] = useState("theme")
  const [previewTheme, setPreviewTheme] = useState(colorTheme)
  const [previewCustomColors, setPreviewCustomColors] = useState<
    | {
        primary: string
        secondary: string
        accent: string
        isDark: boolean
      }
    | undefined
  >(undefined)
  const [selectedIndustry, setSelectedIndustry] = useState<string>("General")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter themes based on search query
  const filteredThemes = searchQuery
    ? availableThemes.filter(
        (theme) =>
          theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (theme.industry && theme.industry.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (theme.description && theme.description.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : selectedIndustry === "All"
      ? availableThemes
      : themesByIndustry[selectedIndustry] || []

  // Apply theme changes
  const applyThemeChanges = () => {
    setIsLoading(true)

    // Get the selected theme colors
    let primary, secondary, accent, isDark
    if (selectedColorTheme === colorThemes.length) {
      // Custom theme
      primary = customPrimaryColor
      secondary = customSecondaryColor
      accent = customAccentColor
      isDark = customIsDark
    } else {
      // Predefined theme
      primary = colorThemes[selectedColorTheme].primary
      secondary = colorThemes[selectedColorTheme].secondary
      accent = colorThemes[selectedColorTheme].accent
      isDark = colorThemes[selectedColorTheme].isDark
    }

    // Update CSS variables
    document.documentElement.style.setProperty("--primary", primary)
    document.documentElement.style.setProperty("--primary-foreground", "#ffffff")
    document.documentElement.style.setProperty("--secondary", secondary)
    document.documentElement.style.setProperty("--accent", accent)

    // Adjust text colors for dark themes
    if (isDark) {
      document.documentElement.style.setProperty("--secondary-foreground", "210 40% 98%")
    } else {
      document.documentElement.style.setProperty("--secondary-foreground", "222.2 47.4% 11.2%")
    }

    document.documentElement.style.setProperty("--font-size-base", `${fontSize}px`)
    document.documentElement.style.setProperty("--radius", `${borderRadius}px`)

    // Simulate API call to save preferences
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been updated successfully.",
      })
    }, 1000)
  }

  // Reset to default theme
  const resetToDefault = () => {
    setSelectedColorTheme(0) // Blue is now the default (index 0)
    setCustomPrimaryColor("#3b82f6")
    setCustomSecondaryColor("#dbeafe")
    setCustomAccentColor("#3b82f6")
    setCustomIsDark(false)
    setFontSize(16)
    setBorderRadius(8)

    // Reset CSS variables to blue theme
    document.documentElement.style.setProperty("--primary", "217 91% 60%")
    document.documentElement.style.setProperty("--primary-foreground", "210 40% 98%")
    document.documentElement.style.setProperty("--secondary", "221 83% 95%")
    document.documentElement.style.setProperty("--secondary-foreground", "222.2 47.4% 11.2%")
    document.documentElement.style.setProperty("--accent", "217 91% 60%")
    document.documentElement.style.removeProperty("--font-size-base")
    document.documentElement.style.removeProperty("--radius")

    toast({
      title: "Reset to defaults",
      description: "Your appearance settings have been reset to default values.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">Customize the appearance of the dashboard to your preference.</p>
      </div>

      <Tabs defaultValue="theme" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="theme">Theme Mode</TabsTrigger>
          <TabsTrigger value="colors">Brand Colors</TabsTrigger>
          <TabsTrigger value="industry">Industry Themes</TabsTrigger>
          <TabsTrigger value="custom">Custom Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography & UI</TabsTrigger>
        </TabsList>
        <TabsContent value="theme" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div
                className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 ${
                  theme === "light" ? "border-primary bg-primary/5" : "border-muted bg-transparent"
                }`}
                onClick={() => setTheme("light")}
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                  <Sun className="h-5 w-5 text-yellow-500" />
                </div>
                <span className="text-sm font-medium">Light</span>
                {theme === "light" && <Check className="mt-2 h-4 w-4 text-primary" />}
              </div>
              <div
                className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 ${
                  theme === "dark" ? "border-primary bg-primary/5" : "border-muted bg-transparent"
                }`}
                onClick={() => setTheme("dark")}
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 shadow-sm">
                  <Moon className="h-5 w-5 text-gray-300" />
                </div>
                <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : ""}`}>Dark</span>
                {theme === "dark" && <Check className="mt-2 h-4 w-4 text-primary" />}
              </div>
              <div
                className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 ${
                  theme === "system" ? "border-primary bg-primary/5" : "border-muted bg-transparent"
                }`}
                onClick={() => setTheme("system")}
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-900 shadow-sm">
                  <Monitor className="h-5 w-5 text-blue-500" />
                </div>
                <span className="text-sm font-medium">System</span>
                {theme === "system" && <Check className="mt-2 h-4 w-4 text-primary" />}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose between light, dark, or system theme. System theme will automatically switch between light and dark
              based on your device settings.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="colors" className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {availableThemes
                .filter((theme) => !theme.industry)
                .map((theme) => (
                  <div
                    key={theme.id}
                    className={`relative cursor-pointer rounded-md border p-4 transition-all hover:border-primary ${
                      colorTheme === theme.id ? "border-primary bg-primary/5" : "border-border"
                    } ${theme.isDark ? "bg-gray-900" : ""}`}
                    onClick={() => {
                      applyTheme(theme.id)
                      setPreviewTheme(theme.id)
                      setPreviewCustomColors(undefined)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${theme.isDark ? "text-white" : ""}`}>{theme.name}</span>
                      {colorTheme === theme.id && (
                        <Check className={`h-4 w-4 ${theme.isDark ? "text-white" : "text-primary"}`} />
                      )}
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <div
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                      ></div>
                      <div
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                      ></div>
                      <div
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Select a color theme to apply it to the entire application. The theme will be applied to all pages and
              components.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="industry" className="space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search themes..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="industry-select" className="whitespace-nowrap">
                    Industry:
                  </Label>
                  <select
                    id="industry-select"
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={selectedIndustry}
                    onChange={(e) => {
                      setSelectedIndustry(e.target.value)
                      setSearchQuery("")
                    }}
                  >
                    <option value="All">All Industries</option>
                    {Object.keys(themesByIndustry).map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ScrollArea className="h-[400px] rounded-md border p-4">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredThemes.length > 0 ? (
                      filteredThemes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`relative cursor-pointer rounded-md border p-4 transition-all hover:border-primary ${
                            previewTheme === theme.id && !previewCustomColors
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          } ${theme.isDark ? "bg-gray-900" : ""}`}
                          onClick={() => {
                            setPreviewTheme(theme.id)
                            setPreviewCustomColors(undefined)
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${theme.isDark ? "text-white" : ""}`}>
                              {theme.name}
                            </span>
                            {colorTheme === theme.id && (
                              <Check className={`h-4 w-4 ${theme.isDark ? "text-white" : "text-primary"}`} />
                            )}
                          </div>
                          {theme.industry && (
                            <Badge
                              variant="outline"
                              className={`mt-1 ${theme.isDark ? "border-gray-700 text-white" : ""}`}
                            >
                              {theme.industry}
                            </Badge>
                          )}
                          {theme.description && (
                            <p className={`mt-2 text-xs ${theme.isDark ? "text-gray-300" : "text-muted-foreground"}`}>
                              {theme.description}
                            </p>
                          )}
                          <div className="mt-2 flex space-x-2">
                            <div
                              className="h-6 w-6 rounded-full"
                              style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                            ></div>
                            <div
                              className="h-6 w-6 rounded-full"
                              style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                            ></div>
                            <div
                              className="h-6 w-6 rounded-full"
                              style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                        <p className="text-sm text-muted-foreground">No themes found matching your criteria.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="flex flex-col space-y-4">
                  <div className="rounded-md border">
                    <ThemePreview themeId={previewTheme} customColors={previewCustomColors} />
                  </div>
                  <Button
                    onClick={() => {
                      applyTheme(previewTheme)
                      toast({
                        title: "Theme applied",
                        description: `The ${
                          getThemeById(previewTheme)?.name || "selected"
                        } theme has been applied successfully.`,
                      })
                    }}
                    disabled={previewTheme === colorTheme}
                  >
                    Apply This Theme
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="custom" className="space-y-4">
          <div className="space-y-4">
            <RadioGroup
              value={selectedColorTheme.toString()}
              onValueChange={(value) => setSelectedColorTheme(Number.parseInt(value))}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
            >
              {colorThemes.map((theme, index) => (
                <div key={index} className="relative">
                  <RadioGroupItem value={index.toString()} id={`theme-${index}`} className="peer sr-only" />
                  <Label
                    htmlFor={`theme-${index}`}
                    className={`flex cursor-pointer flex-col space-y-2 rounded-md border p-4 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 ${
                      theme.isDark ? "bg-gray-900" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${theme.isDark ? "text-white" : ""}`}>{theme.name}</span>
                      {selectedColorTheme === index && (
                        <Check className={`h-4 w-4 ${theme.isDark ? "text-white" : "text-primary"}`} />
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                      <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.secondary }}></div>
                      <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                    </div>
                  </Label>
                </div>
              ))}
              <div className="relative">
                <RadioGroupItem value={colorThemes.length.toString()} id={`theme-custom`} className="peer sr-only" />
                <Label
                  htmlFor={`theme-custom`}
                  className={`flex cursor-pointer flex-col space-y-2 rounded-md border p-4 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 ${
                    customIsDark ? "bg-gray-900" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${customIsDark ? "text-white" : ""}`}>Custom</span>
                    {selectedColorTheme === colorThemes.length && (
                      <Check className={`h-4 w-4 ${customIsDark ? "text-white" : "text-primary"}`} />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: customPrimaryColor }}></div>
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: customSecondaryColor }}></div>
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: customAccentColor }}></div>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {selectedColorTheme === colorThemes.length && (
              <div className={`space-y-4 rounded-md border p-4 ${customIsDark ? "bg-gray-900" : ""}`}>
                <div className="space-y-2">
                  <Label className={customIsDark ? "text-white" : ""}>Primary Color</Label>
                  <div className="flex space-x-4">
                    <HexColorPicker color={customPrimaryColor} onChange={setCustomPrimaryColor} />
                    <div className="flex flex-col space-y-2">
                      <div className="h-12 w-12 rounded-md" style={{ backgroundColor: customPrimaryColor }}></div>
                      <Input
                        value={customPrimaryColor}
                        onChange={(e) => setCustomPrimaryColor(e.target.value)}
                        className={`w-24 ${customIsDark ? "bg-gray-800 text-white border-gray-700" : ""}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className={customIsDark ? "text-white" : ""}>Secondary Color</Label>
                  <div className="flex space-x-4">
                    <HexColorPicker color={customSecondaryColor} onChange={setCustomSecondaryColor} />
                    <div className="flex flex-col space-y-2">
                      <div className="h-12 w-12 rounded-md" style={{ backgroundColor: customSecondaryColor }}></div>
                      <Input
                        value={customSecondaryColor}
                        onChange={(e) => setCustomSecondaryColor(e.target.value)}
                        className={`w-24 ${customIsDark ? "bg-gray-800 text-white border-gray-700" : ""}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className={customIsDark ? "text-white" : ""}>Accent Color</Label>
                  <div className="flex space-x-4">
                    <HexColorPicker color={customAccentColor} onChange={setCustomAccentColor} />
                    <div className="flex flex-col space-y-2">
                      <div className="h-12 w-12 rounded-md" style={{ backgroundColor: customAccentColor }}></div>
                      <Input
                        value={customAccentColor}
                        onChange={(e) => setCustomAccentColor(e.target.value)}
                        className={`w-24 ${customIsDark ? "bg-gray-800 text-white border-gray-700" : ""}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is-dark-theme"
                    checked={customIsDark}
                    onChange={(e) => setCustomIsDark(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="is-dark-theme" className={customIsDark ? "text-white" : ""}>
                    This is a dark theme (will adjust text colors accordingly)
                  </Label>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="typography" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Font Size: {fontSize}px</Label>
                <span className="text-sm text-muted-foreground">{fontSize}px</span>
              </div>
              <Slider value={[fontSize]} min={12} max={20} step={1} onValueChange={(value) => setFontSize(value[0])} />
              <p className="text-sm text-muted-foreground">
                Adjust the base font size for the dashboard. This will affect all text elements.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Border Radius: {borderRadius}px</Label>
                <span className="text-sm text-muted-foreground">{borderRadius}px</span>
              </div>
              <Slider
                value={[borderRadius]}
                min={0}
                max={16}
                step={1}
                onValueChange={(value) => setBorderRadius(value[0])}
              />
              <p className="text-sm text-muted-foreground">
                Adjust the border radius for UI elements like buttons, cards, and inputs.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="rounded-md border p-4">
                <h4 className="text-lg font-medium" style={{ fontSize: `${fontSize + 4}px` }}>
                  Sample Heading
                </h4>
                <p className="mb-4" style={{ fontSize: `${fontSize}px` }}>
                  This is a sample paragraph to preview your typography settings.
                </p>
                <div className="flex space-x-2">
                  <Button style={{ borderRadius: `${borderRadius}px` }}>Primary Button</Button>
                  <Button variant="outline" style={{ borderRadius: `${borderRadius}px` }}>
                    Secondary Button
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex space-x-2">
        <Button onClick={applyThemeChanges} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        <Button variant="outline" onClick={resetToDefault} disabled={isLoading}>
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}
