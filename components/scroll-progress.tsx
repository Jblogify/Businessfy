"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / documentHeight) * 100
      setScrollProgress(progress)
    }

    // Add scroll event listener with throttling for better performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScrollProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    calculateScrollProgress() // Calculate initial progress

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-0.5 bg-zinc-700">
      <div
        className="h-full bg-gradient-to-r from-business-600 to-business-400 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
    </div>
  )
}
