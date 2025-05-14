"use client"

import type React from "react"
import { useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { pageview } from "@/lib/analytics"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Add Google Analytics script
  useEffect(() => {
    // Check if GA measurement ID exists
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      gtag("js", new Date())
      gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
    }
  }, [])

  return (
    <>
      <SiteHeader />
      <main>
        <Suspense>
          <PageViewTracker />
          {children}
        </Suspense>
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
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
