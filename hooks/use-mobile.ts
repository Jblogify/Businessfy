"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Define the resize handler
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Adjust breakpoint as needed
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []) // Empty dependency array - only run on mount and unmount

  return isMobile
}
