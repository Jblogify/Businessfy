"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

// Default navigation links
const defaultLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function MainNav() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [links, setLinks] = useState(defaultLinks)

  // Load navigation from localStorage if available
  useEffect(() => {
    const storedNavigation = localStorage.getItem("siteNavigation")
    if (storedNavigation) {
      try {
        const parsedNavigation = JSON.parse(storedNavigation)
        if (Array.isArray(parsedNavigation) && parsedNavigation.length > 0) {
          setLinks(parsedNavigation)
        }
      } catch (error) {
        console.error("Error parsing navigation:", error)
      }
    }
  }, [])

  return (
    <div className="flex justify-center">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="flex gap-6">
          {links.map((item) => {
            const isActive = pathname === item.href
            const isHovered = hoveredItem === item.href

            return (
              <NavigationMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-white text-white/90 font-medium relative drop-shadow-sm",
                    pathname === item.href
                      ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full"
                      : "hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-white/70 hover:after:rounded-full",
                  )}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
