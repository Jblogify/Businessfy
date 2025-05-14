"use client"

import { useState } from "react"
import { useColorTheme } from "@/lib/theme-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemePreview } from "../settings/theme-preview"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function StyleGuideIndustryThemes() {
  const { themesByIndustry, applyTheme } = useColorTheme()
  const [selectedIndustry, setSelectedIndustry] = useState("Finance")
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const { toast } = useToast()

  const industries = Object.keys(themesByIndustry).filter((industry) => industry !== "General")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Industry-Specific Themes</CardTitle>
        <CardDescription>
          Specialized color themes optimized for different industries and business sectors.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <TabsList className="grid w-full grid-cols-5">
            {industries.map((industry) => (
              <TabsTrigger key={industry} value={industry}>
                {industry}
              </TabsTrigger>
            ))}
          </TabsList>
          {industries.map((industry) => (
            <TabsContent key={industry} value={industry} className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{industry} Themes</h3>
                  <p className="text-sm text-muted-foreground">
                    These color themes are specifically designed for {industry.toLowerCase()} businesses, with colors
                    that convey the right message to your customers.
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {themesByIndustry[industry].map((theme) => (
                      <div
                        key={theme.id}
                        className={`cursor-pointer rounded-md border p-3 transition-all hover:border-primary ${
                          selectedTheme === theme.id ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setSelectedTheme(theme.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{theme.name}</span>
                          <Badge variant="outline">{industry}</Badge>
                        </div>
                        {theme.description && <p className="mt-1 text-xs text-muted-foreground">{theme.description}</p>}
                        <div className="mt-2 flex space-x-2">
                          <div
                            className="h-5 w-5 rounded-full"
                            style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                          ></div>
                          <div
                            className="h-5 w-5 rounded-full"
                            style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                          ></div>
                          <div
                            className="h-5 w-5 rounded-full"
                            style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preview</h3>
                  <div className="rounded-md border">
                    <ThemePreview themeId={selectedTheme || themesByIndustry[industry][0].id} />
                  </div>
                  <Button
                    onClick={() => {
                      const themeId = selectedTheme || themesByIndustry[industry][0].id
                      applyTheme(themeId)
                      toast({
                        title: "Theme applied",
                        description: `The ${
                          themesByIndustry[industry].find((t) => t.id === themeId)?.name
                        } theme has been applied successfully.`,
                      })
                    }}
                  >
                    Apply This Theme
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="rounded-md border bg-muted p-4">
          <h3 className="mb-2 font-medium">Why Use Industry-Specific Themes?</h3>
          <ul className="ml-6 list-disc text-sm text-muted-foreground">
            <li className="mb-1">
              <span className="font-medium">Brand Perception</span>: Colors influence how customers perceive your brand
            </li>
            <li className="mb-1">
              <span className="font-medium">Industry Standards</span>: Align with established color conventions in your
              sector
            </li>
            <li className="mb-1">
              <span className="font-medium">User Expectations</span>: Meet user expectations for your type of business
            </li>
            <li className="mb-1">
              <span className="font-medium">Competitive Edge</span>: Stand out while still appearing credible in your
              industry
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
