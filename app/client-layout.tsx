"use client"

import type React from "react"
import { useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { pageview } from "@/lib/analytics"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <PageViewTracker />
      {children}
    </Suspense>
  )
}

// Add this component for page view tracking
function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
      pageview(url)
    }
  }, [pathname, searchParams])

  return null
}
