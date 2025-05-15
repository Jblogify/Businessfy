"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function PageSeo({ seo, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...seo,
      [field]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>Optimize your page for search engines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seo-title">SEO Title</Label>
          <Input
            id="seo-title"
            placeholder="SEO Title"
            value={seo.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            The title that appears in search engine results (recommended: 50-60 characters)
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="seo-description">Meta Description</Label>
          <Textarea
            id="seo-description"
            placeholder="Enter a description for search engines"
            value={seo.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            The description that appears in search engine results (recommended: 150-160 characters)
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="seo-keywords">Keywords</Label>
          <Input
            id="seo-keywords"
            placeholder="keyword1, keyword2, keyword3"
            value={seo.keywords}
            onChange={(e) => handleChange("keywords", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Comma-separated keywords related to your page</p>
        </div>
      </CardContent>
    </Card>
  )
}
