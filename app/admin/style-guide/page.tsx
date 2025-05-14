import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StyleGuideColors } from "@/components/admin/style-guide/style-guide-colors"
import { StyleGuideLogo } from "@/components/admin/style-guide/style-guide-logo"
import { StyleGuideTypography } from "@/components/admin/style-guide/style-guide-typography"
import { StyleGuideComponents } from "@/components/admin/style-guide/style-guide-components"
import { StyleGuideIcons } from "@/components/admin/style-guide/style-guide-icons"
import { StyleGuideVoice } from "@/components/admin/style-guide/style-guide-voice"
import { StyleGuideImagery } from "@/components/admin/style-guide/style-guide-imagery"
import { StyleGuideSpacing } from "@/components/admin/style-guide/style-guide-spacing"

export const metadata: Metadata = {
  title: "Style Guide | BusinessFy Admin",
  description: "Comprehensive style guide for BusinessFy branding",
}

export default function StyleGuidePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">BusinessFy Style Guide</h1>
        <p className="mt-2 text-muted-foreground">
          A comprehensive guide to BusinessFy brand elements, usage guidelines, and visual standards.
        </p>
      </div>

      <Tabs defaultValue="logo" className="w-full">
        <TabsList className="mb-8 w-full justify-start overflow-x-auto">
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="icons">Icons</TabsTrigger>
          <TabsTrigger value="imagery">Imagery</TabsTrigger>
          <TabsTrigger value="voice">Voice & Tone</TabsTrigger>
          <TabsTrigger value="spacing">Spacing & Layout</TabsTrigger>
        </TabsList>
        <TabsContent value="logo" className="mt-0">
          <StyleGuideLogo />
        </TabsContent>
        <TabsContent value="colors" className="mt-0">
          <StyleGuideColors />
        </TabsContent>
        <TabsContent value="typography" className="mt-0">
          <StyleGuideTypography />
        </TabsContent>
        <TabsContent value="components" className="mt-0">
          <StyleGuideComponents />
        </TabsContent>
        <TabsContent value="icons" className="mt-0">
          <StyleGuideIcons />
        </TabsContent>
        <TabsContent value="imagery" className="mt-0">
          <StyleGuideImagery />
        </TabsContent>
        <TabsContent value="voice" className="mt-0">
          <StyleGuideVoice />
        </TabsContent>
        <TabsContent value="spacing" className="mt-0">
          <StyleGuideSpacing />
        </TabsContent>
      </Tabs>
    </div>
  )
}
