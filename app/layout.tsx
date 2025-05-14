import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BusinessFy Real Estate",
  description: "Premium real estate projects and services",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Suspense>
            {children}
            <Analytics />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
