"use client"

import { useState, useEffect } from "react"
import { useColorTheme } from "@/lib/theme-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle, XCircle, Info, RefreshCw, Lightbulb } from "lucide-react"
import { calculateContrastRatio, getContrastLevel, suggestImprovedColor } from "@/lib/accessibility"

export function AccessibilityChecker() {
  const { colorTheme, getThemeById, applyTheme } = useColorTheme()
  const [activeTab, setActiveTab] = useState("text")
  const [contrastResults, setContrastResults] = useState<any>(null)
  const [suggestions, setSuggestions] = useState<any>(null)
  const [isChecking, setIsChecking] = useState(false)

  // Get current theme colors
  const currentTheme = getThemeById(colorTheme)
  const primaryColor = currentTheme ? `hsl(${currentTheme.colors.primary})` : "hsl(217 91% 60%)"
  const secondaryColor = currentTheme ? `hsl(${currentTheme.colors.secondary})` : "hsl(221 83% 95%)"
  const accentColor = currentTheme ? `hsl(${currentTheme.colors.accent})` : "hsl(217 91% 60%)"
  const backgroundColor = "hsl(var(--background))"
  const foregroundColor = "hsl(var(--foreground))"
  const cardColor = "hsl(var(--card))"
  const cardForegroundColor = "hsl(var(--card-foreground))"
  const mutedColor = "hsl(var(--muted))"
  const mutedForegroundColor = "hsl(var(--muted-foreground))"

  // Run accessibility check
  const runAccessibilityCheck = () => {
    setIsChecking(true)

    // Calculate contrast ratios
    const results = {
      primary: {
        onBackground: calculateContrastRatio(primaryColor, backgroundColor),
        onForeground: calculateContrastRatio(primaryColor, foregroundColor),
        onCard: calculateContrastRatio(primaryColor, cardColor),
        onCardForeground: calculateContrastRatio(primaryColor, cardForegroundColor),
        onMuted: calculateContrastRatio(primaryColor, mutedColor),
        onMutedForeground: calculateContrastRatio(primaryColor, mutedForegroundColor),
      },
      secondary: {
        onBackground: calculateContrastRatio(secondaryColor, backgroundColor),
        onForeground: calculateContrastRatio(secondaryColor, foregroundColor),
        onCard: calculateContrastRatio(secondaryColor, cardColor),
        onCardForeground: calculateContrastRatio(secondaryColor, cardForegroundColor),
        onMuted: calculateContrastRatio(secondaryColor, mutedColor),
        onMutedForeground: calculateContrastRatio(secondaryColor, mutedForegroundColor),
      },
      accent: {
        onBackground: calculateContrastRatio(accentColor, backgroundColor),
        onForeground: calculateContrastRatio(accentColor, foregroundColor),
        onCard: calculateContrastRatio(accentColor, cardColor),
        onCardForeground: calculateContrastRatio(accentColor, cardForegroundColor),
        onMuted: calculateContrastRatio(accentColor, mutedColor),
        onMutedForeground: calculateContrastRatio(accentColor, mutedForegroundColor),
      },
      text: {
        foregroundOnBackground: calculateContrastRatio(foregroundColor, backgroundColor),
        cardForegroundOnCard: calculateContrastRatio(cardForegroundColor, cardColor),
        mutedForegroundOnBackground: calculateContrastRatio(mutedForegroundColor, backgroundColor),
        mutedForegroundOnCard: calculateContrastRatio(mutedForegroundColor, cardColor),
        foregroundOnPrimary: calculateContrastRatio(foregroundColor, primaryColor),
        foregroundOnSecondary: calculateContrastRatio(foregroundColor, secondaryColor),
        foregroundOnAccent: calculateContrastRatio(foregroundColor, accentColor),
      },
    }

    // Generate suggestions for improvements
    const improvementSuggestions = {
      primary: {
        onBackground: results.primary.onBackground < 4.5 ? suggestImprovedColor(primaryColor, backgroundColor) : null,
        onForeground: results.primary.onForeground < 4.5 ? suggestImprovedColor(primaryColor, foregroundColor) : null,
      },
      secondary: {
        onBackground:
          results.secondary.onBackground < 4.5 ? suggestImprovedColor(secondaryColor, backgroundColor) : null,
        onForeground:
          results.secondary.onForeground < 4.5 ? suggestImprovedColor(secondaryColor, foregroundColor) : null,
      },
      accent: {
        onBackground: results.accent.onBackground < 4.5 ? suggestImprovedColor(accentColor, backgroundColor) : null,
        onForeground: results.accent.onForeground < 4.5 ? suggestImprovedColor(accentColor, foregroundColor) : null,
      },
      text: {
        foregroundOnBackground:
          results.text.foregroundOnBackground < 4.5 ? suggestImprovedColor(foregroundColor, backgroundColor) : null,
        cardForegroundOnCard:
          results.text.cardForegroundOnCard < 4.5 ? suggestImprovedColor(cardForegroundColor, cardColor) : null,
        mutedForegroundOnBackground:
          results.text.mutedForegroundOnBackground < 4.5
            ? suggestImprovedColor(mutedForegroundColor, backgroundColor)
            : null,
      },
    }

    setContrastResults(results)
    setSuggestions(improvementSuggestions)
    setIsChecking(false)
  }

  // Run check on component mount
  useEffect(() => {
    runAccessibilityCheck()
  }, [colorTheme])

  // Helper function to render contrast badge
  const renderContrastBadge = (ratio: number) => {
    const level = getContrastLevel(ratio)

    if (level.aaa.normal) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle2 className="mr-1 h-3 w-3" /> AAA (7:1+)
        </Badge>
      )
    } else if (level.aa.normal) {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <CheckCircle2 className="mr-1 h-3 w-3" /> AA (4.5:1+)
        </Badge>
      )
    } else if (level.aa.large) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <AlertTriangle className="mr-1 h-3 w-3" /> AA Large (3:1+)
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="mr-1 h-3 w-3" /> Fails
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Accessibility Checker</h3>
          <p className="text-sm text-muted-foreground">
            Check if your theme colors meet WCAG accessibility standards for contrast.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={runAccessibilityCheck}
          disabled={isChecking}
          className="flex items-center"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
          {isChecking ? "Checking..." : "Run Check"}
        </Button>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>About WCAG Contrast Standards</AlertTitle>
        <AlertDescription>
          <p className="text-sm">
            WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Level
            AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.
          </p>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="text">Text Contrast</TabsTrigger>
          <TabsTrigger value="primary">Primary Color</TabsTrigger>
          <TabsTrigger value="secondary">Secondary Color</TabsTrigger>
          <TabsTrigger value="accent">Accent Color</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          {contrastResults && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Text on Background</CardTitle>
                  <CardDescription>Contrast between text and various backgrounds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Foreground on Background</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.text.foregroundOnBackground.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.text.foregroundOnBackground)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: foregroundColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: backgroundColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor }}>
                        <p style={{ color: foregroundColor }}>This is how your main text appears on the background.</p>
                      </div>
                      {suggestions?.text?.foregroundOnBackground && (
                        <div className="mt-2 flex items-center space-x-2 rounded-md bg-yellow-50 p-2 text-yellow-800">
                          <Lightbulb className="h-4 w-4" />
                          <span className="text-xs">
                            Suggested improvement: Try{" "}
                            <code className="rounded bg-yellow-100 px-1">
                              {suggestions.text.foregroundOnBackground}
                            </code>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Card Foreground on Card</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.text.cardForegroundOnCard.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.text.cardForegroundOnCard)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="h-6 w-6 rounded-full border"
                          style={{ backgroundColor: cardForegroundColor }}
                        ></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: cardColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor: cardColor }}>
                        <p style={{ color: cardForegroundColor }}>This is how your text appears on card backgrounds.</p>
                      </div>
                      {suggestions?.text?.cardForegroundOnCard && (
                        <div className="mt-2 flex items-center space-x-2 rounded-md bg-yellow-50 p-2 text-yellow-800">
                          <Lightbulb className="h-4 w-4" />
                          <span className="text-xs">
                            Suggested improvement: Try{" "}
                            <code className="rounded bg-yellow-100 px-1">{suggestions.text.cardForegroundOnCard}</code>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Muted Text on Background</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.text.mutedForegroundOnBackground.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.text.mutedForegroundOnBackground)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="h-6 w-6 rounded-full border"
                          style={{ backgroundColor: mutedForegroundColor }}
                        ></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: backgroundColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor }}>
                        <p style={{ color: mutedForegroundColor }}>
                          This is how your secondary text appears on the background.
                        </p>
                      </div>
                      {suggestions?.text?.mutedForegroundOnBackground && (
                        <div className="mt-2 flex items-center space-x-2 rounded-md bg-yellow-50 p-2 text-yellow-800">
                          <Lightbulb className="h-4 w-4" />
                          <span className="text-xs">
                            Suggested improvement: Try{" "}
                            <code className="rounded bg-yellow-100 px-1">
                              {suggestions.text.mutedForegroundOnBackground}
                            </code>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Text on Primary Color</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.text.foregroundOnPrimary.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.text.foregroundOnPrimary)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: foregroundColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: primaryColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor: primaryColor }}>
                        <p style={{ color: foregroundColor }}>
                          This is how your text appears on primary color backgrounds.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="primary" className="space-y-4">
          {contrastResults && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Primary Color Contrast</CardTitle>
                  <CardDescription>Contrast between your primary color and various backgrounds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Primary on Background</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.primary.onBackground.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.primary.onBackground)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: primaryColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: backgroundColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor }}>
                        <p style={{ color: primaryColor }}>
                          This is how your primary color appears as text on the background.
                        </p>
                      </div>
                      {suggestions?.primary?.onBackground && (
                        <div className="mt-2 flex items-center space-x-2 rounded-md bg-yellow-50 p-2 text-yellow-800">
                          <Lightbulb className="h-4 w-4" />
                          <span className="text-xs">
                            Suggested improvement: Try{" "}
                            <code className="rounded bg-yellow-100 px-1">{suggestions.primary.onBackground}</code>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Primary on Card</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.primary.onCard.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.primary.onCard)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: primaryColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: cardColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor: cardColor }}>
                        <p style={{ color: primaryColor }}>
                          This is how your primary color appears as text on card backgrounds.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Text on Primary</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.primary.onForeground.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.primary.onForeground)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: foregroundColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: primaryColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor: primaryColor }}>
                        <p style={{ color: foregroundColor }}>This is how text appears on primary color backgrounds.</p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Primary Button Example</span>
                      </div>
                      <div className="mt-2">
                        <Button className="w-full">Primary Button</Button>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Buttons should have a contrast ratio of at least 3:1 against their background for accessibility.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="secondary" className="space-y-4">
          {contrastResults && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Secondary Color Contrast</CardTitle>
                  <CardDescription>Contrast between your secondary color and various backgrounds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Secondary on Background</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.secondary.onBackground.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.secondary.onBackground)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: secondaryColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: backgroundColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor }}>
                        <p style={{ color: secondaryColor }}>
                          This is how your secondary color appears as text on the background.
                        </p>
                      </div>
                      {suggestions?.secondary?.onBackground && (
                        <div className="mt-2 flex items-center space-x-2 rounded-md bg-yellow-50 p-2 text-yellow-800">
                          <Lightbulb className="h-4 w-4" />
                          <span className="text-xs">
                            Suggested improvement: Try{" "}
                            <code className="rounded bg-yellow-100 px-1">{suggestions.secondary.onBackground}</code>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Secondary on Card</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.secondary.onCard.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.secondary.onCard)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: secondaryColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: cardColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor: cardColor }}>
                        <p style={{ color: secondaryColor }}>
                          This is how your secondary color appears as text on card backgrounds.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Text on Secondary</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.text.foregroundOnSecondary.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.text.foregroundOnSecondary)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: foregroundColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: secondaryColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor: secondaryColor }}>
                        <p style={{ color: foregroundColor }}>
                          This is how text appears on secondary color backgrounds.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Secondary Button Example</span>
                      </div>
                      <div className="mt-2">
                        <Button variant="secondary" className="w-full">
                          Secondary Button
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Secondary UI elements should also maintain sufficient contrast for accessibility.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="accent" className="space-y-4">
          {contrastResults && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Accent Color Contrast</CardTitle>
                  <CardDescription>Contrast between your accent color and various backgrounds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Accent on Background</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.accent.onBackground.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.accent.onBackground)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: accentColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: backgroundColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor }}>
                        <p style={{ color: accentColor }}>
                          This is how your accent color appears as text on the background.
                        </p>
                      </div>
                      {suggestions?.accent?.onBackground && (
                        <div className="mt-2 flex items-center space-x-2 rounded-md bg-yellow-50 p-2 text-yellow-800">
                          <Lightbulb className="h-4 w-4" />
                          <span className="text-xs">
                            Suggested improvement: Try{" "}
                            <code className="rounded bg-yellow-100 px-1">{suggestions.accent.onBackground}</code>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Accent on Card</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.accent.onCard.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.accent.onCard)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: accentColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: cardColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor: cardColor }}>
                        <p style={{ color: accentColor }}>
                          This is how your accent color appears as text on card backgrounds.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Text on Accent</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {contrastResults.text.foregroundOnAccent.toFixed(2)}:1
                          </span>
                          {renderContrastBadge(contrastResults.text.foregroundOnAccent)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: foregroundColor }}></div>
                        <span className="text-xs">on</span>
                        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: accentColor }}></div>
                      </div>
                      <div className="mt-2 rounded-md p-2" style={{ backgroundColor: accentColor }}>
                        <p style={{ color: foregroundColor }}>This is how text appears on accent color backgrounds.</p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Accent UI Example</span>
                      </div>
                      <div className="mt-2">
                        <div
                          className="rounded-md border p-2"
                          style={{ backgroundColor: accentColor, color: foregroundColor }}
                        >
                          This is an example of an accent-colored UI element.
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Accent colors are often used for highlighting important information or interactive elements.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="rounded-md bg-muted p-4">
        <h4 className="mb-2 font-medium">Overall Accessibility Assessment</h4>
        {contrastResults && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>
                Text on Background:{" "}
                {contrastResults.text.foregroundOnBackground >= 4.5 ? "Passes" : "Needs improvement"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>
                Text on Card: {contrastResults.text.cardForegroundOnCard >= 4.5 ? "Passes" : "Needs improvement"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>
                Primary Button Text: {contrastResults.text.foregroundOnPrimary >= 4.5 ? "Passes" : "Needs improvement"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>
                Secondary Button Text:{" "}
                {contrastResults.text.foregroundOnSecondary >= 4.5 ? "Passes" : "Needs improvement"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
