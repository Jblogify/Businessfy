import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function StyleGuideComponents() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">UI Components</h2>
        <p className="mb-6 text-muted-foreground">
          BusinessFy uses a consistent set of UI components across the platform. These components follow our brand
          guidelines and ensure a cohesive user experience.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            Buttons are used to trigger actions. Different button styles indicate different levels of emphasis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Primary Button</span>
                <div className="flex flex-wrap gap-2">
                  <Button>Primary</Button>
                  <Button disabled>Disabled</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for primary actions and the most important call to action on a page.
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Secondary Button</span>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="secondary" disabled>
                    Disabled
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for secondary actions that don't require as much emphasis.
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Outline Button</span>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">Outline</Button>
                  <Button variant="outline" disabled>
                    Disabled
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for less important actions or in places where a subtle button is needed.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Ghost Button</span>
                <div className="flex flex-wrap gap-2">
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="ghost" disabled>
                    Disabled
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for the least important actions or in places where a very subtle button is needed.
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Destructive Button</span>
                <div className="flex flex-wrap gap-2">
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="destructive" disabled>
                    Disabled
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for actions that might result in data loss or other significant consequences.
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Button Sizes</span>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Different button sizes are available for different contexts.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
          <CardDescription>Form elements are used to collect user input.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Input</span>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
                <p className="text-xs text-muted-foreground">Used for collecting text input from users.</p>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Checkbox</span>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <p className="text-xs text-muted-foreground">Used for binary choices or multiple selections.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Radio Group</span>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground">Used for selecting one option from a list.</p>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Switch</span>
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>
                <p className="text-xs text-muted-foreground">Used for toggling a setting on or off.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges and Alerts</CardTitle>
          <CardDescription>Used to highlight information or draw attention to status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Badges</span>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Used to highlight status, count, or categorize items.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">Alerts</span>
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>This is an informational alert for the user.</AlertDescription>
                </Alert>
                <p className="text-xs text-muted-foreground">
                  Used to provide feedback or important information to users.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Component Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Consistency</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use the same component for the same purpose throughout the interface</li>
                <li>Maintain consistent spacing between components</li>
                <li>Follow established patterns for component combinations</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Accessibility</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Ensure all interactive components are keyboard accessible</li>
                <li>Provide appropriate labels for form elements</li>
                <li>Maintain sufficient color contrast for all components</li>
                <li>Include appropriate ARIA attributes when necessary</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Responsive Design</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Ensure components adapt appropriately to different screen sizes</li>
              <li>Use appropriate component sizes for different devices</li>
              <li>Consider touch targets for mobile interfaces (minimum 44x44px)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
