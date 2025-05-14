import { Building2 } from "lucide-react"

interface LogoProps {
  className?: string
  size?: number
  showText?: boolean
  textClassName?: string
}

export function BusinessFyLogo({ className = "", size = 24, showText = true, textClassName = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center rounded-md bg-business-600 p-1 text-white">
        <Building2 size={size} />
      </div>
      {showText && (
        <span className={`font-bold tracking-tight ${textClassName || "text-business-700 dark:text-business-300"}`}>
          BusinessFy
        </span>
      )}
    </div>
  )
}
