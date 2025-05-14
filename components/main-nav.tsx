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
                      "text-shadow-sm shadow-business-400/50",
                      isActive && "text-business-300 font-semibold text-shadow-md shadow-business-300/60",
                      isHovered && "scale-105 text-shadow-md shadow-business-200/70",
                    )}
                    onMouseEnter={() => setHoveredItem(link.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-1 left-1/2 h-[2px] bg-business-400 transform -translate-x-1/2 transition-all duration-300 shadow-glow",
                        isActive ? "w-4/5 opacity-100" : isHovered ? "w-2/3 opacity-80" : "w-0 opacity-0",
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
