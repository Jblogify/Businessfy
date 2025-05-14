"use client"

import { Check, Palette } from "lucide-react"
import { useColorTheme } from "@/lib/theme-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function ThemeSwitcher({ className }: { className?: string }) {
  const { colorTheme, availableThemes, applyTheme } = useColorTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={cn("h-9 w-9", className)}>
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => applyTheme(theme.id)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: `hsl(${theme.colors.primary})`,
                }}
              />
              {theme.name}
            </div>
            {colorTheme === theme.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
