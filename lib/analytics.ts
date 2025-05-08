// Google Analytics integration utility functions

// This function initializes Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window !== "undefined" && !window.gtag) {
    // Add Google Analytics script to the page
    const script1 = document.createElement("script")
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script1)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag("js", new Date())
    window.gtag("config", measurementId)

    return true
  }
  return false
}

// This function sends a page view to Google Analytics
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string, {
      page_path: url,
    })
  }
}

// This function sends an event to Google Analytics
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// This function fetches analytics data from Google Analytics API
// In a real implementation, this would use the Google Analytics API
// For this example, we'll use mock data
export const fetchAnalyticsData = async (
  startDate: string,
  endDate: string,
  metrics: string[] = ["pageviews", "sessions", "users"],
  dimensions: string[] = ["date"],
) => {
  // In a real implementation, this would make an API call to Google Analytics
  // For this example, we'll return mock data

  // Generate dates between startDate and endDate
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dates = []

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d).toISOString().split("T")[0])
  }

  // Generate random data for each metric
  const data = dates.map((date) => {
    const result: Record<string, any> = { date }

    metrics.forEach((metric) => {
      // Generate random value between 100 and 1000
      result[metric] = Math.floor(Math.random() * 900) + 100
    })

    return result
  })

  return data
}

// Add TypeScript declarations for gtag
declare global {
  interface Window {
    gtag: (command: string, action: any, params?: Record<string, any>) => void
    dataLayer: any[]
  }
}
