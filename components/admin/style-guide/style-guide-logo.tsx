import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BusinessFyLogo } from "@/components/ui/businessfy-logo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function StyleGuideLogo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Logo</h2>
        <p className="mb-6 text-muted-foreground">
          The BusinessFy logo represents our brand identity. Use it consistently across all platforms and materials.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logo Variations</CardTitle>
          <CardDescription>Different versions of the BusinessFy logo for various use cases.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="standard">
            <TabsList className="mb-4">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="icon-only">Icon Only</TabsTrigger>
              <TabsTrigger value="text-only">Text Only</TabsTrigger>
            </TabsList>
            <TabsContent value="standard" className="flex flex-col items-center justify-center space-y-6 p-8">
              <BusinessFyLogo size={48} className="scale-150" />
              <p className="text-center text-sm text-muted-foreground">
                The standard logo combines the BusinessFy icon and wordmark.
              </p>
            </TabsContent>
            <TabsContent value="icon-only" className="flex flex-col items-center justify-center space-y-6 p-8">
              <BusinessFyLogo size={48} showText={false} className="scale-150" />
              <p className="text-center text-sm text-muted-foreground">
                The icon-only version is used for small spaces and app icons.
              </p>
            </TabsContent>
            <TabsContent value="text-only" className="flex flex-col items-center justify-center space-y-6 p-8">
              <span className="text-3xl font-bold tracking-tight text-business-700 dark:text-business-300">
                BusinessFy
              </span>
              <p className="text-center text-sm text-muted-foreground">
                The text-only version is used when the icon cannot be displayed properly.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clear Space</CardTitle>
          <CardDescription>
            Maintain adequate clear space around the logo to ensure visibility and impact.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <div className="relative flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 p-12">
              <div className="absolute inset-0 m-8 border border-business-200 dark:border-business-800"></div>
              <BusinessFyLogo size={36} />
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Always maintain clear space equal to the height of the building icon around all sides of the logo.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logo Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Do</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use the logo in its original proportions</li>
                <li>Maintain adequate clear space around the logo</li>
                <li>Use the logo on appropriate backgrounds with sufficient contrast</li>
                <li>Use the icon-only version when space is limited</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Don't</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Stretch or distort the logo</li>
                <li>Rotate or flip the logo</li>
                <li>Change the logo colors outside of the approved variations</li>
                <li>Add effects like shadows or glows to the logo</li>
                <li>Place the logo on busy backgrounds that reduce visibility</li>
              </ul>
            </div>
          </div>

          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Never modify the BusinessFy logo or create variations beyond those provided in this guide. Consistent logo
              usage is essential for building brand recognition.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
