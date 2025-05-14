import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  ChevronRight,
  CreditCard,
  Download,
  Home,
  Mail,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  User,
} from "lucide-react"

export function StyleGuideIcons() {
  const iconSets = [
    {
      category: "Navigation",
      icons: [
        { name: "Home", component: <Home className="h-5 w-5" /> },
        { name: "Menu", component: <Menu className="h-5 w-5" /> },
        { name: "ChevronRight", component: <ChevronRight className="h-5 w-5" /> },
        { name: "Settings", component: <Settings className="h-5 w-5" /> },
      ],
    },
    {
      category: "Actions",
      icons: [
        { name: "Plus", component: <Plus className="h-5 w-5" /> },
        { name: "Download", component: <Download className="h-5 w-5" /> },
        { name: "MessageSquare", component: <MessageSquare className="h-5 w-5" /> },
        { name: "Mail", component: <Mail className="h-5 w-5" /> },
      ],
    },
    {
      category: "Objects",
      icons: [
        { name: "User", component: <User className="h-5 w-5" /> },
        { name: "Building2", component: <Building2 className="h-5 w-5" /> },
        { name: "CreditCard", component: <CreditCard className="h-5 w-5" /> },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Iconography</h2>
        <p className="mb-6 text-muted-foreground">
          BusinessFy uses Lucide icons, a consistent and accessible icon set that complements our visual style.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Icon Library</CardTitle>
          <CardDescription>
            BusinessFy uses the Lucide icon library, which provides a comprehensive set of icons with a consistent
            style.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {iconSets.map((set) => (
              <div key={set.category} className="space-y-4">
                <h3 className="font-semibold">{set.category} Icons</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {set.icons.map((icon) => (
                    <div
                      key={icon.name}
                      className="flex flex-col items-center justify-center space-y-2 rounded-md border p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                        {icon.component}
                      </div>
                      <span className="text-xs">{icon.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Icon Sizes</CardTitle>
          <CardDescription>
            Icons should be used at consistent sizes throughout the interface to maintain visual harmony.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-8">
            <div className="flex flex-col items-center space-y-2">
              <Building2 className="h-4 w-4" />
              <span className="text-xs text-muted-foreground">16px (Small)</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Building2 className="h-5 w-5" />
              <span className="text-xs text-muted-foreground">20px (Default)</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Building2 className="h-6 w-6" />
              <span className="text-xs text-muted-foreground">24px (Medium)</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Building2 className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">32px (Large)</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Building2 className="h-12 w-12" />
              <span className="text-xs text-muted-foreground">48px (XLarge)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Icon Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Do</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use icons consistently for the same actions across the platform</li>
                <li>Pair icons with text labels for clarity when appropriate</li>
                <li>Use appropriate icon sizes based on context</li>
                <li>Maintain consistent color usage for icons</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Don't</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Mix different icon styles within the same interface</li>
                <li>Use icons that are too complex or detailed at small sizes</li>
                <li>Rely solely on icons for critical actions without text labels</li>
                <li>Stretch or distort icons from their original proportions</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Accessibility</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Always include appropriate aria-label attributes for icons used as interactive elements</li>
              <li>Ensure sufficient color contrast between icons and their backgrounds</li>
              <li>Don't rely solely on icons to convey important information</li>
              <li>Consider using the sr-only class to provide additional context for screen readers</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
