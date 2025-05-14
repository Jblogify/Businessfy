import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function StyleGuideSpacing() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Spacing & Layout</h2>
        <p className="mb-6 text-muted-foreground">
          Consistent spacing and layout principles create visual harmony and improve usability across the BusinessFy
          platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>
            BusinessFy uses a consistent spacing scale based on 4px increments to maintain visual rhythm.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-business-200 dark:bg-business-800"></div>
                  <span className="text-sm">4px (0.25rem) - Extra small spacing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 bg-business-200 dark:bg-business-800"></div>
                  <span className="text-sm">6px (0.375rem) - Extra small spacing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-business-200 dark:bg-business-800"></div>
                  <span className="text-sm">8px (0.5rem) - Small spacing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-12 w-12 bg-business-200 dark:bg-business-800"></div>
                  <span className="text-sm">12px (0.75rem) - Small spacing</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-16 w-16 bg-business-200 dark:bg-business-800"></div>
                  <span className="text-sm">16px (1rem) - Default spacing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-24 w-24 bg-business-200 dark:bg-business-800"></div>
                  <span className="text-sm">24px (1.5rem) - Medium spacing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-32 w-32 bg-business-200 dark:bg-business-800"></div>
                  <span className="text-sm">32px (2rem) - Large spacing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-48 w-48 bg-business-200 dark:bg-business-800"></div>
                  <span className="text-sm">48px (3rem) - Extra large spacing</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Use these spacing values consistently throughout the interface to maintain visual harmony. Tailwind
              classes like p-4 (16px padding), my-6 (24px margin on y-axis), and gap-2 (8px gap) follow this scale.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout Principles</CardTitle>
          <CardDescription>
            BusinessFy follows consistent layout principles to create a cohesive and usable interface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Grid System</h3>
                <div className="grid grid-cols-12 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-8 bg-business-100 text-center text-xs leading-8 dark:bg-business-900">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  BusinessFy uses a 12-column grid system for layout. This provides flexibility for various screen sizes
                  and content arrangements.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Container Width</h3>
                <div className="space-y-2">
                  <div className="h-8 w-full rounded bg-business-100 dark:bg-business-900"></div>
                  <div className="mx-auto h-8 w-11/12 rounded bg-business-200 dark:bg-business-800"></div>
                  <div className="mx-auto h-8 w-10/12 rounded bg-business-300 dark:bg-business-700"></div>
                  <div className="mx-auto h-8 w-9/12 rounded bg-business-400 dark:bg-business-600"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Content is contained within responsive containers that adjust based on screen size, with a maximum
                  width of 1400px for extra large screens.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Responsive Breakpoints</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded bg-business-100 p-2 dark:bg-business-900">
                    <span className="text-sm font-medium">sm</span>
                    <span className="text-sm text-muted-foreground">640px</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-business-100 p-2 dark:bg-business-900">
                    <span className="text-sm font-medium">md</span>
                    <span className="text-sm text-muted-foreground">768px</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-business-100 p-2 dark:bg-business-900">
                    <span className="text-sm font-medium">lg</span>
                    <span className="text-sm text-muted-foreground">1024px</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-business-100 p-2 dark:bg-business-900">
                    <span className="text-sm font-medium">xl</span>
                    <span className="text-sm text-muted-foreground">1280px</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-business-100 p-2 dark:bg-business-900">
                    <span className="text-sm font-medium">2xl</span>
                    <span className="text-sm text-muted-foreground">1400px</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  These breakpoints guide responsive design decisions, ensuring the interface adapts appropriately to
                  different screen sizes.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Component Spacing</h3>
                <div className="space-y-4 rounded border p-4">
                  <div className="h-8 rounded bg-business-100 dark:bg-business-900"></div>
                  <div className="h-24 rounded bg-business-100 dark:bg-business-900"></div>
                  <div className="h-12 rounded bg-business-100 dark:bg-business-900"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Components maintain consistent internal spacing and margins between elements. Use the spacing scale to
                  determine appropriate gaps between components.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Do</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use consistent spacing throughout the interface</li>
                <li>Follow the 12-column grid system for layouts</li>
                <li>Design with mobile-first responsive principles</li>
                <li>Maintain appropriate whitespace to improve readability</li>
                <li>Group related elements with consistent spacing</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Don't</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use arbitrary spacing values outside the spacing scale</li>
                <li>Create overly dense layouts with insufficient whitespace</li>
                <li>Ignore responsive breakpoints when designing layouts</li>
                <li>Use inconsistent spacing between similar components</li>
                <li>Create layouts that require horizontal scrolling on standard viewports</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Accessibility</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Ensure sufficient spacing between interactive elements for touch targets</li>
              <li>Maintain a logical reading order in the layout for screen readers</li>
              <li>Use appropriate container widths to avoid overly long line lengths</li>
              <li>Ensure layouts adapt appropriately to different zoom levels</li>
              <li>Test layouts with keyboard navigation to ensure accessibility</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
