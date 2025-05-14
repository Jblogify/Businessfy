"use client"

import type React from "react"

import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider as NextThemeProvider } from "@/components/theme-provider"
import { ThemeProvider as ColorThemeProvider } from "@/lib/theme-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NextThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <ColorThemeProvider>{children}</ColorThemeProvider>
      </NextThemeProvider>
    </AuthProvider>
  )
}
