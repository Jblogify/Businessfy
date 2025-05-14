"use client"

import { Check, Palette } from "lucide-react"
import { useColorTheme } from "@/lib/theme-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function ThemeSwitcher({ className }: { className?: string }) {
  const { colorTheme, availableThemes, applyTheme, isThemeDark } = useColorTheme()
  const [isRotating, setIsRotating] = useState(false)

  const handleButtonClick = () => {
    setIsRotating(true)
    setTimeout(() => setIsRotating(false), 500)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-9 w-9 bg-zinc-600 hover:bg-business-600 hover:text-white text-gray-200 border-none shadow-sm relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95",
            isRotating && "animate-spin-slow",
            className,
          )}
          onClick={handleButtonClick}
        >
          <div className="absolute inset-0 bg-business-500/0 hover:bg-business-500/20 transition-colors duration-300 rounded-md"></div>
          <Palette className={cn("h-4 w-4 transition-all duration-300", isRotating ? "scale-90" : "scale-100")} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-zinc-800/95 backdrop-filter backdrop-blur-md border border-business-700/30 rounded-xl shadow-lg shadow-business-900/20 animate-in fade-in-80 slide-in-from-top-5"
      >
        {availableThemes
          .filter((theme) => !theme.industry) // Only show general themes in the quick switcher
          .map((theme, index) => (
            <DropdownMenuItem
              key={theme.id}
              onClick={() => applyTheme(theme.id)}
              className={cn(
                "flex items-center justify-between py-2.5 px-3 hover:bg-business-600/20 transition-all duration-200 hover:scale-[1.02] text-gray-200",
                colorTheme === theme.id && "bg-business-800/20",
                "animate-in fade-in-50 slide-in-from-right-3",
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-5 w-5 rounded-full border border-white/20 shadow-sm transition-all duration-300",
                    colorTheme === theme.id && "animate-pulse",
                  )}
                  style={{
                    backgroundColor: `hsl(${theme.colors.primary})`,
                  }}
                />
                <span className={theme.isDark ? "text-white" : ""}>{theme.name}</span>
              </div>
              {colorTheme === theme.id && <Check className="h-4 w-4 text-business-400" />}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
