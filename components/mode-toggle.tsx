"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleButtonClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "bg-zinc-600 hover:bg-business-600 hover:text-white text-gray-200 border-none shadow-sm h-9 w-9 relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95",
            isAnimating && (isDark ? "animate-flip-to-moon" : "animate-flip-to-sun"),
          )}
          onClick={handleButtonClick}
        >
          <div className="absolute inset-0 bg-business-500/0 hover:bg-business-500/20 transition-colors duration-300 rounded-md"></div>
          <Sun
            className={cn(
              "h-[1.2rem] w-[1.2rem] transition-all duration-500",
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
              isAnimating && !isDark && "animate-sun-shine",
            )}
          />
          <Moon
            className={cn(
              "absolute h-[1.2rem] w-[1.2rem] transition-all duration-500",
              isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0",
              isAnimating && isDark && "animate-moon-glow",
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-zinc-800/95 backdrop-filter backdrop-blur-md border border-business-700/30 rounded-xl shadow-lg shadow-business-900/20 animate-in fade-in-80 slide-in-from-top-5"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="py-2.5 px-3 hover:bg-business-600/20 transition-all duration-200 hover:scale-[1.02] text-gray-200 animate-in fade-in-50 slide-in-from-right-3"
          style={{ animationDelay: "0ms" }}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="py-2.5 px-3 hover:bg-business-600/20 transition-all duration-200 hover:scale-[1.02] text-gray-200 animate-in fade-in-50 slide-in-from-right-3"
          style={{ animationDelay: "50ms" }}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="py-2.5 px-3 hover:bg-business-600/20 transition-all duration-200 hover:scale-[1.02] text-gray-200 animate-in fade-in-50 slide-in-from-right-3"
          style={{ animationDelay: "100ms" }}
        >
          <span className="mr-2">💻</span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
