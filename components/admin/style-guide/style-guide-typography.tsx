import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function StyleGuideTypography() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Typography</h2>
        <p className="mb-6 text-muted-foreground">
          Typography plays a crucial role in the BusinessFy brand identity. Consistent use of fonts helps maintain a
          cohesive look and feel across all platforms.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Font Family</CardTitle>
          <CardDescription>
            BusinessFy uses the Inter font family, a highly readable sans-serif typeface optimized for screen displays.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Primary Font: Inter</h3>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-muted-foreground">Regular (400)</span>
                  <p className="font-normal">The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-muted-foreground">Medium (500)</span>
                  <p className="font-medium">The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-muted-foreground">Semibold (600)</span>
                  <p className="font-semibold">The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-muted-foreground">Bold (700)</span>
                  <p className="font-bold">The quick brown fox jumps over the lazy dog. 1234567890!@#$%^&*()</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Type Scale</CardTitle>
          <CardDescription>
            BusinessFy uses a consistent type scale to maintain visual hierarchy across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Display (text-4xl)</span>
                <h1 className="text-4xl font-bold tracking-tight">Display Heading</h1>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Heading 1 (text-3xl)</span>
                <h1 className="text-3xl font-bold tracking-tight">Heading 1</h1>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Heading 2 (text-2xl)</span>
                <h2 className="text-2xl font-bold">Heading 2</h2>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Heading 3 (text-xl)</span>
                <h3 className="text-xl font-semibold">Heading 3</h3>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Heading 4 (text-lg)</span>
                <h4 className="text-lg font-semibold">Heading 4</h4>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Body (text-base)</span>
                <p className="text-base">
                  Body text is used for the main content of pages. It should be easy to read and have sufficient
                  contrast with the background.
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Small (text-sm)</span>
                <p className="text-sm">
                  Small text is used for captions, footnotes, and other secondary information. It should still be
                  legible.
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Extra Small (text-xs)</span>
                <p className="text-xs">
                  Extra small text is used for legal text, credits, and other tertiary information.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Headings</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use headings to establish a clear content hierarchy</li>
                <li>Maintain consistent heading levels (don't skip from H1 to H3)</li>
                <li>Use sentence case for headings (capitalize first word only)</li>
                <li>Keep headings concise and descriptive</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Body Text</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use the base font size (16px) for most body text</li>
                <li>Maintain line heights of 1.5-1.7 for optimal readability</li>
                <li>Keep paragraphs relatively short (3-5 lines)</li>
                <li>Use proper punctuation and grammar</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Accessibility</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Ensure sufficient contrast between text and background colors</li>
              <li>Don't use font sizes smaller than 12px for any readable text</li>
              <li>Avoid using text in images for important information</li>
              <li>Maintain a clear hierarchy to help users scan content</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
