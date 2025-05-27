"use client"

import { Home, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { BusinessFyLogo } from "@/components/businessfy-logo"

const sidebarItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Home,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: Home,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Home,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Home,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-business-50 dark:bg-business-950">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <BusinessFyLogo textClassName="text-business-700 dark:text-business-300" />
          <span className="text-sm text-business-700 dark:text-business-300">Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-business-100 text-business-900 dark:bg-business-900 dark:text-business-50"
                  : "text-gray-700 hover:bg-business-100 hover:text-business-900 dark:text-gray-300 dark:hover:bg-business-900 dark:hover:text-business-50",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <Link href="/">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Home className="h-4 w-4" />
            View Site
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="mt-2 w-full justify-start gap-2 text-red-600 hover:bg-red-100 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
