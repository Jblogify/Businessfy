"use client"

import { cn } from "@/lib/utils"

interface BusinessFyLogoProps {
  className?: string
  width?: number
  height?: number
  size?: number
  textClassName?: string
}

export function BusinessFyLogo({ className, width = 32, height = 32, size, textClassName }: BusinessFyLogoProps) {
  const logoSize = size || Math.max(width, height)

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div
        className="rounded-lg bg-gradient-to-br from-business-600 to-business-700 flex items-center justify-center text-white font-bold shadow-md"
        style={{ width: logoSize, height: logoSize }}
      >
        <span className={cn("font-bold", logoSize < 24 ? "text-xs" : "text-sm")}>BF</span>
      </div>
      <span className={cn("font-bold text-xl text-gray-900 dark:text-gray-100", textClassName)}>BusinessFy</span>
    </div>
  )
}
