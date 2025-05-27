"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {siteConfig.mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "relative px-3 py-2 transition-all duration-300 ease-in-out rounded-md",
            "hover:text-business-600 dark:hover:text-business-400",
            "focus:outline-none focus:ring-2 focus:ring-business-500 focus:ring-offset-2",
            "transform hover:scale-105",
            pathname === item.href
              ? "text-business-600 dark:text-business-400 font-semibold"
              : "text-foreground/70 hover:text-business-600 dark:text-foreground/70 dark:hover:text-business-400",
          )}
        >
          <span className="relative z-10">{item.title}</span>
          {pathname === item.href && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-business-600 dark:bg-business-400 rounded-full transition-all duration-300" />
          )}
          <div className="absolute inset-0 bg-business-50 dark:bg-business-900/20 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
        </Link>
      ))}
    </nav>
  )
}
