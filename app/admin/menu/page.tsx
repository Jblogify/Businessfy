import { MenuManager } from "@/components/admin/menu/menu-manager"

export default function MenuManagementPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
        <p className="text-muted-foreground">Customize your website's navigation menu structure and visibility.</p>
      </div>

      <div className="grid gap-6">
        <MenuManager />
      </div>
    </div>
  )
}
