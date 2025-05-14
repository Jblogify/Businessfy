"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function StyleGuideColors() {
  const primaryColors = [
    { name: "business-50", hex: "#eef6ff", textColor: "text-gray-900" },
    { name: "business-100", hex: "#d9eaff", textColor: "text-gray-900" },
    { name: "business-200", hex: "#bcdaff", textColor: "text-gray-900" },
    { name: "business-300", hex: "#8ec2fe", textColor: "text-gray-900" },
    { name: "business-400", hex: "#599efb", textColor: "text-white" },
    { name: "business-500", hex: "#3b7ff5", textColor: "text-white" },
    { name: "business-600", hex: "#2661e9", textColor: "text-white" },
    { name: "business-700", hex: "#1e4dd3", textColor: "text-white" },
    { name: "business-800", hex: "#1e41ab", textColor: "text-white" },
    { name: "business-900", hex: "#1e3a85", textColor: "text-white" },
    { name: "business-950", hex: "#162454", textColor: "text-white" },
  ]

  const secondaryColors = [
    { name: "teal-50", hex: "#f0fdfa", textColor: "text-gray-900" },
    { name: "teal-100", hex: "#ccfbf1", textColor: "text-gray-900" },
    { name: "teal-200", hex: "#99f6e4", textColor: "text-gray-900" },
    { name: "teal-300", hex: "#5eead4", textColor: "text-gray-900" },
    { name: "teal-400", hex: "#2dd4bf", textColor: "text-gray-900" },
    { name: "teal-500", hex: "#14b8a6", textColor: "text-white" },
    { name: "teal-600", hex: "#0d9488", textColor: "text-white" },
    { name: "teal-700", hex: "#0f766e", textColor: "text-white" },
    { name: "teal-800", hex: "#115e59", textColor: "text-white" },
    { name: "teal-900", hex: "#134e4a", textColor: "text-white" },
    { name: "teal-950", hex: "#042f2e", textColor: "text-white" },
  ]

  const neutralColors = [
    { name: "background", variable: "--background", textColor: "text-foreground" },
    { name: "foreground", variable: "--foreground", textColor: "text-background" },
    { name: "muted", variable: "--muted", textColor: "text-muted-foreground" },
    { name: "muted-foreground", variable: "--muted-foreground", textColor: "text-muted" },
    { name: "card", variable: "--card", textColor: "text-card-foreground" },
    { name: "card-foreground", variable: "--card-foreground", textColor: "text-card" },
    { name: "border", variable: "--border", textColor: "text-foreground" },
    { name: "input", variable: "--input", textColor: "text-foreground" },
    { name: "ring", variable: "--ring", textColor: "text-background" },
  ]

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Color Palette</h2>
        <p className="mb-6 text-muted-foreground">
          The BusinessFy color palette consists of primary blue colors, complementary teal colors, and neutral colors
          for backgrounds and text.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Primary Colors</CardTitle>
          <CardDescription>
            The primary blue palette represents trust, reliability, and professionalism. Use these colors for primary
            actions, navigation, and branding elements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {primaryColors.map((color) => (
              <div key={color.name} className="flex flex-col overflow-hidden rounded-md border">
                <div
                  className={`flex h-20 items-center justify-center bg-${color.name} ${color.textColor}`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={color.textColor}>{color.name}</span>
                </div>
                <div className="flex items-center justify-between bg-background p-2">
                  <code className="text-xs">{color.hex}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(color.hex, color.name)}
                  >
                    <CopyIcon className="h-3 w-3" />
                    <span className="sr-only">Copy color hex code</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Secondary Colors</CardTitle>
          <CardDescription>
            The secondary teal palette adds a modern touch to the BusinessFy brand. Use these colors for accents,
            secondary actions, and to create visual interest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {secondaryColors.map((color) => (
              <div key={color.name} className="flex flex-col overflow-hidden rounded-md border">
                <div
                  className={`flex h-20 items-center justify-center bg-${color.name} ${color.textColor}`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={color.textColor}>{color.name}</span>
                </div>
                <div className="flex items-center justify-between bg-background p-2">
                  <code className="text-xs">{color.hex}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(color.hex, color.name)}
                  >
                    <CopyIcon className="h-3 w-3" />
                    <span className="sr-only">Copy color hex code</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Semantic Colors</CardTitle>
          <CardDescription>
            These semantic colors are used throughout the interface for consistent styling of UI elements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {neutralColors.map((color) => (
              <div key={color.name} className="flex flex-col overflow-hidden rounded-md border">
                <div className={`flex h-20 items-center justify-center bg-${color.name} ${color.textColor}`}>
                  <span>{color.name}</span>
                </div>
                <div className="flex items-center justify-between bg-background p-2">
                  <code className="text-xs">var({color.variable})</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(`var(${color.variable})`, color.name)}
                  >
                    <CopyIcon className="h-3 w-3" />
                    <span className="sr-only">Copy color variable</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Primary Action</h3>
            <p className="text-sm text-muted-foreground">
              Use business-600 for primary buttons and interactive elements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Secondary Action</h3>
            <p className="text-sm text-muted-foreground">
              Use teal-500 for secondary buttons and less prominent interactive elements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Text</h3>
            <p className="text-sm text-muted-foreground">
              Use foreground color for primary text and muted-foreground for secondary text.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Backgrounds</h3>
            <p className="text-sm text-muted-foreground">
              Use background for main backgrounds, card for component backgrounds, and muted for subtle background
              variations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Accessibility</h3>
            <p className="text-sm text-muted-foreground">
              Ensure sufficient contrast between text and background colors. Use the provided color combinations to
              maintain WCAG AA compliance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
