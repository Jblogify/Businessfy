"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function MainNav() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="flex justify-center">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="flex gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href
            const isHovered = hoveredItem === link.href

            return (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group relative inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 text-business-400 hover:text-business-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      // Default state - very subtle glow
                      "text-shadow-xs shadow-business-400/30",
                      // Active state - moderate persistent glow
                      isActive && "text-business-300 font-semibold text-shadow-sm shadow-business-300/50",
                      // Hover state - stronger, more noticeable glow
                      isHovered && "scale-105 text-shadow-md shadow-business-200/60",
                      // Active + Hover - strongest glow effect
                      isActive && isHovered && "text-shadow-lg shadow-business-200/70 animate-pulse-glow",
                    )}
                    onMouseEnter={() => setHoveredItem(link.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-1 left-1/2 h-[2px] bg-business-400 transform -translate-x-1/2 transition-all duration-300",
                        isActive
                          ? "w-4/5 opacity-100 shadow-glow shadow-business-300/60"
                          : isHovered
                            ? "w-2/3 opacity-80 shadow-glow shadow-business-200/50"
                            : "w-0 opacity-0",
                      )}
                    />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
