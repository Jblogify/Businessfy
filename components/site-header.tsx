"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { BusinessFyLogo } from "@/components/ui/businessfy-logo"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useMobile } from "@/hooks/use-mobile"
import { ScrollProgress } from "@/components/scroll-progress"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isMobile = useMobile()

  // Adjust scroll threshold based on device
  const scrollThreshold = isMobile ? 10 : 20

  useEffect(() => {
    const handleScroll = () => {
      // Use a more sensitive threshold for mobile
      const isScrolled = window.scrollY > scrollThreshold
      setScrolled(isScrolled)
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
  }, [scrollThreshold, isMobile]) // Removed scrolled from dependencies

  // Calculate size reduction based on device
  const logoSize = scrolled ? (isMobile ? 22 : 24) : isMobile ? 24 : 28
  const headerHeight = scrolled ? (isMobile ? "h-12" : "h-14") : isMobile ? "h-14" : "h-16"
  const logoScale = scrolled ? (isMobile ? "scale-90" : "scale-95") : "scale-100"

  return (
    <>
      <ScrollProgress />
      <header
        className={`sticky top-0 z-40 w-full border-b border-gray-800 bg-zinc-900 text-white/90 transition-all duration-200 ${headerHeight} ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="flex justify-center w-full h-full">
          <div
            className={`w-[95%] md:w-[90%] lg:w-[85%] flex items-center justify-between px-4 sm:px-8 h-full transition-all duration-300 bg-business-600 rounded-md sm:rounded-lg 
            ${scrolled ? "opacity-90 rounded-none" : "opacity-100 mt-1"}
            ${hovered && !scrolled ? "shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-business-900/20" : "border border-transparent"}
            `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <BusinessFyLogo
                  size={logoSize}
                  textClassName={`transition-all duration-200 ${isMobile ? "text-lg" : "text-xl"} ${logoScale} ${
                    hovered ? "text-white" : ""
                  } drop-shadow-sm`}
                />
              </Link>
            </div>

            <div className="flex-1">
              <MainNav />
            </div>

            <div className="flex items-center gap-3 bg-zinc-700/60 p-1.5 rounded-lg backdrop-blur-md">
              <ThemeSwitcher className="bg-zinc-700 hover:bg-zinc-600 text-white border-none shadow-sm" />
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
