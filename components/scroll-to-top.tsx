"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScrollToTopProps {
  threshold?: number
  className?: string
}

export function ScrollToTop({ threshold = 300, className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down past threshold
      setIsVisible(window.scrollY > threshold)
    }

    // Add scroll event listener with throttling for better performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    // Check initial scroll position
    handleScroll()

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full bg-business-600 text-white opacity-0 shadow-lg transition-all duration-300 hover:bg-business-700 hover:scale-110 focus:ring-2 focus:ring-business-400 focus:ring-offset-2",
        isVisible ? "translate-y-0 opacity-90" : "translate-y-16 opacity-0 pointer-events-none",
        className,
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  )
}
